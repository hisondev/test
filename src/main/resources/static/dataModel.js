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
                return hison.data.convertValue ? hison.data.convertValue(object) : object;
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
 * Global variable hison
 ******************************************/
/**
 * Provides a user-definable function for customizing the deep copy behavior of specific values in DataModel.
 * By default, this function returns the value as is, which means non-primitive values (excluding plain values and arrays) are not deeply copied.
 * Users can override this function to implement custom deep copy logic for certain value types that cannot be deeply copied by default.
 *
 * @global
 * @function
 * @param {any} value - The value to be potentially transformed during deep copying.
 * @returns {any} The transformed value. By default, returns the input value as is.
 *                   Users can override to handle specific value types, like converting Date values to a formatted string.
 *
 * @example
 * // Overriding the function to handle Date valuse
 * hison.data.convertValue = function(value) {
 *     if (value instanceof Date) {
 *         var year = value.getFullYear();
 *         var month = value.getMonth() + 1; // getMonth()는 0부터 시작
 *         var day = value.getDate();
 *         month = month < 10 ? '0' + month : month;
 *         day = day < 10 ? '0' + day : day;
 *         return year + '. ' + month + '. ' + day; // Custom handling for Date valuse
 *     }
 *     return value; // Default behavior for other valuse
 * };
 */
if(!hison) {
    var hison = {
        data : {
            convertValue : function(value) {
                return value;
            },
        },
    };
}