/******************************************
 * CACHING MODULE
 ******************************************/
/**
 * newCachingModule is an IIFE (Immediately Invoked Function Expression) that returns a function to create new instances of CachingModule.
 * This module manages WebSocket-based caching mechanisms in web applications, focusing on real-time data updates and efficient data caching.
 *
 * The CachingModule class within handles WebSocket connections for real-time communication and provides an LRU (Least Recently Used) caching strategy.
 *
 * Key Components:
 * - WebSocket Integration: Manages a WebSocket connection using a URL derived from Hison.caching configuration.
 * - LRU Cache Implementation: Offers methods for LRU cache operations such as get, put, remove, getAll, getKeys, and clear.
 * - WebSocket Event Handlers: Allows setting custom functions for WebSocket events (onopen, onmessage, onclose) and checking WebSocket connection status.
 * - Automatic Cache Clearing: The cache is automatically cleared upon receiving new messages through the WebSocket (in the onmessage event), ensuring data freshness and relevance.
 *
 * Usage:
 * var cachingModuleInstance = newCachingModule();
 * cachingModuleInstance.onmessage(function(event) { ... });
 * cachingModuleInstance.put('key', 'value');
 * var value = cachingModuleInstance.get('key');
 *
 * The module is configured to automatically clear the cache when a new message is received via WebSocket, helping to maintain up-to-date data:
 * cachingModule.onmessage(function(event) {
 *      cachingModule.clear(); // Automatically clears the cache on receiving new WebSocket messages
 * });
 * This module is particularly useful in scenarios where real-time data handling and efficient caching are crucial for application performance.
 */
