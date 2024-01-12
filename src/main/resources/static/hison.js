var Hison ={};
(function() {
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
    var _chkStr = function(...strs) {
        strs.forEach(str => {
            if (typeof str !== 'string') {
                throw new Error('The input must be a string');
            }
        });
    };

    Hison.utils = {};
    //Boolean
    //문자열이 영문으로만 이루어져 있으면 true를 반환한다.
    Hison.utils.isAlpha = function(str) {
        return /^[A-Za-z]+$/.test(str);
    };
    //문자열이 영문과 숫자로만 이루어져 있으면 true를 반환한다.
    Hison.utils.isAlphaAndNumber = function(str) {
        return /^[A-Za-z0-9]+$/.test(str);
    };
    //문자열이 숫자로만 이루어져 있으면 true를 반환한다.
    Hison.utils.isNumber = function(str) {
        return /^[0-9]+$/.test(str);
    };
    //문자열이 숫자와 특수문자로만 이루어져 있으면 true를 반환한다.
    Hison.utils.isNumberSymbols = function(str) {
        return /^[0-9!@#$%^&*()_+\\-=\[\]{};':"\\|,.<>\/?~]+$/.test(str);
    };
    //문자열이 특수문자를 포함하고 있으면 true를 반환한다.
    Hison.utils.isHasSymbols = function(str) {
        return /[!@#$%^&*()_+\\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
    };
    //문자열이 영문 소문자로만 이루어져 있으면 true를 반환한다.
    Hison.utils.isLowerAlpha = function(str) {
        return /^[a-z]+$/.test(str);
    };
    //문자열이 영문 소문자와 숫자로만 이루어져 있으면 true를 반환한다.
    Hison.utils.isLowerAlphaAndNumber = function(str) {
        return /^[a-z0-9]+$/.test(str);
    };
    //문자열이 영문 대문자로만 이루어져 있으면 true를 반환한다.
    Hison.utils.isUpperAlpha = function(str) {
        return /^[A-Z]+$/.test(str);
    };
    //문자열이 영문 대문자와 숫자로만 이루어져 있으면 true를 반환한다.
    Hison.utils.isUpperAlphaAndNumber = function(str) {
        return /^[A-Z0-9]+$/.test(str);
    };
    //파라메터 값이 유효한 숫자이면 true를 반환한다.
    Hison.utils.isNumeric = function(num) {
        return !isNaN(num) && isFinite(num);
    };
    //파라메터 값이 정수이면 true를 반환한다.
    Hison.utils.isInteger = function(num) {
        if(!Hison.utils.isNumeric(num)) return false;
        num = Number(num);
        return Number.isInteger(num);
    };
    //파라메터 값이 양의 정수이면 true를 반환한다.
    Hison.utils.isPositiveInteger = function(num) {
        if(!Hison.utils.isNumeric(num)) return false;
        num = Number(num);
        return Number.isInteger(num) && num > 0;
    };
    //파라메터 값이 음의 정수이면 true를 반환한다.
    Hison.utils.isNegativeInteger = function(num) {
        if (!Hison.utils.isNumeric(num)) return false;
        num = Number(num);
        return Number.isInteger(num) && num < 0;
    };    
    //파라메터 값이 배열이면 true를 반환한다.
    Hison.utils.isArray = function(arr) {
        return Array.isArray(arr) && arr.constructor === Array;
    };    
    //파라메터 값이 키-값 쌍 객체이면 true를 반환한다.
    Hison.utils.isObject = function(obj) {
        return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object;
    };
    //파라메터 객체의 각 년월일 값이 날짜 형식이면 true를 반환한다.(1600.01.01 ~ 9999.12.31)
    Hison.utils.isDate = function(dateObj) {
        var yyyy = dateObj.y;
        var mm = dateObj.m;
        var dd = dateObj.d;

        var result = true;
        try {
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

            var y = parseInt(yyyy, 10),
                m = parseInt(mm, 10),
                d = parseInt(dd, 10);
            
            var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
            result = dateRegex.test(d+'-'+m+'-'+y);
        } catch (err) {
            result = false;
        }    
        return result;
    };
    //파라메터 객체의 각 시분초 값이 시간 형식이면 true를 반환한다.
    Hison.utils.isTime = function(timeObj) {
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
    //파라메터 문자열 값이 날짜 시간 형식이면 true를 반환한다.
    Hison.utils.isDatetime = function(datatimeObj) {
        if(!Hison.utils.isDate(datatimeObj.y, datatimeObj.m, datatimeObj.d)) return false;
        if(!Hison.utils.isTime(datatimeObj.h, datatimeObj.mi, datatimeObj.s)) return false;
        return true;
    };
    //파라메터 문자열 값이 메일 형식이면 true를 반환한다.
    Hison.utils.isEmail = function(emailStr) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,}$/;
        return emailPattern.test(emailStr);
    };
    //파라메터 문자열 값이 URL 형식이면 true를 반환한다.
    Hison.utils.isURL = function(urlStr) {
        var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(urlStr);
    };
    //파라메터 문자열 값이 파라메터 Mask형식이면 true를 반환한다.
    Hison.utils.isValidMask = function(str, maskStr) {
        // 문자열과 마스크의 길이가 다르면 false를 반환
        if (str.length !== maskStr.length) {
            return false;
        }
    
        // 각 문자를 순회하며 마스크에 맞는지 확인
        for (var i = 0; i < str.length; i++) {
            var char = str.charAt(i);
            var maskChar = maskStr.charAt(i);
    
            switch (maskChar) {
                case 'A':
                    // 대문자 알파벳이어야 함
                    if (char < 'A' || char > 'Z') return false;
                    break;
                case 'a':
                    // 소문자 알파벳이어야 함
                    if (char < 'a' || char > 'z') return false;
                    break;
                case '9':
                    // 숫자여야 함
                    if (isNaN(parseInt(char))) return false;
                    break;
                default:
                    // 다른 문자는 마스크 문자와 정확히 일치해야 함
                    if (char !== maskChar) return false;
            }
        }
        return true;
    };
    //파라메터 값이 사업자등록번호(한국 기준)형식이면 true를 반환한다.
    /**
     주어진 문자열이 'xxx-xx-xxxxx' 형식에 맞는지 정규 표현식으로 검사합니다.
     하이픈을 제거하고 각 자리 숫자를 배열로 변환합니다.
     사업자등록번호의 유효성을 검사하는 계산을 수행합니다. 이 계산은 각 자리의 숫자에 특정 가중치를 곱한 값들의 합을 10으로 나눈 나머지를 사용합니다.
     마지막으로 계산된 숫자가 사업자등록번호의 마지막 숫자와 일치하는지 확인합니다.
     */
    Hison.utils.isBizNo = function(bizNoStr) {
        var regex = /^\d{3}-\d{2}-\d{5}$/;
        if (!regex.test(bizNoStr)) {
            return false;
        }
    
        bizNoStr = bizNoStr.replace(/-/g, ''); // 하이픈 제거
        var arrBizNo = bizNoStr.split('').map(function(num) {
            return parseInt(num, 10);
        });
    
        var checkSum = (1 * arrBizNo[0] + 3 * arrBizNo[1] + 7 * arrBizNo[2] + 1 * arrBizNo[3] + 3 * arrBizNo[4] + 7 * arrBizNo[5] + 1 * arrBizNo[6] + 3 * arrBizNo[7]) % 10;
        var checkNum = (10 - checkSum) % 10;
    
        return checkNum === arrBizNo[8];
    };
    //파라메터 문자열 값이 법인등록번호 (한국 기준)형식이면 true를 반환한다.
    //형식없이 6-7인지
    Hison.utils.isCorpNo = function(corpNoStr) {
        var regex = /^\d{6}-\d{7}$/;
        return regex.test(corpNoStr);
    };
    //파라메터 문자열 값이 생년월일(한국 기준)형식이면 true를 반환한다.
    Hison.utils.isBirthDate = function(birthDateStr) {
        var regex = /^\d{6}$/;
        if(!regex.test(birthDateStr)) return false;
        var yy = birthDateStr.substring(0,2);
        yy = parseInt(yy, 10) < 30 ? "20" + yy : "19" + yy;
        var mm = birthDateStr.substring(2,4);
        var dd = birthDateStr.substring(4,6);

        return Hison.utils.isDate(yy, mm, dd);
    };
    //파라메터 문자열 값이 주민등록번호(한국 기준)형식이면 true를 반환한다.
    /**
     주어진 문자열이 'xxxxxx-xxxxxxx' 형식에 맞는지 정규 표현식으로 검사합니다. 두 번째 부분의 첫 숫자는 1, 2, 3, 또는 4여야 합니다.
     주민등록번호 각 자리 숫자에 고유한 가중치를 곱하여 합산합니다.
     합산한 값을 11로 나눈 나머지를 계산하고, 이를 11에서 뺀 후 다시 10으로 나눈 나머지를 계산합니다. 이렇게 계산된 숫자가 주민등록번호의 마지막 숫자와 일치해야 합니다. 
     */
    Hison.utils.isResNo = function(resNoStr) {
        var regex = /^\d{6}-[1234]\d{6}$/;
        if (!regex.test(resNoStr)) {
            return false;
        }
    
        var nums = resNoStr.replace('-', '').split('').map(Number);
        var sum = 0;
        var multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
        
        for (var i = 0; i < 12; i++) {
            sum += nums[i] * multipliers[i];
        }
    
        var lastDigit = (11 - (sum % 11)) % 10;
        return lastDigit === nums[12];
    };
    //파라메터 문자열 값이 외국인등록번호(한국 기준)형식이면 true를 반환한다.
    Hison.utils.isFgnResNo = function(fgnResNoStr) {
        var regex = /^\d{6}-[5678]\d{6}$/;
        return regex.test(fgnResNoStr);
    };
    //파라메터 문자열 값이 지역 전화번호(한국 기준)형식이면 true를 반환한다.
    Hison.utils.isLocalTelNo = function(telNoStr) {
        var regex = /^(02|0[3-9][0-9]?)-\d{3,4}-\d{4}$/;
        return regex.test(telNoStr);
    };
    //파라메터 문자열 값이 모바일 전화번호(한국 기준)형식이면 true를 반환한다.
    Hison.utils.isCellTelNo = function(telNoStr) {
        var regex = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/;
        return regex.test(telNoStr);
    };
    //파라메터 문자열 값이 인터넷 전화번호(한국 기준)형식이면 true를 반환한다.
    Hison.utils.isInternetTelNo = function(telNoStr) {
        var regex = /^070-\d{4}-\d{4}$/;
        return regex.test(telNoStr);
    };
    //파라메터 문자열 값이 전화번호(지역 or 모바일 or 인터넷)형식이면 true를 반환한다.
    Hison.utils.isTelNo = function(telNoStr) {
        var result = false;
        if(Hison.utils.isLocalTelNo(telNoStr)) result = true;
        if(Hison.utils.isCellTelNo(telNoStr)) result = true;
        if(Hison.utils.isInternetTelNo(telNoStr)) result = true;
        return result;
    };
    
    //날짜에 날짜를 추가한다. default는 일자 추가
    Hison.utils.addDate = function(datatimeObj, addValue, addType) {
        if (!datatimeObj.y || (addValue !== 0 && !addValue)) {
            throw new Error("Required parameters have not been entered.");
        }
        if(!addType) addType ="";
    
        if(!Hison.utils.isInteger(addValue)) throw new Error("addValue must be an integer");
    
        datatimeObj.m = datatimeObj.m === null || datatimeObj.m === undefined ? 1 : datatimeObj.m;
        datatimeObj.d = datatimeObj.d === null || datatimeObj.d === undefined ? 1 : datatimeObj.d;
        datatimeObj.h = datatimeObj.h === null || datatimeObj.h === undefined ? 0 : datatimeObj.h;
        datatimeObj.mi = datatimeObj.mi === null || datatimeObj.mi === undefined ? 0 : datatimeObj.mi;
        datatimeObj.s = datatimeObj.s === null || datatimeObj.s === undefined ? 0 : datatimeObj.s;

        if(!Hison.utils.isDate(datatimeObj)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(datatimeObj)) throw new Error("Please input a valid date.");
    
        var date = new Date(datatimeObj.y, datatimeObj.m - 1, datatimeObj.d, datatimeObj.h, datatimeObj.mi, datatimeObj.s);
    
        switch (addType.toLowerCase()) {
            case 'y':
                date.setFullYear(date.getFullYear() + addValue);
                break;
            case 'm':
                date.setMonth(date.getMonth() + addValue);
                break;
            case 'd':
                date.setDate(date.getDate() + addValue);
                break;
            case 'h':
                date.setHours(date.getHours() + addValue);
                break;
            case 'mi':
                date.setMinutes(date.getMinutes() + addValue);
                break;
            case 's':
                date.setSeconds(date.getSeconds() + addValue);
                break;
            default:
                date.setDate(date.getDate() + addValue);
        }

        return {
            y: date.getFullYear().toString().padStart(4, '0'),
            m: (date.getMonth() + 1).toString().padStart(2, '0'),
            d: date.getDate().toString().padStart(2, '0'),
            h: date.getHours().toString().padStart(2, '0'),
            mi: date.getMinutes().toString().padStart(2, '0'),
            s: date.getSeconds().toString().padStart(2, '0')
        };
    };
    //두 날짜의 차이를 가져온다. default는 일자 차이
    Hison.utils.getDateDiff = function(datetimeObj1, datetimeObj2, diffType) {
        if (!datetimeObj1.y || !datetimeObj2.y) {
            throw new Error("Required parameters have not been entered.");
        }
        if(!diffType) diffType = "";
    
        datetimeObj1.m = datetimeObj1.m || 1; datetimeObj2.m = datetimeObj2.m || 1;
        datetimeObj1.d = datetimeObj1.d || 1; datetimeObj2.d = datetimeObj2.d || 1;
        datetimeObj1.h = datetimeObj1.h || 0; datetimeObj2.h = datetimeObj2.h || 0;
        datetimeObj1.mi = datetimeObj1.mi || 0; datetimeObj2.mi = datetimeObj2.mi || 0;
        datetimeObj1.s = datetimeObj1.s || 0; datetimeObj2.s = datetimeObj2.s || 0;

        if(!Hison.utils.isDate(datetimeObj1)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(datetimeObj1)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isDate(datetimeObj2)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(datetimeObj2)) throw new Error("Please input a valid date.");
    
        var date1 = new Date(datetimeObj1.y, datetimeObj1.m - 1, datetimeObj1.d, datetimeObj1.h, datetimeObj1.mi, datetimeObj1.s);
        var date2 = new Date(datetimeObj2.y, datetimeObj2.m - 1, datetimeObj2.d, datetimeObj2.h, datetimeObj2.mi, datetimeObj2.s);
    
        switch (diffType.toLowerCase()) {
            case 'y':
                return date2.getFullYear() - date1.getFullYear();
            case 'm':
                return (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth();
            case 'd':
                return Math.floor((date2 - date1) / (24 * 60 * 60 * 1000));
            case 'h':
                return Math.floor((date2 - date1) / (60 * 60 * 1000));
            case 'mi':
                return Math.floor((date2 - date1) / (60 * 1000));
            case 's':
                return Math.floor((date2 - date1) / 1000);
            default:
                return Math.floor((date2 - date1) / (24 * 60 * 60 * 1000));
        }
    };
    //해당 월의 영문표기를 가져온다.
    Hison.utils.getMonthName = function(m, isFullName) {
        if (isFullName !== false) {
            isFullName = true;
        }
        m = parseInt(m, 10);

        var monthsFullName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthsShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (m < 1 || m > 12) {
            throw new Error("Month must be between 1 and 12");
        }

        return isFullName ? monthsFullName[m - 1] : monthsShortName[m - 1];
    };
    //파라메터의 날짜 문자열을 파라메터 포맷의 형식으로 가져온다. default는 
    Hison.utils.getDateWithFormat = function(datetimeObj, format) {
        if(!datetimeObj.y) throw new Error("Required parameters have not been entered.");
        if(!format) format = "";

        // 날짜 및 시간을 문자열로 변환 (단일 자릿수는 0으로 채움)
        datetimeObj.m = (datetimeObj.m || 1).toString().padStart(2, '0');
        datetimeObj.d = (datetimeObj.d || 1).toString().padStart(2, '0');
        datetimeObj.h = (datetimeObj.h || 0).toString().padStart(2, '0');
        datetimeObj.mi = (datetimeObj.mi || 0).toString().padStart(2, '0');
        datetimeObj.s = (datetimeObj.s || 0).toString().padStart(2, '0');

        if(!Hison.utils.isDate(datetimeObj)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(datetimeObj)) throw new Error("Please input a valid date.");

        var mn = Hison.utils.getMonthName(datetimeObj.m);
        var mnabb = Hison.utils.getMonthName(datetimeObj.m, false);
    
        // 포맷에 따라 날짜 및 시간 문자열 조합
        switch (format.toLowerCase()) {
            case 'yyyy':
                return datetimeObj.y;
                
            case 'yyyymm':
                return datetimeObj.y + datetimeObj.m;
            case 'yyyy-mm':
                return datetimeObj.y + '-' + datetimeObj.m;
            case 'yyyy/mm':
                return datetimeObj.y + '/' + datetimeObj.m;
            case 'yyyy. mm':
                return datetimeObj.y + '. ' + datetimeObj.m;
            case 'yyyy mm':
                return datetimeObj.y + ' ' + datetimeObj.m;

            case 'yyyymmdd':
                return datetimeObj.y + datetimeObj.m + datetimeObj.d;
            case 'yyyy-mm-dd':
                return datetimeObj.y + '-' + datetimeObj.m + '-' + datetimeObj.d;
            case 'yyyy/mm/dd':
                return datetimeObj.y + '/' + datetimeObj.m + '/' + datetimeObj.d;
            case 'yyyy. mm. dd':
                return datetimeObj.y + '. ' + datetimeObj.m + '. ' + datetimeObj.d;
            case 'yyyy mm dd':
                return datetimeObj.y + ' ' + datetimeObj.m + ' ' + datetimeObj.d;

            case 'yyyymmdd hh':
                return datetimeObj.y + datetimeObj.m + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyymmdd hhmi':
                return datetimeObj.y + datetimeObj.m + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'yyyymmdd hhmiss':
                return datetimeObj.y + datetimeObj.m + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'yyyymmdd hh:mi':
                return datetimeObj.y + datetimeObj.m + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'yyyymmdd hh:mi:ss':
                return datetimeObj.y + datetimeObj.m + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'yyyy-mm-dd hh':
                return datetimeObj.y + '-' + datetimeObj.m + '-' + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyy-mm-dd hhmi':
                return datetimeObj.y + '-' + datetimeObj.m + '-' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'yyyy-mm-dd hhmiss':
                return datetimeObj.y + '-' + datetimeObj.m + '-' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'yyyy-mm-dd hh:mi':
                return datetimeObj.y + '-' + datetimeObj.m + '-' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'yyyy-mm-dd hh:mi:ss':
                return datetimeObj.y + '-' + datetimeObj.m + '-' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'yyyy/mm/dd hh':
                return datetimeObj.y + '/' + datetimeObj.m + '/' + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyy/mm/dd hhmi':
                return datetimeObj.y + '/' + datetimeObj.m + '/' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'yyyy/mm/dd hhmiss':
                return datetimeObj.y + '/' + datetimeObj.m + '/' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'yyyy/mm/dd hh:mi':
                return datetimeObj.y + '/' + datetimeObj.m + '/' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'yyyy/mm/dd hh:mi:ss':
                return datetimeObj.y + '/' + datetimeObj.m + '/' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'yyyy. mm. dd hh':
                return datetimeObj.y + '. ' + datetimeObj.m + '. ' + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyy. mm. dd hhmi':
                return datetimeObj.y + '. ' + datetimeObj.m + '. ' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'yyyy. mm. dd hhmiss':
                return datetimeObj.y + '. ' + datetimeObj.m + '. ' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'yyyy. mm. dd hh:mi':
                return datetimeObj.y + '. ' + datetimeObj.m + '. ' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'yyyy. mm. dd hh:mi:ss':
                return datetimeObj.y + '. ' + datetimeObj.m + '. ' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'yyyy mm dd hh':
                return datetimeObj.y + ' ' + datetimeObj.m + ' ' + datetimeObj.d + ' ' + datetimeObj.h;
            case 'yyyy mm dd hhmi':
                return datetimeObj.y + ' ' + datetimeObj.m + ' ' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'yyyy mm dd hhmiss':
                return datetimeObj.y + ' ' + datetimeObj.m + ' ' + datetimeObj.d + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'yyyy mm dd hh:mi':
                return datetimeObj.y + ' ' + datetimeObj.m + ' ' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'yyyy mm dd hh:mi:ss':
                return datetimeObj.y + ' ' + datetimeObj.m + ' ' + datetimeObj.d + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;

            case 'mmyyyy':
                return datetimeObj.m + datetimeObj.y;
            case 'mm-yyyy':
                return datetimeObj.m + '-' + datetimeObj.y;
            case 'mm/yyyy':
                return datetimeObj.m + '/' + datetimeObj.y;
            case 'mm. yyyy':
                return datetimeObj.m + '/' + datetimeObj.y;
            case 'mm yyyy':
                return datetimeObj.m + '/' + datetimeObj.y;
            case 'mn yyyy':
                return mn + ' ' + datetimeObj.y;
            case 'mn, yyyy':
                return mn + ', ' + datetimeObj.y;
            case 'mnabb yyyy':
                return mnabb + ' ' + datetimeObj.y;
            case 'mnabb, yyyy':
                return mnabb + ', ' + datetimeObj.y;

            case 'mmddyyyy':
                return datetimeObj.m + datetimeObj.d + datetimeObj.y;
            case 'mm-dd-yyyy':
                return datetimeObj.m + '-' + datetimeObj.d + '-' + datetimeObj.y;
            case 'mm/dd/yyyy':
                return datetimeObj.m + '/' + datetimeObj.d + '/' + datetimeObj.y;
            case 'mm. dd. yyyy':
                return datetimeObj.m + '. ' + datetimeObj.d + '. ' + datetimeObj.y;
            case 'mn dd yyyy':
                return mn + ' ' + datetimeObj.d + ' ' + datetimeObj.y;
            case 'mn dd, yyyy':
                return mn + ' ' + datetimeObj.d + ', ' + datetimeObj.y;
            case 'mnabb dd yyyy':
                return mnabb + ' ' + datetimeObj.d + ' ' + datetimeObj.y;
            case 'mnabb dd, yyyy':
                return mnabb + ' ' + datetimeObj.d + ', ' + datetimeObj.y;
            case 'mn ddth yyyy':
                return mn + ' ' + datetimeObj.d + 'th ' + datetimeObj.y;
            case 'mn ddth, yyyy':
                return mn + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y;
            case 'mnabb ddth yyyy':
                return mnabb + ' ' + datetimeObj.d + 'th ' + datetimeObj.y;
            case 'mnabb ddth, yyyy':
                return mnabb + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y;

            case 'mmddyyyy hh':
                return datetimeObj.m + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mmddyyyy hhmi':
                return datetimeObj.m + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mmddyyyy hhmiss':
                return datetimeObj.m + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mmddyyyy hh:mi':
                return datetimeObj.m + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mmddyyyy hh:mi:ss':
                return datetimeObj.m + datetimeObj.d + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mm-dd-yyyy hh':
                return datetimeObj.m + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mm-dd-yyyy hhmi':
                return datetimeObj.m + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mm-dd-yyyy hhmiss':
                return datetimeObj.m + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mm-dd-yyyy hh:mi':
                return datetimeObj.m + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mm-dd-yyyy hh:mi:ss':
                return datetimeObj.m + '-' + datetimeObj.d + '-' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mm/dd/yyyy hh':
                return datetimeObj.m + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mm/dd/yyyy hhmi':
                return datetimeObj.m + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mm/dd/yyyy hhmiss':
                return datetimeObj.m + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mm/dd/yyyy hh:mi':
                return datetimeObj.m + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mm/dd/yyyy hh:mi:ss':
                return datetimeObj.m + '/' + datetimeObj.d + '/' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mm. dd. yyyy hh':
                return datetimeObj.m + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mm. dd. yyyy hhmi':
                return datetimeObj.m + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mm. dd. yyyy hhmiss':
                return datetimeObj.m + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mm. dd. yyyy hh:mi':
                return datetimeObj.m + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mm. dd. yyyy hh:mi:ss':
                return datetimeObj.m + '. ' + datetimeObj.d + '. ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mn dd yyyy hh':
                return mn + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mn dd yyyy hhmi':
                return mn + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mn dd yyyy hhmiss':
                return mn + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mn dd yyyy hh:mi':
                return mn + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mn dd yyyy hh:mi:ss':
                return mn + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mn dd, yyyy hh':
                return mn + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mn dd, yyyy hhmi':
                return mn + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mn dd, yyyy hhmiss':
                return mn + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mn dd, yyyy hh:mi':
                return mn + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mn dd, yyyy hh:mi:ss':
                return mn + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mnabb dd yyyy hh':
                return mnabb + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mnabb dd yyyy hhmi':
                return mnabb + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mnabb dd yyyy hhmiss':
                return mnabb + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mnabb dd yyyy hh:mi':
                return mnabb + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mnabb dd yyyy hh:mi:ss':
                return mnabb + ' ' + datetimeObj.d + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mnabb dd, yyyy hh':
                return mnabb + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mnabb dd, yyyy hhmi':
                return mnabb + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mnabb dd, yyyy hhmiss':
                return mnabb + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mnabb dd, yyyy hh:mi':
                return mnabb + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mnabb dd, yyyy hh:mi:ss':
                return mnabb + ' ' + datetimeObj.d + ', ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mn ddth yyyy hh':
                return mn + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mn ddth yyyy hhmi':
                return mn + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mn ddth yyyy hhmiss':
                return mn + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mn ddth yyyy hh:mi':
                return mn + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mn ddth yyyy hh:mi:ss':
                return mn + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mn ddth, yyyy hh':
                return mn + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mn ddth, yyyy hhmi':
                return mn + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mn ddth, yyyy hhmiss':
                return mn + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mn ddth, yyyy hh:mi':
                return mn + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mn ddth, yyyy hh:mi:ss':
                return mn + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mnabb ddth yyyy hh':
                return mnabb + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mnabb ddth yyyy hhmi':
                return mnabb + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mnabb ddth yyyy hhmiss':
                return mnabb + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mnabb ddth yyyy hh:mi':
                return mnabb + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mnabb ddth yyyy hh:mi:ss':
                return mnabb + ' ' + datetimeObj.d + 'th ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'mnabb ddth, yyyy hh':
                return mnabb + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'mnabb ddth, yyyy hhmi':
                return mnabb + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'mnabb ddth, yyyy hhmiss':
                return mnabb + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'mnabb ddth, yyyy hh:mi':
                return mnabb + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'mnabb ddth, yyyy hh:mi:ss':
                return mnabb + ' ' + datetimeObj.d + 'th, ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;

            case 'ddmmyyyy':
                return datetimeObj.d + datetimeObj.m + datetimeObj.y;
            case 'dd-mm-yyyy':
                return datetimeObj.d + '-' + datetimeObj.m + '-' + datetimeObj.y;
            case 'dd/mm/yyyy':
                return datetimeObj.d + '/' + datetimeObj.m + '/' + datetimeObj.y;
            case 'dd. mm. yyyy':
                return datetimeObj.d + '. ' + datetimeObj.m + '. ' + datetimeObj.y;
            case 'dd mn yyyy':
                return datetimeObj.d + ' ' + mn + ' ' + datetimeObj.y;
            case 'dd mnabb yyyy':
                return datetimeObj.d + ' ' + mnabb + ' ' + datetimeObj.y;
            case 'ddth mn yyyy':
                return datetimeObj.d + 'th ' + mn + ' ' + datetimeObj.y;
            case 'ddth mnabb yyyy':
                return datetimeObj.d + 'th ' + mnabb + ' ' + datetimeObj.y;

            case 'ddmmyyyy hh':
                return datetimeObj.d + datetimeObj.m + datetimeObj.y + ' ' + datetimeObj.h;
            case 'ddmmyyyy hhmi':
                return datetimeObj.d + datetimeObj.m + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'ddmmyyyy hhmiss':
                return datetimeObj.d + datetimeObj.m + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'ddmmyyyy hh:mi':
                return datetimeObj.d + datetimeObj.m + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'ddmmyyyy hh:mi:ss':
                return datetimeObj.d + datetimeObj.m + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'dd-mm-yyyy hh':
                return datetimeObj.d + '-' + datetimeObj.m + '-' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd-mm-yyyy hhmi':
                return datetimeObj.d + '-' + datetimeObj.m + '-' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'dd-mm-yyyy hhmiss':
                return datetimeObj.d + '-' + datetimeObj.m + '-' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'dd-mm-yyyy hh:mi':
                return datetimeObj.d + '-' + datetimeObj.m + '-' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'dd-mm-yyyy hh:mi:ss':
                return datetimeObj.d + '-' + datetimeObj.m + '-' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'dd/mm/yyyy hh':
                return datetimeObj.d + '/' + datetimeObj.m + '/' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd/mm/yyyy hhmi':
                return datetimeObj.d + '/' + datetimeObj.m + '/' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'dd/mm/yyyy hhmiss':
                return datetimeObj.d + '/' + datetimeObj.m + '/' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'dd/mm/yyyy hh:mi':
                return datetimeObj.d + '/' + datetimeObj.m + '/' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'dd/mm/yyyy hh:mi:ss':
                return datetimeObj.d + '/' + datetimeObj.m + '/' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'dd. mm. yyyy hh':
                return datetimeObj.d + '. ' + datetimeObj.m + '. ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd. mm. yyyy hhmi':
                return datetimeObj.d + '. ' + datetimeObj.m + '. ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'dd. mm. yyyy hhmiss':
                return datetimeObj.d + '. ' + datetimeObj.m + '. ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'dd. mm. yyyy hh:mi':
                return datetimeObj.d + '. ' + datetimeObj.m + '. ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'dd. mm. yyyy hh:mi:ss':
                return datetimeObj.d + '. ' + datetimeObj.m + '. ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'dd mn yyyy hh':
                return datetimeObj.d + ' ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd mn yyyy hhmi':
                return datetimeObj.d + ' ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'dd mn yyyy hhmiss':
                return datetimeObj.d + ' ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'dd mn yyyy hh:mi':
                return datetimeObj.d + ' ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'dd mn yyyy hh:mi:ss':
                return datetimeObj.d + ' ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'dd mnabb yyyy hh':
                return datetimeObj.d + ' ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'dd mnabb yyyy hhmi':
                return datetimeObj.d + ' ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'dd mnabb yyyy hhmiss':
                return datetimeObj.d + ' ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'dd mnabb yyyy hh:mi':
                return datetimeObj.d + ' ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'dd mnabb yyyy hh:mi:ss':
                return datetimeObj.d + ' ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'ddth mn yyyy hh':
                return datetimeObj.d + 'th ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'ddth mn yyyy hhmi':
                return datetimeObj.d + 'th ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'ddth mn yyyy hhmiss':
                return datetimeObj.d + 'th ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'ddth mn yyyy hh:mi':
                return datetimeObj.d + 'th ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'ddth mn yyyy hh:mi:ss':
                return datetimeObj.d + 'th ' + mn + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;
            case 'ddth mnabb yyyy hh':
                return datetimeObj.d + 'th ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h;
            case 'ddth mnabb yyyy hhmi':
                return datetimeObj.d + 'th ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi;
            case 'ddth mnabb yyyy hhmiss':
                return datetimeObj.d + 'th ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h + datetimeObj.mi + datetimeObj.s;
            case 'ddth mnabb yyyy hh:mi':
                return datetimeObj.d + 'th ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi;
            case 'ddth mnabb yyyy hh:mi:ss':
                return datetimeObj.d + 'th ' + mnabb + ' ' + datetimeObj.y + ' ' + datetimeObj.h + ':' + datetimeObj.mi + ':' + datetimeObj.s;

            default:
                return mn + ' ' + datetimeObj.d + ', ' + datetimeObj.y;
        }
    };
    //해당 날짜의 요일을 반환한다.
    Hison.utils.getDayOfWeek = function(datetimeObj, dayType) {
        // 필수 파라미터 검증
        if (!datetimeObj.y || !datetimeObj.m || !datetimeObj.d) {
            throw new Error("Required parameters have not been entered.");
        }
        if(!dayType) dayType = "";

        if(!Hison.utils.isDate(datetimeObj)) throw new Error("Please input a valid date.");
        if(!Hison.utils.isTime(datetimeObj)) throw new Error("Please input a valid date.");
    
        // 날짜 객체 생성
        var date = new Date(datetimeObj.y, datetimeObj.m - 1, datetimeObj.d);
        var dayOfWeek = date.getDay();
    
        // dayType에 따른 요일 반환
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
    //해당 연월의 마지막 일자를 반환한다.
    Hison.utils.getLastDay = function(yyyy, mm) {
        var nextMonthFirstDay = new Date(yyyy, mm, 1);
        nextMonthFirstDay.setDate(0);
        return nextMonthFirstDay.getDate().toString();
    };
    //현재 년도를 반환한다.
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
    //현재 월을 반환한다.
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
    //현재 년월을 반환한다.
    Hison.utils.getSysYearMonth = function(format) {
        if(!format) format = "mn, yyyy";
        var currentDate = new Date();
        return Hison.utils.getDateWithFormat({y:currentDate.getFullYear(),m:currentDate.getMonth() + 1}, format)
    };
    //현재 일자를 반환한다.
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
    //현재 요일을 반환한다.
    Hison.utils.getSysDayOfWeek = function(dayType) {
        if(!dayType) dayType = "d";
        var currentDate = new Date(); // 현재 날짜 및 시간을 얻음
        return Hison.utils.getDayOfWeek({y:currentDate.getFullYear(),m:currentDate.getMonth() + 1,d:currentDate.getDate()}, dayType);
    };
    //현재 시분초를 반환한다. default hh:mm:ss
    Hison.utils.getSysTime = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'hhmmss':
                return currentDate.getHours().toString().padStart(2, '0') + currentDate.getMinutes().toString().padStart(2, '0') + currentDate.getSeconds().toString().padStart(2, '0');
            default:
                return currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0') + ":" + currentDate.getSeconds().toString().padStart(2, '0');
        }
    };
    //현재 시각은 반환한다.
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
    //현재 시분을 반환한다. defualt hh:mm
    Hison.utils.getSysHourMinute = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'hhmm':
                return currentDate.getHours().toString().padStart(2, '0') + "" + currentDate.getMinutes().toString().padStart(2, '0');
            default:
                return currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0');
        }
    };
    //현재 분을 반환한다.
    Hison.utils.getSysMinute = function(format) {
        if(!format) format = "";
        var currentDate = new Date();
        switch (format.toLowerCase()) {
            case 'mm':
                return currentDate.getMinutes().toString().padStart(2, '0');
            default:
                return currentDate.getMinutes().toString();
        }
    };    
    //현재 초를 반환한다.
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
    //현재 날짜를 반환한다.
    Hison.utils.getSysDate = function(format) {
        if(!format) format = "yyyy-mm-dd hh:mi:ss";
        var currentDate = new Date(); // 현재 날짜 및 시간을 얻음
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

    //파라메터 값을 파라메터 지정한 위치로 올림한 값을 반환한다.
    Hison.utils.getCeil = function(num, precision) {
        if(!Hison.utils.isNumeric(num)) throw new Error("Please input only number.");
        if(!Hison.utils.isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.ceil(num * factor) / factor;
    };
    //파라메터 값을 파라메터 지정한 위치로 내림한 값을 반환한다.
    Hison.utils.getFloor = function(num, precision) {
        if(!Hison.utils.isNumeric(num)) throw new Error("Please input only number.");
        if(!Hison.utils.isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.floor(num * factor) / factor;
    };
    //파라메터 값을 파라메터 지정한 위치로 반올림한 값을 반환한다.
    Hison.utils.getRound = function(num, precision) {
        if(!Hison.utils.isNumeric(num)) throw new Error("Please input only number.");
        if(!Hison.utils.isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    };
    //파라메터 값을 파라메터 지정한 위치로 버림한 값을 반환한다.
    Hison.utils.getTrunc = function(num, precision) {
        if(!Hison.utils.isNumeric(num)) throw new Error("Please input only number.");
        if(!Hison.utils.isInteger(precision)) precision = 0;
        var factor = Math.pow(10, precision);
        return Math.trunc(num * factor) / factor;
    };
    
    //문자열의 Byte길이를 반환한다.
    Hison.utils.getByteLength = function(str) {
        var byteLength = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode <= 0x7F) {
                byteLength += 1; // ASCII 문자는 1바이트
            } else if (charCode <= 0x7FF) {
                byteLength += Hison.const.LESSOREQ_0X7FF_BYTE; // 2바이트 문자
            } else if (charCode <= 0xFFFF) {
                byteLength += Hison.const.LESSOREQ_0XFFFF_BYTE; // 3바이트 문자
            } else {
                byteLength += Hison.const.GREATER_0XFFFF_BYTE; // 4바이트 문자 (예: 일부 이모지)
            }
        }
        return byteLength;
    };
    //파라메터 문자열을 파라메터 Byte로 자른 값을 반환한다.
    Hison.utils.getCutByteLength = function(str, cutByte) {
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
    //파라메터 문자열에 사이사이 일정한 공백을 추가하여 길이 규격을 맞춘 값을 반환한다.
    Hison.utils.getStringLenForm = function() {};
    //파라메터 문자열 왼쪽에 파라메터 특정 문자를 반복해 채운 값을 반환한다.
    Hison.utils.getLpad = function() {};
    //파라메터 문자열 오른쪽에 파라메터 특정 문자를 반복해 채운 값을 반환한다.
    Hison.utils.getRpad = function() {};
    //파라메터 문자열 좌우 공백을 제거한 값을 반환한다.
    Hison.utils.getTrim = function() {};
    //파라메터 문자열의 파라메터 문자일부를 파라메터 문자열로 치환한 값을 반환한다.
    Hison.utils.getRplaceAll = function() {};
    //값이 undifined, null인 경우 지정된 값을 반환한다.
    Hison.utils.nvl = function() {};
    //파라메터 값을 파라메터 숫자 형식으로 변환한 값을 반환한다.
    Hison.utils.getNumberFormat = function() {};
    //파라메터 값을 파라메터 마스크 형식으로 변환한 값을 반환한다.
    Hison.utils.getMask = function() {};
    //파라메터 문자열의 모든 문자를 제거한 값을 반환한다.
    Hison.utils.getRemoveAlpha = function() {};
    //파라메터 문자열의 모든 숫자를 제거한 값을 반환한다.
    Hison.utils.getRemoveNumber = function() {};
    //파라메터 문자열의 반전값을 반환한다.
    Hison.utils.getReverse = function() {};
    
    //파라메터 값에 대해 Boolean타입으로 형변환 한 값을 반환한다. (0을 제외한 모든 숫자(문자열숫자) 또는 true, 'true/TRUE', 'y/Y', 'yes/YES', 'check/CHECK', 'c/C', '참'이면 true)
    Hison.utils.getToBoolean = function(val) {
        if(Hison.utils.isNumeric(val)) {
            return Number(val) != 0;
        }
        else if (typeof val === 'boolean'){
            return val
        }
        else if (typeof val === "string"){
            return ['true','y','yes','check','c','참'].indexOf(val.toLowerCase()) >= 0;
        }
        else {
            return false;
        }
    };
    //파라메터 값에 대해 Number타입으로 형변환 한 값을 반환한다. 형변환 불가 시 0반환
    Hison.utils.getToNumber = function(val) {
        if (!Hison.utils.isNumeric(val)) {
            return 0;
        }
        return Number(val);
    };
    //파라메터 값에 대해 Number타입으로 형변환 한 값을 반환한다. 형변환 불가 시 0반환
    Hison.utils.getToFloat = function(val) {
        if (!Hison.utils.isNumeric(val)) {
            return 0;
        }
        return parseFloat(val);
    };
    //파라메터 값에 대해 Integer타입으로 형변환 한 값을 반환한다. 형변환 불가 시 0반환. 소수점은 버린다.
    Hison.utils.getToInteger = function(val) {
        if (!Hison.utils.isNumeric(val)) {
            return 0;
        }
        return parseInt(val, 10);
    };
    //파라메터 값에 대해 String타입으로 형변환 한 값을 반환한다. 적절한 형변환 불가 시 ""반환.
    Hison.utils.getToString = function(val) {
        var rtn;
        if (typeof val === 'string') {
            rtn = val;
        } else if (typeof val === 'number' || typeof val === 'boolean' || typeof val === 'bigint') {
            rtn = String(val);
        } else if (typeof val === 'symbol') {
            rtn = val.description;
        } else {
            rtn = "";
        }
        return rtn;
    };
    
    //파라메터 URL 또는 파일명에서 확장자를 추출한 값을 반환한다.
    Hison.utils.getFileExtension = function() {};
    //파라메터 URL 또는 파일명에서 확장자를 제외한 파일명 값을 반환한다.
    Hison.utils.getFileName = function() {};
    
    //파라메터 값을 파라메터 문자포맷으로 디코딩한 값을 반환한다.
    Hison.utils.getDecode = function() {};
    //파라메터 값을 파라메터 문자포맷으로 인코딩한 값을 반환한다.
    Hison.utils.getEncode = function() {};
})();
