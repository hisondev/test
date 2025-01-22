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
                        history.pushState(null, document.title, location.href);//현재 URL push
                        window.addEventListener('popstate', function(event) {  //뒤로가기 이벤트 등록
                            history.pushState(null, document.title, location.href); //다시 push함으로 뒤로가기 방지
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

/******************************************
 * Global variable hison
 ******************************************/
/**
 * Global variable `hison` serves as a namespace for configuring security measures
 * on the client-side. It is used to initialize and manage security settings such as
 * object freezing, prevention of backward navigation, and blocking access to developer tools.
 *
 * @global
 * @namespace hison
 *
 * @property {Object} shield - A collection of settings related to security measures.
 * @property {string} shield.shieldURL - The URL where security measures should be enforced.
 *     If empty, measures are applied globally.
 * @property {Array<string>} shield.exposeIpList - List of IP addresses exempt from security measures.
 * @property {boolean} shield.isFreeze - Flag indicating whether the `hison` object itself should be frozen to prevent modifications.
 * @property {boolean} shield.isSheld - Flag indicating whether security measures should be actively enforced.
 * @property {boolean} shield.isPossibleGoBack - Allows or prevents the use of the browser's back function.
 * @property {boolean} shield.isPossibleOpenDevTool - Allows or prevents the opening of developer tools.
 *
 * @example
 * // Initialize `hison` with default security settings
 * if (!hison) {
 *     var hison = {
 *         shield: {
 *             shieldURL: "",
 *             exposeIpList: ["0:0:0:0:0:0:0:1"],
 *             isFreeze: true,
 *             isSheld: true,
 *             isPossibleGoBack: false,
 *             isPossibleOpenDevTool: false,
 *         },
 *     };
 * }
 *
 * @description
 * The `hison` global variable is designed to encapsulate security configurations for
 * client-side web applications. It offers developers a centralized way to manage
 * security-related settings, including the ability to specify which parts of the
 * application should be protected, which users are exempt from certain protections,
 * and whether or not to allow specific browser functionalities.
 *
 * This mechanism is particularly useful for applications that require enhanced
 * security measures to protect sensitive data or to comply with certain regulatory
 * standards. By configuring the `hison.shield` properties, developers can tailor
 * the security behavior to meet the specific needs of their application.
 */
if(!hison) {
    var hison = {
        shield : {
            shieldURL : "",
            exposeIpList : ["0:0:0:0:0:0:0:1"],
            isFreeze : true,
            isSheld : true,
            isPossibleGoBack : false,
            isPossibleOpenDevTool : false,
        },
    };
}