var newCachingModule = (function() {
    function CachingModule() {
        var _deepCopy = function(object, visited) {
            if (object === null || typeof object !== 'object') {
                return object;
            }
            if (object.constructor !== Object && object.constructor !== Array) {
                if(object.isDataModel) {
                    return object.clone();
                } else {
                    return object;
                }
            }
            if (!visited) visited = [];
            for (var i = 0; i < visited.length; i++) {
                if (visited[i].source === object) {
                    return visited[i].copy;
                }
            }
            var copy;
            if (Array.isArray(object)) {
                copy = [];
                visited.push({ source: object, copy: copy });
        
                for (var j = 0; j < object.length; j++) {
                    copy[j] = _deepCopy(object[j], visited);
                }
            } else {
                copy = {};
                visited.push({ source: object, copy: copy });
        
                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        copy[key] = _deepCopy(object[key], visited);
                    }
                }
            }
            return copy;
        };

        var _checkTypeString = function(str) {
            if(typeof str !== 'string') {
                throw new Error("key is only a string.");
            }
        }

        var _checkTypeFunction = function(func) {
            if (func && typeof func !== 'function') {
                throw new Error("Please enter only the function.");
            }
        }

        var _limit = Hison.caching.limit;
        var _webSocketUrl = Hison.caching.protocol + Hison.link.domain + Hison.caching.wsEndPoint;
        var _webSocket = new WebSocket(_webSocketUrl);

        _webSocket.onopen = function(event) {};
        _webSocket.onmessage = function(event) {};
        _webSocket.onclose = function(event) {};

        function checkWebSocketConnection() {
            if (_webSocket.readyState === WebSocket.OPEN) {
                return 1;
            } else if (_webSocket.readyState === WebSocket.CONNECTING) {
                return 0;
            } else {
                return -1;
            }
        }

        function LRUCache(limit) {
            this.limit = limit;
            this.cache = {};
            this.keys = [];
        }
    
        LRUCache.prototype.get = function(key) {
            if (!this.cache.hasOwnProperty(key)) return null;
            var value = _deepCopy(this.cache[key]);
    
            this.remove(key);
            this.keys.push(key);
    
            return value;
        };
        LRUCache.prototype.put = function(key, value) {
            if (this.cache.hasOwnProperty(key)) {
                this.remove(key);
            } else if (this.keys.length == this.limit) {
                var oldestKey = this.keys.shift();
                delete this.cache[oldestKey];
            }
    
            this.cache[key] = _deepCopy(value);
            this.keys.push(key);
        };
        LRUCache.prototype.remove = function(key) {
            var index = this.keys.indexOf(key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        };
        LRUCache.prototype.getAll = function() {
            return _deepCopy(this.cache);
        };
        LRUCache.prototype.getKeys = function() {
            return _deepCopy(this.keys);
        };
        LRUCache.prototype.clear = function() {
            this.cache = {};
            this.keys = [];
        };

        var lruCache = new LRUCache(_limit);

        /**
         * Retrieves a value from the cache corresponding to the specified key.
         *
         * Before attempting to retrieve the value, this method checks if the provided key is a string. If the key is not a string, an error is thrown.
         * If the key is valid and exists in the cache, the corresponding value is returned. If the key does not exist, null is returned.
         *
         * @param {String} key - The key for which the cached value is to be retrieved. Must be a string.
         * @returns {} - The value from the cache associated with the key. Returns null if the key does not exist in the cache.
         *
         * This method is particularly useful for retrieving specific items from the cache where the key is known.
         * It ensures type safety by verifying that the key is of the correct type (string) before attempting to retrieve the corresponding value.
         */
        this.get = function(key) {
            _checkTypeString(key);
            return lruCache.get(key);
        };

        /**
         * Stores a value in the cache associated with a specific key.
         * 
         * This method adds an item to the LRU cache, using the key for reference. The value is deeply copied before being stored
         * to ensure that subsequent changes to the original object do not affect the stored data.
         *
         * @param {String} key - The key under which the value is to be stored in the cache.
         * @param {} value - The value to be stored in the cache. This value is deeply copied to preserve the integrity of the cached data.
         *
         * This method is useful for adding or updating values in the cache, especially when maintaining the original state of the value is critical.
         * It ensures type safety by verifying that the key is of the correct type (string) before attempting to retrieve the corresponding value.
         */
        this.put = function(key, value) {
            _checkTypeString(key);
            lruCache.put(key, value);
        };

        /**
         * Removes the data associated with the specified key from the cache.
         *
         * This method is used to delete an item from the LRU cache. If the key exists in the cache, the corresponding entry is removed. 
         * If the key does not exist, no action is taken.
         *
         * @param {String} key - The key of the data to be removed from the cache.
         *
         * This method is particularly useful for managing the cache contents by removing outdated or unnecessary items, 
         * thus ensuring the cache contains only relevant data.
         * It ensures type safety by verifying that the key is of the correct type (string) before attempting to retrieve the corresponding value.
         */
        this.remove = function(key) {
            _checkTypeString(key);
            lruCache.remove(key);
        };

        /**
         * Retrieves all key-value pairs currently stored in the cache.
         *
         * This method returns a deep copy of all items in the LRU cache. Deep copying ensures that modifications to the returned object
         * do not affect the original cached items, maintaining the integrity of the cache.
         *
         * @returns {Object} - An object containing all key-value pairs in the cache. Each value is a deep copy of the corresponding item in the cache.
         *
         * This method is useful when a complete snapshot of the current cache state is needed, for instance, for debugging, logging, or cache state analysis.
         */
        this.getAll = function() {
            return lruCache.getAll();
        };

        /**
         * Retrieves all keys currently present in the cache.
         *
         * This method returns a deep copy of the array of keys for all items stored in the LRU cache. The deep copy ensures that 
         * modifications to the returned array do not affect the original array of keys in the cache.
         *
         * @returns {Array} - An array containing a deep copy of all keys in the cache.
         *
         * This method is particularly useful for scenarios where you need to inspect or iterate over the keys in the cache,
         * such as for selective cache operations or analytics.
         */
        this.getKeys = function() {
            return lruCache.getKeys();
        }

        /**
         * Clears all key-value pairs stored in the cache.
         *
         * This method completely empties the LRU cache, removing all stored items. It is used to reset the cache, either as part of regular maintenance or in response to specific application events.
         *
         * Usage of this method is essential when there is a need to completely refresh the cached data, ensuring that no outdated or irrelevant data remains in the cache.
         *
         * Note: Use this method with caution as it will remove all data from the cache, which might affect application performance if the data needs to be re-fetched.
         */
        this.clear = function() {
            lruCache.clear();
        };

        /**
         * Assigns a custom function to be executed when the WebSocket connection is opened.
         *
         * Before setting the event handler, this method validates the provided argument using the `_checkTypeFunction` method.
         * If it is not a function, it throws an error.
         * If the argument is a valid function, it is then set as the event handler for the WebSocket's 'onopen' event.
         *
         * @param {Function} func - The function to be executed when the WebSocket connection opens.
         *                         Must be a function. This function should contain any custom logic required upon the opening of the WebSocket connection.
         * 
         * This method is essential for initializing processes or performing actions immediately after the WebSocket connection is established.
         * It ensures that the provided handler is appropriate and prevents potential runtime errors due to incorrect argument types.
         */
        this.onopen = function(func) {
            _checkTypeFunction(func);
            _webSocket.onopen = func;
        };

        /**
         * Assigns a custom function to be executed when a message is received from the WebSocket server.
         *
         * This method sets up a custom event handler for the WebSocket 'onmessage' event. Before assigning the function,
         * If the argument is not a function, an error is thrown.
         * If valid, the function is set as the event handler for receiving messages from the WebSocket connection.
         *
         * By default, the CachingModule clears its cache when a new message is received, ensuring the data is up-to-date.
         * This default behavior can be overridden by providing a custom function to this method.
         *
         * @param {Function} func - The function to be executed when a message is received from the WebSocket server.
         *                          Must be a function. This function should handle any custom logic required upon receiving a message.
         *
         * This method is crucial for handling incoming messages from the WebSocket server, allowing for real-time updates and responsive actions in the application.
         * The validation of the function argument ensures robust and error-free event handling.
         */
        this.onmessage = function(func) {
            _checkTypeFunction(func);
            _webSocket.onmessage = func;
        };

        /**
         * Assigns a custom function to be executed when the WebSocket connection is closed.
         *
         * This method sets up a custom event handler for the WebSocket 'onclose' event. It first checks if the provided argument is a function 
         * If it is not a function, an error is thrown.
         * If the argument is a valid function, it is set as the event handler for when the WebSocket connection is closed.
         *
         * @param {Function} func - The function to be executed when the WebSocket connection closes.
         *                          Must be a function. This function should contain any custom logic required to handle the closing of the WebSocket connection.
         *
         * This method is useful for performing cleanup tasks or other final actions when the WebSocket connection is closed, 
         * ensuring the application responds appropriately to the disconnection event.
         */
        this.onclose = function(func) {
            _checkTypeFunction(func);
            _webSocket.onclose = func;
        };

        /**
         * Checks and returns the current state of the WebSocket connection.
         *
         * This method utilizes the `checkWebSocketConnection` function to determine the WebSocket connection's current status.
         * It returns a numeric value representing the connection state: 1 for connected, 0 for connecting, and -1 for not connected.
         *
         * @returns {Number} - The state of the WebSocket connection. Possible values are:
         *                     1 (connected), 0 (connecting), or -1 (not connected).
         *
         * This method is particularly useful for understanding the current state of the WebSocket connection, 
         * allowing the application to make decisions based on the connectivity status.
         */
        this.isWebSocketConnection = function() {
            return checkWebSocketConnection();
        }

        /**
         * A boolean property used to identify if an object is an instance created by newCachingModule.
         *
         * This property is set to true for all instances created using the newCachingModule function. It serves as a marker 
         * to easily identify caching module instances. This can be particularly useful when working with a system where 
         * multiple types of modules or handlers might be present and a specific check for a caching module instance is required.
         *
         * @type {Boolean}
         *
         * Always returns true for instances created through newCachingModule, indicating that the object is indeed a caching module.
         */
        this.isCachingModule = true;
    }
    return function() {
        var cachingModule = new CachingModule();
        cachingModule.onmessage(function (event) {
            cachingModule.clear();
        });
        return cachingModule;
    };
})();

