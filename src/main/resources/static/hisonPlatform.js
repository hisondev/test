/******************************************
 * HISON PLATFORM
 ******************************************/
/**
 * The hison object is a container for configuration values and methods required for using the hisondev solution.
 * It includes the following sub-objects:
 * 
 * - hison.utils.defaults: Contains constants required for overall configuration.
 * - hison.data: Provides functionalities for DataWrapper and DataModel.
 * - hison.link: Offers features necessary for ApiLink.
 * - hison.caching: Includes functionalities for the caching module.
 * - hison.shield: Set up client security. hison Object freezes, prevents going back, prevents opening developer tools.
 * - hison.utils: A collection of various common utility methods.
 * 
 * The hison object is finally defined in the shield.js file through the finalDefinehison() method.
 * After its definition, it is frozen and hidden to prevent external access and modification.
 * All utils' methods have no dependency on each other.
 * When an error occurs, null is usually returned and the cause of the error is displayed on the console. This is to ensure that logic progresses continuously without errors occurring in the client for user UI/UX experience.
 * 
 * @namespace hison
 */
var hison ={};
(function() {
    /******************************************
     * Data
     ******************************************/
    hison.data = {};
    /**
     * Converts special JavaScript objects into a predefined format before they are inserted into the DataModel.
     * This function allows for custom handling of objects like Date, or other special object types, to ensure
     * they are stored in the DataModel in a consistent and predictable format. By default, it returns the object as is.
     *
     * @param {object} object - The object to be converted. This can be a special object like Date or any other object.
     * @returns {object} Returns the converted object.
     *
     * @example
     * // When set the hison.data.convertObject
     * hison.data.convertObject = function(object) {
     *     if (object instanceof Date) {
     *          var year = object.getFullYear();
     *          var month = object.getMonth() + 1;
     *          var day = object.getDate();
     *          var hour = object.getHours();
     *          var minute = object.getMinutes();
     *          var second = object.getSeconds();
     *          month = month < 10 ? '0' + month : month;
     *          day = day < 10 ? '0' + day : day;
     *          hour = hour < 10 ? '0' + hour : hour;
     *          minute = minute < 10 ? '0' + minute : minute;
     *          second = second < 10 ? '0' + second : second;
     *          return year + '-' + month + '-' + day + " " + hour + ":" + minute + ":" + second;
     *     }
     *     return object;
     * };
     * // Inserting a Date object into DataModel
     * const dm = newDataModel([{key:"key1",value:new Date()},{key:"key2",value:new Date()}]);
     * // The value will be in 'yyyy-MM-dd hh:mm:ss' format
     * 
     * Note: 
     * 1. Special objects not processed by convertObject are stored in the DataModel as references. 
     *    Changes to the original object will also reflect in the DataModel.
     * 2. After customizing the handling of special objects, ensure to return the object for all other cases.
     *    This ensures that undefined objects are still stored in the DataModel.
     */
    hison.data.convertObject = function(object) {
        return object;
    }

    /******************************************
     * Link
     ******************************************/
    hison.link = {};
    /** hison.link.protocol is the protocol value for the URL used to call APIs in apiLink. */
    hison.link.protocol = 'http://';
    /** hison.link.domain is the domain value for the URL used to call APIs in apiLink. */
    hison.link.domain = 'localhost:8080';
    /** hison.link.controllerPath is the RequestMapping value for calling APIs in apiLink. */
    hison.link.controllerPath = '/hison-api-link';
    /** hison.link.timeout is the default value for the timeout after making an API request, measured in milliseconds. */
    hison.link.timeout = 10000;
    /**
     * Defines the behavior to be executed before making a GET request in apiLink.
     * This function can be customized to perform actions or checks before the actual GET request is sent.
     * By default, it is set to return true, allowing the GET request to proceed.
     * Returning false from this function will prevent the GET request from being sent.
     *
     * @param {string} resourcePath - The URL address to which the GET request will be sent.
     * @param {function} callbackWorkedFunc - The callback method to be executed if the GET request succeeds.
     * @param {function} callbackErrorFunc - The callback method to be executed if the GET request fails.
     * @param {object} options - Options provided by the user for the GET request.
     * @returns {boolean} Returns true to proceed with the GET request, or false to prevent the request from being sent.
     *
     * @example
     * hison.link.beforeGetRequst = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic before sending a GET request
     *     return true; // Proceed with the GET request
     * };
     *
     * @example
     * // Preventing a GET request
     * hison.link.beforeGetRequst = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic to determine whether to proceed
     *     return false; // Prevent the GET request
     * };
     *
     * Note: This function is useful for implementing pre-request validations, logging, or any setup required before 
     * making a GET request. The function's return value controls whether the GET request should be executed.
     */
    hison.link.beforeGetRequst = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    /**
     * Defines the behavior to be executed before making a POST request in apiLink.
     * This function allows for pre-processing or validation of the data to be sent, as well as other preparatory actions
     * before the POST request is initiated. By default, it is set to return true, allowing the POST request to proceed.
     * If it returns false, the POST request will not be sent.
     *
     * @param {DataWrapper} requestDw - The DataWrapper object containing data to be sent with the POST request.
     * @param {function} callbackWorkedFunc - The callback method to be executed if the POST request succeeds.
     * @param {function} callbackErrorFunc - The callback method to be executed if the POST request fails.
     * @param {object} options - Options provided by the user for the POST request.
     * @returns {boolean} Returns true to proceed with the POST request, or false to prevent the request from being sent.
     *
     * @example
     * hison.link.beforePostRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic before sending a POST request
     *     return true; // Proceed with the POST request
     * };
     *
     * @example
     * // Preventing a POST request
     * hison.link.beforePostRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic to determine whether to proceed
     *     return false; // Prevent the POST request
     * };
     *
     * Note: This function is particularly useful for implementing validations, manipulations, or checks on the data
     * before it is sent in the POST request. It offers a way to programmatically control whether or not a POST request
     * should be initiated based on custom conditions or criteria.
     */
    hison.link.beforePostRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    /**
     * Defines the behavior to be executed before making a PUT request in apiLink.
     * This function allows for pre-processing or validation of the data to be sent, as well as other preparatory actions
     * before the PUT request is initiated. By default, it is set to return true, allowing the PUT request to proceed.
     * If it returns false, the PUT request will not be sent.
     *
     * @param {DataWrapper} requestDw - The DataWrapper object containing data to be sent with the PUT request.
     * @param {function} callbackWorkedFunc - The callback method to be executed if the PUT request succeeds.
     * @param {function} callbackErrorFunc - The callback method to be executed if the PUT request fails.
     * @param {object} options - Options provided by the user for the PUT request.
     * @returns {boolean} Returns true to proceed with the PUT request, or false to prevent the request from being sent.
     *
     * @example
     * hison.link.beforePutRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic before sending a PUT request
     *     return true; // Proceed with the PUT request
     * };
     *
     * @example
     * // Preventing a PUT request
     * hison.link.beforePutRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic to determine whether to proceed
     *     return false; // Prevent the PUT request
     * };
     *
     * Note: This function is particularly useful for implementing validations, manipulations, or checks on the data
     * before it is sent in the PUT request. It offers a way to programmatically control whether or not a PUT request
     * should be initiated based on custom conditions or criteria.
     */
    hison.link.beforePutRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    /**
     * Defines the behavior to be executed before making a PATCH request in apiLink.
     * This function allows for pre-processing or validation of the data to be sent, as well as other preparatory actions
     * before the PATCH request is initiated. By default, it is set to return true, allowing the PATCH request to proceed.
     * If it returns false, the PATCH request will not be sent.
     *
     * @param {DataWrapper} requestDw - The DataWrapper object containing data to be sent with the PATCH request.
     * @param {function} callbackWorkedFunc - The callback method to be executed if the PATCH request succeeds.
     * @param {function} callbackErrorFunc - The callback method to be executed if the PATCH request fails.
     * @param {object} options - Options provided by the user for the PATCH request.
     * @returns {boolean} Returns true to proceed with the PATCH request, or false to prevent the request from being sent.
     *
     * @example
     * hison.link.beforePatchRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic before sending a PATCH request
     *     return true; // Proceed with the PATCH request
     * };
     *
     * @example
     * // Preventing a PATCH request
     * hison.link.beforePatchRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic to determine whether to proceed
     *     return false; // Prevent the PATCH request
     * };
     *
     * Note: This function is particularly useful for implementing validations, manipulations, or checks on the data
     * before it is sent in the PATCH request. It offers a way to programmatically control whether or not a PATCH request
     * should be initiated based on custom conditions or criteria.
     */
    hison.link.beforePatchRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    /**
     * Defines the behavior to be executed before making a DELETE request in apiLink.
     * This function allows for pre-processing or validation of the data to be sent, as well as other preparatory actions
     * before the DELETE request is initiated. By default, it is set to return true, allowing the DELETE request to proceed.
     * If it returns false, the DELETE request will not be sent.
     *
     * @param {DataWrapper} requestDw - The DataWrapper object containing data to be sent with the DELETE request.
     * @param {function} callbackWorkedFunc - The callback method to be executed if the DELETE request succeeds.
     * @param {function} callbackErrorFunc - The callback method to be executed if the DELETE request fails.
     * @param {object} options - Options provided by the user for the DELETE request.
     * @returns {boolean} Returns true to proceed with the DELETE request, or false to prevent the request from being sent.
     *
     * @example
     * hison.link.beforeDeleteRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic before sending a DELETE request
     *     return true; // Proceed with the DELETE request
     * };
     *
     * @example
     * // Preventing a DELETE request
     * hison.link.beforeDeleteRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
     *     // Custom logic to determine whether to proceed
     *     return false; // Prevent the DELETE request
     * };
     *
     * Note: This function is particularly useful for implementing validations, manipulations, or checks on the data
     * before it is sent in the DELETE request. It offers a way to programmatically control whether or not a DELETE request
     * should be initiated based on custom conditions or criteria.
     */
    hison.link.beforeDeleteRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    /**
     * Defines the behavior to be executed before running the success callback method for any API request made via apiLink.
     * This function allows for pre-processing or analysis of the response received from the server before the user-defined
     * success callback method is executed. By default, it is set to return true, allowing the success callback method to proceed.
     * If it returns false, the user-defined success callback method will not be executed.
     *
     * @param {object} result - The result object containing information about the server response, such as status code and headers.
     * @param {object} response - The data received from the server in response to the API request.
     * @returns {boolean} Returns true to proceed with executing the user-defined success callback method, or false to prevent it from running.
     *
     * @example
     * hison.link.beforeCallbackWorked = function(result, response) {
     *     // Custom logic before executing the success callback
     *     return true; // Proceed with the success callback
     * };
     *
     * @example
     * // Preventing the success callback from executing
     * hison.link.beforeCallbackWorked = function(result, response) {
     *     // Custom logic to determine whether to proceed
     *     return false; // Prevent the success callback
     * };
     *
     * Note: This function is particularly useful for implementing custom logic that needs to be executed right after a successful
     * API response but before the user-defined success callback. It offers a way to programmatically control whether or not the success
     * callback should be initiated based on the response content or other custom conditions.
     */
    hison.link.beforeCallbackWorked = function(result, response) {
        return true;
    };
    /**
     * Defines the behavior to be executed before running the error callback method for any API request made via apiLink.
     * This function allows for pre-processing or analysis of the error received from the API request before the user-defined
     * error callback method is executed. By default, it is set to return true, allowing the error callback method to proceed.
     * If it returns false, the user-defined error callback method will not be executed.
     *
     * @param {object} error - The error object containing information about the failure of the API request, such as status code, error message, and any additional data.
     * @returns {boolean} Returns true to proceed with executing the user-defined error callback method, or false to prevent it from running.
     *
     * @example
     * hison.link.beforeCallbackError = function(error) {
     *     // Custom logic before executing the error callback
     *     return true; // Proceed with the error callback
     * };
     *
     * @example
     * // Preventing the error callback from executing
     * hison.link.beforeCallbackError = function(error) {
     *     // Custom logic to determine whether to proceed
     *     return false; // Prevent the error callback
     * };
     *
     * Note: This function is particularly useful for implementing custom logic that needs to be executed right after a failed
     * API response but before the user-defined error callback. It offers a way to programmatically control whether or not the error
     * callback should be initiated based on the error information or other custom conditions.
     */
    hison.link.beforeCallbackError = function(error) {
        return true;
    };

    /******************************************
     * Caching
     ******************************************/
    hison.caching = {};
    /** The protocol to be used for WebSocket request URLs in caching. */
    hison.caching.protocol = 'ws://';
    /** Endpoint for WebSocket request URL used in caching. */
    hison.caching.wsEndPoint = '/hison-caching-websocket-endpoint';
    /** Number of times to perform caching. */
    hison.caching.limit = 10;

    /******************************************
     * shield
     ******************************************/
    hison.shield = {};
    /** URL to apply shield (prevent go back, developer mode) */
    hison.shield.shieldURL = "";
    /** List of IPs to allow without shielding (prevent go back, developer mode) */
    hison.shield.exposeIpList = ["0:0:0:0:0:0:0:1"];
    /** Whether to freeze object hison */
    hison.shield.isFreeze = true;
    /** Whether to apply a shield */
    hison.shield.isSheld = true;
    /** Whether of possible to go back */
    hison.shield.isPossibleGoBack = false;
    /** Whether of possible to open develop tool */
    hison.shield.isPossibleOpenDevTool = false;

    /******************************************
     * Utils
     ******************************************/
    hison.utils = {};
    hison.utils.defaults = {};

    /** Default format for date. refer to hison.utils.getDateWithFormat */
    hison.utils.defaults.dateFormat = "yyyy-MM-dd";
    /** Default format for time. (hhmmss or hh:mm:ss). */
    hison.utils.defaults.timeFormat = "hh:mm:ss";
    /** Default format for date and time. refer to hison.utils.getDateWithFormat */
    hison.utils.defaults.datetimeFormat = "yyyy-MM-dd hh:mm:ss";
    /** Default format for year. (yyyy or yy) */
    hison.utils.defaults.yearFormat = "yyyy";
    /** Default format for month. (M, MM, MMM, MMMM) */
    hison.utils.defaults.monthFormat = "M";
    /** Default format for year and month. refer to hison.utils.getDateWithFormat */
    hison.utils.defaults.yearMonthFormat = "yyyy-MM";
    /** Default format for day. (dd or d) */
    hison.utils.defaults.dayFormat = "d";
    /** Default format for dayOfWeek. (d, dy, day, kdy, kday) */
    hison.utils.defaults.dayOfWeekFormat = "d";
    /** Default format for hour. (hh or h) */
    hison.utils.defaults.hourFormat = "h";
    /** Default format for hour and minute. (hhmm or hh:mm) */
    hison.utils.defaults.hourMinuteFormat = "hh:mm";
    /** Default format for minute. (mm or m) */
    hison.utils.defaults.minuteFormat = "m";
    /** Default format for second. (ss or s) */
    hison.utils.defaults.secondFormat = "s";
    /** Default format for number. refer to hison.utils.getNumberFormat */
    hison.utils.defaults.numberFormat = "#,##0.#####"

    /** Constants used for checking byte size of characters. */
    hison.utils.defaults.lessoreq0x7ffByte = 2;    //charCode <= 0x7FF
    hison.utils.defaults.lessoreq0xffffByte = 3;   //charCode <= 0xFFFF
    hison.utils.defaults.greater0xffffByte = 4;    //charCode > 0xFFFF

    /******************************************
     * Utils for Boolean
     ******************************************/
    /**
     * Checks if the given string consists only of English alphabet characters.
     * This method uses a regular expression to test whether the input string contains
     * only letters (both uppercase and lowercase) from A to Z.
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string consists only of English alphabet characters; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isAlpha("HelloWorld");
     *
     * @example
     * // returns false
     * hison.utils.isAlpha("Hello World! 123");
     */
    hison.utils.isAlpha = function(str) {
        return /^[A-Za-z]+$/.test(str);
    };
    /**
     * Checks if the given string consists only of English alphabet characters and numbers.
     * This method uses a regular expression to test whether the input string contains
     * only letters (both uppercase and lowercase) from A to Z and numbers from 0 to 9.
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string consists only of English alphabet characters and numbers; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isAlphaNumber("HelloWorld123");
     *
     * @example
     * // returns false
     * hison.utils.isAlphaNumber("Hello World! 123");
     */
    hison.utils.isAlphaNumber = function(str) {
        return /^[A-Za-z0-9]+$/.test(str);
    };
    /**
     * Checks if the given string consists only of numbers.
     * This method uses a regular expression to test whether the input string contains
     * only numeric characters (0 through 9).
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string consists only of numbers; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isNumber("1234567890");
     *
     * @example
     * // returns false
     * hison.utils.isNumber("123ABC");
     */
    hison.utils.isNumber = function(str) {
        return /^[0-9]+$/.test(str);
    };
    /**
     * Checks if the given string consists only of numbers and special characters.
     * This method uses a regular expression to test whether the input string contains
     * only numeric characters (0 through 9) and special characters such as !@#$%^&*()_+\\-=[]{};':"\\|,.<>/?~.
     * The regular expression is designed to ensure that the string includes only these characters.
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string consists only of numbers and special characters; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isNumberSymbols("1234!@#$");
     *
     * @example
     * // returns false
     * hison.utils.isNumberSymbols("1234ABC");
     */
    hison.utils.isNumberSymbols = function(str) {
        return /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/.test(str);
    };
    /**
     * Checks if the given string includes any special characters.
     * This method uses a regular expression to test whether the input string contains
     * special characters such as !@#$%^&*()_+\\-=[]{};':"\\|,.<>/?~.
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string includes any special characters; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isIncludeSymbols("Hello@World");
     *
     * @example
     * // returns false
     * hison.utils.isIncludeSymbols("HelloWorld");
     */
    hison.utils.isIncludeSymbols = function(str) {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
    };
    /**
     * Checks if the given string consists only of lowercase English alphabet characters.
     * This method uses a regular expression to test whether the input string contains
     * only lowercase letters (a to z).
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string consists only of lowercase English alphabet characters; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isLowerAlpha("helloworld");
     *
     * @example
     * // returns false
     * hison.utils.isLowerAlpha("HelloWorld");
     * 
     * @example
     * // returns false
     * hison.utils.isLowerAlpha("hello123");
     */
    hison.utils.isLowerAlpha = function(str) {
        return /^[a-z]+$/.test(str);
    };
    /**
     * Checks if the given string consists only of lowercase English alphabet characters and numbers.
     * This method uses a regular expression to test whether the input string contains
     * only lowercase letters (a to z) and numbers (0 through 9).
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string consists only of lowercase English alphabet characters and numbers; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isLowerAlphaNumber("hello123");
     *
     * @example
     * // returns false
     * hison.utils.isLowerAlphaNumber("HelloWorld123");
     * 
     * @example
     * // returns false
     * hison.utils.isLowerAlphaNumber("hello@world");
     */
    hison.utils.isLowerAlphaAndNumber = function(str) {
        return /^[a-z0-9]+$/.test(str);
    };
    /**
     * Checks if the given string consists only of uppercase English alphabet characters.
     * This method uses a regular expression to test whether the input string contains
     * only uppercase letters (A to Z).
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string consists only of uppercase English alphabet characters; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isUpperAlpha("HELLOWORLD");
     *
     * @example
     * // returns false
     * hison.utils.isUpperAlpha("HelloWorld");
     * 
     * @example
     * // returns false
     * hison.utils.isUpperAlpha("HELLO123");
     */
    hison.utils.isUpperAlpha = function(str) {
        return /^[A-Z]+$/.test(str);
    };
    /**
     * Checks if the given string consists only of uppercase English alphabet characters and numbers.
     * This method uses a regular expression to test whether the input string contains
     * only uppercase letters (A to Z) and numbers (0 through 9).
     *
     * @param {string} str - The string to be tested.
     * @returns {boolean} Returns true if the string consists only of uppercase English alphabet characters and numbers; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isUpperAlphaAndNumber("HELLO123");
     *
     * @example
     * // returns false
     * hison.utils.isUpperAlphaNumber("HelloWorld123");
     * 
     * @example
     * // returns false
     * hison.utils.isUpperAlphaNumber("HELLO@123");
     */
    hison.utils.isUpperAlphaNumber = function(str) {
        return /^[A-Z0-9]+$/.test(str);
    };
    
    var _isNumeric = function(num) {
        return !isNaN(num) && isFinite(num);
    };
    /**
     * Checks if the given parameter is a valid number.
     * This method uses `isNaN` and `isFinite` to determine if the input is a number and is finite.
     * `isNaN` checks whether the value is NaN (Not-a-Number), and `isFinite` checks if the number is finite.
     *
     * @param {number} num - The value to be tested.
     * @returns {boolean} Returns true if the value is a valid finite number; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isNumeric(123);
     * 
     * @example
     * // returns true
     * hison.utils.isNumeric(-123.456);
     * 
     * @example
     * // returns false
     * hison.utils.isNumeric(Infinity);
     */
    hison.utils.isNumeric = function(num) {
        return _isNumeric(num);
    };
    var _isInteger = function(num) {
        if(!_isNumeric(num)) return false;
        num = Number(num);
        return Number.isInteger(num);
    };
    /**
     * Checks if the given parameter is an integer.
     * This method first uses `hison.utils.isNumeric` to check if the input is a valid number.
     * If it is a valid number, it then uses `Number.isInteger` to check if the number is an integer.
     *
     * @param {number} num - The value to be tested.
     * @returns {boolean} Returns true if the value is an integer; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isInteger(123);
     *
     * @example
     * // returns false
     * hison.utils.isInteger(123.456);
     */
    hison.utils.isInteger = function(num) {
        return _isInteger(num);
    };
    /**
     * Checks if the given parameter is a positive integer.
     * This method first uses `hison.utils.isNumeric` to check if the input is a valid number.
     * If it is a valid number, it then uses `Number.isInteger` to check if the number is an integer,
     * and additionally checks if the number is greater than 0 to determine if it's positive.
     *
     * @param {number} num - The value to be tested.
     * @returns {boolean} Returns true if the value is a positive integer; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isPositiveInteger(123);
     *
     * @example
     * // returns false
     * hison.utils.isPositiveInteger(-123);
     *
     * @example
     * // returns false
     * hison.utils.isPositiveInteger(0);
     */
    hison.utils.isPositiveInteger = function(num) {
        if(!_isNumeric(num)) return false;
        num = Number(num);
        return Number.isInteger(num) && num > 0;
    };
    /**
     * Checks if the given parameter is a negative integer.
     * This method first uses `hison.utils.isNumeric` to check if the input is a valid number.
     * If it is a valid number, it then uses `Number.isInteger` to check if the number is an integer,
     * and additionally checks if the number is less than 0 to determine if it's negative.
     *
     * @param {number} num - The value to be tested.
     * @returns {boolean} Returns true if the value is a negative integer; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isNegativeInteger(-123);
     *
     * @example
     * // returns false
     * hison.utils.isNegativeInteger(123);
     */
    hison.utils.isNegativeInteger = function(num) {
        if (!_isNumeric(num)) return false;
        num = Number(num);
        return Number.isInteger(num) && num < 0;
    };
    /**
     * Checks if the given parameter is an array.
     * This method uses `Array.isArray` to determine if the input is an instance of an array.
     * Additionally, it checks the constructor of the input to ensure it's specifically an Array.
     *
     * @param {any} arr - The value to be tested.
     * @returns {boolean} Returns true if the value is an array; otherwise, false.
     * @example
     * // returns true
     * hison.utils.isArray([1, 2, 3]);
     * @example
     * // returns false
     * hison.utils.isArray({ a: 1, b: 2 });
     */
    hison.utils.isArray = function(arr) {
        return Array.isArray(arr) && arr.utils.defaultsructor === Array;
    };
    var _isObject = function(obj) {
        return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.utils.defaultsructor === Object;
    };
    /**
     * Checks if the given parameter is an object consisting of key-value pairs.
     * This method determines if the input is an object by checking its type.
     * It also ensures the input is not null, not an array, and is specifically a JavaScript Object.
     *
     * @param {any} obj - The value to be tested.
     * @returns {boolean} Returns true if the value is an object (key-value pairs); otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isObject({ a: 1, b: 2 });
     *
     * @example
     * // returns false
     * hison.utils.isObject([1, 2, 3]);
     *
     * @example
     * // returns false
     * hison.utils.isObject(new Date());
     */
    hison.utils.isObject = function(obj) {
        return _isObject(obj);
    };
    
    var _getDateObject = function(dateStr) {
        dateStr = _getToString(dateStr);
        dateStr = dateStr.split(' ')[0];
        var year, month, day;
        if (dateStr.includes('-')) {
            [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
        } else if (dateStr.includes('/')) {
            [year, month, day] = dateStr.split('/').map(num => parseInt(num, 10));
        } else if (dateStr.length === 8) {
            year = parseInt(dateStr.substring(0, 4), 10);
            month = parseInt(dateStr.substring(4, 6), 10);
            day = parseInt(dateStr.substring(6, 8), 10);
        } else {
            return {};
        }
    
        return { y: year, m: month, d: day };
    };
    var _isDate = function(dateObj_or_dateStr) {
        var dateObj = _isObject(dateObj_or_dateStr) ? dateObj_or_dateStr : _getDateObject(dateObj_or_dateStr);

        var yyyy = dateObj.y;
        var MM = dateObj.M;
        var dd = dateObj.d;

        var result = true;
        try {
            if(!_isInteger(yyyy) || !_isInteger(MM) || !_isInteger(dd)) {
                return false;
            }

            if(!yyyy) {
                return false;
            }
            if(!MM) {
                MM = "01";
            } else if (MM.length === 1) {
                MM = "0" + MM;
            }
            if(!dd) {
                dd = "01";
            } else if (dd.length === 1) {
                dd = "0" + dd;
            }

            if(_getToNumber(yyyy+MM+dd) < 16000101) {
                var date = new Date(_getToNumber(yyyy), _getToNumber(MM) - 1, _getToNumber(dd));
                if (date.getFullYear() !== _getToNumber(yyyy) || date.getMonth() !== _getToNumber(MM) - 1 || date.getDate() !== _getToNumber(dd)) {
                    return false;
                }
                return true;
            }
            else {
                var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
                result = dateRegex.test(dd+'-'+MM+'-'+yyyy);
            }
            
        } catch (err) {
            result = false;
        }    
        return result;
    };
    var _getTimeObject = function(timeStr) {
        timeStr = _getToString(timeStr);
        var dateArr = timeStr.split(' ');
        timeStr = dateArr.length > 1 ? dateArr[1] : timeStr;
        var hours, minutes, seconds;

        if (timeStr.includes(':')) {
            [hours, minutes, seconds] = timeStr.split(':').map(num => parseInt(num, 10));
        } else if (timeStr.length === 6) {
            hours = parseInt(timeStr.substring(0, 2), 10);
            minutes = parseInt(timeStr.substring(2, 4), 10);
            seconds = parseInt(timeStr.substring(4, 6), 10);
        } else {
            return {};
        }
    
        return { h: hours, m: minutes, s: seconds };
    };
    var _isTime = function(timeObj_or_timeStr) {
        var timeObj = _isObject(timeObj_or_timeStr) ? timeObj_or_timeStr : _getTimeObject(timeObj_or_timeStr);

        var hh = timeObj.h;
        var mm = timeObj.m;
        var ss = timeObj.s;

        if(!_isInteger(hh) || !_isInteger(mm) || !_isInteger(ss)) {
            return false;
        }
        hh = parseInt(hh, 10);
        mm = parseInt(mm, 10);
        ss = parseInt(ss, 10);

        function isValidTimePart(time, max) {
            return !isNaN(time) && time >= 0 && time <= max;
        }
    
        return isValidTimePart(hh, 23) && isValidTimePart(mm, 59) && isValidTimePart(ss, 59);
    };
    var _getDatetimeObject = function(datetimeStr) {
        datetimeStr = _getToString(datetimeStr);
        var datetimeArr = datetimeStr.split(' ');
        var dateObj = datetimeArr[0];
        var timeObj = datetimeArr.length > 1 ? datetimeArr[1] : {};

        console.log(Object.assign({}, _getDateObject(dateObj), _getTimeObject(timeObj)));
        return Object.assign({}, _getDateObject(dateObj), _getTimeObject(timeObj));
    };
    /**
     * Validates whether a given date object or date string represents a valid date. 
     * The method supports dates in the range from 100.01.01 to 9999.12.31.
     * For dates from 1600.01.01 to 9999.12.31, it uses a regular expression for validation.
     * For dates before 1600.01.01, it uses JavaScript's Date object for validation.
     * 
     * The method first determines if the input is an object or a string and converts it to a date object if necessary.
     * It then checks if the year, month, and day are valid integers and within the valid range.
     * 
     * @param {object|string} dateObj_or_dateStr
     * - The date object or string to be tested. The date object should have properties 'y' for year, 'M' for month, and 'd' for day.
     * - Allowed formats for strings are yyyyMMdd, yyyy-MM-dd, and yyyy/MM/dd.
     * @returns {boolean} Returns true if the date is valid within the specified range; otherwise, false.
     * 
     * @example
     * // returns true for a valid date
     * hison.utils.isDate({y: 2000, m: 2, d: 29});
     * 
     * @example
     * // returns false for an invalid date
     * hison.utils.isDate({y: 2001, m: 2, d: 29});
     *
     * @example
     * // returns true for a valid date string
     * hison.utils.isDate("2000-02-29");
     *
     * @example
     * // returns false for an invalid date string
     * hison.utils.isDate("2001-02-29");
     *
     * Note: This function is versatile as it can handle both date objects and date strings. It is particularly useful 
     * for validating user input in forms or data processing where date validity is crucial.
     */
    hison.utils.isDate = function(dateObj_or_dateStr) {
        return _isDate(dateObj_or_dateStr);
    };
    /**
     * Checks if the given time object or time string represents a valid time.
     * The method first determines if the input is an object or a string and converts it to a time object if necessary.
     * It then validates if the hour (h), minute (m), and second (s) are valid integers within the appropriate ranges:
     * - Hours (h) must be between 0 and 23.
     * - Minutes (m) and seconds (s) must be between 0 and 59.
     *
     * @param {object|string} timeObj_or_timeStr
     *  - The time object or string to be tested. The time object should have properties 'h' for hour, 'mm' for minute, and 's' for second.
     *  - Allowed string formats are hh:mm:ss, hhmmss.
     * @returns {boolean} Returns true if the time is valid; otherwise, false.
     *
     * @example
     * // returns true for a valid time object
     * hison.utils.isTime({ h: 12, m: 30, s: 45 });
     *
     * @example
     * // returns true for a valid time string
     * hison.utils.isTime("12:30:45");
     *
     * @example
     * // returns false for an invalid time
     * hison.utils.isTime({ h: 24, m: 00, s: 00 });
     *
     * Note: This function is versatile as it can handle both time objects and time strings. It is particularly useful 
     * for validating user input in forms or data processing where time validity is crucial.
     */
    hison.utils.isTime = function(timeObj_or_timeStr) {
        return _isTime(timeObj_or_timeStr);
    };
    /**
     * Validates whether a given datetime object or datetime string represents a valid date and time.
     * The method first determines if the input is an object or a string and converts it to a datetime object if necessary.
     * It then uses `hison.utils.isDate` to validate the date part (year, month, day)
     * and `hison.utils.isTime` to validate the time part (hour, minute, second) of the datetime object.
     *
     * @param {object|string} datetimeObj_or_datetimeStr
     *  - The datetime object or string to be tested. The datetime object should have properties 'y' for year, 'M' for month, 'd' for day, 'h' for hour, 'm' for minute, and 's' for second.
     *  - Allowed formats for strings of year, month, day are yyyyMMdd, yyyy-MM-dd, yyyy/MM/dd. And time are hh:mm:ss, hhmmss.
     * @returns {boolean} Returns true if both the date and time parts of the object or string are valid; otherwise, false.
     *
     * @example
     * // returns true for a valid datetime object
     * hison.utils.isDatetime({ y: 2020, m: 12, d: 25, h: 10, m: 30, s: 45 });
     *
     * @example
     * // returns true for a valid datetime string
     * hison.utils.isDatetime("2020-12-25 10:30:45");
     *
     * @example
     * // returns false for an invalid datetime
     * hison.utils.isDatetime({ y: 2020, m: 13, d: 25, h: 10, m: 30, s: 45 });
     *
     * Note: This function is versatile as it can handle both datetime objects and datetime strings. It is particularly useful 
     * for validating user input in forms or data processing where both date and time validity are crucial.
     */
    hison.utils.isDatetime = function(datetimeObj_or_datetimeStr) {
        var datetimeObj = _isObject(datetimeObj_or_datetimeStr) ? datetimeObj_or_datetimeStr : _getDatetimeObject(datetimeObj_or_datetimeStr);
        if(!_isDate(datetimeObj)) return false;
        if(!_isTime(datetimeObj)) return false;
        return true;
    };
    /**
     * Checks if the given string is in a valid email format.
     * This method uses a regular expression to validate the email string. 
     * The pattern checks for a standard email format which includes alphanumeric characters, 
     * underscores, hyphens, and periods before the '@' symbol, followed by a domain name 
     * and a domain suffix of 2 or more characters.
     *
     * @param {string} emailStr - The email string to be tested.
     * @returns {boolean} Returns true if the string is a valid email format; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isEmail("example@test.com");
     *
     * @example
     * // returns false
     * hison.utils.isEmail("example@.com");
     */
    hison.utils.isEmail = function(emailStr) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,}$/;
        return emailPattern.test(emailStr);
    };
    /**
     * Checks if the given string is in a valid URL format.
     * This method uses a regular expression to validate the URL string.
     * The pattern checks for standard URL formats, including http and https protocols,
     * as well as ftp, followed by a valid domain structure.
     * The pattern is case-insensitive to accommodate URL variations.
     *
     * @param {string} urlStr - The URL string to be tested.
     * @returns {boolean} Returns true if the string is a valid URL format; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isURL("https://www.example.com");
     *
     * @example
     * // returns true
     * hison.utils.isURL("ftp://example.com/path/file.txt");
     *
     * @example
     * // returns false
     * hison.utils.isURL("www.example.com");
     */
    hison.utils.isURL = function(urlStr) {
        var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(urlStr);
    };
    /**
     * Checks if the given string matches the specified mask format.
     * This method compares each character of the input string against the corresponding character in the mask string.
     * The mask format can include:
     * - 'A' for uppercase alphabetic characters.
     * - 'a' for lowercase alphabetic characters.
     * - '9' for numeric characters.
     * Any other character in the mask must match exactly in the input string.
     *
     * @param {string} str - The string to be tested.
     * @param {string} maskStr - The mask string that defines the required format.
     * @returns {boolean} Returns true if the string matches the mask format; otherwise, false.
     *
     * @example
     * // returns true
     * hison.utils.isValidMask("Abc-123", "Aaa-999");
     *
     * @example
     * // returns false
     * hison.utils.isValidMask("abc-123", "Aaa-999");
     */
    hison.utils.isValidMask = function(str, maskStr) {
        if (str.length !== maskStr.length) {
            return false;
        }
    
        for (var i = 0; i < str.length; i++) {
            var char = str.charAt(i);
            var maskChar = maskStr.charAt(i);
    
            switch (maskChar) {
                case 'A':
                    if (char < 'A' || char > 'Z') return false;
                    break;
                case 'a':
                    if (char < 'a' || char > 'z') return false;
                    break;
                case '9':
                    if (isNaN(parseInt(char))) return false;
                    break;
                default:
                    if (char !== maskChar) return false;
            }
        }
        return true;
    };
    
    /******************************************
     * Utils for Date
     ******************************************/
    /**
     * Adds a specified amount of time to a given date object.
     * The function accepts a date object and a value to add, with an optional type of the value (years, months, days, etc.).
     * If no type is specified, days are added by default. The function throws errors for invalid input or date format.
     * It adjusts the given date accordingly and returns a new date object in a structured format.
     * The original object does not change.
     * 
     * Handled in hison.utils.errorHandler. returns null. If required parameters are not entered, if addValue is not an integer, or if the input date is invalid.
     *
     * @param {object|string} datetimeObj_or_datetimeStr
     *  - The date object to which time will be added. Should contain year (y), and optionally month (m), day (d), hours (h), minutes (m), and seconds (s).
     *  - Allowed formats for strings of year, month, day are yyyyMMdd, yyyy-MM-dd, yyyy/MM/dd. And time are hh:mm:ss, hhmmss.
     * @param {number} addValue - The value to add to the date. Must be an integer.
     * @param {string} [addType='d'] - The type of value to add ('y' for years, 'M' for months, 'd' for days, 'h' for hours, 'm' for minutes, 's' for seconds). Default is days ('d').
     * @returns {object} Returns a new date object with the added time.
     *
     * @example
     * // returns a date object with 5 days added
     * hison.utils.addDate({ y: 2024, M: 1, d: 15 }, 5);
     *
     * @example
     * // returns a date object with 3 months added
     * hison.utils.addDate({ y: 2024, M: 1, d: 15 }, 3, 'M');
     */
    hison.utils.addDate = function(datetimeObj_or_datetimeStr, addValue, addType, format) {
        var datetimeObj = _isObject(datetimeObj_or_datetimeStr) ? _deepCopy(datetimeObj_or_datetimeStr) : _getDatetimeObject(datetimeObj_or_datetimeStr);

        if (!datetimeObj.y || (addValue !== 0 && !addValue)) {
            return hison.utils.errorHandler("ER0001", "Please enter a valid date.");
        }
        if(!addType) addType ="";
    
        if(!_isInteger(addValue)) return hison.utils.errorHandler("ER0002", "addValue must be an integer");;
    
        datetimeObj.M = datetimeObj.M === null || datetimeObj.M === undefined ? 1 : datetimeObj.M;
        datetimeObj.d = datetimeObj.d === null || datetimeObj.d === undefined ? 1 : datetimeObj.d;
        datetimeObj.h = datetimeObj.h === null || datetimeObj.h === undefined ? 0 : datetimeObj.h;
        datetimeObj.m = datetimeObj.m === null || datetimeObj.m === undefined ? 0 : datetimeObj.m;
        datetimeObj.s = datetimeObj.s === null || datetimeObj.s === undefined ? 0 : datetimeObj.s;

        if(!_isDate(datetimeObj)) return hison.utils.errorHandler("ER0003", "Please input a valid date.");
        if(!_isTime(datetimeObj)) return hison.utils.errorHandler("ER0004", "Please input a valid date.");
    
        var d = new Date(datetimeObj.y, datetimeObj.M - 1, datetimeObj.d, datetimeObj.h, datetimeObj.m, datetimeObj.s);
    
        switch (addType) {
            case 'y':
                d.setFullYear(d.getFullYear() + addValue);
                format = hison.utils.defaults.dateFormat;
                break;
            case 'M':
                d.setMonth(d.getMonth() + addValue);
                format = hison.utils.defaults.dateFormat;
                break;
            case 'd':
                d.setDate(d.getDate() + addValue);
                format = hison.utils.defaults.dateFormat;
                break;
            case 'h':
                d.setHours(d.getHours() + addValue);
                format = hison.utils.defaults.datetimeFormat;
                break;
            case 'm':
                d.setMinutes(d.getMinutes() + addValue);
                format = hison.utils.defaults.datetimeFormat;
                break;
            case 's':
                d.setSeconds(d.getSeconds() + addValue);
                format = hison.utils.defaults.datetimeFormat;
                break;
            default:
                d.setDate(d.getDate() + addValue);
                format = hison.utils.defaults.dateFormat;
        }

        var rtnObj = {
            y: d.getFullYear().toString().padStart(4, '0'),
            M: (d.getMonth() + 1).toString().padStart(2, '0'),
            d: d.getDate().toString().padStart(2, '0'),
            h: d.getHours().toString().padStart(2, '0'),
            m: d.getMinutes().toString().padStart(2, '0'),
            s: d.getSeconds().toString().padStart(2, '0')
        }

        return _isObject(datetimeObj_or_datetimeStr) ? rtnObj : _getDateWithFormat(rtnObj, format);
    };
    /**
     * Calculates the difference between two date objects. The difference can be measured in years, months, days, hours, minutes, or seconds.
     * The default measurement is in days if no type is specified. This function throws errors for invalid input or date format.
     * It uses hison.utils.isDate and hison.utils.isTime to validate the input dates.
     * 
     * Handled in hison.utils.errorHandler. returns null. If required parameters are not entered, or if the input dates are invalid.
     *
     * @param {object|string} datetimeObj_or_datetimeStr1
     *  - The first date object for comparison. Should contain year (y), and optionally month (m), day (d), hours (h), minutes (m), and seconds (s).
     *  - Allowed formats for strings of year, month, day are yyyyMMdd, yyyy-MM-dd, yyyy/MM/dd. And time are hh:mm:ss, hhmmss.
     * @param {object|string} datetimeObj_or_datetimeStr2
     *  - The second date object for comparison. Should contain year (y), and optionally month (m), day (d), hours (h), minutes (m), and seconds (s).
     *  - Allowed formats for strings of year, month, day are yyyyMMdd, yyyy-MM-dd, yyyy/MM/dd. And time are hh:mm:ss, hhmmss.
     * @param {string} [diffType='d'] - The type of difference to calculate ('y' for years, 'M' for months, 'd' for days, 'h' for hours, 'm' for minutes, 's' for seconds). Default is days ('d').
     * @returns {number} Returns the difference between the two dates in the specified unit.
     * 
     * @example
     * // returns the number of days between two dates
     * hison.utils.getDateDiff({ y: 2024, m: 1, d: 15 }, { y: 2024, m: 1, d: 20 });
     *
     * @example
     * // returns the number of months between two dates
     * hison.utils.getDateDiff({ y: 2023, m: 1, d: 1 }, { y: 2024, m: 1, d: 1 }, 'M');
     */
    hison.utils.getDateDiff = function(datetimeObj_or_datetimeStr1, datetimeObj_or_datetimeStr2, diffType) {
        var datetimeObj1 = _isObject(datetimeObj_or_datetimeStr1) ? _deepCopy(datetimeObj_or_datetimeStr1) : _getDatetimeObject(datetimeObj_or_datetimeStr1);
        var datetimeObj2 = _isObject(datetimeObj_or_datetimeStr2) ? _deepCopy(datetimeObj_or_datetimeStr2) : _getDatetimeObject(datetimeObj_or_datetimeStr2);
        
        if (!datetimeObj1.y || !datetimeObj2.y) {
            return hison.utils.errorHandler("ER0005", "Please enter a valid date.");
        }
        if(!diffType) diffType = "";
    
        datetimeObj1.M = datetimeObj1.M || 1; datetimeObj2.M = datetimeObj2.M || 1;
        datetimeObj1.d = datetimeObj1.d || 1; datetimeObj2.d = datetimeObj2.d || 1;
        datetimeObj1.h = datetimeObj1.h || 0; datetimeObj2.h = datetimeObj2.h || 0;
        datetimeObj1.m = datetimeObj1.m || 0; datetimeObj2.m = datetimeObj2.m || 0;
        datetimeObj1.s = datetimeObj1.s || 0; datetimeObj2.s = datetimeObj2.s || 0;

        if(!_isDate(datetimeObj1)) return hison.utils.errorHandler("ER0006", "Please enter a valid date.");
        if(!_isTime(datetimeObj1)) return hison.utils.errorHandler("ER0007", "Please enter a valid date.");
        if(!_isDate(datetimeObj2)) return hison.utils.errorHandler("ER0008", "Please enter a valid date.");
        if(!_isTime(datetimeObj2)) return hison.utils.errorHandler("ER0009", "Please enter a valid date.");
    
        var d1 = new Date(datetimeObj1.y, datetimeObj1.M - 1, datetimeObj1.d, datetimeObj1.h, datetimeObj1.m, datetimeObj1.s);
        var d2 = new Date(datetimeObj2.y, datetimeObj2.M - 1, datetimeObj2.d, datetimeObj2.h, datetimeObj2.m, datetimeObj2.s);
    
        switch (diffType) {
            case 'y':
                return d2.getFullYear() - d1.getFullYear();
            case 'M':
                return (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
            case 'd':
                return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
            case 'h':
                return Math.floor((d2 - d1) / (60 * 60 * 1000));
            case 'm':
                return Math.floor((d2 - d1) / (60 * 1000));
            case 's':
                return Math.floor((d2 - d1) / 1000);
            default:
                return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
        }
    };
    var _getMonthName = function(month, isFullName) {
        if (isFullName !== false) {
            isFullName = true;
        }
        month = parseInt(month, 10);

        var monthsFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthsShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (month < 1 || month > 12) {
            return hison.utils.errorHandler("ER0010", "Month must be between 1 and 12", "");
        }

        return isFullName ? monthsFullName[month - 1] : monthsShortName[month - 1];
    };
    /**
     * Retrieves the English name of a month given its numerical value. The function can return either the full name
     * of the month or its abbreviated form. By default, it returns the full name unless specified otherwise.
     * Handled in hison.utils.errorHandler. returns "". If the month value is not between 1 and 12.
     *
     * @param {number} month - The numerical value of the month (1 for January, 2 for February, etc.).
     * @param {boolean} [isFullName=true] - A boolean flag to indicate whether to return the full name (true) or the abbreviated name (false) of the month.
     * @returns {string} Returns the English name of the specified month.
     * 
     * @example
     * // returns 'March'
     * hison.utils.getMonthName(3);
     *
     * @example
     * // returns 'Nov'
     * hison.utils.getMonthName(11, false);
     */
    hison.utils.getMonthName = function(month, isFullName) {
        return _getMonthName(month, isFullName);
    };
    var _getDateWithFormat = function(datetimeObj_or_datetimeStr, format) {
        var datetimeObj = _isObject(datetimeObj_or_datetimeStr) ? _deepCopy(datetimeObj_or_datetimeStr) : _getDatetimeObject(datetimeObj_or_datetimeStr);

        if(!datetimeObj.y) return hison.utils.errorHandler("ER0011", "Please enter a valid date.", "")
        if(!format) format = hison.utils.defaults.dateFormat;

        datetimeObj.M = (datetimeObj.M || 1).toString().padStart(2, '0');
        datetimeObj.d = (datetimeObj.d || 1).toString().padStart(2, '0');
        datetimeObj.h = (datetimeObj.h || 0).toString().padStart(2, '0');
        datetimeObj.m = (datetimeObj.m || 0).toString().padStart(2, '0');
        datetimeObj.s = (datetimeObj.s || 0).toString().padStart(2, '0');

        if(!_isDate(datetimeObj)) return hison.utils.errorHandler("ER0012", "Please input a valid date.", "");
        if(!_isTime(datetimeObj)) return hison.utils.errorHandler("ER0013", "Please input a valid date.", "");

        var MMMM = _getMonthName(datetimeObj.M);
        var MMM = _getMonthName(datetimeObj.M, false);
    
        switch (format) {
            case 'yyyy':
                return datetimeObj.y;
                
            case 'yyyyMM':
                return datetimeObj.y + datetimeObj.M;
            case 'yyyy-MM':
                return datetimeObj.y + '-' + datetimeObj.M;
            case 'yyyy/MM':
                return datetimeObj.y + '/' + datetimeObj.M;
            case 'yyyy. MM':
                return datetimeObj.y + '. ' + datetimeObj.M;
            case 'yyyy MM':
                return datetimeObj.y + ' ' + datetimeObj.M;

            case 'yyyyMMdd':
                return datetimeObj.y + datetimeObj.M + datetimeObj.d;
            case 'yyyy-MM-dd':
                return datetimeObj.y + '-' + datetimeObj.M + '-' + datetimeObj.d;
            case 'yyyy/MM/dd':
                return datetimeObj.y + '/' + datetimeObj.M + '/' + datetimeObj.d;
            case 'yyyy. MM. dd':
                return datetimeObj.y + '. ' + datetimeObj.M + '. ' + datetimeObj.d;
            case 'yyyy MM dd':
                return datetimeObj.y + ' ' + datetimeObj.M + ' ' + datetimeObj.d;

            case 'yyyyMMdd hh':
                return datetimeObj.y + datetimeObj.M + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyyMMdd hhmm':
                return datetimeObj.y + datetimeObj.M + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m;
            case 'yyyyMMdd hhmmss':
                return datetimeObj.y + datetimeObj.M + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'yyyyMMdd hh:mm':
                return datetimeObj.y + datetimeObj.M + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'yyyyMMdd hh:mm:ss':
                return datetimeObj.y + datetimeObj.M + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'yyyy-MM-dd hh':
                return datetimeObj.y + '-' + datetimeObj.M + '-' + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyy-MM-dd hhmm':
                return datetimeObj.y + '-' + datetimeObj.M + '-' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m;
            case 'yyyy-MM-dd hhmmss':
                return datetimeObj.y + '-' + datetimeObj.M + '-' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'yyyy-MM-dd hh:mm':
                return datetimeObj.y + '-' + datetimeObj.M + '-' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'yyyy-MM-dd hh:mm:ss':
                return datetimeObj.y + '-' + datetimeObj.M + '-' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'yyyy/MM/dd hh':
                return datetimeObj.y + '/' + datetimeObj.M + '/' + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyy/MM/dd hhmm':
                return datetimeObj.y + '/' + datetimeObj.M + '/' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m;
            case 'yyyy/MM/dd hhmmss':
                return datetimeObj.y + '/' + datetimeObj.M + '/' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'yyyy/MM/dd hh:mm':
                return datetimeObj.y + '/' + datetimeObj.M + '/' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'yyyy/MM/dd hh:mm:ss':
                return datetimeObj.y + '/' + datetimeObj.M + '/' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'yyyy. MM. dd hh':
                return datetimeObj.y + '. ' + datetimeObj.M + '. ' + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyy. MM. dd hhmm':
                return datetimeObj.y + '. ' + datetimeObj.M + '. ' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m;
            case 'yyyy. MM. dd hhmmss':
                return datetimeObj.y + '. ' + datetimeObj.M + '. ' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'yyyy. MM. dd hh:mm':
                return datetimeObj.y + '. ' + datetimeObj.M + '. ' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'yyyy. MM. dd hh:mm:ss':
                return datetimeObj.y + '. ' + datetimeObj.M + '. ' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'yyyy MM dd hh':
                return datetimeObj.y + ' ' + datetimeObj.M + ' ' + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyy MM dd hhmm':
                return datetimeObj.y + ' ' + datetimeObj.M + ' ' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m;
            case 'yyyy MM dd hhmmss':
                return datetimeObj.y + ' ' + datetimeObj.M + ' ' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'yyyy MM dd hh:mm':
                return datetimeObj.y + ' ' + datetimeObj.M + ' ' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'yyyy MM dd hh:mm:ss':
                return datetimeObj.y + ' ' + datetimeObj.M + ' ' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;

            case 'MMyyyy':
                return datetimeObj.M + datetimeObj.y;
            case 'MM-yyyy':
                return datetimeObj.M + '-' + datetimeObj.y;
            case 'MM/yyyy':
                return datetimeObj.M + '/' + datetimeObj.y;
            case 'MM. yyyy':
                return datetimeObj.M + '/' + datetimeObj.y;
            case 'MM yyyy':
                return datetimeObj.M + '/' + datetimeObj.y;
            case 'MMMM yyyy':
                return MMMM + ' ' + datetimeObj.y;
            case 'MMMM, yyyy':
                return MMMM + ', ' + datetimeObj.y;
            case 'MMM yyyy':
                return MMM + ' ' + datetimeObj.y;
            case 'MMM, yyyy':
                return MMM + ', ' + datetimeObj.y;

            case 'MMddyyyy':
                return datetimeObj.M + datetimeObj.d + datetimeObj.y;
            case 'MM-dd-yyyy':
                return datetimeObj.M + '-' + datetimeObj.d + '-' + datetimeObj.y;
            case 'MM/dd/yyyy':
                return datetimeObj.M + '/' + datetimeObj.d + '/' + datetimeObj.y;
            case 'MM. dd. yyyy':
                return datetimeObj.M + '. ' + datetimeObj.d + '. ' + datetimeObj.y;
            case 'MMMM dd yyyy':
                return MMMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y;
            case 'MMMM dd, yyyy':
                return MMMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y;
            case 'MMM dd yyyy':
                return MMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y;
            case 'MMM dd, yyyy':
                return MMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y;

            case 'MMddyyyy hh':
                return datetimeObj.M + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h;
            case 'MMddyyyy hhmm':
                return datetimeObj.M + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'MMddyyyy hhmmss':
                return datetimeObj.M + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'MMddyyyy hh:mm':
                return datetimeObj.M + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'MMddyyyy hh:mm:ss':
                return datetimeObj.M + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'MM-dd-yyyy hh':
                return datetimeObj.M + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'MM-dd-yyyy hhmm':
                return datetimeObj.M + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'MM-dd-yyyy hhmmss':
                return datetimeObj.M + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'MM-dd-yyyy hh:mm':
                return datetimeObj.M + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'MM-dd-yyyy hh:mm:ss':
                return datetimeObj.M + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'MM/dd/yyyy hh':
                return datetimeObj.M + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'MM/dd/yyyy hhmm':
                return datetimeObj.M + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'MM/dd/yyyy hhmmss':
                return datetimeObj.M + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'MM/dd/yyyy hh:mm':
                return datetimeObj.M + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'MM/dd/yyyy hh:mm:ss':
                return datetimeObj.M + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'MM. dd. yyyy hh':
                return datetimeObj.M + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'MM. dd. yyyy hhmm':
                return datetimeObj.M + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'MM. dd. yyyy hhmmss':
                return datetimeObj.M + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'MM. dd. yyyy hh:mm':
                return datetimeObj.M + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'MM. dd. yyyy hh:mm:ss':
                return datetimeObj.M + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'MMMM dd yyyy hh':
                return MMMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'MMMM dd yyyy hhmm':
                return MMMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'MMMM dd yyyy hhmmss':
                return MMMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'MMMM dd yyyy hh:mm':
                return MMMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'MMMM dd yyyy hh:mm:ss':
                return MMMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'MMMM dd, yyyy hh':
                return MMMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'MMMM dd, yyyy hhmm':
                return MMMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'MMMM dd, yyyy hhmmss':
                return MMMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'MMMM dd, yyyy hh:mm':
                return MMMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'MMMM dd, yyyy hh:mm:ss':
                return MMMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'MMM dd yyyy hh':
                return MMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'MMM dd yyyy hhmm':
                return MMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'MMM dd yyyy hhmmss':
                return MMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'MMM dd yyyy hh:mm':
                return MMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'MMM dd yyyy hh:mm:ss':
                return MMM + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'MMM dd, yyyy hh':
                return MMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'MMM dd, yyyy hhmm':
                return MMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'MMM dd, yyyy hhmmss':
                return MMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'MMM dd, yyyy hh:mm':
                return MMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'MMM dd, yyyy hh:mm:ss':
                return MMM + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;

            case 'ddMMyyyy':
                return datetimeObj.d + datetimeObj.M + datetimeObj.y;
            case 'dd-MM-yyyy':
                return datetimeObj.d + '-' + datetimeObj.M + '-' + datetimeObj.y;
            case 'dd/MM/yyyy':
                return datetimeObj.d + '/' + datetimeObj.M + '/' + datetimeObj.y;
            case 'dd. MM. yyyy':
                return datetimeObj.d + '. ' + datetimeObj.M + '. ' + datetimeObj.y;
            case 'dd MMMM yyyy':
                return datetimeObj.d + ' ' + MMMM + ' ' + datetimeObj.y;
            case 'dd MMM yyyy':
                return datetimeObj.d + ' ' + MMM + ' ' + datetimeObj.y;

            case 'ddMMyyyy hh':
                return datetimeObj.d + datetimeObj.M + datetimeObj.y + ' ' + datetimeObj.h;
            case 'ddMMyyyy hhmm':
                return datetimeObj.d + datetimeObj.M + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'ddMMyyyy hhmmss':
                return datetimeObj.d + datetimeObj.M + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'ddMMyyyy hh:mm':
                return datetimeObj.d + datetimeObj.M + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'ddMMyyyy hh:mm:ss':
                return datetimeObj.d + datetimeObj.M + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'dd-MM-yyyy hh':
                return datetimeObj.d + '-' + datetimeObj.M + '-' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd-MM-yyyy hhmm':
                return datetimeObj.d + '-' + datetimeObj.M + '-' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'dd-MM-yyyy hhmmss':
                return datetimeObj.d + '-' + datetimeObj.M + '-' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'dd-MM-yyyy hh:mm':
                return datetimeObj.d + '-' + datetimeObj.M + '-' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'dd-MM-yyyy hh:mm:ss':
                return datetimeObj.d + '-' + datetimeObj.M + '-' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'dd/MM/yyyy hh':
                return datetimeObj.d + '/' + datetimeObj.M + '/' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd/MM/yyyy hhmm':
                return datetimeObj.d + '/' + datetimeObj.M + '/' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'dd/MM/yyyy hhmmss':
                return datetimeObj.d + '/' + datetimeObj.M + '/' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'dd/MM/yyyy hh:mm':
                return datetimeObj.d + '/' + datetimeObj.M + '/' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'dd/MM/yyyy hh:mm:ss':
                return datetimeObj.d + '/' + datetimeObj.M + '/' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'dd. MM. yyyy hh':
                return datetimeObj.d + '. ' + datetimeObj.M + '. ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd. MM. yyyy hhmm':
                return datetimeObj.d + '. ' + datetimeObj.M + '. ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'dd. MM. yyyy hhmmss':
                return datetimeObj.d + '. ' + datetimeObj.M + '. ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'dd. MM. yyyy hh:mm':
                return datetimeObj.d + '. ' + datetimeObj.M + '. ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'dd. MM. yyyy hh:mm:ss':
                return datetimeObj.d + '. ' + datetimeObj.M + '. ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'dd MMMM yyyy hh':
                return datetimeObj.d + ' ' + MMMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd MMMM yyyy hhmm':
                return datetimeObj.d + ' ' + MMMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'dd MMMM yyyy hhmmss':
                return datetimeObj.d + ' ' + MMMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'dd MMMM yyyy hh:mm':
                return datetimeObj.d + ' ' + MMMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'dd MMMM yyyy hh:mm:ss':
                return datetimeObj.d + ' ' + MMMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;
            case 'dd MMM yyyy hh':
                return datetimeObj.d + ' ' + MMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd MMM yyyy hhmm':
                return datetimeObj.d + ' ' + MMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m;
            case 'dd MMM yyyy hhmmss':
                return datetimeObj.d + ' ' + MMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.m + datetimeObj.s;
            case 'dd MMM yyyy hh:mm':
                return datetimeObj.d + ' ' + MMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m;
            case 'dd MMM yyyy hh:mm:ss':
                return datetimeObj.d + ' ' + MMM + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.m + ':' + datetimeObj.s;

            default:
                return hison.utils.errorHandler("ER0014", "Invalid format", "");
        }
    };
    /**
     * Formats a given datetime object or datetime string according to a specified format string.
     * The default format is "yyyy-MM-dd". The function supports a wide range of format specifiers,
     * allowing for various representations of the date and time. The method first determines if the input
     * is an object or a string and converts it to a datetime object if necessary.
     * It throws an error for invalid datetime inputs or unsupported format strings.
     * The original object or string does not change.
     * 
     * Handled in hison.utils.errorHandler. returns "". If required parameters are not entered, if the datetime is invalid, or if the format string is unsupported.
     *
     * @param {object|string} datetimeObj_or_datetimeStr
     *  - The datetime object format. Should contain year (y), and optionally month (m), day (d), hours (h), minutes (m), and seconds (s).
     *  - Allowed formats for strings of year, month, day are yyyyMMdd, yyyy-MM-dd, yyyy/MM/dd. And time are hh:mm:ss, hhmmss.
     * @param {string} [format='yyyy-MM-dd'] - The format string specifying the desired output format. 
     *        Supports various combinations of 'yyyy', 'MM', 'dd', 'hh', 'mm', 'ss', along with separators.
     * @returns {string} Returns the formatted date as a string.
     *
     * @example
     * // returns 'January 15th, 2024'
     * hison.utils.getDateWithFormat({ y: 2024, m: 1, d: 15 });
     *
     * @example
     * // returns '2024-01-15'
     * hison.utils.getDateWithFormat({ y: 2024, m: 1, d: 15 }, 'yyyy-MM-dd');
     *
     * Note: This function is versatile as it can handle both datetime objects and datetime strings. 
     * It is particularly useful for formatting user input or data for display where specific date and time 
     * formats are required.
     */
     hison.utils.getDateWithFormat = function(datetimeObj_or_datetimeStr, format) {
        return _getDateWithFormat(datetimeObj_or_datetimeStr, format);
    };
    var _getDayOfWeek = function(dateObj_or_dateStr, dayType) {
        var dateObj = _isObject(dateObj_or_dateStr) ? dateObj_or_dateStr : _getDateObject(dateObj_or_dateStr);
        if(!_isDate(dateObj)) return hison.utils.errorHandler("ER0015", "Please enter a valid date.", "");
        
        if(!dayType) dayType = hison.utils.defaults.dayOfWeekFormat;
        var date = new Date(dateObj.y, dateObj.M - 1, dateObj.d);
        var dayOfWeek = date.getDay();
    
        switch (dayType.toLowerCase()) {
            case 'd':
                return dayOfWeek.toString();    // 0 ~ 6
            case 'dy':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
            case 'day':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
            case 'kdy':
                return ['일', '월', '화', '수', '목', '금', '토'][dayOfWeek];
            case 'kday':
                return ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][dayOfWeek];
            default:
                return dayOfWeek.toString();
        }
    };
    /**
     * Returns the day of the week for a given date. The function supports various formats for the day of the week,
     * including numerical, abbreviated, full name, and Korean formats. If no format is specified, the default numerical format is used.
     *
     * @param {object|string} dateObj
     *  - The date object for which the day of the week is to be determined. Should contain year (y), month (m), and day (d).
     *  - Allowed formats for strings of year, month, day are yyyyMMdd, yyyy-MM-dd, yyyy/MM/dd.
     * @param {string} [dayType=''] - The format of the day of the week to return. Options are 'd' for numerical (0-6), 'dy' for 3-letter abbreviation, 'day' for full name, 'kdy' for Korean abbreviation, 'kday' for full Korean name.
     * @returns {string} Returns the day of the week as per the specified format. Returns an empty string if the date is invalid or required parameters are missing.
     *
     * @example
     * // returns '1' (Monday)
     * hison.utils.getDayOfWeek({ y: 2024, m: 1, d: 1 }, 'd');
     *
     * @example
     * // returns 'MONDAY'
     * hison.utils.getDayOfWeek({ y: 2024, m: 1, d: 1 }, 'day');
     */
    hison.utils.getDayOfWeek = function(dateObj_or_dateStr, dayType) {
        return _getDayOfWeek(dateObj_or_dateStr, dayType);
    };
    /**
     * Returns the last day of the month for a given year and month. The function calculates the number of days in the specified month,
     * accounting for leap years as applicable. It returns an empty string for invalid input or missing parameters.
     * 
     * Handled in hison.utils.errorHandler. returns null. If enter a valid date.
     *
     * @param {object|string} dateObj
     *  - The date object for which the last day of the month is to be determined. Should contain year (y) and month (m).
     *  - Allowed formats for strings of year, month, day are yyyyMMdd, yyyy-MM-dd, yyyy/MM/dd.
     * @returns {number|string} Returns the last day of the month as a number. Returns an empty string if the year or month is missing or if the date is invalid.
     *
     * @example
     * // returns 31 (Last day of January 2024)
     * hison.utils.getLastDay({ y: 2024, m: 1 });
     *
     * @example
     * // returns 29 (Last day of February 2024, a leap year)
     * hison.utils.getLastDay({ y: 2024, m: 2 });
     */
    hison.utils.getLastDay = function(dateObj_or_dateStr) {
        var dateObj;
        if(_isObject(dateObj_or_dateStr)) {
            dateObj = _deepCopy(dateObj_or_dateStr);
            dateObj.d = 1;
        }
        else {
            if (dateObj_or_dateStr.includes('-')) {
                dateObj_or_dateStr = dateObj_or_dateStr + '-01'
            }
            else if (dateObj_or_dateStr.includes('/')) {
                dateObj_or_dateStr = dateObj_or_dateStr + '/01'
            }
            else {
                dateObj_or_dateStr = dateObj_or_dateStr + '01'
            }
            dateObj = _getDateObject(dateObj_or_dateStr);
        }
        if(!_isDate(dateObj)) return hison.utils.errorHandler("ER0016", "Please enter a valid date.");

        var nextMonthFirstDay = new Date(dateObj.y, dateObj.M, 1);
        nextMonthFirstDay.setDate(0);
        return nextMonthFirstDay.getDate();
    };
    /**
     * Returns the current year in either a four-digit or two-digit format. The default is the four-digit format.
     * The function determines the current year based on the system's date settings and formats it as specified.
     *
     * @param {string} [format=''] - The format in which to return the year. 'yy' for two-digit format, any other value for the default four-digit format.
     * @returns {string} Returns the current year as a string in the specified format.
     *
     * @example
     * // returns '2024' (assuming the current year is 2024)
     * hison.utils.getSysYear();
     *
     * @example
     * // returns '24' (assuming the current year is 2024)
     * hison.utils.getSysYear('yy');
     */
    hison.utils.getSysYear = function(format) {
        if(!format) format = hison.utils.defaults.yearFormat;
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'yy':
                return currentDate.getFullYear().toString().substring(2);
            default:
                return currentDate.getFullYear().toString();
        }
    };
    /**
     * Returns the current month in various formats: numerical, full name, or abbreviated name. 
     * The default is the numerical string format without leading zeros. 
     * The function determines the current month based on the system's date settings and formats it as specified.
     *
     * @param {string} [format=''] - The format in which to return the month. 'MM' for two-digit numerical format, 'MMMM' for full month name, 'MMM' for abbreviated month name, and any other value for the default numerical format.
     * @returns {string} Returns the current month as a string in the specified format.
     *
     * @example
     * // returns '01' for January (assuming the current month is January)
     * hison.utils.getSysMonth('MM');
     *
     * @example
     * // returns 'January' (assuming the current month is January)
     * hison.utils.getSysMonth('MMMM');
     *
     * @example
     * // returns 'Jan' (assuming the current month is January)
     * hison.utils.getSysMonth('MMM');
     */
    hison.utils.getSysMonth = function(format) {
        if(!format) format = hison.utils.defaults.monthFormat;
        var currentDate = new Date();
        var sysMonth = currentDate.getMonth() + 1;
        switch (format.toLowerCase()) {
            case 'mm':
                return sysMonth.toString().padStart(2, '0');
            case 'mmmm':
                return _getMonthName(sysMonth);
            case 'mmm':
                return _getMonthName(sysMonth, false);
            default:
                return sysMonth.toString();
        }
    };
    /**
     * Returns the current year and month formatted as specified. The default format is "yyyy-MM" (e.g., "2024-01").
     * This function utilizes the getDateWithFormat function to format the current year and month according to the specified format.
     *
     * @param {string} [format='yyyy-mm'] - The format string specifying how the year and month should be returned. 
     *                                       It can be any format supported by the getDateWithFormat function.
     * @returns {string} Returns the current year and month as a string in the specified format.
     *
     * @example
     * // returns 'January, 2024' (assuming the current date is in January 2024)
     * hison.utils.getSysYearMonth('MMMM, yyyy');
     *
     * @example
     * // returns '2024/01' (assuming the current date is in January 2024)
     * hison.utils.getSysYearMonth('yyyy/MM');
     */
    hison.utils.getSysYearMonth = function(format) {
        if(!format) format = hison.utils.defaults.yearMonthFormat;
        var currentDate = new Date();
        return _getDateWithFormat({y:currentDate.getFullYear(),m:currentDate.getMonth() + 1}, format)
    };
    /**
     * Returns the current day of the month in either a two-digit or a default format. 
     * The default format is a string of numerical representation without leading zeros. 
     * The function determines the current day based on the system's date settings.
     *
     * @param {string} [format=''] - The format in which to return the day. 'dd' for two-digit format, any other value for the default format.
     * @returns {string} Returns the current day as a string in the specified format.
     *
     * @example
     * // returns '05' (assuming the current day of the month is 5)
     * hison.utils.getSysDay('dd');
     *
     * @example
     * // returns '5' (assuming the current day of the month is 5)
     * hison.utils.getSysDay();
     */
    hison.utils.getSysDay = function(format) {
        if(!format) format = hison.utils.defaults.dayFormat;
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'dd':
                return currentDate.getDate().toString().padStart(2, '0');
            default:
                return currentDate.getDate().toString();
        }
    };
    /**
     * Returns the current day of the week in various formats. The default format is numerical (0 for Sunday, 6 for Saturday).
     * This function utilizes the getDayOfWeek function to determine the day of the week based on the current system date.
     *
     * @param {string} [dayType='d'] - The format of the day of the week to return. 
     *                                 Options are 'd' for numerical (0-6), 'dy' for 3-letter abbreviation, 
     *                                 'day' for full name, 'kdy' for Korean abbreviation, 'kday' for full Korean name.
     * @returns {string} Returns the current day of the week as per the specified format.
     *
     * @example
     * // returns '1' (assuming the current day of the week is Monday)
     * hison.utils.getSysDayOfWeek();
     *
     * @example
     * // returns 'MONDAY' (assuming the current day of the week is Monday)
     * hison.utils.getSysDayOfWeek('day');
     */
    hison.utils.getSysDayOfWeek = function(dayType) {
        if(!dayType) dayType = hison.utils.defaults.dayOfWeekFormat;
        var currentDate = new Date();
        return _getDayOfWeek({y:currentDate.getFullYear(),m:currentDate.getMonth() + 1,d:currentDate.getDate()}, dayType);
    };
    /**
     * Returns the current hour of the day in either a two-digit or a default format. 
     * The default format is a string of numerical representation without leading zeros. 
     * The function determines the current hour based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the hour. 'hh' for two-digit format, any other value for the default format.
     * @returns {string} Returns the current hour as a string in the specified format.
     *
     * @example
     * // returns '05' (assuming the current hour is 5 AM)
     * hison.utils.getSysHour('hh');
     *
     * @example
     * // returns '5' (assuming the current hour is 5 AM)
     * hison.utils.getSysHour();
     */
    hison.utils.getSysHour = function(format) {
        if(!format) format = hison.utils.defaults.hourFormat;
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'hh':
                return currentDate.getHours().toString().padStart(2, '0');
            default:
                return currentDate.getHours().toString();
        }
    };
    /**
     * Returns the current hour and minute in either a 'hhmm' (continuous string) format or the default 'hh:mm' format.
     * The default format is 'hh:mm', which includes a colon separator between hours and minutes.
     * The function determines the current time based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the time. 'hhmm' for continuous string format (e.g., '0512'), any other value for the default 'hh:mm' format (e.g., '05:12').
     * @returns {string} Returns the current hour and minute as a string in the specified format.
     *
     * @example
     * // returns '05:12' (assuming the current time is 5 hours and 12 minutes)
     * hison.utils.getSysHourMinute();
     *
     * @example
     * // returns '0512' (assuming the current time is 5 hours and 12 minutes)
     * hison.utils.getSysHourMinute('hhmm');
     */
    hison.utils.getSysHourMinute = function(format) {
        if(!format) format = hison.utils.defaults.hourMinuteFormat;
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'hhmm':
                return currentDate.getHours().toString().padStart(2, '0') + "" + currentDate.getMinutes().toString().padStart(2, '0');
            default:
                return currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0');
        }
    };
    /**
     * Returns the current minute of the hour in either a two-digit or a default format. 
     * The default format is a string of numerical representation without leading zeros. 
     * The function determines the current minute based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the minute. 'mm' for two-digit format, any other value for the default format.
     * @returns {string} Returns the current minute as a string in the specified format.
     *
     * @example
     * // returns '05' (assuming the current minute is 5 past the hour)
     * hison.utils.getSysMinute('mm');
     *
     * @example
     * // returns '5' (assuming the current minute is 5 past the hour)
     * hison.utils.getSysMinute();
     */
    hison.utils.getSysMinute = function(format) {
        if(!format) format = hison.utils.defaults.minuteFormat;
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'mm':
                return currentDate.getMinutes().toString().padStart(2, '0');
            default:
                return currentDate.getMinutes().toString();
        }
    };
    /**
     * Returns the current second of the minute in either a two-digit or a default format. 
     * The default format is a string of numerical representation without leading zeros. 
     * The function determines the current second based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the second. 'ss' for two-digit format, any other value for the default format.
     * @returns {string} Returns the current second as a string in the specified format.
     *
     * @example
     * // returns '05' (assuming the current second is 5 past the minute)
     * hison.utils.getSysSecond('ss');
     *
     * @example
     * // returns '5' (assuming the current second is 5 past the minute)
     * hison.utils.getSysSecond();
     */
    hison.utils.getSysSecond = function(format) {
        if(!format) format = hison.utils.defaults.secondFormat;
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'ss':
                return currentDate.getSeconds().toString().padStart(2, '0');
            default:
                return currentDate.getSeconds().toString();
        }
    };
    /**
     * Returns the current time in either a 'hhmmss' (continuous string) format or the default 'hh:mm:ss' format.
     * The default format is 'hh:mm:ss', which includes colon separators between hours, minutes, and seconds.
     * The function determines the current time based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the time. 'hhmmss' for continuous string format (e.g., '051230'), any other value for the default 'hh:mm:ss' format (e.g., '05:12:30').
     * @returns {string} Returns the current time as a string in the specified format.
     *
     * @example
     * // returns '05:12:30' (assuming the current time is 5 hours, 12 minutes, and 30 seconds)
     * hison.utils.getSysTime();
     *
     * @example
     * // returns '051230' (assuming the current time is 5 hours, 12 minutes, and 30 seconds)
     * hison.utils.getSysTime('hhmmss');
     */
    hison.utils.getSysTime = function(format) {
        if(!format) format = hison.utils.defaults.timeFormat;
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'hhmmss':
                return currentDate.getHours().toString().padStart(2, '0') + currentDate.getMinutes().toString().padStart(2, '0') + currentDate.getSeconds().toString().padStart(2, '0');
            default:
                return currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0') + ":" + currentDate.getSeconds().toString().padStart(2, '0');
        }
    };
    /**
     * Returns the current date and time in a specified format. The default format is "yyyy-MM-dd hh:mm:ss" (e.g., "2024-01-22 13:07:34").
     * This function utilizes the getDateWithFormat function to format the current date and time according to the specified format.
     *
     * @param {string} [format='yyyy-MM-dd hh:mm:ss'] - The format string specifying how the date and time should be returned. 
     *                                                      It can be any format supported by the getDateWithFormat function.
     * @returns {string} Returns the current date and time as a string in the specified format.
     *
     * @example
     * // returns 'January 15, 2024 05:12:30' (assuming the current date and time)
     * hison.utils.getSysDate('MMMM dd, yyyy hh:mm:ss');
     *
     * @example
     * // returns '2024. 01. 15 05:12' (assuming the current date and time)
     * hison.utils.getSysDate('yyyy. MM. dd hh:mm');
     */
    hison.utils.getSysDate = function(format) {
        if(!format) format = hison.utils.defaults.datetimeFormat;
        var currentDate = new Date();
        return _getDateWithFormat(
            {
                y:currentDate.getFullYear(),
                m:currentDate.getMonth() + 1,
                d:currentDate.getDate(),
                h:currentDate.getHours(),
                m:currentDate.getMinutes(),
                s:currentDate.getSeconds(),
            }
            , format);
    };

    /******************************************
     * Utils for Number
     ******************************************/
    /**
     * Rounds up a given number to a specified precision. The precision determines the number of decimal places to round up to.
     * If the precision is not an integer, it defaults to 0 (rounding up to the nearest whole number).
     * The function throws an error if the provided number is not numeric.
     * 
     * Handled in hison.utils.errorHandler. returns null. If 'num' is not numeric or if 'precision' is not an integer.
     *
     * @param {number} num - The number to be rounded up.
     * @param {number} [precision=0] - The number of decimal places to round up to. Must be an integer.
     * @returns {number} Returns the rounded up value of the provided number at the specified precision.
     * 
     * @example
     * // returns 2.35 rounded up to the nearest tenth (2.4)
     * hison.utils.getCeil(2.35, 1);
     *
     * @example
     * // returns 3 rounded up to the nearest whole number (3)
     * hison.utils.getCeil(2.35);
     */
    hison.utils.getCeil = function(num, precision) {
        if(!_isNumeric(num)) return hison.utils.errorHandler("ER0017", "Please input only number.");
        if(!_isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.ceil(num * factor) / factor;
    };
    /**
     * Rounds down a given number to a specified precision. The precision determines the number of decimal places to round down to.
     * If the precision is not an integer, it defaults to 0 (rounding down to the nearest whole number).
     * The function throws an error if the provided number is not numeric.
     * 
     * Handled in hison.utils.errorHandler. returns null. If 'num' is not numeric or if 'precision' is not an integer.
     *
     * @param {number} num - The number to be rounded down.
     * @param {number} [precision=0] - The number of decimal places to round down to. Must be an integer.
     * @returns {number} Returns the rounded down value of the provided number at the specified precision.
     *
     * @example
     * // returns 2.35 rounded down to the nearest tenth (2.3)
     * hison.utils.getFloor(2.35, 1);
     *
     * @example
     * // returns 2 rounded down to the nearest whole number (2)
     * hison.utils.getFloor(2.35);
     */
    hison.utils.getFloor = function(num, precision) {
        if(!_isNumeric(num)) return hison.utils.errorHandler("ER0018", "Please input only number.");
        if(!_isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.floor(num * factor) / factor;
    };
    /**
     * Rounds a given number to a specified precision. The precision determines the number of decimal places to round to.
     * If the precision is not an integer, it defaults to 0 (rounding to the nearest whole number).
     * The function throws an error if the provided number is not numeric.
     * 
     * Handled in hison.utils.errorHandler. returns null. If 'num' is not numeric or if 'precision' is not an integer.
     *
     * @param {number} num - The number to be rounded.
     * @param {number} [precision=0] - The number of decimal places to round to. Must be an integer.
     * @returns {number} Returns the rounded value of the provided number at the specified precision.
     *
     * @example
     * // returns 2.35 rounded to the nearest tenth (2.4)
     * hison.utils.getRound(2.35, 1);
     *
     * @example
     * // returns 2 rounded to the nearest whole number (2)
     * hison.utils.getRound(2.35);
     */
    hison.utils.getRound = function(num, precision) {
        if(!_isNumeric(num)) return hison.utils.errorHandler("ER0019", "Please input only number.");
        if(!_isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    };
    /**
     * Truncates a given number to a specified precision. The precision determines the number of decimal places to truncate to.
     * If the precision is not an integer, it defaults to 0 (truncating to the nearest whole number).
     * The function throws an error if the provided number is not numeric.
     * 
     * Handled in hison.utils.errorHandler. returns null. If 'num' is not numeric or if 'precision' is not an integer.
     *
     * @param {number} num - The number to be truncated.
     * @param {number} [precision=0] - The number of decimal places to truncate to. Must be an integer.
     * @returns {number} Returns the truncated value of the provided number at the specified precision.
     *
     * @example
     * // returns 2.3, truncating 2.35 to the nearest tenth
     * hison.utils.getTrunc(2.35, 1);
     *
     * @example
     * // returns 2, truncating 2.35 to the nearest whole number
     * hison.utils.getTrunc(2.35);
     */
    hison.utils.getTrunc = function(num, precision) {
        if(!_isNumeric(num)) return hison.utils.errorHandler("ER0020", "Please input only number.");
        if(!_isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.trunc(num * factor) / factor;
    };

    /******************************************
     * Utils for String
     ******************************************/
    /**
     * Calculates the byte length of a given string. This function accounts for character encodings such as ASCII,
     * 2-byte characters, 3-byte characters, and 4-byte characters (like some emojis). The byte values for character
     * ranges are stored in constants: LESSOREQ_0X7FF_BYTE (2 bytes), LESSOREQ_0XFFFF_BYTE (3 bytes),
     * GREATER_0XFFFF_BYTE (4 bytes), which can be adjusted for different encodings like EUC-KR.
     *
     * @param {string} str - The string for which the byte length is to be calculated.
     * @returns {number} Returns the byte length of the string.
     *
     * @example
     * // assuming ASCII characters, returns 5 for 'Hello'
     * hison.utils.getByteLength('Hello');
     *
     * @example
     * // returns 16 for a string with 3-byte each '안녕하세요' and 1-byte '.' characters
     * hison.utils.getByteLength('안녕하세요.');
     *
     * Note: For users utilizing different encodings like EUC-KR, the byte values for character ranges can be modified
     * in the hison.utils.defaults fields: LESSOREQ_0X7FF_BYTE, LESSOREQ_0XFFFF_BYTE, GREATER_0XFFFF_BYTE.
     */
    hison.utils.getByteLength = function(str) {
        str = _getToString(str);
        var byteLength = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode <= 0x7F) {
                byteLength += 1;
            } else if (charCode <= 0x7FF) {
                byteLength += hison.utils.defaults.lessoreq0x7ffByte;
            } else if (charCode <= 0xFFFF) {
                byteLength += hison.utils.defaults.lessoreq0xffffByte;
            } else {
                byteLength += hison.utils.defaults.greater0xffffByte;
            }
        }
        return byteLength;
    };
    /**
     * Truncates a given string to a specified byte length. This function handles multibyte characters appropriately,
     * ensuring that the string is cut off at the correct byte length without breaking characters.
     * It uses the same byte values for character ranges as used in the getByteLength function.
     *
     * @param {string} str - The string to be truncated.
     * @param {number} cutByte - The byte length at which the string will be cut.
     * @returns {string} Returns the truncated string, cut off at the specified byte length.
     *
     * @example
     * // returns a substring of 'Hello'. Because truncated to 5 bytes.
     * hison.utils.getCutByteLength('Hello, World!', 5);
     *
     * @example
     * // returns a substring of '안녕'. Becuase truncated to 6 bytes.
     * hison.utils.getCutByteLength('안녕하세요', 6);
     *
     * Note: The function calculates byte length considering character encodings. 
     * For characters that take more than one byte, the function ensures not to cut the string in the middle of a character.
     */
    hison.utils.getCutByteLength = function(str, cutByte) {
        str = _getToString(str);
        var byteLength = 0;
        var cutIndex = str.length;
    
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode <= 0x7F) {
                byteLength += 1;
            } else if (charCode <= 0x7FF) {
                byteLength += hison.utils.defaults.lessoreq0x7ffByte;
            } else if (charCode <= 0xFFFF) {
                byteLength += hison.utils.defaults.lessoreq0xffffByte;
            } else {
                byteLength += hison.utils.defaults.greater0xffffByte;
            }
            if (byteLength > cutByte) {
                cutIndex = i;
                break;
            }
        }
        return str.substring(0, cutIndex);
    };
    /**
     * Adjusts the length of a given string to a specified length by inserting spaces evenly between the characters.
     * If the string is already equal to or longer than the specified length, it returns the string as is.
     * Otherwise, it calculates the number of spaces needed and distributes them as evenly as possible between the characters.
     *
     * @param {string} str - The string to be formatted.
     * @param {number} length - The desired length of the string after adding spaces.
     * @returns {string} Returns the string with spaces added to meet the specified length.
     *
     * @example
     * // returns a string 'H e l l o' with spaces to make its length 9
     * hison.utils.getStringLenForm('Hello', 9);
     *
     * @example
     * // returns 'Hello World' as is since its length is already 11
     * hison.utils.getStringLenForm('Hello World', 11);
     *
     * Note: The function adds spaces between characters. If the string's length is less than the specified length, 
     * spaces are distributed as evenly as possible. In cases where spaces can't be perfectly even, 
     * the extra spaces are distributed from the beginning.
     */
    hison.utils.getStringLenForm = function(str, length) {
        str = _getToString(str);
        var strLength = str.length;
        if (strLength >= length) {
            return str;
        }
        var totalSpaces = length - strLength;
        var gaps = strLength - 1;
        var spacePerGap = Math.floor(totalSpaces / gaps);
        var extraSpaces = totalSpaces % gaps;
        var result = '';
        for (var i = 0; i < gaps; i++) {
            result += str[i];
            result += ' '.repeat(spacePerGap + (i < extraSpaces ? 1 : 0));
        }
        result += str[strLength - 1];
        return result;
    };
    /**
     * Pads the left side of a given string with a specified padding character (or string) up to a certain length.
     * The function calculates the required number of repetitions of the padding string to reach the specified length.
     * If the original string is already equal to or longer than the specified length, no padding is added.
     *
     * @param {string} str - The string to be padded.
     * @param {string} padStr - The string to use for padding. If longer than one character, the entire string is repeated.
     * @param {number} length - The desired total length of the padded string.
     * @returns {string} Returns the string padded on the left side to the specified length.
     *
     * @example
     * // returns '000Hello' with '0' padding to make its length 7
     * hison.utils.getLpad('Hello', '0', 7);
     *
     * @example
     * // returns 'xxHello' with 'x' padding to make its length 7
     * hison.utils.getLpad('Hello', 'x', 7);
     *
     * Note: If the length of the original string is longer than the specified length, 
     * the function returns the original string without any padding.
     */
    hison.utils.getLpad = function(str, padStr, length) {
        str = _getToString(str);
        padStr = _getToString(padStr);

        var pad = padStr.repeat((length - str.length) / padStr.length);
        return pad + str;
    };
    /**
     * Pads the right side of a given string with a specified padding character (or string) up to a certain length.
     * The function calculates the required number of repetitions of the padding string to reach the specified length.
     * If the original string is already equal to or longer than the specified length, no padding is added.
     *
     * @param {string} str - The string to be padded.
     * @param {string} padStr - The string to use for padding. If longer than one character, the entire string is repeated.
     * @param {number} length - The desired total length of the padded string.
     * @returns {string} Returns the string padded on the right side to the specified length.
     *
     * @example
     * // returns 'Hello000' with '0' padding to make its length 7
     * hison.utils.getRpad('Hello', '0', 7);
     *
     * @example
     * // returns 'Helloxx' with 'x' padding to make its length 7
     * hison.utils.getRpad('Hello', 'x', 7);
     *
     * Note: If the length of the original string is longer than the specified length, 
     * the function returns the original string without any padding.
     */
    hison.utils.getRpad = function(str, padStr, length) {
        str = _getToString(str);
        padStr = _getToString(padStr);

        var pad = padStr.repeat((length - str.length) / padStr.length);
        return str + pad;
    };
    /**
     * Trims whitespace from both ends of a given string. This function uses the getToString utility to ensure
     * that the input is always treated as a string, making it robust against inputs like null that do not have a trim method.
     * This approach prevents errors that would normally occur when trying to trim non-string types.
     *
     * @param {*} str - The value to be trimmed. If not a string, it is converted to a string.
     * @returns {string} Returns the trimmed string.
     *
     * @example
     * // returns 'Hello World' with surrounding whitespace removed
     * hison.utils.getTrim('  Hello World  ');
     *
     * @example
     * // returns an empty string for null
     * hison.utils.getTrim(null);
     *
     * Note: This function is useful for sanitizing inputs where leading and trailing whitespace is not desired,
     * and it ensures that even non-string values can be safely trimmed.
     */
    hison.utils.getTrim = function(str) {
        str = _getToString(str);
        return str.trim();
    };
    /**
     * Replaces all occurrences of a specified target string within a given string with another specified string.
     * This function ensures all inputs are treated as strings, including the target and replacement strings,
     * by using the getToString utility. It is a robust method for string replacement that handles various input types.
     *
     * @param {*} str - The original string in which replacements are to be made. Converted to a string if not already.
     * @param {*} targetStr - The string to be replaced. Converted to a string if not already.
     * @param {*} replaceStr - The string to replace targetStr with. Converted to a string if not already.
     * @returns {string} Returns a new string with all occurrences of targetStr replaced by replaceStr.
     *
     * @example
     * // returns 'Hello World' with 'l' replaced by 'x'
     * hison.utils.getReplaceAll('Hello World', 'l', 'x');
     *
     * @example
     * // returns 'Hello World' with 'World' replaced by 'Universe'
     * hison.utils.getReplaceAll('Hello World', 'World', 'Universe');
     *
     * Note: This function is useful for making multiple replacements in a string in one go. It ensures that non-string values
     * are converted to strings before the replacement operation, thus preventing errors related to non-string operations.
     */
    hison.utils.getReplaceAll = function(str, targetStr, replaceStr) {
        str = _getToString(str);
        targetStr = _getToString(targetStr);
        replaceStr = _getToString(replaceStr);
        return str.split(targetStr).join(replaceStr);
    };
    /**
     * Returns a default value if the given value is undefined or null. This function is useful for providing fallback values
     * in cases where a variable might not be initialized or could be explicitly set to null.
     *
     * @param {*} val - The value to check for null or undefined.
     * @param {*} defaultValue - The default value to return if val is null or undefined.
     * @returns {*} Returns val if it is neither undefined nor null; otherwise, returns defaultValue.
     *
     * @example
     * // returns 'default' when val is undefined
     * hison.utils.nvl(undefined, 'default');
     *
     * @example
     * // returns 'default' when val is null
     * hison.utils.nvl(null, 'default');
     *
     * @example
     * // returns 'Hello' when val is 'Hello'
     * hison.utils.nvl('Hello', 'default');
     *
     * Note: This function is particularly useful for handling optional parameters in functions or for setting default values 
     * for variables that may not be present in certain contexts.
     */
    hison.utils.nvl = function(val, defaultValue) {
        return (val === null || val === undefined) ? defaultValue : val;
    };
    /**
     * Formats a numeric value according to a specified format string. This function first checks if the value is numeric.
     * The format string can include a prefix, a numeric pattern, and a suffix. The numeric pattern dictates how the number
     * should be formatted, including the placement of commas and decimals. The function supports different patterns for integer
     * and decimal parts and can also handle percentage formatting.
     * 
     * Handled in hison.utils.errorHandler. returns origin parameter vlaue. If the input value is not numeric or if the format string is invalid.
     *
     * @param {*} value - The numeric value to be formatted.
     * @param {string} format - The format string defining how the number should be formatted.
     * @returns {string} Returns the formatted number as a string.
     *
     * @example
     * // returns '$1,234.5'
     * hison.utils.getNumberFormat(1234.54, '$#,###.#');
     *
     * @example
     * // returns '1234%'
     * hison.utils.getNumberFormat(12.34, '#,##0%');
     *
     * Note: The function is designed to handle various formatting requirements, such as different grouping styles,
     * decimal places, and inclusion of currency symbols or percentage signs. It's particularly useful for presenting
     * numbers in a user-friendly format in UIs or reports.
     */
    hison.utils.getNumberFormat = function(value, format) {
        var oriValue = value;
        if (!_isNumeric(value)) {
            return hison.utils.errorHandler("ER0021", "Invalid number", oriValue);
        }
        format = format ? format : hison.utils.defaults.numberFormat;
        var regex = /^(.*?)([#0,.]+)(.*?)$/;
        var matches = format.match(regex);

        if (!matches) {
            return hison.utils.errorHandler("ER0022", "Invalid format", oriValue);
        }

        var prefix = matches[1];
        var numberFormat = matches[2];
        var suffix = matches[3];
        var intergerFormat = numberFormat.split('.')[0];
        var decimalFormat = numberFormat.split('.').length > 1 ? numberFormat.split('.')[1] : '';

        if(suffix === '%' || suffix === ' %') value = value * 100;

        numStr = _getToString(value);
        var isNegative = numStr[0] === '-';
        var numStr = isNegative ? numStr.substring(1) : numStr;
        var interger = numStr.split('.')[0];
        var decimal = numStr.split('.').length > 1 ? numStr.split('.')[1] : '';
        
        var result;

        decimal = _getToFloat('0.' + decimal)
                .toLocaleString('en',{
                    minimumFractionDigits: decimalFormat.lastIndexOf('0') + 1,
                    maximumFractionDigits: decimalFormat.length
                    });
        if(decimal === '0') decimal = '';
        else decimal = decimal.substring(1);

        switch (intergerFormat) {
            case "#,###":
                if(_getToNumber(interger) === 0) {
                    result = decimal;
                }
                else {
                    interger = _getToFloat(interger).toLocaleString('en');
                    result = interger + decimal;
                }
                break;
            case "#,##0":
                interger = _getToFloat(interger).toLocaleString('en');
                result = interger + decimal;
                break;
            case "#":
                if(_getToNumber(interger) === 0) {
                    result = decimal;
                }
                else {
                    result = interger + decimal;
                }
                break;
            case "0":
                result = interger + decimal;
                break;
            default:
                return hison.utils.errorHandler("ER0023", "Invalid format", oriValue);
        }
    
        return prefix + result + suffix;
    };
    /**
     * Removes all characters from a given string except for numeric digits. This function ensures that the input is treated as a string,
     * then applies a regular expression to remove all non-numeric characters. It's useful for extracting only the numeric part from a mixed string.
     *
     * @param {*} str - The string from which non-numeric characters are to be removed.
     * @returns {string} Returns a string containing only the numeric characters from the original string.
     *
     * @example
     * // returns '12345' from a string mixed with letters and numbers
     * hison.utils.getRemoveExceptNumbers('abc12345xyz');
     *
     * @example
     * // returns '2023' from a string with various characters
     * hison.utils.getRemoveExceptNumbers('Year: 2023!');
     *
     * Note: This function is particularly useful in situations where you need to extract or isolate the numerical part of a string,
     * such as processing text input fields that should contain only numbers.
     */
    hison.utils.getRemoveExceptNumbers = function(str) {
        str = _getToString(str);
        return str.replace(/[^0-9]/g, '');
    };
    /**
     * Removes all numeric digits from a given string. This function ensures that the input is treated as a string,
     * then applies a regular expression to remove all numeric characters. It's useful for extracting the non-numeric part from a string.
     *
     * @param {*} str - The string from which numeric characters are to be removed.
     * @returns {string} Returns a string with all numeric characters removed from the original string.
     *
     * @example
     * // returns 'abcxyz' from a string mixed with letters and numbers
     * hison.utils.getRemoveNumbers('abc12345xyz');
     *
     * @example
     * // returns 'Year: !' from a string with various characters
     * hison.utils.getRemoveNumbers('Year: 2023!');
     *
     * Note: This function is particularly useful in situations where you need to remove or filter out numeric characters from a string,
     * such as processing text input fields that should not contain numbers.
     */
    hison.utils.getRemoveNumbers = function(str) {
        str = _getToString(str);
        return str.replace(/[0-9]/g, '');
    };
    /**
     * Reverses the characters in a given string. The function converts the input to a string (if it is not already),
     * then splits it into individual characters, reverses the character array, and joins it back into a string.
     * This is useful for creating the reverse of a string for various purposes.
     *
     * @param {*} str - The string to be reversed.
     * @returns {string} Returns a string that is the reverse of the input string.
     *
     * @example
     * // returns 'olleH' for 'Hello'
     * hison.utils.getReverse('Hello');
     *
     * @example
     * // returns '321' for '123'
     * hison.utils.getReverse('123');
     *
     * Note: This function can be used in scenarios such as palindrome checking, text effects, or other situations 
     * where the reverse order of characters in a string is needed.
     */
    hison.utils.getReverse = function(str) {
        str = _getToString(str);
        return str.split('').reverse().join('');
    };
   
    /******************************************
     * Utils for Converts
     ******************************************/
    /**
     * Converts a given value to a boolean. The conversion rules are as follows:
     * - Any numeric value (including numeric strings) that is not 0 converts to true.
     * - The boolean value true converts to true.
     * - String values 'true', 'y', 'yes', 'check', 'c', '참' (case insensitive) convert to true.
     * - All other values convert to false.
     * This function is useful for interpreting different types of truthy values as boolean true or false.
     *
     * @param {*} val - The value to be converted to a boolean.
     * @returns {boolean} Returns true or false based on the conversion rules.
     *
     * @example
     * // returns true
     * hison.utils.getToBoolean('yes');
     *
     * @example
     * // returns false
     * hison.utils.getToBoolean(0);
     *
     * @example
     * // returns true
     * hison.utils.getToBoolean('TRUE');
     *
     * @example
     * // returns false
     * hison.utils.getToBoolean('false');
     *
     * Note: This function is designed to handle various inputs that can be interpreted as boolean true,
     * while treating everything else as false. This is especially useful in contexts where user input
     * or data representation might vary but needs to be interpreted in a boolean context.
     */
    hison.utils.getToBoolean = function(val) {
        if(_isNumeric(val)) {
            return Number(val) != 0;
        }
        else if (typeof val === 'boolean'){
            return val
        }
        else if (typeof val === "string"){
            return ['t','true','y','yes','check','c','checked','selected','참'].indexOf(val.toLowerCase()) >= 0;
        }
        else {
            return false;
        }
    };
    var _getToNumber = function(val, impossibleValue) {
        impossibleValue = impossibleValue === undefined ? 0 : impossibleValue;
        if (!_isNumeric(val)) {
            return impossibleValue;
        }
        return Number(val);
    };
    /**
     * Converts a given value to a number. If the value cannot be converted to a number, it returns a specified 'impossible value'.
     * The function first checks if the value is numeric using the isNumeric utility function.
     * If it is numeric, it converts the value to a number using the Number() function; otherwise, it returns the 'impossible value'.
     *
     * @param {*} val - The value to be converted to a number.
     * @param {*} [impossibleValue=0] - The value to return if conversion to a number is not possible. Defaults to 0.
     * @returns {number} Returns the number representation of the input value, or the 'impossible value' if the value is not numeric.
     *
     * @example
     * // returns 123 for a numeric string
     * hison.utils.getToNumber('123');
     *
     * @example
     * // returns -1 for a non-numeric string when -1 is specified as the impossible value
     * hison.utils.getToNumber('Hello', -1);
     *
     * Note: This function allows for flexibility in handling non-numeric values, 
     * providing the option to specify an alternative return value when conversion is not possible.
     */
    hison.utils.getToNumber = function(val, impossibleValue) {
        return _getToNumber(val, impossibleValue);
    };
    var _getToFloat = function(val, impossibleValue) {
        impossibleValue = impossibleValue === undefined ? 0 : impossibleValue;
        if (!_isNumeric(val)) {
            return impossibleValue;
        }
        return parseFloat(val);
    }
    /**
     * Converts a given value to a floating-point number. If the value cannot be converted to a float, it returns a specified 'impossible value'.
     * The function first checks if the value is numeric using the isNumeric utility function.
     * If it is numeric, it converts the value to a float using the parseFloat() function; otherwise, it returns the 'impossible value'.
     *
     * @param {*} val - The value to be converted to a floating-point number.
     * @param {*} [impossibleValue=0] - The value to return if conversion to a float is not possible. Defaults to 0.
     * @returns {number} Returns the floating-point representation of the input value, or the 'impossible value' if the value is not numeric.
     *
     * @example
     * // returns 123.45 for a numeric string
     * hison.utils.getToFloat('123.45');
     *
     * @example
     * // returns -1.0 for a non-numeric string when -1.0 is specified as the impossible value
     * hison.utils.getToFloat('Hello', -1.0);
     *
     * Note: This function allows for flexibility in handling non-numeric values, 
     * providing the option to specify an alternative return value when conversion is not possible.
     */
    hison.utils.getToFloat = function(val, impossibleValue) {
        return _getToFloat(val, impossibleValue);
    };
    /**
     * Converts a given value to an integer. If the value cannot be converted to an integer, it returns a specified 'impossible value'.
     * The function first checks if the value is numeric using the isNumeric utility function.
     * If it is numeric, it converts the value to an integer using the parseInt() function, discarding any decimal points; otherwise, it returns the 'impossible value'.
     *
     * @param {*} val - The value to be converted to an integer.
     * @param {*} [impossibleValue=0] - The value to return if conversion to an integer is not possible. Defaults to 0.
     * @returns {number} Returns the integer representation of the input value, or the 'impossible value' if the value is not numeric.
     *
     * @example
     * // returns 123 for a numeric string
     * hison.utils.getToInteger('123.45');
     *
     * @example
     * // returns -1 for a non-numeric string when -1 is specified as the impossible value
     * hison.utils.getToInteger('Hello', -1);
     *
     * Note: This function converts values to integers, truncating any fractional parts. 
     * It provides flexibility in handling non-numeric values by allowing the specification of an alternative return value when conversion is not possible.
     */
    hison.utils.getToInteger = function(val, impossibleValue) {
        impossibleValue = impossibleValue === undefined ? 0 : impossibleValue;
        if (!_isNumeric(val)) {
            return impossibleValue;
        }
        return parseInt(val, 10);
    };
    var _getToString = function(str, impossibleValue) {
        impossibleValue = impossibleValue === undefined ? '' : impossibleValue;
        if(typeof str === 'string') {
        } else if (typeof str === 'number' || typeof str === 'boolean' || typeof str === 'bigint') {
            str = String(str);
        } else if (typeof str === 'symbol') {
            str = str.description;
        } else {
            str = impossibleValue;
        }
        return str;
    };
    /**
     * Converts a given value to a string representation. If the value cannot be converted to a string, it returns a specified 'impossible value'.
     * The function handles strings, numbers, booleans, bigints, and symbols. If the value is a string, it is returned as is.
     * For numbers, booleans, and bigints, the value is converted to its string equivalent.
     * Symbols are converted to their description. For other types, the 'impossible value' is returned.
     *
     * @param {*} val - The value to be converted to a string.
     * @param {*} [impossibleValue=''] - The value to return if conversion to a string is not possible. Defaults to an empty string.
     * @returns {string} Returns the string representation of the input value, or the 'impossible value' if the value cannot be converted to a string.
     *
     * @example
     * // returns 'Hello'
     * hison.utils.getToString('Hello');
     *
     * @example
     * // returns '123' for a number
     * hison.utils.getToString(123);
     *
     * @example
     * // returns 'true' for a boolean
     * hison.utils.getToString(true);
     *
     * @example
     * // returns the description of the symbol
     * hison.utils.getToString(Symbol('mySymbol'));
     *
     * @example
     * // returns 'default' for an object when 'default' is specified as the impossible value
     * hison.utils.getToString({}, 'default');
     *
     * Note: This function allows for flexibility in handling values that may not be directly convertible to strings,
     * providing the option to specify an alternative return value when conversion is not possible.
     */
    hison.utils.getToString = function(val, impossibleValue) {
        return _getToString(val, impossibleValue);
    };
    
    /******************************************
     * Utils etc
     ******************************************/
    /**
     * Extracts the file extension from a given URL or filename. The function splits the string on the '.' character
     * and returns the last segment as the file extension. If the string does not contain a '.', indicating no file extension,
     * an empty string is returned. This function is useful for extracting file extensions from file names or URLs.
     *
     * @param {*} str - The URL or filename from which the file extension is to be extracted.
     * @returns {string} Returns the file extension if present; otherwise, returns an empty string.
     *
     * @example
     * // returns 'jpg' for a filename
     * hison.utils.getFileExtension('image.jpg');
     *
     * @example
     * // returns 'html' for a URL
     * hison.utils.getFileExtension('https://example.com/page.html');
     *
     * @example
     * // returns an empty string for a string without a file extension
     * hison.utils.getFileExtension('filename');
     *
     * Note: This function assumes that the file extension (if present) is the part of the string following the last '.' character.
     * It is useful in contexts where file types need to be determined based on file names or URLs.
     */
    hison.utils.getFileExtension = function(str) {
        str = _getToString(str);
    
        var extension = str.split('.').pop();
        if (extension === str) {
            return '';
        }
        return extension;
    };
    /**
     * Extracts the file name without the extension from a given URL or filename. The function first isolates the file name
     * by splitting the string on '/' and taking the last segment. It then looks for the last '.' character to separate the file name
     * from its extension. If there is no '.', the entire file name is returned as is.
     * This function is useful for obtaining just the name part of a file from a full path or URL.
     *
     * @param {*} str - The URL or filename from which the file name is to be extracted.
     * @returns {string} Returns the file name without the extension.
     *
     * @example
     * // returns 'image' for a filename
     * hison.utils.getFileName('image.jpg');
     *
     * @example
     * // returns 'page' for a URL
     * hison.utils.getFileName('https://example.com/page.html');
     *
     * @example
     * // returns 'filename' for a string without an extension
     * hison.utils.getFileName('filename');
     *
     * Note: This function focuses on extracting the file name before the last period, assuming that what follows the last period
     * is the file extension. It is useful when the file extension is not needed or should be processed separately.
     */
    hison.utils.getFileName = function(str) {
        str = _getToString(str);
    
        var fileName = str.split('/').pop();
        var lastDotIndex = fileName.lastIndexOf('.');
    
        if (lastDotIndex === -1) return fileName;
        return fileName.substring(0, lastDotIndex);
    };
    /**
     * Decodes a Base64 encoded string to its original format using a specified character encoding. 
     * The function first converts the Base64 encoded string to a binary string using atob(), 
     * then decodes the binary string to the original string format using decodeURIComponent().
     * This is particularly useful for decoding Base64 encoded data back to its original string format.
     *
     * @param {*} str - The Base64 encoded string to be decoded.
     * @returns {string} Returns the decoded string from Base64 format.
     *
     * @example
     * // Assume 'encoded' is a Base64 encoded string of 'Hello World!'
     * var encoded = 'SGVsbG8gV29ybGQh';
     * var decoded = hison.utils.getDecodeBase64(encoded);
     * console.log(decoded); // Outputs: 'Hello World!'
     *
     * Note: This function handles the conversion of Base64 encoded strings to their original string format. 
     * It's particularly useful when dealing with data that has been Base64 encoded for transmission or storage and needs to be decoded.
     */
    hison.utils.getDecodeBase64 = function(str) {
        str = _getToString(str);
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };
    /**
     * Encodes a given string to Base64 format. The function first uses encodeURIComponent() to handle special characters,
     * then converts each escaped sequence to its equivalent character using String.fromCharCode() before finally encoding the string
     * in Base64 format using btoa(). This is useful for encoding data into Base64 format for safe transmission or storage.
     *
     * @param {*} str - The string to be encoded into Base64.
     * @returns {string} Returns the Base64 encoded string.
     *
     * @example
     * // Encode 'Hello World!' to Base64
     * var encoded = hison.utils.getEncodeBase64("Hello World!");
     * console.log(encoded); // Outputs: 'SGVsbG8gV29ybGQh'
     *
     * Note: This function is useful for encoding strings into Base64, a common requirement when handling data that needs to be
     * transmitted over mediums that do not support all character sets or when storing data in a format that is compact and safe from
     * alteration during transmission.
     */
    hison.utils.getEncodeBase64 = function(str) {
        str = _getToString(str);
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(_, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    };
    var _deepCopy = function(object, visited) {
        if (object === null || typeof object !== 'object') {
            return object;
        }
        if (object.utils.defaultsructor !== Object && object.utils.defaultsructor !== Array) {
            if(object.isDataWrapper || object.isDataModel) {
                return object.clone();
            }
            return object;
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
    }
    /**
     * Performs a deep copy of a given object, ensuring that nested objects are also copied rather than just their references.
     * The function handles objects and arrays, recursively copying their properties and elements. For objects that are instances
     * of custom classes (excluding plain objects and arrays), the function checks for `isDataWrapper` or `isDataModel` properties
     * and uses the `clone()` method if available; otherwise, it returns the object itself. The function also handles circular references.
     *
     * @param {*} object - The object to be deeply copied.
     * @param {Array} [visited=[]] - Internal parameter used for tracking visited objects to handle circular references.
     * @returns {*} Returns a deep copy of the object.
     *
     * @example
     * // Deep copy an object
     * var original = { a: 1, b: { c: 2 } };
     * var copy = hison.utils.deepCopy(original);
     * console.log(copy); // { a: 1, b: { c: 2 } }
     *
     * @example
     * // Deep copy an array
     * var original = [1, [2, 3]];
     * var copy = hison.utils.deepCopy(original);
     * console.log(copy); // [1, [2, 3]]
     *
     * Note: This function is useful for creating a true copy of an object or array, including all nested elements,
     * without sharing references with the original structure. This is essential in many programming scenarios
     * where modifications to a copied object should not affect the original object.
     */
    hison.utils.deepCopy = function(object, visited) {
        return _deepCopy(object, visited);
    };

    /**
     * The logic code and message used when handling errors within utils are displayed in the console log and the value is returned.
     * If there is no value, null is returned.
     */
    var _errorHandler = function(code, message, returnValue) {
        if(!code) code = "ER0000"
        if(!message) message = "Error occurred";
        console.log(code, message);
        if(returnValue === undefined) returnValue = null;
        return returnValue;
    }

    hison.utils.errorHandler = function(code, message, returnValue) {
        _errorHandler(code, message, returnValue);
    }
})();

/******************************************
 * DATA WRAPPER
 ******************************************/
/**
 * Factory function to create a new instance of DataWrapper.
 * @function
 * @param {Object|string} keyOrObject - Either an object with key-value pairs, or a single key if paired with a value.
 * @param {*} [value] - Value associated with the provided key. Only needed if a single key is provided.
 * @returns {DataWrapper} - An instance of the DataWrapper.
 */
var newDataWrapper = (function() {
    /**
     * DataWrapper constructor.
     * @constructor
     * @param {Object|string} keyOrObject - Either an object with key-value pairs, or a single key if paired with a value.
     * @param {*} [value] - Value associated with the provided key. Only needed if a single key is provided.
     */
    function DataWrapper(keyOrObject, value) {
        var _data = {};

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

        var _put = function(key, value) {
            if (typeof key !== 'string') {
                throw new Error("Keys must always be strings.");
            } else if (typeof value === 'string') {
                _data[key] = value;
            } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
                _data[key] = String(value);
            } else if (typeof value === 'symbol') {
                _data[key] = value.description;
            } else if (value === null) {
                _data[key] = null;
            } else if (value === undefined) {
                throw new Error("You can not put a value of undefined type.");
            } else if (typeof value === 'object') {
                if(!value.isDataModel) {
                    throw new Error("Please insert only values convertible to string or of data-model type.");
                }
                _data[key] = value.clone();
            } else {
                throw new Error("Please insert only values convertible to string or of data-model type.");
            }
        };

        /**
         * A boolean property indicating whether the object is an instance of DataWrapper.
         * This property is always true for instances of DataWrapper.
         * It is used to check if an object is a DataWrapper instance.
         *
         * @type {boolean}
         * @example
         * // Check if an object is a DataWrapper instance
         * if (someObject.isDataWrapper) {
         *     console.log('This is a DataWrapper instance.');
         * } else {
         *     console.log('This is not a DataWrapper instance.');
         * }
         */
        this.isDataWrapper = true;
        
        /**
         * Returns a deep copied instance of the DataWrapper.
         * @returns {DataWrapper} - A new instance of DataWrapper containing the same data.
         */
        this.clone = function() {
            return new DataWrapper(_data);
        };

        /**
         * Clears all the data.
         * @returns {DataWrapper} - The DataWrapper instance for chaining.
         */
        this.clear = function() {
            _data = {};
            return this;
        };

        /**
         * Serializes the DataWrapper object into a JSON string.
         * This method is used for generating JSON data for server communication.
         *
         * Note: Directly using JSON.stringify on the DataWrapper object may not correctly serialize the data.
         * To serialize a DataWrapper object into JSON, always use the getSerialized method.
         * 
         * @returns {string} A JSON string representation of the DataWrapper's data.
         */
        this.getSerialized = function() {
            var data = {};
            
            for (var key in _data) {
                if (_data.hasOwnProperty(key)) {
                    // DataModel 객체인 경우
                    if (_data[key] && _data[key].isDataModel) {
                        data[key] = _data[key].getRows();
                    } else {
                        // 그 외의 경우는 정상적으로 값을 할당
                        data[key] = _data[key];
                    }
                }
            }
            return JSON.stringify(data);
        };

        /**
         * Retrieves the value associated with the specified key.
         * Note: The returned object is a new instance, So it has no reference to the object stored in the DataWrapper.
         * @param {string} key - Key to retrieve value for.
         * @returns {*} - The value associated with the provided key.
         */
        this.get = function(key) {
            return _deepCopy(_data[key]);
        };
        
        /**
         * Retrieves the string value associated with the specified key.
         * @param {string} key - Key to retrieve string value for.
         * @returns {string} - The string value associated with the provided key.
         * @throws {Error} If the specified key does not contain a string value.
         */
        this.getString = function(key) {
            if(typeof _data[key] !== 'string') {
                throw new Error("The data does not contain the specified string value.");
            }
            return _data[key];
        };
        
        /**
         * Retrieves the data-model value associated with the specified key.
         * Note: The returned object is a new instance, So it has no reference to the object stored in the DataWrapper.
         * @param {string} key - Key to retrieve data-model value for.
         * @returns {*} - The data-model value associated with the provided key.
         * @throws {Error} If the specified key does not contain a data-model value.
         */
        this.getDataModel = function(key) {
            if(!_data[key].isDataModel) {
                throw new Error("The data does not contain the specified data-model value.");
            }
            return _data[key].clone();
        };
        
        /**
         * Inserts a key-value pair or multiple key-value pairs into the data.
         * 
         * If provided with two arguments, it treats the first argument as a key and the second as its value.
         * If provided with a single argument that is an object, it inserts each of the object's key-value pairs into the data.
         *
         * @param {string|Object} keyOrObject - If paired with `value`, this parameter acts as a key for the value. 
         *                                      If `value` is not provided, this parameter should be an object with key-value pairs to be inserted.
         * @param {*} [value] - The value to be associated with the key provided in `keyOrObject`. Only needed if `keyOrObject` is a string.
         * @returns {DataWrapper} - Returns the DataWrapper instance, allowing for method chaining.
         * @throws {Error} If no arguments are provided.
         * @throws {Error} If a single argument is provided that is not an object or is an array.
         */
        this.put = function(keyOrObject, value) {
            if (!keyOrObject && !value) {
                throw new Error("Please insert key and value or object which key-value pairs.");
            }
    
            if (value === undefined) {
                if (typeof keyOrObject !== 'object' || Array.isArray(keyOrObject)) {
                    throw new Error("Please insert an object with only its own key-value pairs.");
                }
                for (var key in keyOrObject) {
                    _put(key, keyOrObject[key]);
                }
            } else if (keyOrObject && value !== undefined) {
                _put(keyOrObject, value);
            }

            return this;
        };

        /**
         * Inserts a string value for a specified key.
         * @param {string} key - The key.
         * @param {string|number|boolean|bigint|symbol|null} value - The string or string-convertible value.
         * @returns {DataWrapper} - The DataWrapper instance for chaining.
         * @throws {Error} If the provided value is not convertible to a string.
         */
        this.putString = function(key, value) {
            if(typeof value !== 'string'
                && typeof value !== 'number'
                && typeof value !== 'boolean'
                && typeof value !== 'bigint'
                && typeof value !== 'symbol'
                && typeof value !== 'null') {
                throw new Error("Please insert only values convertible to string type.");
            }
            _put(key, value);
            return this;
        };
        
        /**
         * Inserts a data-model value for a specified key.
         * @param {string} key - The key.
         * @param {*} value - The data-model value.
         * @returns {DataWrapper} - The DataWrapper instance for chaining.
         * @throws {Error} If the provided value is not of data-model type.
         */
        this.putDataModel = function(key, value) {
            if(value !== null && !value.isDataModel) {
                throw new Error("Please insert only values of data-model type.");
            }
            _put(key, value);
            return this;
        };

        /**
         * Returns a deep copied object of the hidden _data for debugging purposes. This method allows 
         * inspection of _data's contents, which are not directly accessible due to closure.
         * 
         * Note: The deep copy ensures no reference to the original _data, preventing accidental mutations.
         * For 'datamodel' type objects, a deep copy is created using their 'getObject' method.
         * 
         * Use Case: Useful for logging or debugging _data's contents safely.
         * 
         * @returns {Object} A deep copied object of _data, enabling safe inspection while preserving the original data's integrity.
         */
        this.getObject = function() {
            var result = {};
            for(var key in _data) {
                if(_data[key] && _data[key].isDataModel) {
                    result[key] = _data[key].getObject();
                } else {
                    result[key] = _deepCopy(_data[key]);
                }
            }
            return result;
        };

        /**
         * Checks if the data contains the specified key.
         * @param {string} key - Key to check existence for.
         * @returns {boolean} - True if key exists, false otherwise.
         */
        this.containsKey = function(key) {
            return _data.hasOwnProperty(key);
        };
        
        /**
         * Checks if the data is empty.
         * @returns {boolean} - True if DataWrapper is empty, false otherwise.
         */
        this.isEmpty = function() {
            return Object.keys(_data).length === 0;
        };
        
        /**
         * Removes the specified key and its associated value.
         * @param {string} key - Key to remove.
         * @returns {DataWrapper} - The DataWrapper instance for chaining.
         */
        this.remove = function(key) {
            delete _data[key];
            return this;
        };
        
        /**
         * Retrieves the size (number of key-value pairs) of the data.
         * @returns {number} - The size of the data.
         */
        this.size = function() {
            return Object.keys(_data).length;
        };
        
        /**
         * Retrieves all the keys from the data.
         * @returns {string[]} - An array of all the keys.
         */
        this.keys = function() {
            return Object.keys(_data);
        };

        /**
         * Retrieves all values from the data.
         * Note: The returned object is a new instance, So it has no reference to the object stored in the DataWrapper.
         * @returns {Array} - An array of all the values.
         */
        this.values = function() {
            var values = [];
            for (var key in _data) {
                if (_data.hasOwnProperty(key)) {
                    values.push(_deepCopy(_data[key]));
                }
            }
            return values;
        };

        //create
        if (!keyOrObject && !value) {
            return;
        } else {
            this.put(keyOrObject, value);
        }
    }

    return function(keyOrObject, value) {
        return new DataWrapper(keyOrObject, value);
    };
})();

/******************************************
 * DATA MODEL
 ******************************************/
/**
 * DataModel is a JavaScript object for managing and manipulating a table-like data structure.
 * It provides methods to add, remove, sort, and filter rows and columns, and to perform various operations on the data.
 *
 * @constructor
 * @param {Array|Object} ArrayOrObject - An array or object to initialize the DataModel. 
 *                                       If an array of objects is provided, each object represents a row, and the keys represent the columns.
 *                                       If an array of strings is provided, it initializes the column names.
 *                                       If an object is provided, it initializes a single row with the object's key-value pairs.
 */
var newDataModel = (function() {
    function DataModel(ArrayOrObject) {
        var _cols = [];
        var _rows = [];

        var _deepCopy = function(object, visited) {
            if (object === null || typeof object !== 'object') {
                return object;
            }
            if (object.constructor !== Object && object.constructor !== Array) {
                return hison.data.convertObject ? hison.data.convertObject(object) : object;
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

        var _isPositiveIntegerIncludingZero = function(value) {
            if (typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'bigint') {
                return false;
            }
            var intNum = parseInt(value, 10);
            var floatNum = parseFloat(value, 10);
            if (intNum !== floatNum || isNaN(intNum) || intNum < 0) {
                return false;
            }
            return true;
        };

        var _getValidRowIndex = function(rowIndex) {
            if(!_isPositiveIntegerIncludingZero(rowIndex)) {
                throw new Error("Invalid number type. It should be a number or a string that can be converted to a number.");
            }
            const index = Number(rowIndex);
            if (index < 0 || index >= _rows.length) {
                throw new Error("Invalid rowIndex value. It should be within the range of the rows.");
            }
            return index;
        }

        var _isConvertibleString = function(value) {
            if(value === undefined) throw new Error("You can not put a value of undefined type.");
            if(value === null) return true;
            if(['string','number','boolean','bigint','symbol'].indexOf(typeof value) >= 0) {
                return true;
            } else {
                return false;
            }
        };

        var _hasColumn = function(column) {
            return _cols.indexOf(column) >= 0
        };

        var _checkColumn = function(column) {
            if(!_hasColumn(column)) {
                throw new Error("The column does not exist. column : " + column);
            }
        };

        var _checkValidFunction = function(func) {
            if(!func || typeof func !== 'function') {
                throw new Error("Please insert the valid function.");
            }
        };

        var _checkBoolean = function(value) {
            if(typeof value !== 'boolean') {
                throw new Error("Please pass an boolean as a parameter.");
            }
        };

        var _checkOriginObject = function(value) {
            if(value.constructor !== Object) {
                throw new Error("Please pass an object with its own key-value pairs as a parameter.");
            }
        };

        var _checkArray = function(value) {
            if(value.constructor !== Array) {
                throw new Error("Please pass an array.");
            }
        };

        var _getColumnType = function(col) {
            for(var row of _rows) {
                if(row[col]) {
                    if(typeof row[col] === 'object') {
                        if (row.constructor === Array) {
                            return 'array';
                        }
                        return 'object';
                    }
                    return typeof row[col];
                }
            }
            return 'null';
        };

        var _makeValue = function(value) {
            var result;
            if (typeof value === 'string') {
                result = value;
            } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
                result = String(value);
            } else if (typeof value === 'symbol') {
                result = value.description;
            } else if (value === null) {
                result = null;
            } else if (typeof value === 'object') {
                if(value.isDataWrapper || value.isDataModel) {
                    throw new Error("You cannot insert a datawrapper or datamodel within a datamodel.");
                }
                result = _deepCopy(value);
            }
            return result;
        };

        var _getValidColValue = function(value) {
            if(!_isConvertibleString(value)) {
                throw new Error("Only strings can be inserted into columns.");
            }
            value = _makeValue(value);
            if(!value) {
                throw new Error("Column cannot be null.");
            }
            return value;
        }

        var _getValidRowValue = function(col, value) {
            var chkType;
            value = _makeValue(value);
            chkType = _getColumnType(col);
            if(chkType !== 'null' && value !== null && chkType !== (typeof value)) {
                throw new Error("Data of the same type must be inserted into the same column. column : " + col);
            }
            return value;
        }

        var _addCol = function(value) {
            value = _getValidColValue(value);
            if (_cols.indexOf(value) === -1) {
                _cols.push(value);
            } else {
                throw new Error("There are duplicate columns to add. column : " + value);
            }
        }

        var _addRow = function(row) {
            if(!row) {
                throw new Error("Please insert vaild object");
            }
            if(row.constructor !== Object) {
                throw new Error("Please insert object with their own key-value pairs.");
            }
            if(Object.keys(row).length === 0) return;
            var tempRow = {};
            var tempkeys = Object.keys(row);
            if(_cols.length === 0) {
                for (var key in row) {
                    _addCol(key);
                }
            }
            for (var i = 0; i < tempkeys.length; i++) {
                if (_hasColumn(tempkeys[i])) {
                    tempRow[tempkeys[i]] = _getValidRowValue(tempkeys[i], row[tempkeys[i]]);
                }
            }
            for (var col of _cols) {
                if(!tempRow.hasOwnProperty(col)) {
                    tempRow[col] = null;
                }
            }
            _rows.push(tempRow);
        }

        var _put = function(ArrayOrObject) {
            if(Array.isArray(ArrayOrObject)) {
                if(ArrayOrObject.length === 0) return;
                if(_isConvertibleString(ArrayOrObject[0])) {
                    for(var col of ArrayOrObject) {
                        _addCol(col);
                    }
                    return;
                } else {
                    for(var row of ArrayOrObject) {
                        _addRow(row);
                    }
                    return;
                }
            } else if (typeof ArrayOrObject === 'object') {
                if(ArrayOrObject.isDataWrapper) {
                    throw new Error("You cannot construct a datamodel with datawrapper.");
                } else if (ArrayOrObject.isDataModel){
                    for(var row of ArrayOrObject.getRows()) {
                        _addRow(row);
                    }
                    return;
                } else if (ArrayOrObject.constructor === Object) {
                    _addRow(ArrayOrObject);
                    return;
                }
            }
            throw new Error("Please insert array contains objects with their own key-value pairs, array contains strings or only object of key-value pairs.");
        };

        /**
         * A boolean property indicating whether the object is an instance of DataModel.
         * This property is always true for instances of DataModel.
         * It is used to check if an object is a DataModel instance.
         *
         * @type {boolean}
         * @example
         * // Check if an object is a DataModel instance
         * if (someObject.isDataModel) {
         *     console.log('This is a DataModel instance.');
         * } else {
         *     console.log('This is not a DataModel instance.');
         * }
         */
        this.isDataModel = true;

        /**
         * Creates and returns a deep-copied new DataModel instance.
         * 
         * @return {DataModel} A new DataModel instance, cloned from the current model.
         */
        this.clone = function() {
            return newDataModel(_rows);
        }
        /**
         * Clears all columns and rows from the DataModel.
         * Resets the DataModel to its initial empty state.
         * 
         * @return {DataModel} The DataModel instance itself for chaining.
         */
        this.clear = function() {
            _cols = [];
            _rows = [];
            return this;
        }

        /**
         * Serializes the DataModel object's rows into a JSON string.
         * This method is specifically used for converting the 'rows' data of the DataModel into a JSON format suitable for server communication.
         *
         * Note: Directly using JSON.stringify on the DataModel object itself may not yield the desired result for the 'rows' data.
         * To serialize the 'rows' of a DataModel object into JSON, always use the getSerialized method.
         *
         * @returns {string} A JSON string representation of the DataModel's rows.
         */
        this.getSerialized = function() {
            return JSON.stringify(_rows);
        }

        /**
         * Checks if the DataModel is declared.
         * @returns {boolean} - True if DataModel is declared, false otherwise. Determine whether there is a defined column.
         */
        this.isDeclare = function() {
            return _cols.length > 0;
        };

        /**
         * Retrieves a deep copy of the columns array.
         * Prevents direct modifications to the internal columns array.
         * 
         * @return {Array} Deep copy of the columns.
         */
        this.getColumns = function() {
            return _deepCopy(_cols);
        };

        /**
         * Retrieves all values for a specified column in the DataModel.
         * Each value is a deep copy to prevent modifications to the original data.
         * 
         * @param {string} column The name of the column to retrieve values from.
         * @return {Array} An array of values from the specified column.
         * @throws {Error} If the column name is invalid or does not exist.
         */
        this.getColumnValues = function(column) {
            column = _getValidColValue(column);
            _checkColumn(column);
            var result = [];
            for(var row of _rows) {
                result.push(_deepCopy(row[column]));
            }
            return result;
        };

        /**
         * Adds a new column to the DataModel. If the column does not exist in a row, initializes it with null.
         * 
         * @param {string} column The name of the column to add.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the column name is invalid or already exists.
         */
        this.addColumn = function(column) {
            _addCol(column);
            for(var row of _rows) {
                if(!row.hasOwnProperty(column)) {
                    row[column] = null;
                }
            }
            return this;
        };

        /**
         * Adds multiple new columns to the DataModel. Initializes any non-existing columns in rows with null.
         * 
         * @param {Array<string>} columns An array of column names to add.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the input is not an array of strings or if any column name is invalid or already exists.
         */
        this.addColumns = function(columns) {
            if(!Array.isArray(columns)) {
                throw new Error("Only array contains strings can be inserted into columns.");
            }
            for(var column of columns) {
                _addCol(column);
                for(var row of _rows) {
                    if(!row.hasOwnProperty(column)) {
                        row[column] = null;
                    }
                }
            }
            return this;
        };

        /**
         * Sets the same value for all rows in the specified column. The value is converted to a string before insertion.
         * Only values that can be converted to a string should be used.
         * 
         * @param {string} column The name of the column to set values for.
         * @param {*} value The value to set for each row in the column, which will be converted to a string.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the value is undefined, not convertible to a string, column name is invalid or does not exist.
         */
        this.setColumnSameValue = function(column, value) {
            if(value === undefined) throw new Error("You can not put a value of undefined type.");
            column = _getValidColValue(column);
            _checkColumn(column);
            for(var row of _rows) {
                row[column] = _getValidRowValue(column, value);
            }
            return this;
        };

        /**
         * Applies a formatter function to all values in the specified column.
         * The result of the formatter must be convertible to a string.
         * 
         * @param {string} column The name of the column to format values for.
         * @param {Function} formatter The function to apply to each value in the column.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the formatter is not a function, if the value produced by the formatter is not convertible to a string, if the column name is invalid, or does not exist.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.setColumnSameFormat("userName", (v) => v.toUpperCase());
         */
        this.setColumnSameFormat = function(column, formatter) {
            _checkValidFunction(formatter);
            column = _getValidColValue(column);
            _checkColumn(column);
            for(var row of _rows) {
                row[column] = _getValidRowValue(column, formatter(row[column]));
            }
            return this;
        }

        /**
         * Retrieves a deep copy of the row at the specified index.
         * 
         * @param {number} rowIndex The index of the row to retrieve.
         * @return {Object} A deep copy of the row at the given index.
         * @throws {Error} If the rowIndex is not a valid positive integer or out of range.
         */
        this.getRow = function(rowIndex) {
            return _deepCopy(_rows[_getValidRowIndex(rowIndex)]);
        }

        /**
         * Creates and returns a new DataModel instance using the row at the specified index.
         * 
         * @param {number} rowIndex The index of the row to create a new DataModel from.
         * @return {DataModel} A new DataModel instance created from the specified row.
         * @throws {Error} If the rowIndex is not a valid positive integer or out of range.
         */
        this.getRowAsDataModel = function(rowIndex) {
            return newDataModel(_rows[_getValidRowIndex(rowIndex)]);
        }

        /**
         * Adds a new row to the DataModel at the specified index or at the end.
         * This method can be used in four different ways based on the provided parameters:
         * 1. No parameters: Adds an empty row at the end of the DataModel. Each column in the row is initialized with null.
         * 2. rowIndex (number) only: Adds an empty row at the specified index. Each column in the row is initialized with null.
         * 3. row (object) only: Adds the provided row object at the end of the DataModel.
         * 4. rowIndex (number) and row (object): Inserts the provided row object at the specified index in the DataModel.
         *
         * @param {number|object} [rowIndex] - The index at which to add the row. If rowIndex is an object, it is treated as the row to add.
         * @param {object} [row] - The row object to add. If rowIndex is a number, row is inserted at rowIndex, otherwise added at the end.
         * @throws {Error} If rowIndex is not a valid number or out of range, if columns are not defined, or if parameters are invalid.
         * @return {DataModel} The DataModel instance itself for chaining.
         *
         * @example
         * // Add an empty row at the end
         * dataModel.addRow();
         * 
         * @example
         * // Add an empty row at index 2
         * dataModel.addRow(2);
         * 
         * @example
         * // Add a row object at the end
         * dataModel.addRow({name: 'John', age: 30});
         * 
         * @example
         * // Insert a row object at index 1
         * dataModel.addRow(1, {name: 'Jane', age: 25});
         */
        this.addRow = function(rowIndex, row) {
            if (rowIndex === undefined && row === undefined) {
                if(_cols.length <= 0) {
                    throw new Error("Please define the column first.");
                }
                var emptyRow = {};
                for (var col of _cols) {
                    emptyRow[col] = null;
                }
                _rows.push(emptyRow);
            } else if (typeof rowIndex === 'number' && row === undefined) {
                if(_cols.length <= 0) {
                    throw new Error("Please define the column first.");
                }
                var validIndex = _getValidRowIndex(rowIndex);
                var emptyRow = {};
                for (var col of _cols) {
                    emptyRow[col] = null;
                }
                _rows.splice(validIndex, 0, emptyRow);
            } else if (typeof rowIndex === 'object' && row === undefined) {
                _addRow(rowIndex);
            } else if (typeof rowIndex === 'number' && typeof row === 'object') {
                var validIndex = _getValidRowIndex(rowIndex);
                _addRow(row);
                var newRow = _rows.pop();
                _rows.splice(validIndex, 0, newRow);
            } else {
                throw new Error("Invalid parameters for addRow method.");
            }
            return this;
        };
        
        /**
         * Retrieves a deep copy of all rows in the DataModel.
         * 
         * @return {Array} A deep copy of all rows.
         */
        this.getRows = function() {
            return _deepCopy(_rows);
        }

        /**
         * Adds multiple rows to the DataModel.
         * 
         * @param {Array<Object>|Array<string>} rows An array of rows or column names to add.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the input rows are not in the correct format or if there's an issue with the row content.
         */
        this.addRows = function(rows) {
            _put(rows);
            return this;
        }

        /**
         * Generates a deep copied snapshot of the current state of the object. This method is designed 
         * to provide a safe way to access and debug the internal state of the object without risking 
         * mutation or alteration of the original data.
         * 
         * Note: It ensures no direct reference to the private variables _cols and _rows, safeguarding 
         * the integrity of the original data.
         * 
         * Use Case: Ideal for debugging, logging, or transferring the object's state in a secure manner.
         * 
         * @returns {Object} An object containing deep copies of the columns and rows, along with additional 
         *                   information such as column count, row count, and the declaration status of the object.
         *                   This enables a comprehensive yet safe overview of the object's current state.
         */
        this.getObject = function() {
            var result = {};
            var copyCol = _deepCopy(_cols);
            var copyRow = _deepCopy(_rows);

            result['cols'] = copyCol;
            result['rows'] = copyRow;
            result['colCount'] = copyCol.length;
            result['rowCount'] = copyRow.length;
            result['isDeclare'] = this.isDeclare();
            return result;
        };

        /**
         * Retrieves a deep copy of the value at the specified row index and column.
         * 
         * @param {number} rowIndex The index of the row.
         * @param {string} column The name of the column.
         * @return {*} A deep copy of the value at the given row and column.
         * @throws {Error} If the rowIndex is not a valid positive integer, out of range, or if the column name is invalid or does not exist.
         */
        this.getValue = function(rowIndex, column) {
            column = _getValidColValue(column);
            _checkColumn(column);
            return _deepCopy(_rows[_getValidRowIndex(rowIndex)][column]);
        };

        /**
         * Sets the value for a specific row and column. The value is converted to a string before insertion.
         * Only values that can be converted to a string should be used.
         * 
         * @param {number} rowIndex The index of the row.
         * @param {string} column The name of the column.
         * @param {*} value The value to set, which will be converted to a string.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the value is undefined, not convertible to a string, if the rowIndex or column name is invalid, or does not exist.
         */
        this.setValue = function(rowIndex, column, value) {
            if(value === undefined) throw new Error("You can not put a value of undefined type.");
            column = _getValidColValue(column);
            _checkColumn(column);
            _rows[_getValidRowIndex(rowIndex)][column] = _getValidRowValue(column, value);
            return this;
        };

        /**
         * Removes the specified column from the DataModel.
         * 
         * @param {string} column The name of the column to remove.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the column name is invalid or does not exist.
         */
        this.removeColumn = function(column) {
            column = _getValidColValue(column);
            _checkColumn(column);
            for(var row of _rows) {
                delete row[column]
            }
            _cols = _cols.filter(oriColumn => oriColumn !== column);
            return this;
        };

        /**
         * Removes multiple columns from the DataModel.
         * 
         * @param {Array<string>} columns An array of column names to remove.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If any of the column names are invalid or do not exist.
         */
        this.removeColumns = function(columns) {
            for(var column of columns) {
                this.removeColumn(column);
            }
            return this;
        };

        /**
         * Removes multiple columns from the DataModel.
         * 
         * @param {Array<string>} columns An array of column names to remove.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If any of the column names are invalid or do not exist.
         */
        this.removeRow = function(rowIndex) {
            return _rows.splice(_getValidRowIndex(rowIndex), 1)[0];
        };

        /**
         * Retrieves the count of columns in the DataModel.
         * 
         * @return {number} The number of columns in the DataModel.
         */
        this.getColumnCount = function() {
            return _cols.length;
        };

        /**
         * Retrieves the count of rows in the DataModel.
         * 
         * @return {number} The number of rows in the DataModel.
         */
        this.getRowCount = function() {
            return _rows.length;
        };

        /**
         * Checks if the data contains the specified key.
         * @param {string} key - Key to check existence for.
         * @returns {boolean} - True if key exists, false otherwise.
         */
        this.hasColumn = function(column) {
            return _hasColumn(column);
        };

        /**
         * Retains only the specified columns in the DataModel and removes all others.
         * 
         * @param {Array<string>} columns An array of column names to retain in the DataModel.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If any of the specified columns are not present in the DataModel.
         */
        this.setValidColumns = function(columns) {
            columns = _cols.filter(oriColumn => !columns.includes(oriColumn));
            this.removeColumns(columns);
            return this;
        };

        var _getNullColumnFirstRowIndex = function(column) {
            column = _getValidColValue(column);
            _checkColumn(column);
            for(var i = 0; i < _rows.length; i++) {
                if(_rows[i][column] === null) return i;
            }
            return -1;
        }

        /**
         * Checks if the specified column contains no null values.
         * 
         * @param {string} column The name of the column to check.
         * @return {boolean} True if the column contains no null values, otherwise false.
         * @throws {Error} If the column name is invalid or does not exist.
         */
        this.isNotNullColumn = function(column) {
            return _getNullColumnFirstRowIndex(column) === -1;
        };

        /**
         * Finds and returns the first row with a null value in the specified column.
         * 
         * @param {string} column The name of the column to check for a null value.
         * @return {Object|null} The first row with a null value in the specified column, or null if no such row exists.
         * @throws {Error} If the column name is invalid or does not exist.
         */
        this.findFirstRowNullColumn = function(column) {
            var nullColumnFirstRowIndex = _getNullColumnFirstRowIndex(column);
            if (nullColumnFirstRowIndex === -1) {
                return null
            } else {
                return this.getRow(nullColumnFirstRowIndex);
            }
        };

        var _getDuplColumnFirstRowIndex = function(column) {
            column = _getValidColValue(column);
            _checkColumn(column);
            var checkedValues = [];
            for(var i = 0; i < _rows.length; i++) {
                if(checkedValues.includes(_rows[i][column])) {
                    return i;
                }
                if(_rows[i][column] !== null) {
                    checkedValues.push(_rows[i][column]);
                }
            }
            return -1;
        };

        /**
         * Checks if the specified column contains no duplicate values.
         * 
         * @param {string} column The name of the column to check for duplicate values.
         * @return {boolean} True if the column contains no duplicate values, otherwise false.
         * @throws {Error} If the column name is invalid or does not exist.
         */
        this.isNotDuplColumn = function(column) {
            return _getDuplColumnFirstRowIndex(column) === -1;
        };

        /**
         * Finds and returns the first row with a duplicate value in the specified column.
         * 
         * @param {string} column The name of the column to check for a duplicate value.
         * @return {Object|null} The first row with a duplicate value in the specified column, or null if no such row exists.
         * @throws {Error} If the column name is invalid or does not exist.
         */
        this.findFirstRowDuplColumn = function(column) {
            var duplColumnFirstRowIndex = _getDuplColumnFirstRowIndex(column);
            if (duplColumnFirstRowIndex === -1) {
                return null
            } else {
                return this.getRow(duplColumnFirstRowIndex);
            }
        };

        var _getInValidColumnFirstRowIndex = function(column, validator) {
            _checkValidFunction(validator);
            column = _getValidColValue(column);
            _checkColumn(column);
            
            for(var i = 0; i < _rows.length; i++) {
                if(!validator(_rows[i][column])) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Checks if all values in the specified column satisfy the provided validator function.
         * 
         * @param {string} column The name of the column to check.
         * @param {Function} validator The function to apply to each value in the column.
         * @return {boolean} True if all values in the column satisfy the validator, otherwise false.
         * @throws {Error} If the validator is not a function, if the column name is invalid, or does not exist.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.isValidValue("age", (v) => !isNaN(parseInt(v, 10)));
         */
        this.isValidValue = function(column, vaildator) {
            return _getInValidColumnFirstRowIndex(column, vaildator) === -1;
        };
        
        /**
         * Finds and returns the first row with a value in the specified column that does not satisfy the provided validator function.
         * 
         * @param {string} column The name of the column to check for invalid values.
         * @param {Function} validator The function to apply to each value in the column.
         * @return {Object|null} The first row with an invalid value in the specified column, or null if no such row exists.
         * @throws {Error} If the validator is not a function, if the column name is invalid, or does not exist.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.findFirstRowInvalidValue("age", (v) => !isNaN(parseInt(v, 10)));
         */
        this.findFirstRowInvalidValue = function(column, vaildator) {
            var inValidColumnFirstRowIndex = _getInValidColumnFirstRowIndex(column, vaildator);
            if (inValidColumnFirstRowIndex === -1) {
                return null
            } else {
                return this.getRow(inValidColumnFirstRowIndex);
            }
        };
        
        /**
         * Searches for row indexes that match (or do not match if isNegative is true) the provided condition.
         * 
         * @param {Object} condition The condition to match against each row.
         * @param {boolean} [isNegative=false] If true, returns indexes of rows that do not match the condition.
         * @return {Array} An array of row indexes that match the condition.
         * @throws {Error} If the condition is not an object, if isNegative is not a boolean, or if a column in the condition does not exist.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.searchRowIndexes({name: 'John'});
         */
        this.searchRowIndexes = function(condition, isNegative) {
            _checkOriginObject(condition);
            if(!isNegative) isNegative = false;
            _checkBoolean(isNegative);
            var matched = [];
            _rows.forEach(function(row, index) {
                var matchesCondition = true;
                for (var key in condition) {
                    _checkColumn(key);
                    if ((row[key] !== condition[key])) {
                        matchesCondition = false;
                        break;
                    }
                }
                if(isNegative) {
                    if(!matchesCondition) matched.push(index);
                } else {
                    if(matchesCondition) matched.push(index);
                }
            });
            return matched;
        };
        
        /**
         * Searches for rows that match (or do not match if isNegative is true) the provided condition.
         * Returns deep copies of the matching rows.
         * 
         * @param {Object} condition The condition to match against each row.
         * @param {boolean} [isNegative=false] If true, returns rows that do not match the condition.
         * @return {Array} An array of deep copied rows that match the condition.
         * @throws {Error} If the condition is not an object, if isNegative is not a boolean, or if a column in the condition does not exist.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.searchRows({name: 'John'}, true);
         */
        this.searchRows = function(condition, isNegative) {
            _checkOriginObject(condition);
            if(!isNegative) isNegative = false;
            _checkBoolean(isNegative);
            var matched = [];
            _rows.forEach(function(row) {
                var matchesCondition = true;
                for (var key in condition) {
                    _checkColumn(key);
                    if ((row[key] !== condition[key])) {
                        matchesCondition = false;
                        break;
                    }
                }
                if(isNegative) {
                    if(!matchesCondition) matched.push(_deepCopy(row));
                } else {
                    if(matchesCondition) matched.push(_deepCopy(row));
                }
            });
            return matched;
        };

        /**
         * Searches for rows that match (or do not match if isNegative is true) the provided condition and returns them as a new DataModel instance.
         * 
         * @param {Object} condition The condition to match against each row.
         * @param {boolean} [isNegative=false] If true, returns rows that do not match the condition as a new DataModel.
         * @return {DataModel} A new DataModel instance with the rows that match the condition.
         * @throws {Error} If the condition is not an object, if isNegative is not a boolean, or if a column in the condition does not exist.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.searchRowsAsDataModel({name: 'John'}, true);
         */
        this.searchRowsAsDataModel = function(condition, isNegative) {
            _checkOriginObject(condition);
            if(!isNegative) isNegative = false;
            _checkBoolean(isNegative);
            var matched = [];
            _rows.forEach(function(row) {
                var matchesCondition = true;
                for (var key in condition) {
                    _checkColumn(key);
                    if ((row[key] !== condition[key])) {
                        matchesCondition = false;
                        break;
                    }
                }
                if(isNegative) {
                    if(!matchesCondition) matched.push(row);
                } else {
                    if(matchesCondition) matched.push(row);
                }
            });
            return newDataModel(matched);
        };
        
        /**
         * Removes rows that match (or do not match if isNegative is true) the provided condition.
         * 
         * @param {Object} condition The condition to match against each row.
         * @param {boolean} [isNegative=false] If true, removes rows that match the condition; if false, removes rows that do not match.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the condition is not an object, if isNegative is not a boolean, or if a column in the condition does not exist.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.searchAndModify({name: 'John'});
         */
        this.searchAndModify = function(condition, isNegative) {
            _checkOriginObject(condition);
            if(!isNegative) isNegative = false;
            _checkBoolean(isNegative);
            for (var i = 0; i < _rows.length; i++ ){
                var matchesCondition = true;
                for (var key in condition) {
                    _checkColumn(key);
                    if ((_rows[i][key] !== condition[key])) {
                        matchesCondition = false;
                        break;
                    }
                }
                if(isNegative) {
                    if(matchesCondition) {
                        _rows.splice(i, 1);
                        i--;
                    }
                } else {
                    if(!matchesCondition) {
                        _rows.splice(i, 1);
                        i--;
                    }
                }
            }
            return this;
        };
        
        /**
         * Filters row indexes based on a provided filter function.
         * 
         * @param {Function} filter The filter function to apply to each row.
         * @return {Array} An array of row indexes that satisfy the filter function.
         * @throws {Error} If the filter is not a valid function.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.filterRowIndexes(function(row) {
         *     var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
         *     return row.email && emailRegex.test(row.email);
         * });
         */
        this.filterRowIndexes = function(filter) {
            _checkValidFunction(filter);
            var matched = [];
            _rows.forEach(function(row, index) {
                if(filter(row)) {
                    matched.push(index);
                }
            });
            return matched;
        };
        
        /**
         * Filters rows based on a provided filter function. Returns deep copies of the matching rows.
         * 
         * @param {Function} filter The filter function to apply to each row.
         * @return {Array} An array of deep copied rows that satisfy the filter function.
         * @throws {Error} If the filter is not a valid function.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.filterRows(function(row) {
         *     return row.age && row.age > 30;
         * });
         */
        this.filterRows = function(filter) {
            _checkValidFunction(filter);
            var matched = [];
            _rows.forEach(function(row) {
                if(filter(row)) {
                    matched.push(_deepCopy(row));
                }
            });
            return matched;
        };
        
        /**
         * Filters rows based on a provided filter function and returns them as a new DataModel instance.
         * 
         * @param {Function} filter The filter function to apply to each row.
         * @return {DataModel} A new DataModel instance with the rows that satisfy the filter function.
         * @throws {Error} If the filter is not a valid function.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.filterRows(function(row) {
         *     return row.age && row.age > 30;
         * });
         */
        this.filterRowsAsDataModel = function(filter) {
            _checkValidFunction(filter);
            var matched = [];
            _rows.forEach(function(row) {
                if(filter(row)) {
                    matched.push(row);
                }
            });
            return newDataModel(matched);
        };
        
        /**
         * Modifies the DataModel by removing rows that do not satisfy the provided filter function.
         * 
         * @param {Function} filter The filter function to apply to each row.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the filter is not a valid function.
         * 
         * @example
         * var dm = newDataModel([someRows]);
         * dm.filterRowIndexes(function(row) {
         *     var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
         *     return row.email && emailRegex.test(row.email);
         * });
         */
        this.filterAndModify = function(filter) {
            _checkValidFunction(filter);
            for (var i = 0; i < _rows.length; i++ ){
                if(!filter(_rows[i])) {
                    _rows.splice(i, 1);
                    i--;
                }
            }
            return this;
        };
        
        /**
         * Reorders the columns in the DataModel based on the specified array.
         * Columns not included in the array will be ordered as they were originally.
         * 
         * @param {Array<string>} columns An array of column names to order.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the input is not an array, or if any column name is invalid or does not exist.
         */
        this.setColumnSorting = function(columns) {
            _checkArray(columns);
            var newColumns = [];
            for(var column of columns) {
                column = _getValidColValue(column);
                _checkColumn(column);
                newColumns.push(column);
            }
            for(var column of _cols) {
                if(!newColumns.includes(column)) {
                    newColumns.push(column)
                }
            }
            _cols = newColumns;
            return this;
        };
        
        /**
         * Sorts the columns in the DataModel in ascending alphabetical order.
         * 
         * @return {DataModel} The DataModel instance itself for chaining.
         */
        this.sortColumnAscending = function() {
            _cols.sort();
            return this;
        };
        
        /**
         * Sorts the columns in the DataModel in descending alphabetical order.
         * 
         * @return {DataModel} The DataModel instance itself for chaining.
         */
        this.sortColumnDescending = function() {
            _cols.sort(function(a, b) {
                if (a > b) {
                    return -1;
                }
                if (a < b) {
                    return 1;
                }
                return 0;
            });
            return this;
        };
        
        /**
         * Reverses the order of columns in the DataModel.
         * 
         * @return {DataModel} The DataModel instance itself for chaining.
         */
        this.sortColumnReverse = function() {
            _cols.reverse();
            return this;
        };
        
        /**
         * Sorts the rows in the DataModel in ascending order based on the specified column.
         * Can optionally sort integer values if isIntegerOrder is true.
         * 
         * @param {string} column The name of the column to sort by.
         * @param {boolean} [isIntegerOrder=false] If true, sorts by integer value, otherwise sorts by string value.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the column name is invalid, does not exist, if the value is an object, or if a non-integer value is encountered when isIntegerOrder is true.
         */
        this.sortRowAscending = function(column, isIntegerOrder) {
            column = _getValidColValue(column);
            _checkColumn(column);
            if(!isIntegerOrder) isIntegerOrder = false;
            _checkBoolean(isIntegerOrder);
            _rows.sort(function(a, b) {
                var valueA = a[column];
                var valueB = b[column];
                if (valueA === null || valueB === null) {
                    return valueA === null ? 1 : -1;
                }
                if (typeof valueA === 'object' || typeof valueB === 'object') {
                    throw new Error("Cannot sort rows: value is an object.");
                }
                if (isIntegerOrder) {
                    valueA = parseInt(valueA, 10);
                    valueB = parseInt(valueB, 10);
                    if (isNaN(valueA) || isNaN(valueB)) {
                        throw new Error("Cannot sort rows: non-integer value encountered.");
                    }
                }
                if (valueA < valueB) {
                    return -1;
                }
                if (valueA > valueB) {
                    return 1;
                }
                return 0;
            });
            return this;
        };
        
        /**
         * Sorts the rows in the DataModel in descending order based on the specified column.
         * Can optionally sort integer values if isIntegerOrder is true.
         * 
         * @param {string} column The name of the column to sort by.
         * @param {boolean} [isIntegerOrder=false] If true, sorts by integer value, otherwise sorts by string value.
         * @return {DataModel} The DataModel instance itself for chaining.
         * @throws {Error} If the column name is invalid, does not exist, if the value is an object, or if a non-integer value is encountered when isIntegerOrder is true.
         */
        this.sortRowDescending = function(column, isIntegerOrder) {
            column = _getValidColValue(column);
            _checkColumn(column);
            if(!isIntegerOrder) isIntegerOrder = false;
            _checkBoolean(isIntegerOrder);
            _rows.sort(function(a, b) {
                var valueA = a[column];
                var valueB = b[column];
                if (valueA === null || valueB === null) {
                    return valueA === null ? -1 : 1;
                }
                if (typeof valueA === 'object' || typeof valueB === 'object') {
                    throw new Error("Cannot sort rows: value is an object.");
                }
                if (isIntegerOrder) {
                    valueA = parseInt(valueA, 10);
                    valueB = parseInt(valueB, 10);
                    if (isNaN(valueA) || isNaN(valueB)) {
                        throw new Error("Cannot sort rows: non-integer value encountered.");
                    }
                }
                if (valueA < valueB) {
                    return 1;
                }
                if (valueA > valueB) {
                    return -1;
                }
                return 0;
            });
            return this;
        };
        
        /**
         * Reverses the order of rows in the DataModel.
         * 
         * @return {DataModel} The DataModel instance itself for chaining.
         */
        this.sortRowReverse = function() {
            _rows.reverse();
            return this;
        };

        //create
        if (!ArrayOrObject) {
            return;
        }
        if(ArrayOrObject) {
            _put(ArrayOrObject);
        }
    }

    return function(ArrayOrObject) {
        return new DataModel(ArrayOrObject);
    }
})();

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
 * - WebSocket Integration: Manages a WebSocket connection using a URL derived from hison.caching configuration.
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

        var _limit = hison.caching.limit;
        var _webSocketUrl = hison.caching.protocol + hison.link.domain + hison.caching.wsEndPoint;
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
 * It should be used in conjunction with the Maven Java project 'com.example.demo.commondev.api-link' for seamless integration and functionality.
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
 * Note: The usage of this module is tied closely to the 'com.example.demo.commondev.api-link' Maven Java project. Ensure that the project is included in your Java backend for full compatibility and functionality.
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
        var _rootUrl = hison.link.protocol + hison.link.domain;
        var _controllerPath = hison.link.controllerPath;
        var _timeout = hison.link.timeout;
        var _doLogging = false;
        var _cachingModule = null;
        var _beforeGetRequst = hison.link.beforeGetRequst;
        var _beforePostRequst = hison.link.beforePostRequst;
        var _beforePutRequst = hison.link.beforePutRequst;
        var _beforePatchRequst = hison.link.beforePatchRequst;
        var _beforeDeleteRequst = hison.link.beforeDeleteRequst;
        var _beforeCallbackWorked = hison.link.beforeCallbackWorked;
        var _callbackErrorFunc = hison.link.beforeCallbackError;

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
 * SHIELD
 ******************************************/
/**
 * Initializes and executes the security measures for the web client.
 * This includes freezing the hison object, preventing navigation back actions,
 * and disabling the developer tools under certain conditions.
 * 
 * @returns {Function} A function that, when called, tries to execute the defined security measures
 * and logs any errors encountered during the execution. It returns true if the execution
 * is successful, false otherwise.
 * 
 * @example
 * hisonShield(); // Initializes and executes the security measures.
 * 
 * @description
 * The hisonShield function encapsulates several security features:
 * - Deep freezing the hison object to make it immutable.
 * - Blocking the back navigation if `isPossibleGoBack` is set to false.
 * - Preventing the opening of developer tools if `isPossibleOpenDevTool` is set to false.
 * It utilizes a Shield class to manage these features. The actual execution of the
 * security measures is conditionally based on the configuration provided in the
 * `hison.shield` object.
 * 
 * ### Configuration Properties (`hison.shield`)
 * - `shieldURL` (String): Specifies the URL to apply the shield.
 * - `exposeIpList` (Array): Lists the IPs to be excluded from shielding.
 * - `isFreeze` (Boolean): Determines whether to freeze the hison object.
 * - `isSheld` (Boolean): Indicates whether to apply the shield.
 * - `isPossibleGoBack` (Boolean): Controls the ability to use the back navigation.
 * - `isPossibleOpenDevTool` (Boolean): Controls the ability to open developer tools.
 * 
 * The shield is designed to enhance client-side security by preventing unauthorized
 * modifications and access to developer tools, thereby safeguarding the application
 * from potential vulnerabilities and exploits.
 */
var hisonShield = (function() {
    function Shield() {
        var deepFreeze = function (object) {
            var propNames = Object.getOwnPropertyNames(object);
        
            propNames.forEach(function(name) {
                var prop = object[name];
        
                if (typeof prop == 'object' && prop !== null) {
                    deepFreeze(prop);
                }
            });
        
            return Object.freeze(object);
        }

        var shieldFuncGetIp = function (func) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = () => {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        var result = httpRequest.response;
                        func(result);
                    } else {
                        func(null);
                    }
                }
            };
            httpRequest.open('get', '/ajax/getIp');
            httpRequest.responseType = 'json';
            httpRequest.send();
        }

        var shieldFuncCreateBlockDevMode = function () {
            var msg = "Developer mode is not available.";
            document.onkeydown = function(event) {
                if (event.key === "F12") {
                    alert(msg);
                    event.preventDefault();
                    return false;
                }
            };
            
            function detectDevTool(allow) {
                if (isNaN(+allow)) allow = 100;
                var start = +new Date();
                debugger;
                var end = +new Date();
                if (isNaN(start) || isNaN(end) || end - start > allow) {
                    alert(msg);
                    document.write(msg);
                }
            }
            
            if(window.attachEvent) {
                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                    detectDevTool();
                    window.attachEvent('onresize', detectDevTool);
                    window.attachEvent('onmousemove', detectDevTool);
                    window.attachEvent('onfocus', detectDevTool);
                    window.attachEvent('onblur', detectDevTool);
                } else {
                    setTimeout(argument.callee, 0);
                }
            } else {
                window.addEventListener('load', detectDevTool);
                window.addEventListener('resize', detectDevTool);
                window.addEventListener('mousemove', detectDevTool);
                window.addEventListener('focus', detectDevTool);
                window.addEventListener('blur', detectDevTool);
            }
        }

        this.excute = function() {
            if(hison.shield.isFreeze && hison.constructor === Object) {
                deepFreeze(hison);
            }
            
            if (hison.shield.isSheld && location.href.indexOf('localhost') < 0){
                if (hison.shield.shieldURL && location.href.indexOf(hison.shield.shieldURL) < 0 ){
                    return;
                }

                shieldFuncGetIp(function (response) {
                    var ip = response && response.ip ? response.ip : '';
                    if(ip && hison.shield.exposeIpList.indexOf(ip) >= 0) {
                        return;
                    }

                    if (!hison.shield.isPossibleGoBack) {
                        history.pushState(null, document.title, location.href);
                        window.addEventListener('popstate', function(event) {
                            history.pushState(null, document.title, location.href);
                        });
                    }
                    
                    if(!hison.shield.isPossibleOpenDevTool) {
                        shieldFuncCreateBlockDevMode();
                        return;
                    }
                });
            }
        }
    }
    return function() {
        var shield = new Shield();
        try {
            shield.excute();
            return true;
        } catch (error) {
            console.log('error',error);
            return false;
        }
    };
})();
