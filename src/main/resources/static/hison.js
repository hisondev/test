/**
 * The Hison object is a container for configuration values and methods required for using the hisondev solution.
 * It includes the following sub-objects:
 * 
 * - Hison.const: Contains constants required for overall configuration.
 * - Hison.data: Provides functionalities for DataWrapper and DataModel.
 * - Hison.link: Offers features necessary for ApiLink.
 * - Hison.caching: Includes functionalities for the caching module.
 * - Hison.utils: A collection of various common utility methods.
 * 
 * The Hison object is finally defined in the shield.js file through the finalDefineHison() method.
 * After its definition, it is frozen and hidden to prevent external access and modification.
 *
 * @namespace Hison
 */
var Hison ={};
(function() {
    Hison.const = {};
    Hison.const.LESSOREQ_0X7FF_BYTE = 2;    //charCode <= 0x7FF
    Hison.const.LESSOREQ_0XFFFF_BYTE = 3;   //charCode <= 0xFFFF
    Hison.const.GREATER_0XFFFF_BYTE = 4;    //charCode > 0xFFFF

    /******************************************
     * Data
     ******************************************/
    Hison.data = {};
    Hison.data.convertObject = function(object) {
        return object;
    }

    /******************************************
     * Link
     ******************************************/
    Hison.link = {};
    Hison.link.protocol = 'http://';
    Hison.link.domain = 'localhost:8081';
    Hison.link.controllerPath = '/hison-api-link';
    Hison.link.timeout = 10000;
    Hison.link.beforeGetRequst = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePostRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePutRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforePatchRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforeDeleteRequst = function(requestDw, callbackWorkedFunc, callbackErrorFunc, options) {
        return true;
    };
    Hison.link.beforeCallbackWorked = function(result, response) {
        return true;
    };
    Hison.link.beforeCallbackError = function(error) {
        return true;
    };

    /******************************************
     * Caching
     ******************************************/
    Hison.caching = {};
    Hison.caching.protocol = 'ws://';
    Hison.caching.wsEndPoint = '/hison-caching-websocket-endpoint';
    Hison.caching.limit = 10;

    /******************************************
     * Utils
     ******************************************/
    Hison.utils = {};
    /******************************************
     * Utils Boolean
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
     * Hison.utils.isAlpha("HelloWorld");
     *
     * @example
     * // returns false
     * Hison.utils.isAlpha("Hello World! 123");
     */
    Hison.utils.isAlpha = function(str) {
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
     * Hison.utils.isAlphaAndNumber("HelloWorld123");
     *
     * @example
     * // returns false
     * Hison.utils.isAlphaAndNumber("Hello World! 123");
     */
    Hison.utils.isAlphaAndNumber = function(str) {
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
     * Hison.utils.isNumber("1234567890");
     *
     * @example
     * // returns false
     * Hison.utils.isNumber("123ABC");
     */
    Hison.utils.isNumber = function(str) {
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
     * Hison.utils.isNumberSymbols("1234!@#$");
     *
     * @example
     * // returns false
     * Hison.utils.isNumberSymbols("1234ABC");
     */
    Hison.utils.isNumberSymbols = function(str) {
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
     * Hison.utils.isIncludeSymbols("Hello@World");
     *
     * @example
     * // returns false
     * Hison.utils.isIncludeSymbols("HelloWorld");
     */
    Hison.utils.isIncludeSymbols = function(str) {
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
     * Hison.utils.isLowerAlpha("helloworld");
     *
     * @example
     * // returns false
     * Hison.utils.isLowerAlpha("HelloWorld");
     * 
     * @example
     * // returns false
     * Hison.utils.isLowerAlpha("hello123");
     */
    Hison.utils.isLowerAlpha = function(str) {
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
     * Hison.utils.isLowerAlphaAndNumber("hello123");
     *
     * @example
     * // returns false
     * Hison.utils.isLowerAlphaAndNumber("HelloWorld123");
     * 
     * @example
     * // returns false
     * Hison.utils.isLowerAlphaAndNumber("hello@world");
     */
    Hison.utils.isLowerAlphaAndNumber = function(str) {
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
     * Hison.utils.isUpperAlpha("HELLOWORLD");
     *
     * @example
     * // returns false
     * Hison.utils.isUpperAlpha("HelloWorld");
     * 
     * @example
     * // returns false
     * Hison.utils.isUpperAlpha("HELLO123");
     */
    Hison.utils.isUpperAlpha = function(str) {
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
     * Hison.utils.isUpperAlphaAndNumber("HELLO123");
     *
     * @example
     * // returns false
     * Hison.utils.isUpperAlphaAndNumber("HelloWorld123");
     * 
     * @example
     * // returns false
     * Hison.utils.isUpperAlphaAndNumber("HELLO@123");
     */
    Hison.utils.isUpperAlphaAndNumber = function(str) {
        return /^[A-Z0-9]+$/.test(str);
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
     * Hison.utils.isNumeric(123);
     * 
     * @example
     * // returns true
     * Hison.utils.isNumeric(-123.456);
     * 
     * @example
     * // returns false
     * Hison.utils.isNumeric(Infinity);
     */
    Hison.utils.isNumeric = function(num) {
        return !isNaN(num) && isFinite(num);
    };
    /**
     * Checks if the given parameter is an integer.
     * This method first uses `Hison.utils.isNumeric` to check if the input is a valid number.
     * If it is a valid number, it then uses `Number.isInteger` to check if the number is an integer.
     *
     * @param {number} num - The value to be tested.
     * @returns {boolean} Returns true if the value is an integer; otherwise, false.
     *
     * @example
     * // returns true
     * Hison.utils.isInteger(123);
     *
     * @example
     * // returns false
     * Hison.utils.isInteger(123.456);
     */
    Hison.utils.isInteger = function(num) {
        if(!Hison.utils.isNumeric(num)) return false;
        num = Number(num);
        return Number.isInteger(num);
    };
    /**
     * Checks if the given parameter is a positive integer.
     * This method first uses `Hison.utils.isNumeric` to check if the input is a valid number.
     * If it is a valid number, it then uses `Number.isInteger` to check if the number is an integer,
     * and additionally checks if the number is greater than 0 to determine if it's positive.
     *
     * @param {number} num - The value to be tested.
     * @returns {boolean} Returns true if the value is a positive integer; otherwise, false.
     *
     * @example
     * // returns true
     * Hison.utils.isPositiveInteger(123);
     *
     * @example
     * // returns false
     * Hison.utils.isPositiveInteger(-123);
     *
     * @example
     * // returns false
     * Hison.utils.isPositiveInteger(0);
     */
    Hison.utils.isPositiveInteger = function(num) {
        if(!Hison.utils.isNumeric(num)) return false;
        num = Number(num);
        return Number.isInteger(num) && num > 0;
    };
    /**
     * Checks if the given parameter is a negative integer.
     * This method first uses `Hison.utils.isNumeric` to check if the input is a valid number.
     * If it is a valid number, it then uses `Number.isInteger` to check if the number is an integer,
     * and additionally checks if the number is less than 0 to determine if it's negative.
     *
     * @param {number} num - The value to be tested.
     * @returns {boolean} Returns true if the value is a negative integer; otherwise, false.
     *
     * @example
     * // returns true
     * Hison.utils.isNegativeInteger(-123);
     *
     * @example
     * // returns false
     * Hison.utils.isNegativeInteger(123);
     */
    Hison.utils.isNegativeInteger = function(num) {
        if (!Hison.utils.isNumeric(num)) return false;
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
     * Hison.utils.isArray([1, 2, 3]);
     * @example
     * // returns false
     * Hison.utils.isArray({ a: 1, b: 2 });
     */
    Hison.utils.isArray = function(arr) {
        return Array.isArray(arr) && arr.constructor === Array;
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
     * Hison.utils.isObject({ a: 1, b: 2 });
     *
     * @example
     * // returns false
     * Hison.utils.isObject([1, 2, 3]);
     *
     * @example
     * // returns false
     * Hison.utils.isObject(new Date());
     */
    Hison.utils.isObject = function(obj) {
        return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object;
    };
    var _getToString = function(str) {
        if (typeof str === 'number' || typeof str === 'boolean' || typeof str === 'bigint') {
            str = String(str);
        } else if (typeof str === 'symbol') {
            str = str.description;
        } else {
            throw new Error('Invalid date format');
        }
        return str
    }
    var _getDateObject = function(dateStr) {
        dateStr = _getToString(dateStr);
        var year, month, day;
        if (dateStr.includes('-')) {
            [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
        } else if (dateStr.length === 6) {
            year = parseInt('20' + dateStr.substring(0, 2), 10);
            month = parseInt(dateStr.substring(2, 4), 10);
            day = parseInt(dateStr.substring(4, 6), 10);
        } else if (dateStr.length === 8) {
            year = parseInt(dateStr.substring(0, 4), 10);
            month = parseInt(dateStr.substring(4, 6), 10);
            day = parseInt(dateStr.substring(6, 8), 10);
        } else {
            throw new Error('Invalid date format');
        }
    
        return { y: year, m: month, d: day };
    }
    /**
     * Validates whether a given date object or date string represents a valid date. 
     * The method supports dates in the range from 100.01.01 to 9999.12.31.
     * For dates from 1600.01.01 to 9999.12.31, it uses a regular expression for validation.
     * For dates before 1600.01.01, it uses JavaScript's Date object for validation.
     * 
     * The method first determines if the input is an object or a string and converts it to a date object if necessary.
     * It then checks if the year, month, and day are valid integers and within the valid range.
     * 
     * @param {object|string} dateObj_or_dateStr - The date object or string to be tested. The date object should have properties 'y' for year, 'm' for month, and 'd' for day.
     * @returns {boolean} Returns true if the date is valid within the specified range; otherwise, false.
     * 
     * @example
     * // returns true for a valid date
     * Hison.utils.isDate({y: 2000, m: 2, d: 29});
     * 
     * @example
     * // returns false for an invalid date
     * Hison.utils.isDate({y: 2001, m: 2, d: 29});
     *
     * @example
     * // returns true for a valid date string
     * Hison.utils.isDate("2000-02-29");
     *
     * @example
     * // returns false for an invalid date string
     * Hison.utils.isDate("2001-02-29");
     *
     * Note: This function is versatile as it can handle both date objects and date strings. It is particularly useful 
     * for validating user input in forms or data processing where date validity is crucial.
     */
    Hison.utils.isDate = function(dateObj_or_dateStr) {
        var dateObj = Hison.utils.isObject(dateObj_or_dateStr) ? dateObj_or_dateStr : _getDateObject(dateObj_or_dateStr);

        var yyyy = dateObj.y;
        var mm = dateObj.m;
        var dd = dateObj.d;

        var result = true;
        try {
            if(!Hison.utils.isInteger(yyyy) || !Hison.utils.isInteger(mm) || !Hison.utils.isInteger(dd)) {
                return false;
            }

            if(!yyyy) {
                return false;
            }
            if(!mm) {
                mm = "01";
            } else if (mm.length === 1) {
                mm = "0" + mm;
            }
            if(!dd) {
                dd = "01";
            } else if (dd.length === 1) {
                dd = "0" + dd;
            }

            if(Hison.utils.getToNumber(yyyy+mm+dd) < 16000101) {
                var date = new Date(Hison.utils.getToNumber(yyyy), Hison.utils.getToNumber(mm) - 1, Hison.utils.getToNumber(dd));
                if (date.getFullYear() !== Hison.utils.getToNumber(yyyy) || date.getMonth() !== Hison.utils.getToNumber(mm) - 1 || date.getDate() !== Hison.utils.getToNumber(dd)) {
                    return false;
                }
                return true;
            }
            else {
                var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
                result = dateRegex.test(dd+'-'+mm+'-'+yyyy);
            }
            
        } catch (err) {
            result = false;
        }    
        return result;
    };
    var _getTimeObject = function(timeStr) {
        timeStr = _getToString(timeStr);
        var hours, minutes, seconds;

        if (timeStr.includes(':')) {
            [hours, minutes, seconds] = timeStr.split(':').map(num => parseInt(num, 10));
        } else if (timeStr.length === 6) {
            hours = parseInt(timeStr.substring(0, 2), 10);
            minutes = parseInt(timeStr.substring(2, 4), 10);
            seconds = parseInt(timeStr.substring(4, 6), 10);
        } else {
            throw new Error('Invalid time format');
        }
    
        return { h: hours, mi: minutes, s: seconds };
    }
    /**
     * Checks if the given time object or time string represents a valid time.
     * The method first determines if the input is an object or a string and converts it to a time object if necessary.
     * It then validates if the hour (h), minute (mi), and second (s) are valid integers within the appropriate ranges:
     * - Hours (h) must be between 0 and 23.
     * - Minutes (mi) and seconds (s) must be between 0 and 59.
     *
     * @param {object|string} timeObj_or_timeStr - The time object or string to be tested. The time object should have properties 'h' for hour, 'mi' for minute, and 's' for second.
     * @returns {boolean} Returns true if the time is valid; otherwise, false.
     *
     * @example
     * // returns true for a valid time object
     * Hison.utils.isTime({ h: 12, mi: 30, s: 45 });
     *
     * @example
     * // returns true for a valid time string
     * Hison.utils.isTime("12:30:45");
     *
     * @example
     * // returns false for an invalid time
     * Hison.utils.isTime({ h: 24, mi: 00, s: 00 });
     *
     * Note: This function is versatile as it can handle both time objects and time strings. It is particularly useful 
     * for validating user input in forms or data processing where time validity is crucial.
     */
    Hison.utils.isTime = function(timeObj_or_timeStr) {
        var timeObj = Hison.utils.isObject(timeObj_or_timeStr) ? timeObj_or_timeStr : _getTimeObject(timeObj_or_timeStr);

        var hh = timeObj.h;
        var mm = timeObj.mi;
        var ss = timeObj.s;

        if(!Hison.utils.isInteger(hh) || !Hison.utils.isInteger(mm) || !Hison.utils.isInteger(ss)) {
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

        return Object.assign({}, dateObj, timeObj)
    }
    /**
     * Validates whether a given datetime object or datetime string represents a valid date and time.
     * The method first determines if the input is an object or a string and converts it to a datetime object if necessary.
     * It then uses `Hison.utils.isDate` to validate the date part (year, month, day)
     * and `Hison.utils.isTime` to validate the time part (hour, minute, second) of the datetime object.
     *
     * @param {object|string} datetimeObj_or_datetimeStr - The datetime object or string to be tested. The datetime object should have properties 'y' for year, 'm' for month, 'd' for day, 'h' for hour, 'mi' for minute, and 's' for second.
     * @returns {boolean} Returns true if both the date and time parts of the object or string are valid; otherwise, false.
     *
     * @example
     * // returns true for a valid datetime object
     * Hison.utils.isDatetime({ y: 2020, m: 12, d: 25, h: 10, mi: 30, s: 45 });
     *
     * @example
     * // returns true for a valid datetime string
     * Hison.utils.isDatetime("2020-12-25 10:30:45");
     *
     * @example
     * // returns false for an invalid datetime
     * Hison.utils.isDatetime({ y: 2020, m: 13, d: 25, h: 10, mi: 30, s: 45 });
     *
     * Note: This function is versatile as it can handle both datetime objects and datetime strings. It is particularly useful 
     * for validating user input in forms or data processing where both date and time validity are crucial.
     */
    Hison.utils.isDatetime = function(datetimeObj_or_datetimeStr) {
        var datetimeObj = Hison.utils.isObject(datetimeObj_or_datetimeStr) ? datetimeObj_or_datetimeStr : _getDatetimeObject(datetimeObj_or_datetimeStr);
        if(!Hison.utils.isDate(datetimeObj)) return false;
        if(!Hison.utils.isTime(datetimeObj)) return false;
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
     * Hison.utils.isEmail("example@test.com");
     *
     * @example
     * // returns false
     * Hison.utils.isEmail("example@.com");
     */
    Hison.utils.isEmail = function(emailStr) {
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
     * Hison.utils.isURL("https://www.example.com");
     *
     * @example
     * // returns true
     * Hison.utils.isURL("ftp://example.com/path/file.txt");
     *
     * @example
     * // returns false
     * Hison.utils.isURL("www.example.com");
     */
    Hison.utils.isURL = function(urlStr) {
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
     * Hison.utils.isValidMask("Abc-123", "Aaa-999");
     *
     * @example
     * // returns false
     * Hison.utils.isValidMask("abc-123", "Aaa-999");
     */
    Hison.utils.isValidMask = function(str, maskStr) {
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
     * Utils Date
     ******************************************/
    /**
     * Adds a specified amount of time to a given date object.
     * The function accepts a date object and a value to add, with an optional type of the value (years, months, days, etc.).
     * If no type is specified, days are added by default. The function throws errors for invalid input or date format.
     * It adjusts the given date accordingly and returns a new date object in a structured format.
     * The original object does not change.
     *
     * @param {object} datetimeObj - The date object to which time will be added. Should contain year (y), and optionally month (m), day (d), hours (h), minutes (mi), and seconds (s).
     * @param {number} addValue - The value to add to the date. Must be an integer.
     * @param {string} [addType='d'] - The type of value to add ('y' for years, 'm' for months, 'd' for days, 'h' for hours, 'mi' for minutes, 's' for seconds). Default is days ('d').
     * @returns {object} Returns a new date object with the added time.
     *
     * @throws {Error} Throws an error if required parameters are not entered, if addValue is not an integer, or if the input date is invalid.
     *
     * @example
     * // returns a date object with 5 days added
     * Hison.utils.addDate({ y: 2024, m: 1, d: 15 }, 5);
     *
     * @example
     * // returns a date object with 3 months added
     * Hison.utils.addDate({ y: 2024, m: 1, d: 15 }, 3, 'm');
     */
    Hison.utils.addDate = function(datetimeObj_or_datetimeStr, addValue, addType, format) {
        var datetimeObj = Hison.utils.isObject(datetimeObj_or_datetimeStr) ? datetimeObj_or_datetimeStr : _getDatetimeObject(datetimeObj_or_datetimeStr);

        if (!datetimeObj.y || (addValue !== 0 && !addValue)) {
            throw new Error("Required parameters have not been entered.");
        }
        if(!addType) addType ="";

        var dObj = Hison.utils.deepCopy(datetimeObj);
    
        if(!Hison.utils.isInteger(addValue)) throw new Error("addValue must be an integer");
    
        dObj.m = dObj.m === null || dObj.m === undefined ? 1 : dObj.m;
        dObj.d = dObj.d === null || dObj.d === undefined ? 1 : dObj.d;
        dObj.h = dObj.h === null || dObj.h === undefined ? 0 : dObj.h;
        dObj.mi = dObj.mi === null || dObj.mi === undefined ? 0 : dObj.mi;
        dObj.s = dObj.s === null || dObj.s === undefined ? 0 : dObj.s;

        if(!Hison.utils.isDate(dObj)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(dObj)) throw new Error("Please input a valid date.");
    
        var d = new Date(dObj.y, dObj.m - 1, dObj.d, dObj.h, dObj.mi, dObj.s);
    
        switch (addType.toLowerCase()) {
            case 'y':
                d.setFullYear(d.getFullYear() + addValue);
                break;
            case 'm':
                d.setMonth(d.getMonth() + addValue);
                break;
            case 'd':
                d.setDate(d.getDate() + addValue);
                break;
            case 'h':
                d.setHours(d.getHours() + addValue);
                break;
            case 'mi':
                d.setMinutes(d.getMinutes() + addValue);
                break;
            case 's':
                d.setSeconds(d.getSeconds() + addValue);
                break;
            default:
                d.setDate(d.getDate() + addValue);
        }

        var rtnObj = {
            y: d.getFullYear().toString().padStart(4, '0'),
            m: (d.getMonth() + 1).toString().padStart(2, '0'),
            d: d.getDate().toString().padStart(2, '0'),
            h: d.getHours().toString().padStart(2, '0'),
            mi: d.getMinutes().toString().padStart(2, '0'),
            s: d.getSeconds().toString().padStart(2, '0')
        }

        return Hison.utils.isObject(datetimeObj_or_datetimeStr) ? rtnObj : Hison.utils.getDateWithFormat(rtnObj, format);
    };
    /**
     * Calculates the difference between two date objects. The difference can be measured in years, months, days, hours, minutes, or seconds.
     * The default measurement is in days if no type is specified. This function throws errors for invalid input or date format.
     * It uses Hison.utils.isDate and Hison.utils.isTime to validate the input dates.
     *
     * @param {object} datetimeObj1 - The first date object for comparison. Should contain year (y), and optionally month (m), day (d), hours (h), minutes (mi), and seconds (s).
     * @param {object} datetimeObj2 - The second date object for comparison. Should contain year (y), and optionally month (m), day (d), hours (h), minutes (mi), and seconds (s).
     * @param {string} [diffType='d'] - The type of difference to calculate ('y' for years, 'm' for months, 'd' for days, 'h' for hours, 'mi' for minutes, 's' for seconds). Default is days ('d').
     * @returns {number} Returns the difference between the two dates in the specified unit.
     *
     * @throws {Error} Throws an error if required parameters are not entered, or if the input dates are invalid.
     *
     * @example
     * // returns the number of days between two dates
     * Hison.utils.getDateDiff({ y: 2024, m: 1, d: 15 }, { y: 2024, m: 1, d: 20 });
     *
     * @example
     * // returns the number of months between two dates
     * Hison.utils.getDateDiff({ y: 2023, m: 1, d: 1 }, { y: 2024, m: 1, d: 1 }, 'm');
     */
    Hison.utils.getDateDiff = function(datetimeObj1, datetimeObj2, diffType) {
        if (!datetimeObj1.y || !datetimeObj2.y) {
            throw new Error("Required parameters have not been entered.");
        }
        var dObj1 = Hison.utils.deepCopy(datetimeObj1);
        var dObj2 = Hison.utils.deepCopy(datetimeObj2);
        if(!diffType) diffType = "";
    
        dObj1.m = dObj1.m || 1; dObj2.m = dObj2.m || 1;
        dObj1.d = dObj1.d || 1; dObj2.d = dObj2.d || 1;
        dObj1.h = dObj1.h || 0; dObj2.h = dObj2.h || 0;
        dObj1.mi = dObj1.mi || 0; dObj2.mi = dObj2.mi || 0;
        dObj1.s = dObj1.s || 0; dObj2.s = dObj2.s || 0;

        if(!Hison.utils.isDate(dObj1)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(dObj1)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isDate(dObj2)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(dObj2)) throw new Error("Please input a valid date.");
    
        var d1 = new Date(dObj1.y, dObj1.m - 1, dObj1.d, dObj1.h, dObj1.mi, dObj1.s);
        var d2 = new Date(dObj2.y, dObj2.m - 1, dObj2.d, dObj2.h, dObj2.mi, dObj2.s);
    
        switch (diffType.toLowerCase()) {
            case 'y':
                return d2.getFullYear() - d1.getFullYear();
            case 'm':
                return (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
            case 'd':
                return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
            case 'h':
                return Math.floor((d2 - d1) / (60 * 60 * 1000));
            case 'mi':
                return Math.floor((d2 - d1) / (60 * 1000));
            case 's':
                return Math.floor((d2 - d1) / 1000);
            default:
                return Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
        }
    };
    /**
     * Retrieves the English name of a month given its numerical value. The function can return either the full name
     * of the month or its abbreviated form. By default, it returns the full name unless specified otherwise.
     *
     * @param {number} month - The numerical value of the month (1 for January, 2 for February, etc.).
     * @param {boolean} [isFullName=true] - A boolean flag to indicate whether to return the full name (true) or the abbreviated name (false) of the month.
     * @returns {string} Returns the English name of the specified month.
     *
     * @throws {Error} Throws an error if the month value is not between 1 and 12.
     *
     * @example
     * // returns 'March'
     * Hison.utils.getMonthName(3);
     *
     * @example
     * // returns 'Nov'
     * Hison.utils.getMonthName(11, false);
     */
    Hison.utils.getMonthName = function(month, isFullName) {
        if (isFullName !== false) {
            isFullName = true;
        }
        month = parseInt(month, 10);

        var monthsFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthsShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (month < 1 || month > 12) {
            throw new Error("Month must be between 1 and 12");
        }

        return isFullName ? monthsFullName[month - 1] : monthsShortName[month - 1];
    };
    /**
     * Formats a given datetime object or datetime string according to a specified format string.
     * The default format is "mn ddth, yyyy". The function supports a wide range of format specifiers,
     * allowing for various representations of the date and time. The method first determines if the input
     * is an object or a string and converts it to a datetime object if necessary.
     * It throws an error for invalid datetime inputs or unsupported format strings.
     * The original object or string does not change.
     *
     * @param {object|string} datetimeObj_or_datetimeStr - The datetime object or string to format. 
     *        Should contain year (y), and optionally month (m), day (d), hours (h), minutes (mi), and seconds (s).
     * @param {string} [format='mn ddth, yyyy'] - The format string specifying the desired output format. 
     *        Supports various combinations of 'yyyy', 'mm', 'dd', 'hh', 'mi', 'ss', along with separators.
     * @returns {string} Returns the formatted date as a string.
     *
     * @throws {Error} Throws an error if required parameters are not entered, if the datetime is invalid, 
     *         or if the format string is unsupported.
     *
     * @example
     * // returns 'January 15th, 2024'
     * Hison.utils.getDateWithFormat({ y: 2024, m: 1, d: 15 });
     *
     * @example
     * // returns '2024-01-15'
     * Hison.utils.getDateWithFormat({ y: 2024, m: 1, d: 15 }, 'yyyy-mm-dd');
     *
     * Note: This function is versatile as it can handle both datetime objects and datetime strings. 
     * It is particularly useful for formatting user input or data for display where specific date and time 
     * formats are required.
     */
    Hison.utils.getDateWithFormat = function(datetimeObj_or_datetimeStr, format) {
        var datetimeObj = Hison.utils.isObject(datetimeObj_or_datetimeStr) ? datetimeObj_or_datetimeStr : _getDatetimeObject(datetimeObj_or_datetimeStr);

        if(!datetimeObj.y) throw new Error("Required parameters have not been entered.");
        if(!format) format = "mn ddth, yyyy";

        var dObj = Hison.utils.deepCopy(datetimeObj);

        dObj.m = (dObj.m || 1).toString().padStart(2, '0');
        dObj.d = (dObj.d || 1).toString().padStart(2, '0');
        dObj.h = (dObj.h || 0).toString().padStart(2, '0');
        dObj.mi = (dObj.mi || 0).toString().padStart(2, '0');
        dObj.s = (dObj.s || 0).toString().padStart(2, '0');

        if(!Hison.utils.isDate(dObj)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(dObj)) throw new Error("Please input a valid date.");

        var mn = Hison.utils.getMonthName(dObj.m);
        var mnabb = Hison.utils.getMonthName(dObj.m, false);
    
        switch (format.toLowerCase()) {
            case 'yyyy':
                return dObj.y;
                
            case 'yyyymm':
                return dObj.y + dObj.m;
            case 'yyyy-mm':
                return dObj.y + '-' + dObj.m;
            case 'yyyy/mm':
                return dObj.y + '/' + dObj.m;
            case 'yyyy. mm':
                return dObj.y + '. ' + dObj.m;
            case 'yyyy mm':
                return dObj.y + ' ' + dObj.m;

            case 'yyyymmdd':
                return dObj.y + dObj.m + dObj.d;
            case 'yyyy-mm-dd':
                return dObj.y + '-' + dObj.m + '-' + dObj.d;
            case 'yyyy/mm/dd':
                return dObj.y + '/' + dObj.m + '/' + dObj.d;
            case 'yyyy. mm. dd':
                return dObj.y + '. ' + dObj.m + '. ' + dObj.d;
            case 'yyyy mm dd':
                return dObj.y + ' ' + dObj.m + ' ' + dObj.d;

            case 'yyyymmdd hh':
                return dObj.y + dObj.m + dObj.d + ' ' + dObj.h;
            case 'yyyymmdd hhmi':
                return dObj.y + dObj.m + dObj.d + ' ' + dObj.h + dObj.mi;
            case 'yyyymmdd hhmiss':
                return dObj.y + dObj.m + dObj.d + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'yyyymmdd hh:mi':
                return dObj.y + dObj.m + dObj.d + ' ' + dObj.h + ':' + dObj.mi;
            case 'yyyymmdd hh:mi:ss':
                return dObj.y + dObj.m + dObj.d + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'yyyy-mm-dd hh':
                return dObj.y + '-' + dObj.m + '-' + dObj.d + ' ' + dObj.h;
            case 'yyyy-mm-dd hhmi':
                return dObj.y + '-' + dObj.m + '-' + dObj.d + ' ' + dObj.h + dObj.mi;
            case 'yyyy-mm-dd hhmiss':
                return dObj.y + '-' + dObj.m + '-' + dObj.d + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'yyyy-mm-dd hh:mi':
                return dObj.y + '-' + dObj.m + '-' + dObj.d + ' ' + dObj.h + ':' + dObj.mi;
            case 'yyyy-mm-dd hh:mi:ss':
                return dObj.y + '-' + dObj.m + '-' + dObj.d + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'yyyy/mm/dd hh':
                return dObj.y + '/' + dObj.m + '/' + dObj.d + ' ' + dObj.h;
            case 'yyyy/mm/dd hhmi':
                return dObj.y + '/' + dObj.m + '/' + dObj.d + ' ' + dObj.h + dObj.mi;
            case 'yyyy/mm/dd hhmiss':
                return dObj.y + '/' + dObj.m + '/' + dObj.d + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'yyyy/mm/dd hh:mi':
                return dObj.y + '/' + dObj.m + '/' + dObj.d + ' ' + dObj.h + ':' + dObj.mi;
            case 'yyyy/mm/dd hh:mi:ss':
                return dObj.y + '/' + dObj.m + '/' + dObj.d + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'yyyy. mm. dd hh':
                return dObj.y + '. ' + dObj.m + '. ' + dObj.d + ' ' + dObj.h;
            case 'yyyy. mm. dd hhmi':
                return dObj.y + '. ' + dObj.m + '. ' + dObj.d + ' ' + dObj.h + dObj.mi;
            case 'yyyy. mm. dd hhmiss':
                return dObj.y + '. ' + dObj.m + '. ' + dObj.d + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'yyyy. mm. dd hh:mi':
                return dObj.y + '. ' + dObj.m + '. ' + dObj.d + ' ' + dObj.h + ':' + dObj.mi;
            case 'yyyy. mm. dd hh:mi:ss':
                return dObj.y + '. ' + dObj.m + '. ' + dObj.d + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'yyyy mm dd hh':
                return dObj.y + ' ' + dObj.m + ' ' + dObj.d + ' ' + dObj.h;
            case 'yyyy mm dd hhmi':
                return dObj.y + ' ' + dObj.m + ' ' + dObj.d + ' ' + dObj.h + dObj.mi;
            case 'yyyy mm dd hhmiss':
                return dObj.y + ' ' + dObj.m + ' ' + dObj.d + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'yyyy mm dd hh:mi':
                return dObj.y + ' ' + dObj.m + ' ' + dObj.d + ' ' + dObj.h + ':' + dObj.mi;
            case 'yyyy mm dd hh:mi:ss':
                return dObj.y + ' ' + dObj.m + ' ' + dObj.d + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;

            case 'mmyyyy':
                return dObj.m + dObj.y;
            case 'mm-yyyy':
                return dObj.m + '-' + dObj.y;
            case 'mm/yyyy':
                return dObj.m + '/' + dObj.y;
            case 'mm. yyyy':
                return dObj.m + '/' + dObj.y;
            case 'mm yyyy':
                return dObj.m + '/' + dObj.y;
            case 'mn yyyy':
                return mn + ' ' + dObj.y;
            case 'mn, yyyy':
                return mn + ', ' + dObj.y;
            case 'mnabb yyyy':
                return mnabb + ' ' + dObj.y;
            case 'mnabb, yyyy':
                return mnabb + ', ' + dObj.y;

            case 'mmddyyyy':
                return dObj.m + dObj.d + dObj.y;
            case 'mm-dd-yyyy':
                return dObj.m + '-' + dObj.d + '-' + dObj.y;
            case 'mm/dd/yyyy':
                return dObj.m + '/' + dObj.d + '/' + dObj.y;
            case 'mm. dd. yyyy':
                return dObj.m + '. ' + dObj.d + '. ' + dObj.y;
            case 'mn dd yyyy':
                return mn + ' ' + dObj.d + ' ' + dObj.y;
            case 'mn dd, yyyy':
                return mn + ' ' + dObj.d + ', ' + dObj.y;
            case 'mnabb dd yyyy':
                return mnabb + ' ' + dObj.d + ' ' + dObj.y;
            case 'mnabb dd, yyyy':
                return mnabb + ' ' + dObj.d + ', ' + dObj.y;
            case 'mn ddth yyyy':
                return mn + ' ' + dObj.d + 'th ' + dObj.y;
            case 'mn ddth, yyyy':
                return mn + ' ' + dObj.d + 'th, ' + dObj.y;
            case 'mnabb ddth yyyy':
                return mnabb + ' ' + dObj.d + 'th ' + dObj.y;
            case 'mnabb ddth, yyyy':
                return mnabb + ' ' + dObj.d + 'th, ' + dObj.y;

            case 'mmddyyyy hh':
                return dObj.m + dObj.d + dObj.y + ' ' + dObj.h;
            case 'mmddyyyy hhmi':
                return dObj.m + dObj.d + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mmddyyyy hhmiss':
                return dObj.m + dObj.d + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mmddyyyy hh:mi':
                return dObj.m + dObj.d + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mmddyyyy hh:mi:ss':
                return dObj.m + dObj.d + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mm-dd-yyyy hh':
                return dObj.m + '-' + dObj.d + '-' + dObj.y + ' ' + dObj.h;
            case 'mm-dd-yyyy hhmi':
                return dObj.m + '-' + dObj.d + '-' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mm-dd-yyyy hhmiss':
                return dObj.m + '-' + dObj.d + '-' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mm-dd-yyyy hh:mi':
                return dObj.m + '-' + dObj.d + '-' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mm-dd-yyyy hh:mi:ss':
                return dObj.m + '-' + dObj.d + '-' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mm/dd/yyyy hh':
                return dObj.m + '/' + dObj.d + '/' + dObj.y + ' ' + dObj.h;
            case 'mm/dd/yyyy hhmi':
                return dObj.m + '/' + dObj.d + '/' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mm/dd/yyyy hhmiss':
                return dObj.m + '/' + dObj.d + '/' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mm/dd/yyyy hh:mi':
                return dObj.m + '/' + dObj.d + '/' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mm/dd/yyyy hh:mi:ss':
                return dObj.m + '/' + dObj.d + '/' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mm. dd. yyyy hh':
                return dObj.m + '. ' + dObj.d + '. ' + dObj.y + ' ' + dObj.h;
            case 'mm. dd. yyyy hhmi':
                return dObj.m + '. ' + dObj.d + '. ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mm. dd. yyyy hhmiss':
                return dObj.m + '. ' + dObj.d + '. ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mm. dd. yyyy hh:mi':
                return dObj.m + '. ' + dObj.d + '. ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mm. dd. yyyy hh:mi:ss':
                return dObj.m + '. ' + dObj.d + '. ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mn dd yyyy hh':
                return mn + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h;
            case 'mn dd yyyy hhmi':
                return mn + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mn dd yyyy hhmiss':
                return mn + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mn dd yyyy hh:mi':
                return mn + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mn dd yyyy hh:mi:ss':
                return mn + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mn dd, yyyy hh':
                return mn + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h;
            case 'mn dd, yyyy hhmi':
                return mn + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mn dd, yyyy hhmiss':
                return mn + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mn dd, yyyy hh:mi':
                return mn + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mn dd, yyyy hh:mi:ss':
                return mn + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mnabb dd yyyy hh':
                return mnabb + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h;
            case 'mnabb dd yyyy hhmi':
                return mnabb + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mnabb dd yyyy hhmiss':
                return mnabb + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mnabb dd yyyy hh:mi':
                return mnabb + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mnabb dd yyyy hh:mi:ss':
                return mnabb + ' ' + dObj.d + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mnabb dd, yyyy hh':
                return mnabb + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h;
            case 'mnabb dd, yyyy hhmi':
                return mnabb + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mnabb dd, yyyy hhmiss':
                return mnabb + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mnabb dd, yyyy hh:mi':
                return mnabb + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mnabb dd, yyyy hh:mi:ss':
                return mnabb + ' ' + dObj.d + ', ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mn ddth yyyy hh':
                return mn + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h;
            case 'mn ddth yyyy hhmi':
                return mn + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mn ddth yyyy hhmiss':
                return mn + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mn ddth yyyy hh:mi':
                return mn + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mn ddth yyyy hh:mi:ss':
                return mn + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mn ddth, yyyy hh':
                return mn + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h;
            case 'mn ddth, yyyy hhmi':
                return mn + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mn ddth, yyyy hhmiss':
                return mn + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mn ddth, yyyy hh:mi':
                return mn + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mn ddth, yyyy hh:mi:ss':
                return mn + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mnabb ddth yyyy hh':
                return mnabb + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h;
            case 'mnabb ddth yyyy hhmi':
                return mnabb + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mnabb ddth yyyy hhmiss':
                return mnabb + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mnabb ddth yyyy hh:mi':
                return mnabb + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mnabb ddth yyyy hh:mi:ss':
                return mnabb + ' ' + dObj.d + 'th ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'mnabb ddth, yyyy hh':
                return mnabb + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h;
            case 'mnabb ddth, yyyy hhmi':
                return mnabb + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'mnabb ddth, yyyy hhmiss':
                return mnabb + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'mnabb ddth, yyyy hh:mi':
                return mnabb + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'mnabb ddth, yyyy hh:mi:ss':
                return mnabb + ' ' + dObj.d + 'th, ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;

            case 'ddmmyyyy':
                return dObj.d + dObj.m + dObj.y;
            case 'dd-mm-yyyy':
                return dObj.d + '-' + dObj.m + '-' + dObj.y;
            case 'dd/mm/yyyy':
                return dObj.d + '/' + dObj.m + '/' + dObj.y;
            case 'dd. mm. yyyy':
                return dObj.d + '. ' + dObj.m + '. ' + dObj.y;
            case 'dd mn yyyy':
                return dObj.d + ' ' + mn + ' ' + dObj.y;
            case 'dd mnabb yyyy':
                return dObj.d + ' ' + mnabb + ' ' + dObj.y;
            case 'ddth mn yyyy':
                return dObj.d + 'th ' + mn + ' ' + dObj.y;
            case 'ddth mnabb yyyy':
                return dObj.d + 'th ' + mnabb + ' ' + dObj.y;

            case 'ddmmyyyy hh':
                return dObj.d + dObj.m + dObj.y + ' ' + dObj.h;
            case 'ddmmyyyy hhmi':
                return dObj.d + dObj.m + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'ddmmyyyy hhmiss':
                return dObj.d + dObj.m + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'ddmmyyyy hh:mi':
                return dObj.d + dObj.m + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'ddmmyyyy hh:mi:ss':
                return dObj.d + dObj.m + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'dd-mm-yyyy hh':
                return dObj.d + '-' + dObj.m + '-' + dObj.y + ' ' + dObj.h;
            case 'dd-mm-yyyy hhmi':
                return dObj.d + '-' + dObj.m + '-' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'dd-mm-yyyy hhmiss':
                return dObj.d + '-' + dObj.m + '-' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'dd-mm-yyyy hh:mi':
                return dObj.d + '-' + dObj.m + '-' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'dd-mm-yyyy hh:mi:ss':
                return dObj.d + '-' + dObj.m + '-' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'dd/mm/yyyy hh':
                return dObj.d + '/' + dObj.m + '/' + dObj.y + ' ' + dObj.h;
            case 'dd/mm/yyyy hhmi':
                return dObj.d + '/' + dObj.m + '/' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'dd/mm/yyyy hhmiss':
                return dObj.d + '/' + dObj.m + '/' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'dd/mm/yyyy hh:mi':
                return dObj.d + '/' + dObj.m + '/' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'dd/mm/yyyy hh:mi:ss':
                return dObj.d + '/' + dObj.m + '/' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'dd. mm. yyyy hh':
                return dObj.d + '. ' + dObj.m + '. ' + dObj.y + ' ' + dObj.h;
            case 'dd. mm. yyyy hhmi':
                return dObj.d + '. ' + dObj.m + '. ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'dd. mm. yyyy hhmiss':
                return dObj.d + '. ' + dObj.m + '. ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'dd. mm. yyyy hh:mi':
                return dObj.d + '. ' + dObj.m + '. ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'dd. mm. yyyy hh:mi:ss':
                return dObj.d + '. ' + dObj.m + '. ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'dd mn yyyy hh':
                return dObj.d + ' ' + mn + ' ' + dObj.y + ' ' + dObj.h;
            case 'dd mn yyyy hhmi':
                return dObj.d + ' ' + mn + ' ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'dd mn yyyy hhmiss':
                return dObj.d + ' ' + mn + ' ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'dd mn yyyy hh:mi':
                return dObj.d + ' ' + mn + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'dd mn yyyy hh:mi:ss':
                return dObj.d + ' ' + mn + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'dd mnabb yyyy hh':
                return dObj.d + ' ' + mnabb + ' ' + dObj.y + ' ' + dObj.h;
            case 'dd mnabb yyyy hhmi':
                return dObj.d + ' ' + mnabb + ' ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'dd mnabb yyyy hhmiss':
                return dObj.d + ' ' + mnabb + ' ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'dd mnabb yyyy hh:mi':
                return dObj.d + ' ' + mnabb + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'dd mnabb yyyy hh:mi:ss':
                return dObj.d + ' ' + mnabb + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'ddth mn yyyy hh':
                return dObj.d + 'th ' + mn + ' ' + dObj.y + ' ' + dObj.h;
            case 'ddth mn yyyy hhmi':
                return dObj.d + 'th ' + mn + ' ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'ddth mn yyyy hhmiss':
                return dObj.d + 'th ' + mn + ' ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'ddth mn yyyy hh:mi':
                return dObj.d + 'th ' + mn + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'ddth mn yyyy hh:mi:ss':
                return dObj.d + 'th ' + mn + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;
            case 'ddth mnabb yyyy hh':
                return dObj.d + 'th ' + mnabb + ' ' + dObj.y + ' ' + dObj.h;
            case 'ddth mnabb yyyy hhmi':
                return dObj.d + 'th ' + mnabb + ' ' + dObj.y + ' ' + dObj.h + dObj.mi;
            case 'ddth mnabb yyyy hhmiss':
                return dObj.d + 'th ' + mnabb + ' ' + dObj.y + ' ' + dObj.h + dObj.mi + dObj.s;
            case 'ddth mnabb yyyy hh:mi':
                return dObj.d + 'th ' + mnabb + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi;
            case 'ddth mnabb yyyy hh:mi:ss':
                return dObj.d + 'th ' + mnabb + ' ' + dObj.y + ' ' + dObj.h + ':' + dObj.mi + ':' + dObj.s;

            default:
                throw new Error("Invalid format");
        }
    };
    /**
     * Returns the day of the week for a given date. The function supports various formats for the day of the week,
     * including numerical, abbreviated, full name, and Korean formats. If no format is specified, the default numerical format is used.
     *
     * @param {object} dateObj - The date object for which the day of the week is to be determined. Should contain year (y), month (m), and day (d).
     * @param {string} [dayType=''] - The format of the day of the week to return. Options are 'd' for numerical (0-6), 'dy' for 3-letter abbreviation, 'day' for full name, 'kdy' for Korean abbreviation, 'kday' for full Korean name.
     * @returns {string} Returns the day of the week as per the specified format. Returns an empty string if the date is invalid or required parameters are missing.
     *
     * @example
     * // returns '1' (Monday)
     * Hison.utils.getDayOfWeek({ y: 2024, m: 1, d: 1 }, 'd');
     *
     * @example
     * // returns 'MONDAY'
     * Hison.utils.getDayOfWeek({ y: 2024, m: 1, d: 1 }, 'day');
     */
    Hison.utils.getDayOfWeek = function(dateObj, dayType) {
        if (!dateObj.y || !dateObj.m || !dateObj.d) {
            return '';
        }
        if(!dayType) dayType = "";

        if(!Hison.utils.isDate(dateObj)) return '';
    
        var date = new Date(dateObj.y, dateObj.m - 1, dateObj.d);
        var dayOfWeek = date.getDay();
    
        switch (dayType.toLowerCase()) {
            case 'd':
                return dayOfWeek.toString();    // 0 ~ 6
            case 'dy':
                return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayOfWeek];
            case 'day':
                return ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][dayOfWeek];
            case 'kdy':
                return ['일', '월', '화', '수', '목', '금', '토'][dayOfWeek];
            case 'kday':
                return ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][dayOfWeek];
            default:
                return dayOfWeek.toString();
        }
    };
    /**
     * Returns the last day of the month for a given year and month. The function calculates the number of days in the specified month,
     * accounting for leap years as applicable. It returns an empty string for invalid input or missing parameters.
     *
     * @param {object} dateObj - The date object for which the last day of the month is to be determined. Should contain year (y) and month (m).
     * @returns {number|string} Returns the last day of the month as a number. Returns an empty string if the year or month is missing or if the date is invalid.
     *
     * @example
     * // returns 31 (Last day of January 2024)
     * Hison.utils.getLastDay({ y: 2024, m: 1 });
     *
     * @example
     * // returns 29 (Last day of February 2024, a leap year)
     * Hison.utils.getLastDay({ y: 2024, m: 2 });
     */
    Hison.utils.getLastDay = function(dateObj) {
        if (!dateObj.y || !dateObj.m) {
            return '';
        }
        var dObj = Hison.utils.deepCopy(dateObj);

        dObj.d = 1;
        if(!Hison.utils.isDate(dObj)) return '';
        var nextMonthFirstDay = new Date(dObj.y, dObj.m, 1);
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
     * Hison.utils.getSysYear();
     *
     * @example
     * // returns '24' (assuming the current year is 2024)
     * Hison.utils.getSysYear('yy');
     */
    Hison.utils.getSysYear = function(format) {
        if(!format) format = "";
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
     * The default is the numerical format without leading zeros. 
     * The function determines the current month based on the system's date settings and formats it as specified.
     *
     * @param {string} [format=''] - The format in which to return the month. 'mm' for two-digit numerical format, 'mn' for full month name, 'mnabb' for abbreviated month name, and any other value for the default numerical format.
     * @returns {string} Returns the current month as a string in the specified format.
     *
     * @example
     * // returns '01' for January (assuming the current month is January)
     * Hison.utils.getSysMonth('mm');
     *
     * @example
     * // returns 'January' (assuming the current month is January)
     * Hison.utils.getSysMonth('mn');
     *
     * @example
     * // returns 'Jan' (assuming the current month is January)
     * Hison.utils.getSysMonth('mnabb');
     */
    Hison.utils.getSysMonth = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        var sysMonth = currentDate.getMonth() + 1;
        switch (format.toLowerCase()) {
            case 'mm':
                return sysMonth.toString().padStart(2, '0');
            case 'mn':
                return Hison.utils.getMonthName(sysMonth);
            case 'mnabb':
                return Hison.utils.getMonthName(sysMonth, false);
            default:
                return sysMonth.toString();
        }
    };
    /**
     * Returns the current year and month formatted as specified. The default format is "mn, yyyy" (e.g., "January, 2024").
     * This function utilizes the getDateWithFormat function to format the current year and month according to the specified format.
     *
     * @param {string} [format='mn, yyyy'] - The format string specifying how the year and month should be returned. 
     *                                       It can be any format supported by the getDateWithFormat function.
     * @returns {string} Returns the current year and month as a string in the specified format.
     *
     * @example
     * // returns 'January, 2024' (assuming the current date is in January 2024)
     * Hison.utils.getSysYearMonth();
     *
     * @example
     * // returns '2024-01' (assuming the current date is in January 2024)
     * Hison.utils.getSysYearMonth('yyyy-mm');
     */
    Hison.utils.getSysYearMonth = function(format) {
        if(!format) format = "mn, yyyy";
        var currentDate = new Date();
        return Hison.utils.getDateWithFormat({y:currentDate.getFullYear(),m:currentDate.getMonth() + 1}, format)
    };
    /**
     * Returns the current day of the month in either a two-digit or a default format. 
     * The default format is a numerical representation without leading zeros. 
     * The function determines the current day based on the system's date settings.
     *
     * @param {string} [format=''] - The format in which to return the day. 'dd' for two-digit format, any other value for the default format.
     * @returns {string} Returns the current day as a string in the specified format.
     *
     * @example
     * // returns '05' (assuming the current day of the month is 5)
     * Hison.utils.getSysDay('dd');
     *
     * @example
     * // returns '5' (assuming the current day of the month is 5)
     * Hison.utils.getSysDay();
     */
    Hison.utils.getSysDay = function(format) {
        if(!format) format = "";
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
     * Hison.utils.getSysDayOfWeek();
     *
     * @example
     * // returns 'MONDAY' (assuming the current day of the week is Monday)
     * Hison.utils.getSysDayOfWeek('day');
     */
    Hison.utils.getSysDayOfWeek = function(dayType) {
        if(!dayType) dayType = "d";
        var currentDate = new Date();
        return Hison.utils.getDayOfWeek({y:currentDate.getFullYear(),m:currentDate.getMonth() + 1,d:currentDate.getDate()}, dayType);
    };
    /**
     * Returns the current hour of the day in either a two-digit or a default format. 
     * The default format is a numerical representation without leading zeros. 
     * The function determines the current hour based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the hour. 'hh' for two-digit format, any other value for the default format.
     * @returns {string} Returns the current hour as a string in the specified format.
     *
     * @example
     * // returns '05' (assuming the current hour is 5 AM)
     * Hison.utils.getSysHour('hh');
     *
     * @example
     * // returns '5' (assuming the current hour is 5 AM)
     * Hison.utils.getSysHour();
     */
    Hison.utils.getSysHour = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'hh':
                return currentDate.getHours().toString().padStart(2, '0');
            default:
                return currentDate.getHours().toString();
        }
    };
    /**
     * Returns the current hour and minute in either a 'hhmi' (continuous string) format or the default 'hh:mm' format.
     * The default format is 'hh:mm', which includes a colon separator between hours and minutes.
     * The function determines the current time based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the time. 'hhmi' for continuous string format (e.g., '0512'), any other value for the default 'hh:mm' format (e.g., '05:12').
     * @returns {string} Returns the current hour and minute as a string in the specified format.
     *
     * @example
     * // returns '05:12' (assuming the current time is 5 hours and 12 minutes)
     * Hison.utils.getSysHourMinute();
     *
     * @example
     * // returns '0512' (assuming the current time is 5 hours and 12 minutes)
     * Hison.utils.getSysHourMinute('hhmi');
     */
    Hison.utils.getSysHourMinute = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'hhmi':
                return currentDate.getHours().toString().padStart(2, '0') + "" + currentDate.getMinutes().toString().padStart(2, '0');
            default:
                return currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0');
        }
    };
    /**
     * Returns the current minute of the hour in either a two-digit or a default format. 
     * The default format is a numerical representation without leading zeros. 
     * The function determines the current minute based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the minute. 'mi' for two-digit format, any other value for the default format.
     * @returns {string} Returns the current minute as a string in the specified format.
     *
     * @example
     * // returns '05' (assuming the current minute is 5 past the hour)
     * Hison.utils.getSysMinute('mi');
     *
     * @example
     * // returns '5' (assuming the current minute is 5 past the hour)
     * Hison.utils.getSysMinute();
     */
    Hison.utils.getSysMinute = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'mi':
                return currentDate.getMinutes().toString().padStart(2, '0');
            default:
                return currentDate.getMinutes().toString();
        }
    };
    /**
     * Returns the current second of the minute in either a two-digit or a default format. 
     * The default format is a numerical representation without leading zeros. 
     * The function determines the current second based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the second. 'ss' for two-digit format, any other value for the default format.
     * @returns {string} Returns the current second as a string in the specified format.
     *
     * @example
     * // returns '05' (assuming the current second is 5 past the minute)
     * Hison.utils.getSysSecond('ss');
     *
     * @example
     * // returns '5' (assuming the current second is 5 past the minute)
     * Hison.utils.getSysSecond();
     */
    Hison.utils.getSysSecond = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'ss':
                return currentDate.getSeconds().toString().padStart(2, '0');
            default:
                return currentDate.getSeconds().toString();
        }
    };
    /**
     * Returns the current time in either a 'hhmiss' (continuous string) format or the default 'hh:mm:ss' format.
     * The default format is 'hh:mm:ss', which includes colon separators between hours, minutes, and seconds.
     * The function determines the current time based on the system's time settings.
     *
     * @param {string} [format=''] - The format in which to return the time. 'hhmiss' for continuous string format (e.g., '051230'), any other value for the default 'hh:mm:ss' format (e.g., '05:12:30').
     * @returns {string} Returns the current time as a string in the specified format.
     *
     * @example
     * // returns '05:12:30' (assuming the current time is 5 hours, 12 minutes, and 30 seconds)
     * Hison.utils.getSysTime();
     *
     * @example
     * // returns '051230' (assuming the current time is 5 hours, 12 minutes, and 30 seconds)
     * Hison.utils.getSysTime('hhmiss');
     */
    Hison.utils.getSysTime = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'hhmiss':
                return currentDate.getHours().toString().padStart(2, '0') + currentDate.getMinutes().toString().padStart(2, '0') + currentDate.getSeconds().toString().padStart(2, '0');
            default:
                return currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0') + ":" + currentDate.getSeconds().toString().padStart(2, '0');
        }
    };
    /**
     * Returns the current date and time in a specified format. The default format is "mn ddth, yyyy hh:mi:ss" (e.g., "January 15th, 2024 05:12:30").
     * This function utilizes the getDateWithFormat function to format the current date and time according to the specified format.
     *
     * @param {string} [format='mn ddth, yyyy hh:mi:ss'] - The format string specifying how the date and time should be returned. 
     *                                                      It can be any format supported by the getDateWithFormat function.
     * @returns {string} Returns the current date and time as a string in the specified format.
     *
     * @example
     * // returns 'January 15th, 2024 05:12:30' (assuming the current date and time)
     * Hison.utils.getSysDate();
     *
     * @example
     * // returns '2024-01-15 05:12' (assuming the current date and time)
     * Hison.utils.getSysDate('yyyy-mm-dd hh:mi');
     */
    Hison.utils.getSysDate = function(format) {
        if(!format) format = "mn ddth, yyyy hh:mi:ss";
        var currentDate = new Date();
        return Hison.utils.getDateWithFormat(
            {
                y:currentDate.getFullYear(),
                m:currentDate.getMonth() + 1,
                d:currentDate.getDate(),
                h:currentDate.getHours(),
                mi:currentDate.getMinutes(),
                s:currentDate.getSeconds(),
            }
            , format);
    };

    /******************************************
     * Utils Number
     ******************************************/
    /**
     * Rounds up a given number to a specified precision. The precision determines the number of decimal places to round up to.
     * If the precision is not an integer, it defaults to 0 (rounding up to the nearest whole number).
     * The function throws an error if the provided number is not numeric.
     *
     * @param {number} num - The number to be rounded up.
     * @param {number} [precision=0] - The number of decimal places to round up to. Must be an integer.
     * @returns {number} Returns the rounded up value of the provided number at the specified precision.
     *
     * @throws {Error} Throws an error if 'num' is not numeric or if 'precision' is not an integer.
     *
     * @example
     * // returns 2.35 rounded up to the nearest tenth (2.4)
     * Hison.utils.getCeil(2.35, 1);
     *
     * @example
     * // returns 3 rounded up to the nearest whole number (3)
     * Hison.utils.getCeil(2.35);
     */
    Hison.utils.getCeil = function(num, precision) {
        if(!Hison.utils.isNumeric(num)) throw new Error("Please input only number.");
        if(!Hison.utils.isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.ceil(num * factor) / factor;
    };
    /**
     * Rounds down a given number to a specified precision. The precision determines the number of decimal places to round down to.
     * If the precision is not an integer, it defaults to 0 (rounding down to the nearest whole number).
     * The function throws an error if the provided number is not numeric.
     *
     * @param {number} num - The number to be rounded down.
     * @param {number} [precision=0] - The number of decimal places to round down to. Must be an integer.
     * @returns {number} Returns the rounded down value of the provided number at the specified precision.
     *
     * @throws {Error} Throws an error if 'num' is not numeric or if 'precision' is not an integer.
     *
     * @example
     * // returns 2.35 rounded down to the nearest tenth (2.3)
     * Hison.utils.getFloor(2.35, 1);
     *
     * @example
     * // returns 2 rounded down to the nearest whole number (2)
     * Hison.utils.getFloor(2.35);
     */
    Hison.utils.getFloor = function(num, precision) {
        if(!Hison.utils.isNumeric(num)) throw new Error("Please input only number.");
        if(!Hison.utils.isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.floor(num * factor) / factor;
    };
    /**
     * Rounds a given number to a specified precision. The precision determines the number of decimal places to round to.
     * If the precision is not an integer, it defaults to 0 (rounding to the nearest whole number).
     * The function throws an error if the provided number is not numeric.
     *
     * @param {number} num - The number to be rounded.
     * @param {number} [precision=0] - The number of decimal places to round to. Must be an integer.
     * @returns {number} Returns the rounded value of the provided number at the specified precision.
     *
     * @throws {Error} Throws an error if 'num' is not numeric or if 'precision' is not an integer.
     *
     * @example
     * // returns 2.35 rounded to the nearest tenth (2.4)
     * Hison.utils.getRound(2.35, 1);
     *
     * @example
     * // returns 2 rounded to the nearest whole number (2)
     * Hison.utils.getRound(2.35);
     */
    Hison.utils.getRound = function(num, precision) {
        if(!Hison.utils.isNumeric(num)) throw new Error("Please input only number.");
        if(!Hison.utils.isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    };
    /**
     * Truncates a given number to a specified precision. The precision determines the number of decimal places to truncate to.
     * If the precision is not an integer, it defaults to 0 (truncating to the nearest whole number).
     * The function throws an error if the provided number is not numeric.
     *
     * @param {number} num - The number to be truncated.
     * @param {number} [precision=0] - The number of decimal places to truncate to. Must be an integer.
     * @returns {number} Returns the truncated value of the provided number at the specified precision.
     *
     * @throws {Error} Throws an error if 'num' is not numeric or if 'precision' is not an integer.
     *
     * @example
     * // returns 2.3, truncating 2.35 to the nearest tenth
     * Hison.utils.getTrunc(2.35, 1);
     *
     * @example
     * // returns 2, truncating 2.35 to the nearest whole number
     * Hison.utils.getTrunc(2.35);
     */
    Hison.utils.getTrunc = function(num, precision) {
        if(!Hison.utils.isNumeric(num)) throw new Error("Please input only number.");
        if(!Hison.utils.isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.trunc(num * factor) / factor;
    };

    /******************************************
     * Utils String
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
     * Hison.utils.getByteLength('Hello');
     *
     * @example
     * // returns 16 for a string with 3-byte each '안녕하세요' and 1-byte '.' characters
     * Hison.utils.getByteLength('안녕하세요.');
     *
     * Note: For users utilizing different encodings like EUC-KR, the byte values for character ranges can be modified
     * in the Hison.const fields: LESSOREQ_0X7FF_BYTE, LESSOREQ_0XFFFF_BYTE, GREATER_0XFFFF_BYTE.
     */
    Hison.utils.getByteLength = function(str) {
        str = Hison.utils.getToString(str);
        var byteLength = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode <= 0x7F) {
                byteLength += 1;
            } else if (charCode <= 0x7FF) {
                byteLength += Hison.const.LESSOREQ_0X7FF_BYTE;
            } else if (charCode <= 0xFFFF) {
                byteLength += Hison.const.LESSOREQ_0XFFFF_BYTE;
            } else {
                byteLength += Hison.const.GREATER_0XFFFF_BYTE;
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
     * Hison.utils.getCutByteLength('Hello, World!', 5);
     *
     * @example
     * // returns a substring of '안녕'. Becuase truncated to 6 bytes.
     * Hison.utils.getCutByteLength('안녕하세요', 6);
     *
     * Note: The function calculates byte length considering character encodings. 
     * For characters that take more than one byte, the function ensures not to cut the string in the middle of a character.
     */
    Hison.utils.getCutByteLength = function(str, cutByte) {
        str = Hison.utils.getToString(str);
        var byteLength = 0;
        var cutIndex = str.length;
    
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode <= 0x7F) {
                byteLength += 1;
            } else if (charCode <= 0x7FF) {
                byteLength += Hison.const.LESSOREQ_0X7FF_BYTE;
            } else if (charCode <= 0xFFFF) {
                byteLength += Hison.const.LESSOREQ_0XFFFF_BYTE;
            } else {
                byteLength += Hison.const.GREATER_0XFFFF_BYTE;
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
     * Hison.utils.getStringLenForm('Hello', 9);
     *
     * @example
     * // returns 'Hello World' as is since its length is already 11
     * Hison.utils.getStringLenForm('Hello World', 11);
     *
     * Note: The function adds spaces between characters. If the string's length is less than the specified length, 
     * spaces are distributed as evenly as possible. In cases where spaces can't be perfectly even, 
     * the extra spaces are distributed from the beginning.
     */
    Hison.utils.getStringLenForm = function(str, length) {
        str = Hison.utils.getToString(str);
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
     * Hison.utils.getLpad('Hello', '0', 7);
     *
     * @example
     * // returns 'xxHello' with 'x' padding to make its length 7
     * Hison.utils.getLpad('Hello', 'x', 7);
     *
     * Note: If the length of the original string is longer than the specified length, 
     * the function returns the original string without any padding.
     */
    Hison.utils.getLpad = function(str, padStr, length) {
        str = Hison.utils.getToString(str);
        padStr = Hison.utils.getToString(padStr);

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
     * Hison.utils.getRpad('Hello', '0', 7);
     *
     * @example
     * // returns 'Helloxx' with 'x' padding to make its length 7
     * Hison.utils.getRpad('Hello', 'x', 7);
     *
     * Note: If the length of the original string is longer than the specified length, 
     * the function returns the original string without any padding.
     */
    Hison.utils.getRpad = function(str, padStr, length) {
        str = Hison.utils.getToString(str);
        padStr = Hison.utils.getToString(padStr);

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
     * Hison.utils.getTrim('  Hello World  ');
     *
     * @example
     * // returns an empty string for null
     * Hison.utils.getTrim(null);
     *
     * Note: This function is useful for sanitizing inputs where leading and trailing whitespace is not desired,
     * and it ensures that even non-string values can be safely trimmed.
     */
    Hison.utils.getTrim = function(str) {
        str = Hison.utils.getToString(str);
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
     * Hison.utils.getReplaceAll('Hello World', 'l', 'x');
     *
     * @example
     * // returns 'Hello World' with 'World' replaced by 'Universe'
     * Hison.utils.getReplaceAll('Hello World', 'World', 'Universe');
     *
     * Note: This function is useful for making multiple replacements in a string in one go. It ensures that non-string values
     * are converted to strings before the replacement operation, thus preventing errors related to non-string operations.
     */
    Hison.utils.getReplaceAll = function(str, targetStr, replaceStr) {
        str = Hison.utils.getToString(str);
        targetStr = Hison.utils.getToString(targetStr);
        replaceStr = Hison.utils.getToString(replaceStr);
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
     * Hison.utils.nvl(undefined, 'default');
     *
     * @example
     * // returns 'default' when val is null
     * Hison.utils.nvl(null, 'default');
     *
     * @example
     * // returns 'Hello' when val is 'Hello'
     * Hison.utils.nvl('Hello', 'default');
     *
     * Note: This function is particularly useful for handling optional parameters in functions or for setting default values 
     * for variables that may not be present in certain contexts.
     */
    Hison.utils.nvl = function(val, defaultValue) {
        return (val === null || val === undefined) ? defaultValue : val;
    };
    /**
     * Formats a numeric value according to a specified format string. This function first checks if the value is numeric.
     * The format string can include a prefix, a numeric pattern, and a suffix. The numeric pattern dictates how the number
     * should be formatted, including the placement of commas and decimals. The function supports different patterns for integer
     * and decimal parts and can also handle percentage formatting.
     *
     * @param {*} value - The numeric value to be formatted.
     * @param {string} format - The format string defining how the number should be formatted.
     * @returns {string} Returns the formatted number as a string.
     * 
     * @throws {Error} Throws an error if the input value is not numeric or if the format string is invalid.
     *
     * @example
     * // returns '$1,234.5'
     * Hison.utils.getNumberFormat(1234.54, '$#,###.#');
     *
     * @example
     * // returns '1234%'
     * Hison.utils.getNumberFormat(12.34, '#,##0%');
     *
     * Note: The function is designed to handle various formatting requirements, such as different grouping styles,
     * decimal places, and inclusion of currency symbols or percentage signs. It's particularly useful for presenting
     * numbers in a user-friendly format in UIs or reports.
     */
    Hison.utils.getNumberFormat = function(value, format) {
        if (!Hison.utils.isNumeric(value)) {
            throw new Error("Invalid number");
        }
        var regex = /^(.*?)([#0,.]+)(.*?)$/;
        var matches = format.match(regex);

        if (!matches) {
            throw new Error("Invalid format");
        }

        var prefix = matches[1];
        var numberFormat = matches[2];
        var suffix = matches[3];
        var intergerFormat = numberFormat.split('.')[0];
        var decimalFormat = numberFormat.split('.').length > 1 ? numberFormat.split('.')[1] : '';

        if(suffix === '%' || suffix === ' %') value = value * 100;

        numStr = Hison.utils.getToString(value);
        var isNegative = numStr[0] === '-';
        var numStr = isNegative ? numStr.substring(1) : numStr;
        var interger = numStr.split('.')[0];
        var decimal = numStr.split('.').length > 1 ? numStr.split('.')[1] : '';
        
        var result;

        decimal = Hison.utils.getToFloat('0.' + decimal)
                .toLocaleString('en',{
                    minimumFractionDigits: decimalFormat.lastIndexOf('0') + 1,
                    maximumFractionDigits: decimalFormat.length
                    });
        if(decimal === '0') decimal = '';
        else decimal = decimal.substring(1);

        switch (intergerFormat) {
            case "#,###":
                if(Hison.utils.getToNumber(interger) === 0) {
                    result = decimal;
                }
                else {
                    interger = Hison.utils.getToFloat(interger).toLocaleString('en');
                    result = interger + decimal;
                }
                break;
            case "#,##0":
                interger = Hison.utils.getToFloat(interger).toLocaleString('en');
                result = interger + decimal;
                break;
            case "#":
                if(Hison.utils.getToNumber(interger) === 0) {
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
                throw new Error("Invalid format");
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
     * Hison.utils.getRemoveExceptNumbers('abc12345xyz');
     *
     * @example
     * // returns '2023' from a string with various characters
     * Hison.utils.getRemoveExceptNumbers('Year: 2023!');
     *
     * Note: This function is particularly useful in situations where you need to extract or isolate the numerical part of a string,
     * such as processing text input fields that should contain only numbers.
     */
    Hison.utils.getRemoveExceptNumbers = function(str) {
        str = Hison.utils.getToString(str);
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
     * Hison.utils.getRemoveNumbers('abc12345xyz');
     *
     * @example
     * // returns 'Year: !' from a string with various characters
     * Hison.utils.getRemoveNumbers('Year: 2023!');
     *
     * Note: This function is particularly useful in situations where you need to remove or filter out numeric characters from a string,
     * such as processing text input fields that should not contain numbers.
     */
    Hison.utils.getRemoveNumbers = function(str) {
        str = Hison.utils.getToString(str);
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
     * Hison.utils.getReverse('Hello');
     *
     * @example
     * // returns '321' for '123'
     * Hison.utils.getReverse('123');
     *
     * Note: This function can be used in scenarios such as palindrome checking, text effects, or other situations 
     * where the reverse order of characters in a string is needed.
     */
    Hison.utils.getReverse = function(str) {
        str = Hison.utils.getToString(str);
        return str.split('').reverse().join('');
    };
   
    /******************************************
     * Utils Converts
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
     * Hison.utils.getToBoolean('yes');
     *
     * @example
     * // returns false
     * Hison.utils.getToBoolean(0);
     *
     * @example
     * // returns true
     * Hison.utils.getToBoolean('TRUE');
     *
     * @example
     * // returns false
     * Hison.utils.getToBoolean('false');
     *
     * Note: This function is designed to handle various inputs that can be interpreted as boolean true,
     * while treating everything else as false. This is especially useful in contexts where user input
     * or data representation might vary but needs to be interpreted in a boolean context.
     */
    Hison.utils.getToBoolean = function(val) {
        if(Hison.utils.isNumeric(val)) {
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
     * Hison.utils.getToNumber('123');
     *
     * @example
     * // returns -1 for a non-numeric string when -1 is specified as the impossible value
     * Hison.utils.getToNumber('Hello', -1);
     *
     * Note: This function allows for flexibility in handling non-numeric values, 
     * providing the option to specify an alternative return value when conversion is not possible.
     */
    Hison.utils.getToNumber = function(val, impossibleValue) {
        impossibleValue = impossibleValue === undefined ? 0 : impossibleValue;
        if (!Hison.utils.isNumeric(val)) {
            return impossibleValue;
        }
        return Number(val);
    };
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
     * Hison.utils.getToFloat('123.45');
     *
     * @example
     * // returns -1.0 for a non-numeric string when -1.0 is specified as the impossible value
     * Hison.utils.getToFloat('Hello', -1.0);
     *
     * Note: This function allows for flexibility in handling non-numeric values, 
     * providing the option to specify an alternative return value when conversion is not possible.
     */
    Hison.utils.getToFloat = function(val, impossibleValue) {
        impossibleValue = impossibleValue === undefined ? 0 : impossibleValue;
        if (!Hison.utils.isNumeric(val)) {
            return impossibleValue;
        }
        return parseFloat(val);
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
     * Hison.utils.getToInteger('123.45');
     *
     * @example
     * // returns -1 for a non-numeric string when -1 is specified as the impossible value
     * Hison.utils.getToInteger('Hello', -1);
     *
     * Note: This function converts values to integers, truncating any fractional parts. 
     * It provides flexibility in handling non-numeric values by allowing the specification of an alternative return value when conversion is not possible.
     */
    Hison.utils.getToInteger = function(val, impossibleValue) {
        impossibleValue = impossibleValue === undefined ? 0 : impossibleValue;
        if (!Hison.utils.isNumeric(val)) {
            return impossibleValue;
        }
        return parseInt(val, 10);
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
     * Hison.utils.getToString('Hello');
     *
     * @example
     * // returns '123' for a number
     * Hison.utils.getToString(123);
     *
     * @example
     * // returns 'true' for a boolean
     * Hison.utils.getToString(true);
     *
     * @example
     * // returns the description of the symbol
     * Hison.utils.getToString(Symbol('mySymbol'));
     *
     * @example
     * // returns 'default' for an object when 'default' is specified as the impossible value
     * Hison.utils.getToString({}, 'default');
     *
     * Note: This function allows for flexibility in handling values that may not be directly convertible to strings,
     * providing the option to specify an alternative return value when conversion is not possible.
     */
    Hison.utils.getToString = function(val, impossibleValue) {
        impossibleValue = impossibleValue === undefined ? '' : impossibleValue;
        var rtn;
        if (typeof val === 'string') {
            rtn = val;
        } else if (typeof val === 'number' || typeof val === 'boolean' || typeof val === 'bigint') {
            rtn = String(val);
        } else if (typeof val === 'symbol') {
            rtn = val.description;
        } else {
            rtn = impossibleValue;
        }
        return rtn;
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
     * Hison.utils.getFileExtension('image.jpg');
     *
     * @example
     * // returns 'html' for a URL
     * Hison.utils.getFileExtension('https://example.com/page.html');
     *
     * @example
     * // returns an empty string for a string without a file extension
     * Hison.utils.getFileExtension('filename');
     *
     * Note: This function assumes that the file extension (if present) is the part of the string following the last '.' character.
     * It is useful in contexts where file types need to be determined based on file names or URLs.
     */
    Hison.utils.getFileExtension = function(str) {
        str = Hison.utils.getToString(str);
    
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
     * Hison.utils.getFileName('image.jpg');
     *
     * @example
     * // returns 'page' for a URL
     * Hison.utils.getFileName('https://example.com/page.html');
     *
     * @example
     * // returns 'filename' for a string without an extension
     * Hison.utils.getFileName('filename');
     *
     * Note: This function focuses on extracting the file name before the last period, assuming that what follows the last period
     * is the file extension. It is useful when the file extension is not needed or should be processed separately.
     */
    Hison.utils.getFileName = function(str) {
        str = Hison.utils.getToString(str);
    
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
     * var decoded = Hison.utils.getDecodeBase64(encoded);
     * console.log(decoded); // Outputs: 'Hello World!'
     *
     * Note: This function handles the conversion of Base64 encoded strings to their original string format. 
     * It's particularly useful when dealing with data that has been Base64 encoded for transmission or storage and needs to be decoded.
     */
    Hison.utils.getDecodeBase64 = function(str) {
        str = Hison.utils.getToString(str);
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
     * var encoded = Hison.utils.getEncodeBase64("Hello World!");
     * console.log(encoded); // Outputs: 'SGVsbG8gV29ybGQh'
     *
     * Note: This function is useful for encoding strings into Base64, a common requirement when handling data that needs to be
     * transmitted over mediums that do not support all character sets or when storing data in a format that is compact and safe from
     * alteration during transmission.
     */
    Hison.utils.getEncodeBase64 = function(str) {
        str = Hison.utils.getToString(str);
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(_, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    };
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
     * var copy = Hison.utils.deepCopy(original);
     * console.log(copy); // { a: 1, b: { c: 2 } }
     *
     * @example
     * // Deep copy an array
     * var original = [1, [2, 3]];
     * var copy = Hison.utils.deepCopy(original);
     * console.log(copy); // [1, [2, 3]]
     *
     * Note: This function is useful for creating a true copy of an object or array, including all nested elements,
     * without sharing references with the original structure. This is essential in many programming scenarios
     * where modifications to a copied object should not affect the original object.
     */
    Hison.utils.deepCopy = function(object, visited) {
        if (object === null || typeof object !== 'object') {
            return object;
        }
        if (object.constructor !== Object && object.constructor !== Array) {
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
                copy[j] = Hison.utils.deepCopy(object[j], visited);
            }
        } else {
            copy = {};
            visited.push({ source: object, copy: copy });
    
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    copy[key] = Hison.utils.deepCopy(object[key], visited);
                }
            }
        }
        return copy;
    };
})();