/******************************************
 * API LINK
 ******************************************/
/**
 * newApiLink is an Immediately Invoked Function Expression (IIFE) that returns a factory function for creating instances of ApiLink.
 * This module is designed for managing API requests and handling the associated events in web applications.
 * It should be used in conjunction with the Maven Java project 'io.github.hisondev.api-link' for seamless integration and functionality.
 *
 * Constructor: ApiLink(cmd, options)
 * - cmd: A string representing the command to be used for API requests. It is a required parameter for all request types except GET.
 * - options: An object containing optional settings for the ApiLink instance. Possible keys include:
 *    - logging: A boolean indicating whether to enable logging for API requests and responses.
 *    - cachingModule: An instance of a caching module created through newCachingModule. When provided, enables caching logic for API requests.
 *        Note: Only caching modules created through newCachingModule are supported. Inserting this module activates caching logic for the ApiLink instance.
 *
 * Key Components:
 * - EventEmitter: A simple implementation of the EventEmitter pattern for handling custom events related to API requests.
 * - ApiLink: The main class responsible for handling API requests using various HTTP methods and managing events through EventEmitter.
 * - Logging: A built-in logging function for monitoring and debugging API requests and responses.
 * - Validation and Error Handling: Functions to validate request parameters, headers, and options, ensuring robust and error-free API interaction.
 * - Caching Integration: Optional integration with a caching module to enhance performance and manage data effectively.
 * - Event Handling: Allows subscription to various events related to the lifecycle of API requests.
 *
 * ApiLink Methods:
 * - get, post, put, patch, delete: Functions for making respective HTTP requests.
 * - setCmd: Sets the command used in the API request, crucial for request processing.
 * - onEventEmit: Allows subscribing to custom events related to API requests.
 * - isApiLink: A boolean property set to true, indicating that the object is an instance of ApiLink.
 *
 * Note: The usage of this module is tied closely to the 'io.github.hisondev.api-link' Maven Java project. Ensure that the project is included in your Java backend for full compatibility and functionality.
 *
 * This module is essential for applications requiring streamlined, event-driven, and customizable API request handling.
 */
