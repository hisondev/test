package com.example.demo.common.utils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class Utils {
    private Utils() {
        throw new AssertionError("No Utils instances for you!");
    }

    // 문자열이 영문으로만 이루어져 있는지 확인
    public static boolean isAlpha(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        for (char c : str.toCharArray()) {
            if (!Character.isLetter(c)) {
                return false;
            }
        }
        return true;
    }

    // 문자열이 영문과 숫자로만 이루어져 있는지 확인
    public static boolean isAlphaNumber(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        for (char c : str.toCharArray()) {
            if (!Character.isLetter(c) && !Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }

    // 문자열이 숫자로만 이루어져 있는지 확인
    public static boolean isNumber(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        for (char c : str.toCharArray()) {
            if (!Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }

    // 문자열이 숫자와 특수문자로만 이루어져 있는지 확인
    public static boolean isNumberSymbols(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        Pattern pattern = Pattern.compile("^[0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?~]+$");
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }

    //문자열이 특수문자를 포함하고 있으면 true를 반환한다.
    public static boolean isIncludeSymbols(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        Pattern pattern = Pattern.compile("[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?~]");
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }

    //문자열이 소문자로만 이루어져 있으면 true를 반환한다.
    public static boolean isLowerAlpha(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        return str.matches("[a-z]+");
    }

    // 문자열이 소문자와 숫자로만 이루어져 있으면 true를 반환한다.
    public static boolean isLowerAlphaNumber(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        return str.matches("[a-z0-9]+");
    }
    
    // 문자열이 대문자로만 이루어져 있으면 true를 반환한다.
    public static boolean isUpperAlpha(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        return str.matches("[A-Z]+");
    }

    // 문자열이 대문자와 숫자로만 이루어져 있으면 true를 반환한다.
    public static boolean isUpperAlphaNumber(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        return str.matches("[A-Z0-9]+");
    }

    // 파라메터 문자열 값이 유효한 숫자이면 true를 반환한다.
    public static boolean isNumeric(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        return str.matches("-?\\d+(\\.\\d+)?");
    }

    // 문자열 파라메터가 정수이면 true를 반환한다.
    public static boolean isInteger(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        try {
            // 소수점을 포함할 수 있는 Double로 파싱 후, 원래 값과 정수형 변환된 값 비교
            double d = Double.parseDouble(str);
            return d == (int) d;
        } catch (NumberFormatException e) {
            return false; // 숫자 형식이 아니면 false 반환
        }
    }
    // double 파라메터가 정수이면 true를 반환한다.
    public static boolean isInteger(double d) {
        return d == (int) d; // double 값과 그 정수형 변환된 값 비교
    }

    // float 파라메터가 정수이면 true를 반환한다.
    public static boolean isInteger(float f) {
        return f == (int) f; // float 값과 그 정수형 변환된 값 비교
    }

    // 문자열 파라메터가 양의 정수이면 true를 반환한다.
    public static boolean isPositiveInteger(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        try {
            int value = Integer.parseInt(str);
            return value > 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }
    // double 파라메터가 양의 정수이면 true를 반환한다.
    public static boolean isPositiveInteger(double d) {
        return d > 0 && d == (int) d;
    }
    // float 파라메터가 양의 정수이면 true를 반환한다.
    public static boolean isPositiveInteger(float f) {
        return f > 0 && f == (int) f;
    }
    // int 파라메터가 양의 정수이면 true를 반환한다.
    public static boolean isPositiveInteger(int i) {
        return i > 0;
    }

    // 문자열 파라메터가 음의 정수이면 true를 반환한다.
    public static boolean isNegativeInteger(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        try {
            int value = Integer.parseInt(str);
            return value < 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }
    // double 파라메터가 음의 정수이면 true를 반환한다.
    public static boolean isNegativeInteger(double d) {
        return d < 0 && d == (int) d;
    }
    // float 파라메터가 음의 정수이면 true를 반환한다.
    public static boolean isNegativeInteger(float f) {
        return f < 0 && f == (int) f;
    }
    // int 파라메터가 음의 정수이면 true를 반환한다.
    public static boolean isNegativeInteger(int i) {
        return i < 0;
    }

    // 파라메터 값이 날짜 형식이면 true를 반환한다.
    public static boolean isDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) {
            return false;
        }

        DateTimeFormatter[] formatters = new DateTimeFormatter[]{
            DateTimeFormatter.ofPattern("yyyyMMdd"),
            DateTimeFormatter.ofPattern("yyyy-MM-dd"),
            DateTimeFormatter.ofPattern("yyyy/MM/dd"),
            DateTimeFormatter.ofPattern("yyMMdd")
        };

        for (DateTimeFormatter formatter : formatters) {
            try {
                LocalDate.parse(dateStr, formatter);
                return true; // 성공적으로 파싱되면 true 반환
            } catch (DateTimeParseException e) {
                // 현재 포맷터로 파싱 실패 시 다음 포맷터로 계속 시도
            }
        }

        return false; // 모든 포맷터로 파싱 실패 시 false 반환
    }
    // 파라메터 값이 날짜 형식이면 true를 반환한다.
    public static boolean isDate(int dateInt) {
        String dateStr = Integer.toString(dateInt);
        return isDate(dateStr);
    }

    // 문자열 값이 시간 형식이면 true를 반환한다.
    public static boolean isTime(String timeStr) {
        if (timeStr == null || timeStr.isEmpty()) {
            return false;
        }

        DateTimeFormatter[] formatters = new DateTimeFormatter[]{
            DateTimeFormatter.ofPattern("HH:mm:ss"),
            DateTimeFormatter.ofPattern("HHmmss")
        };

        for (DateTimeFormatter formatter : formatters) {
            try {
                LocalTime.parse(timeStr, formatter);
                return true; // 성공적으로 파싱되면 true 반환
            } catch (DateTimeParseException e) {
                // 현재 포맷터로 파싱 실패 시 다음 포맷터로 계속 시도
            }
        }

        return false; // 모든 포맷터로 파싱 실패 시 false 반환
    }
    // int 타입의 시간 값이 유효한 시간 형식이면 true를 반환한다.
    public static boolean isTime(int timeInt) {
        String timeStr = String.format("%06d", timeInt);
        return isTime(timeStr);
    }

    // 파라메터 값이 날짜 시간 형식이면 true를 반환한다.
    public static boolean isDatetime(String datetimeStr) {
        boolean result = false;
        if (datetimeStr == null || datetimeStr.isEmpty()) {
            return result;
        }

        // 공백을 기준으로 문자열을 나눈다.
        String[] parts = datetimeStr.split(" ");
        result = isDate(parts[0]);
        if (parts.length == 2) {
            result = isTime(parts[1]);
        }

        // 첫 번째 부분을 날짜 형식으로, 두 번째 부분을 시간 형식으로 검사한다.
        return result;
    }

    // 파라메터 값이 파라메터 Mask형식이면 true를 반환한다.
    public static boolean isValidMask(String str, String maskStr) {
        if (str == null || maskStr == null || str.length() != maskStr.length()) {
            return false;
        }
        for (int i = 0; i < str.length(); i++) {
            char charAtStr = str.charAt(i);
            char charAtMask = maskStr.charAt(i);

            switch (charAtMask) {
                case 'A':
                    if (charAtStr < 'A' || charAtStr > 'Z') return false;
                    break;
                case 'a':
                    if (charAtStr < 'a' || charAtStr > 'z') return false;
                    break;
                case '9':
                    if (!Character.isDigit(charAtStr)) return false;
                    break;
                default:
                    if (charAtStr != charAtMask) return false;
            }
        }
        return true;
    }

}