var newApiLink = (function() {
    /********************
     * EventEmitter
     ********************/
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.on = function(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    };
    
    EventEmitter.prototype.emit = function(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    };

    function ApiLink(cmd, options) {
        var _eventEmitter = new EventEmitter();
        /********************
         * Logging
         ********************/
        function logging(url, method, body, response, duration) {
            if(!_doLogging) return;
            console.log(`[ApiLink] ${method} ${url} - ${duration}ms`);
            console.log('Request Body:', body);
            console.log('Response:', response);
        }

        /********************
         * Api Link
         ********************/
        var _cmd;
        var _rootUrl = Hison.link.protocol + Hison.link.domain;
        var _controllerPath = Hison.link.controllerPath;
        var _timeout = Hison.link.timeout;
        var _doLogging = false;
        var _cachingModule = null;
        var _beforeGetRequst = Hison.link.beforeGetRequst;
        var _beforePostRequst = Hison.link.beforePostRequst;
        var _beforePutRequst = Hison.link.beforePutRequst;
        var _beforePatchRequst = Hison.link.beforePatchRequst;
        var _beforeDeleteRequst = Hison.link.beforeDeleteRequst;
        var _beforeCallbackWorked = Hison.link.beforeCallbackWorked;
        var _callbackErrorFunc = Hison.link.beforeCallbackError;

        if(options) {
            if (options.constructor !== Object) {
                throw new Error("obtions must be an object which contains key and value.");
            }
            if(options.logging) _doLogging = (options.logging === true);
            if(options.cachingModule && options.cachingModule.isCachingModule) {
                _cachingModule = options.cachingModule;
            }
        }
        
        var _validateParams = function(requestDwOrResourcePath, callbackWorkedFunc, callbackErrorFunc, options, isGet) {
            if(!isGet) {
                if (!_cmd) {
                    throw new Error("Command not specified");
                }
                if(requestDwOrResourcePath && !requestDwOrResourcePath.isDataWrapper) {
                    throw new Error("Please insert only a valid data type.");
                }
            } else {
                if(typeof requestDwOrResourcePath !== 'string') {
                    throw new Error("Please insert a string as ResourcePath URL.");
                }
            }
            if (callbackWorkedFunc && typeof callbackWorkedFunc !== 'function') {
                throw new Error("Callback Worked Function must be a function.");
            }
            if (callbackErrorFunc && typeof callbackErrorFunc !== 'function') {
                throw new Error("Callback Error Function must be a function.");
            }
            if (options && options.constructor !== Object) {
                throw new Error("obtions must be an object which contains key and value.");
            }
        };

        var _validateHeaders = function(headers) {
            if (headers.constructor !== Object) {
                throw new Error("Headers must be an object which contains key and value.");
            }
            Object.keys(headers).forEach(key => {
                if (typeof headers[key] !== 'string') {
                    throw new Error("All header values must be strings.");
                }
            });
        };

        var _validatePositiveInteger = function(timeout) {
            if (typeof timeout !== 'number' || timeout <= 0 || !Number.isInteger(timeout)) {
                throw new Error("Timeout must be a positive integer.");
            }
        };


        var _validateFetchOptions = function(fetchOptions) {
            if (fetchOptions.constructor !== Object) {
                throw new Error("fetchOptions must be an object which contains key and value.");
            }
        };

        var _getDataWrapper = function(dw) {
            if(dw) {
                dw.putString('cmd',_cmd);
            } else {
                dw = newDataWrapper('cmd',_cmd);
            }
            return dw;
        };

        var _getRsultDataWrapper = function(resultData) {
            var data = null;
            if(resultData && resultData.constructor === Object) {
                data = newDataWrapper();
                for(var key of Object.keys(resultData)) {
                    if (resultData[key].constructor === Object || resultData[key].constructor === Array) {
                        data.putDataModel(key, newDataModel(resultData[key]));
                    } else {
                        data.put(key, resultData[key]);
                    }
                }
            } else if (resultData && resultData.constructor !== Object) {
                data = resultData;
            }
            return data;
        }

        var _request = async function(methodName, requestDwOrResourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
            switch (methodName.toUpperCase()) {
                case 'GET':
                    _eventEmitter.emit('requestStarted_GET', requestDwOrResourcePath, options);
                    break;
                case 'POST':
                    _eventEmitter.emit('requestStarted_POST', requestDwOrResourcePath, options);
                    break;
                case 'PUT':
                    _eventEmitter.emit('requestStarted_PUT', requestDwOrResourcePath, options);
                    break;
                case 'PATCH':
                    _eventEmitter.emit('requestStarted_PATCH', requestDwOrResourcePath, options);
                    break;
                case 'DELETE':
                    _eventEmitter.emit('requestStarted_DELETE', requestDwOrResourcePath, options);
                    break;
                default:
                    break;
            }
            var isGet = methodName.toUpperCase() === 'GET';
            _validateParams(requestDwOrResourcePath, callbackWorkedFunc, callbackErrorFunc, options, isGet);

            var url = isGet ? _rootUrl + requestDwOrResourcePath : _rootUrl + _controllerPath;
            if(_cachingModule && _cachingModule.isWebSocketConnection() === 1 && _cachingModule.get(isGet ? url : _cmd)) {
                var result = _cachingModule.get(isGet ? url : _cmd);
                if(_beforeCallbackWorked(result.data, result.response) !== false) {
                    if(callbackWorkedFunc) callbackWorkedFunc(result.data, result.response);
                };
                return result;
            }

            var timeout = _timeout;
            var requestDw = isGet ? null : _getDataWrapper(requestDwOrResourcePath);
            var fetchOptions = {
                method: methodName,
                headers: {'Content-Type': 'application/json'},
                body: isGet ? null : requestDw.getSerialized(),
            }
            if(options) {
                if(options.headers) {
                    _validateHeaders(options.headers);
                    fetchOptions.headers =  Object.assign({'Content-Type': 'application/json'}, options.headers);
                }
                if(options.timeout) {
                    _validatePositiveInteger(options.timeout);
                    timeout = options.timeout
                }
                if(options.fetchOptions) {
                    _validateFetchOptions(options.fetchOptions);
                    Object.keys(options.fetchOptions).forEach(key => {
                        if(['method','headers','body'].indexOf(key.toLowerCase()) === -1) {
                            fetchOptions[key] = options.fetchOptions[key];
                        }
                    });
                }
            }

            var timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out")), timeout)
            );
            var fetchPromise = fetch(url, fetchOptions);
            var startTime = Date.now();
            var racePromise = Promise.race([fetchPromise, timeoutPromise])
            .then(response => {
                logging(url, methodName, fetchOptions.body, response, Date.now() - startTime);
                _eventEmitter.emit('requestCompleted_Response', response);
                var contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(data => ({ data: data, response: response }));
                } else if (contentType) {
                    return response.text().then(text => ({ data: text ? text : null, response: response }));
                } else {
                    return { data: null, response: response };
                }
            })
            .then(rtn => {
                var resultData = rtn.data;
                var data = _getRsultDataWrapper(resultData);
                _eventEmitter.emit('requestCompleted_Data', { data: data, response: rtn.response });
                if(_cachingModule && _cachingModule.isWebSocketConnection() === 1) _cachingModule.put(isGet ? url : _cmd, { data: data, response: rtn.response });
                if(_beforeCallbackWorked(data, rtn.response) !== false) {
                    if(callbackWorkedFunc) callbackWorkedFunc(data, rtn.response);
                }
                return { data: data, response: rtn.response };
            })
            .catch(error => {
                logging(url, methodName, fetchOptions.body, error, Date.now() - startTime);
                _eventEmitter.emit('requestError', error);
                if(_callbackErrorFunc(error) !== false) {
                    if(callbackErrorFunc) callbackErrorFunc(error);
                }
                throw error;
            });
        
            return racePromise;
        };

        /**
         * Performs a GET request to the specified resource path and returns a promise.
         *
         * This method sends an HTTP GET request to the given resourcePath. It allows the injection of post-processing functions 
         * for successful responses (callbackWorkedFunc) and error handling (callbackErrorFunc).
         * Options can be provided as an object to customize the request behavior.
         *
         * @param {String} resourcePath - The path to the resource for the GET request.
         * @param {Function} callbackWorkedFunc - A function to be executed if the request is successful. 
         *                                       Receives resultData and response as arguments.
         * @param {Function} callbackErrorFunc - A function to be executed in case of an error.
         *                                       Receives error as an argument.
         * @param {Object} options - An object containing optional settings for the request:
         *                           - headers: Additional headers to be sent along with the default {'Content-Type': 'application/json'}.
         *                           - timeout: The timeout limit for the request in milliseconds. Default is 5000ms (5 seconds).
         *                           - fetchOptions: Additional options to be passed to the fetch API call.
         *
         * Usage of this method allows for asynchronous HTTP GET requests with custom handling of responses and errors.
         * It can be used with await syntax, e.g., `await newApiLink('myCommand').get(url);`, for synchronized handling of the response.
         *
         * Usage Example:
         * ```
         * var apiLinkInstance = newApiLink('myCommand');
         * apiLinkInstance.get('/data/resource', 
         *     function(resultData, response) { console.log('Data received:', resultData); },
         *     function(error) { console.error('Error:', error); },
         *     { timeout: 3000, headers: { 'Authorization': 'Bearer token123' } });
         * ```
         *
         * This method is suitable for fetching data from a specified resource path, with flexible handling of the response and error cases.
         */
        this.get = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforeGetRequst(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('GET', resourcePath, callbackWorkedFunc, callbackErrorFunc, options);
        };

        /**
         * Executes a POST request with the specified requestDataWrapper and returns a promise.
         *
         * This method sends an HTTP POST request using the command stored in the instance (_cmd). The requestDataWrapper 
         * is used as the request body. The method allows for the injection of post-processing functions for successful 
         * responses (callbackWorkedFunc) and error handling (callbackErrorFunc). Options can be provided as an object to 
         * customize the request behavior.
         *
         * @param {DataWrapper} requestDataWrapper - The request body for the POST request.
         * @param {Function} callbackWorkedFunc - A function to be executed if the request is successful. 
         *                                       Receives resultData and response as arguments.
         * @param {Function} callbackErrorFunc - A function to be executed in case of an error.
         *                                       Receives error as an argument.
         * @param {Object} options - An object containing optional settings for the request:
         *                           - headers: Additional headers to be sent along with the default {'Content-Type': 'application/json'}.
         *                           - timeout: The timeout limit for the request in milliseconds. Default is 5000ms (5 seconds).
         *                           - fetchOptions: Additional options to be passed to the fetch API call.
         *
         * Usage of this method allows for asynchronous HTTP POST requests with custom handling of responses and errors.
         * It can be used with await syntax, e.g., `await newApiLink('myCommand').post(requestDataWrapper);`, for synchronized handling of the response.
         *
         * Usage Example:
         * ```
         * var apiLinkInstance = newApiLink('myCommand');
         * var requestData = new DataWrapper();
         * requestData.put('key', 'value');
         * apiLinkInstance.post(requestData, 
         *     function(resultData, response) { console.log('Data received:', resultData); },
         *     function(error) { console.error('Error:', error); },
         *     { timeout: 3000, headers: { 'Authorization': 'Bearer token123' } });
         * ```
         *
         * This method is suitable for sending data to a server via POST requests, with flexible handling of the response and error cases.
         */
        this.post = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforePostRequst(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('POST', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options);
        };
        
        /**
         * Executes a PUT request with the specified requestDataWrapper and returns a promise.
         *
         * This method sends an HTTP PUT request using the command stored in the instance (_cmd). The requestDataWrapper is used as the 
         * request body. It allows for the injection of post-processing functions for successful responses (callbackWorkedFunc) and 
         * error handling (callbackErrorFunc). Options can be provided as an object to customize the request behavior.
         *
         * @param {DataWrapper} requestDataWrapper - The request body for the PUT request.
         * @param {Function} callbackWorkedFunc - A function to be executed if the request is successful. 
         *                                       Receives resultData and response as arguments.
         * @param {Function} callbackErrorFunc - A function to be executed in case of an error.
         *                                       Receives error as an argument.
         * @param {Object} options - An object containing optional settings for the request:
         *                           - headers: Additional headers to be sent along with the default {'Content-Type': 'application/json'}.
         *                           - timeout: The timeout limit for the request in milliseconds. Default is 5000ms (5 seconds).
         *                           - fetchOptions: Additional options to be passed to the fetch API call.
         *
         * The method allows for asynchronous HTTP PUT requests with custom handling of responses and errors.
         * It can be used with await syntax, e.g., `await newApiLink('myCommand').put(requestDataWrapper);`, for synchronized handling of the response.
         *
         * Usage Example:
         * ```
         * var apiLinkInstance = newApiLink('myCommand');
         * var requestData = new DataWrapper();
         * requestData.put('key', 'updatedValue');
         * apiLinkInstance.put(requestData, 
         *     function(resultData, response) { console.log('Data updated:', resultData); },
         *     function(error) { console.error('Error:', error); },
         *     { timeout: 3000, headers: { 'Authorization': 'Bearer token123' } });
         * ```
         *
         * This method is suitable for updating data on the server via PUT requests, with flexible handling of the response and error cases.
         */
        this.put = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforePutRequst(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('PUT', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options);
        };
        
        /**
         * Executes a PATCH request with the specified requestDataWrapper and returns a promise.
         *
         * This method sends an HTTP PATCH request using the command stored in the instance (_cmd). The requestDataWrapper is used as the 
         * request body. It allows for the injection of post-processing functions for successful responses (callbackWorkedFunc) and 
         * error handling (callbackErrorFunc). Options can be provided as an object to customize the request behavior.
         *
         * @param {DataWrapper} requestDataWrapper - The request body for the PATCH request.
         * @param {Function} callbackWorkedFunc - A function to be executed if the request is successful. 
         *                                       Receives resultData and response as arguments.
         * @param {Function} callbackErrorFunc - A function to be executed in case of an error.
         *                                       Receives error as an argument.
         * @param {Object} options - An object containing optional settings for the request:
         *                           - headers: Additional headers to be sent along with the default {'Content-Type': 'application/json'}.
         *                           - timeout: The timeout limit for the request in milliseconds. Default is 5000ms (5 seconds).
         *                           - fetchOptions: Additional options to be passed to the fetch API call.
         *
         * The method allows for asynchronous HTTP PATCH requests with custom handling of responses and errors.
         * It can be used with await syntax, e.g., `await newApiLink('myCommand').patch(requestDataWrapper);`, for synchronized handling of the response.
         *
         * Usage Example:
         * ```
         * var apiLinkInstance = newApiLink('myCommand');
         * var requestData = new DataWrapper();
         * requestData.put('key', 'partiallyUpdatedValue');
         * apiLinkInstance.patch(requestData, 
         *     function(resultData, response) { console.log('Data partially updated:', resultData); },
         *     function(error) { console.error('Error:', error); },
         *     { timeout: 3000, headers: { 'Authorization': 'Bearer token123' } });
         * ```
         *
         * This method is suitable for partially updating data on the server via PATCH requests, with flexible handling of the response and error cases.
         */
        this.patch = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforePatchRequst(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('PATCH', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options);
        };
        
        /**
         * Executes a DELETE request with the specified requestDataWrapper and returns a promise.
         *
         * This method sends an HTTP DELETE request using the command stored in the instance (_cmd). The requestDataWrapper is used as the 
         * request body. It allows for the injection of post-processing functions for successful responses (callbackWorkedFunc) and 
         * error handling (callbackErrorFunc). Options can be provided as an object to customize the request behavior.
         *
         * @param {DataWrapper} requestDataWrapper - The request body for the DELETE request.
         * @param {Function} callbackWorkedFunc - A function to be executed if the request is successful. 
         *                                       Receives resultData and response as arguments.
         * @param {Function} callbackErrorFunc - A function to be executed in case of an error.
         *                                       Receives error as an argument.
         * @param {Object} options - An object containing optional settings for the request:
         *                           - headers: Additional headers to be sent along with the default {'Content-Type': 'application/json'}.
         *                           - timeout: The timeout limit for the request in milliseconds. Default is 5000ms (5 seconds).
         *                           - fetchOptions: Additional options to be passed to the fetch API call.
         *
         * The method allows for asynchronous HTTP DELETE requests with custom handling of responses and errors.
         * It can be used with await syntax, e.g., `await newApiLink('myCommand').delete(requestDataWrapper);`, for synchronized handling of the response.
         *
         * Usage Example:
         * ```
         * var apiLinkInstance = newApiLink('myCommand');
         * var requestData = new DataWrapper();
         * requestData.put('key', 'valueToBeDeleted');
         * apiLinkInstance.delete(requestData, 
         *     function(resultData, response) { console.log('Data deleted:', resultData); },
         *     function(error) { console.error('Error:', error); },
         *     { timeout: 3000, headers: { 'Authorization': 'Bearer token123' } });
         * ```
         *
         * This method is suitable for sending DELETE requests to the server, allowing for the deletion of resources with flexible handling of the response and error cases.
         */
        this.delete = function(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) {
            if(_beforeDeleteRequst(requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options) === false) return;
            return _request('DELETE', requestDataWrapper, callbackWorkedFunc, callbackErrorFunc, options);
        };

        /**
         * Sets the command (_cmd) for the ApiLink instance.
         *
         * This method assigns a command string to the ApiLink instance, which is used in the construction of API requests. 
         * The command is a crucial part of the request, often determining the specific action or endpoint to be invoked on the server.
         * The method validates the provided command to ensure it is a non-empty string. If the validation fails, it throws an error.
         *
         * @param {String} cmd - The command string to be set for the ApiLink instance. Must be a non-empty string.
         *
         * Usage of this method is essential for preparing the ApiLink instance for making API requests. It ensures that the command is properly set and validated.
         * This method should be called before performing any requests with the ApiLink instance to ensure the correct command is used in API interactions.
         */
        this.setCmd = function(cmd) {
            if (!cmd) {
                throw new Error("cmd is required.");
            }
            if (typeof cmd !== 'string') {
                throw new Error("cmd must be a string.");
            }
            _cmd = cmd;
        };

        /**
         * Registers an event function (eventFunc) to be called for a specific event (eventName).
         *
         * This method allows the assignment of custom functions to various events related to API requests. 
         * It performs validation to ensure the eventName is a valid string and the eventFunc is a function.
         * The method throws an error if any validation fails.
         *
         * @param {String} eventName - The name of the event for which the function is to be registered. Valid event names include:
         *                             'requestStarted_GET', 'requestStarted_POST', 'requestStarted_PUT', 'requestStarted_PATCH',
         *                             'requestStarted_DELETE', 'requestCompleted_Response', 'requestCompleted_Data', 'requestError'.
         * @param {Function} eventFunc - The function to be executed when the specified event occurs.
         *
         * The eventName corresponds to different stages of the API request lifecycle:
         * - requestStarted_XXX: Called before the respective HTTP method (GET, POST, PUT, PATCH, DELETE) is executed.
         * - requestCompleted_Response: Called immediately after receiving the fetch response (after logging).
         * - requestCompleted_Data: Called immediately after processing the fetch response data.
         * - requestError: Called immediately after a fetch request error occurs (after logging).
         *
         * Usage Example:
         * ```
         * var apiLinkInstance = newApiLink('myCommand');
         * apiLinkInstance.onEventEmit('requestStarted_GET', function(url, options) { console.log('GET request started for:', url); });
         * apiLinkInstance.onEventEmit('requestError', function(error) { console.error('Request error:', error); });
         * ```
         *
         * This method is critical for customizing the behavior of API requests and responses, allowing for specific actions to be taken at different stages of the request lifecycle.
         */
        this.onEventEmit = function(eventName, eventFunc) {
            if (!eventName) {
                throw new Error("Event name is required.");
            }
            if (!eventFunc) {
                throw new Error("Event function is required.");
            }
            if (typeof eventName !== 'string') {
                throw new Error("Event name must be a string.");
            }
            if (['requestStarted_GET',
                 'requestStarted_POST',
                 'requestStarted_PUT',
                 'requestStarted_PATCH',
                 'requestStarted_DELETE',
                 'requestCompleted_Response',
                 'requestCompleted_Data',
                 'requestError'].indexOf(eventName) === -1) {
                throw new Error("Invalid event name."
                + "\nCurrent event name: " + eventName
                + "\nValid event names are:"
                + "\nrequestStarted_GET"
                + "\nrequestStarted_POST"
                + "\nrequestStarted_PUT"
                + "\nrequestStarted_PATCH"
                + "\nrequestStarted_DELETE"
                + "\nrequestCompleted_Response"
                + "\nrequestCompleted_Data"
                + "\nrequestError"
                );
            }
            if (typeof eventFunc !== 'function') {
                throw new Error("Event function must be a function.");
            }
            _eventEmitter.on(eventName, eventFunc);
        };

        /**
         * A boolean property used to identify if an object is an instance created by newApiLink.
         *
         * This property is set to true for all instances created using the newApiLink function. It serves as a marker 
         * to easily identify ApiLink instances. This can be particularly useful in contexts where multiple types of modules 
         * or handlers might be present, and a specific check for an ApiLink instance is required.
         *
         * @type {Boolean}
         *
         * Always returns true for instances created through newApiLink, indicating that the object is an instance of ApiLink.
         *
         * This property is critical for ensuring that the object being used has been instantiated correctly as an ApiLink, 
         * particularly in complex applications with various types of objects and modules.
         */
        this.isApiLink = true;

        //create
        if (!cmd) {
            return;
        } else {
            _cmd = cmd;
        }
    }
    return function(cmd, options) {
        return new ApiLink(cmd, options);
    };
})();

/******************************************
 * Global variable Hison
 ******************************************/
/**
 * The Hison object serves as a configuration hub for API interactions and caching mechanisms in web applications. 
 * It is a global object that provides essential settings and functions for managing API requests and WebSocket connections.
 *
 * @global
 * @object
 * @property {Object} link - Contains configurations related to API requests.
 * @property {Object} caching - Contains configurations related to WebSocket connections and caching.
 *
 * The 'link' property includes:
 * - protocol: The protocol to be used for API requests (e.g., 'http://').
 * - domain: The domain of the API server (e.g., 'localhost:8081').
 * - controllerPath: The path to the API controller (e.g., '/hison-api-link').
 * - timeout: The default timeout for API requests in milliseconds (default is 10000ms).
 * - before*Request: Functions that are called before making respective API requests (GET, POST, PUT, PATCH, DELETE).
 * - beforeCallbackWorked: Function called before executing the success callback of an API request.
 * - beforeCallbackError: Function called before executing the error callback of an API request.
 *
 * The 'caching' property includes:
 * - protocol: The protocol to be used for WebSocket connections (e.g., 'ws://').
 * - wsEndPoint: The endpoint for WebSocket connections (e.g., '/hison-caching-websocket-endpoint').
 * - limit: The limit for the number of items to store in the cache.
 *
 * Note: This configuration object should be defined before using newApiLink and newCachingModule functions to ensure proper functionality.
 */
if(!Hison) {
    var Hison = {
        link : {
            protocol : 'http://',
            domain : 'localhost:8081',
            controllerPath : '/hison-api-link',
            timeout : 10000,
            beforeGetRequst : function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforePostRequst : function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforePutRequst : function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforePatchRequst : function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforeDeleteRequst : function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
                return true;
            },
            beforeCallbackWorked : function(data, response) {
                return true;
            },
            beforeCallbackError : function(error) {
                return true;
            },
        },
        caching : {
            protocol : 'ws://',
            wsEndPoint : '/hison-caching-websocket-endpoint',
            limit : 10,
        },
    };
}
