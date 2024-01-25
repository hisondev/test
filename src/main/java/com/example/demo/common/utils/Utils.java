package com.example.demo.common.utils;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

public final class Utils {
    private Utils() {
        throw new UtilsException("No Utils instances for you!");
    }

    /**********************************************************************
     * for boolean
     **********************************************************************/
    // 문자열이 영문으로만 이루어져 있는지 확인
    public static boolean isAlpha(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        for (char c : s.toCharArray()) {
            if (!Character.isLetter(c)) {
                return false;
            }
        }
        return true;
    }

    // 문자열이 영문과 숫자로만 이루어져 있는지 확인
    public static boolean isAlphaNumber(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        for (char c : s.toCharArray()) {
            if (!Character.isLetter(c) && !Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }

    // 문자열이 숫자로만 이루어져 있는지 확인
    public static boolean isNumber(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        for (char c : s.toCharArray()) {
            if (!Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }

    // 문자열이 숫자와 특수문자로만 이루어져 있는지 확인
    public static boolean isNumberSymbols(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        Pattern pattern = Pattern.compile("^[0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?~]+$");
        Matcher matcher = pattern.matcher(s);
        return matcher.matches();
    }

    //문자열이 특수문자를 포함하고 있으면 true를 반환한다.
    public static boolean isIncludeSymbols(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        Pattern pattern = Pattern.compile("[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?~]");
        Matcher matcher = pattern.matcher(s);
        return matcher.matches();
    }

    //문자열이 소문자로만 이루어져 있으면 true를 반환한다.
    public static boolean isLowerAlpha(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        return s.matches("[a-z]+");
    }

    // 문자열이 소문자와 숫자로만 이루어져 있으면 true를 반환한다.
    public static boolean isLowerAlphaNumber(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        return s.matches("[a-z0-9]+");
    }
    
    // 문자열이 대문자로만 이루어져 있으면 true를 반환한다.
    public static boolean isUpperAlpha(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        return s.matches("[A-Z]+");
    }

    // 문자열이 대문자와 숫자로만 이루어져 있으면 true를 반환한다.
    public static boolean isUpperAlphaNumber(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        return s.matches("[A-Z0-9]+");
    }

    // 파라메터 문자열 값이 유효한 숫자이면 true를 반환한다.
    public static boolean isNumeric(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        return s.matches("-?\\d+(\\.\\d+)?");
    }

    // 문자열 파라메터가 정수이면 true를 반환한다.
    public static boolean isInteger(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        try {
            // 소수점을 포함할 수 있는 Double로 파싱 후, 원래 값과 정수형 변환된 값 비교
            double d = Double.parseDouble(s);
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
    public static boolean isPositiveInteger(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        try {
            int value = Integer.parseInt(s);
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
    public static boolean isNegativeInteger(String s) {
        if (s == null || s.isEmpty()) {
            return false;
        }
        try {
            int value = Integer.parseInt(s);
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

    private static LocalDate getDate(String date) {
        date = date.split(" ")[0];
        if (date == null || date.isEmpty()) {
            return null;
        }
        DateTimeFormatter[] formatters = new DateTimeFormatter[]{
            DateTimeFormatter.ofPattern("yyyyMMdd"),
            DateTimeFormatter.ofPattern("yyyy-MM-dd"),
            DateTimeFormatter.ofPattern("yyyy/MM/dd")
        };
        for (DateTimeFormatter formatter : formatters) {
            try {
                return LocalDate.parse(date, formatter); // 성공적으로 파싱되면 LocalDate 반환
            } catch (DateTimeParseException e) {
                // 현재 포맷터로 파싱 실패 시 다음 포맷터로 계속 시도
            }
        }
        return null; // 모든 포맷터로 파싱 실패 시 null 반환
    }
    // 파라메터 값이 날짜 형식이면 true를 반환한다.
    public static boolean isDate(String date) {
        return getDate(date) != null;
    }

    private static LocalTime getTime(String time) {
        if (time == null || time.isEmpty()) {
            return null;
        }
        DateTimeFormatter[] formatters = new DateTimeFormatter[]{
            DateTimeFormatter.ofPattern("HH:mm:ss"),
            DateTimeFormatter.ofPattern("HHmmss")
        };
        for (DateTimeFormatter formatter : formatters) {
            try {
                return LocalTime.parse(time, formatter); // 성공적으로 파싱되면 true 반환
            } catch (DateTimeParseException e) {
                // 현재 포맷터로 파싱 실패 시 다음 포맷터로 계속 시도
            }
        }
        return null; // 모든 포맷터로 파싱 실패 시 false 반환
    }
    // 문자열 값이 시간 형식이면 true를 반환한다.
    public static boolean isTime(String time) {
        return getTime(time) != null;
    }

    // 파라메터 값이 날짜 시간 형식이면 true를 반환한다.
    public static boolean isDatetime(String datetime) {
        boolean result = false;
        if (datetime == null || datetime.isEmpty()) {
            return result;
        }

        // 공백을 기준으로 문자열을 나눈다.
        String[] parts = datetime.split(" ");
        result = isDate(parts[0]);
        if (parts.length == 2) {
            result = isTime(parts[1]);
        }

        // 첫 번째 부분을 날짜 형식으로, 두 번째 부분을 시간 형식으로 검사한다.
        return result;
    }

    // 파라메터 값이 파라메터 Mask형식이면 true를 반환한다.
    public static boolean isValidMask(String value, String mask) {
        if (value == null || mask == null || value.length() != mask.length()) {
            return false;
        }
        for (int i = 0; i < value.length(); i++) {
            char charAtStr = value.charAt(i);
            char charAtMask = mask.charAt(i);

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

    /**********************************************************************
     * for Date
     **********************************************************************/
    private static LocalDateTime getDatetime(String datetime) {
        String[] datetimeArr = datetime.split(" ");
        if (datetimeArr.length > 2) {
            return null; // 형식이 맞지 않으면 null 반환
        }

        LocalDate date = getDate(datetimeArr[0]);
        LocalTime time;
        if(datetimeArr.length > 1) {
            time = getTime(datetimeArr[1]);
        }
        else {
            time = LocalTime.of(0, 0, 0);
        }

        if (date == null || time == null) {
            return null; // 날짜 또는 시간 파싱 실패 시 null 반환
        }

        return LocalDateTime.of(date, time);
    }
    // 날짜에 시간을 추가하고 문자열 형태로 반환한다.
    public static String addDate(String datetime, String addValue) {
        return addDate(datetime, addValue, "d");
    }
    public static String addDate(String datetime, String addValue, String addType) {
        return addDate(datetime, addValue, addType, "");
    }
    public static String addDate(String datetime, String addValue, String addType, String format) {
        if(!isInteger(addValue)) {
            throw new UtilsException("Please enter a valid addValue(Integer).");
        }
        int add = Integer.parseInt(addValue);
        return addDate(datetime, add, addType, format);
    }
    public static String addDate(String datetime, int addValue) {
        return addDate(datetime, addValue, "d");
    }
    public static String addDate(String datetime, int addValue, String addType) {
        return addDate(datetime, addValue, addType, "");
    }
    public static String addDate(String datetime, int addValue, String addType, String format) {
        LocalDateTime dt = getDatetime(datetime);
        if(dt == null) {
            throw new UtilsException("Please enter a valid date.");
        }
        long add = addValue;

        switch (addType) {
            case "y":
                dt = dt.plusYears(add);
                break;
            case "M":
                dt = dt.plusMonths(add);
                break;
            case "d":
                dt = dt.plusDays(add);
                break;
            case "h":
                dt = dt.plusHours(add);
                break;
            case "m":
                dt = dt.plusMinutes(add);
                break;
            case "s":
                dt = dt.plusSeconds(add);
                break;
            default:
                throw new UtilsException("Please enter a valid addType.(y, M, d, h, m, s)");
        }

        return getDateWithFormat(dt, format);
    }

    public static int getDateDiff(String datetime1, String datetime2) {
        return getDateDiff(datetime1, datetime2, "");
    }
    public static int getDateDiff(String datetime1, String datetime2, String diffType) {
        LocalDateTime dt1 = getDatetime(datetime1);
        LocalDateTime dt2 = getDatetime(datetime2);
        if(dt1 == null || dt2 == null) {
            throw new UtilsException("Please enter a valid date.");
        }
        if("".equals(diffType)) diffType = "d";
        long result;

        switch (diffType) {
            case "y":
                result = ChronoUnit.YEARS.between(dt1, dt2);
                break;
            case "M":
                result =  ChronoUnit.MONTHS.between(dt1, dt2);
                break;
            case "d":
                result =  ChronoUnit.DAYS.between(dt1, dt2);
                break;
            case "h":
                result =  ChronoUnit.HOURS.between(dt1, dt2);
                break;
            case "m":
                result =  ChronoUnit.MINUTES.between(dt1, dt2);
                break;
            case "s":
                result =  ChronoUnit.SECONDS.between(dt1, dt2);
                break;
            default:
                throw new IllegalArgumentException("Please enter a valid diffType.(y, M, d, h, m, s)");
        }
        return Long.valueOf(result).intValue();
    }

    // String 타입 월 파라메터에 대한 getMonthName 메서드
    public static String getMonthName(String month) {
        return getMonthName(month, true);
    }
    public static String getMonthName(String month, boolean isFullName) {
        if(!isInteger(month)) {
            throw new UtilsException("Please enter a valid addValue(Integer).");
        }
        int mon = Integer.parseInt(month);

        return getMonthName(mon, isFullName);
    }
    // int 타입 월 파라메터에 대한 getMonthName 메서드
    public static String getMonthName(int month) {
        return getMonthName(month, true);
    }
    public static String getMonthName(int month, boolean isFullName) {
        if (month < 1 || month > 12) {
            return null; // 유효하지 않은 월의 값 처리
        }

        Month m = Month.of(month);
        TextStyle style = isFullName ? TextStyle.FULL : TextStyle.SHORT;
        return m.getDisplayName(style, Locale.ENGLISH);
    }

    // 파라메터의 날짜 문자열을 파라메터 포맷의 형식으로 가져온다.
    public static String getDateWithFormat(String datetime) {
        return getDateWithFormat(datetime, "");
    }
    public static String getDateWithFormat(String datetime, String format) {
        return getDateWithFormat(getDatetime(datetime), format);
    }
    public static String getDateWithFormat(LocalDateTime datetime) {
        return getDateWithFormat(datetime, "");
    }
    public static String getDateWithFormat(LocalDateTime datetime, String format) {
        if(datetime == null) throw new UtilsException("Please enter a valid date.");
        if("".equals(format)) format = "yyyy-MM-dd";
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
            return datetime.format(formatter);
        } catch (DateTimeParseException e) {
            throw new UtilsException("Invalid format.");
        }
    }

    //해당 날짜의 요일을 반환한다.
    public static String getDayOfWeek(String date) {
        return getDayOfWeek(date, "");
    }
    public static String getDayOfWeek(String date, String dayType) {
        return getDayOfWeek(getDate(date), dayType);
    }
    public static String getDayOfWeek(LocalDate date) {
        return getDayOfWeek(date, "");
    }
    public static String getDayOfWeek(LocalDate date, String dayType) {
        if (date == null) {
            throw new UtilsException("Please enter a valid date.");
        }
        if("".equals(dayType)) dayType = "d";
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        
        switch (dayType.toLowerCase()) {
            case "d":
                return "" + dayOfWeek.getValue();
            case "dy":
                return dayOfWeek.getDisplayName(TextStyle.SHORT, Locale.US);
            case "day":
                return dayOfWeek.getDisplayName(TextStyle.FULL, Locale.US);
            case "kdy":
                return dayOfWeek.getDisplayName(TextStyle.SHORT, Locale.KOREAN);
            case "kday":
                return dayOfWeek.getDisplayName(TextStyle.FULL, Locale.KOREAN);
            default:
            throw new UtilsException("Please enter a valid dayType.(d, dy, day, kdy, kday)");
        }
    }

    // 해당 연월의 마지막 일자를 반환한다.
    public static int getLastDay(LocalDate date) {
        if (date == null) {
            throw new UtilsException("Please enter a valid date.");
        }
        return date.with(TemporalAdjusters.lastDayOfMonth()).getDayOfMonth();
    }
    public static int getLastDay(String yearMonth) {
        String date = yearMonth;
        if(yearMonth.length() < 6) {
            if(yearMonth.contains("/")) {
                date += "/01";
            } else if(yearMonth.contains("-")) {
                date += "-01";
            } else {
                date += "01";
            }
        }
        return getLastDay(getDate(date));
    }

    // 현재 날짜와 시간을 지정된 포맷에 따라 반환한다.
    public static String getSysDatetime() {
        return getSysDatetime("");
    }
    public static String getSysDatetime(String format) {
        if("".equals(format)) format = "yyyy-MM-dd HH:mm:ss";
        return getDateWithFormat(LocalDateTime.now(), format);
    }

    // 현재 시스템의 날짜에 해당하는 요일을 반환한다.
    public static String getSysDayOfWeek() {
        return getSysDayOfWeek("");
    }
    public static String getSysDayOfWeek(String dayType) {
        return getDayOfWeek(LocalDate.now(), dayType);
    }

    /**********************************************************************
     * for Number
     **********************************************************************/
    // 파라메터 값을 파라메터 지정한 위치로 올림한 값을 반환한다.
    public static double getCeil(int num) {
        return getCeil((double) num, 0);
    }
    public static double getCeil(int num, int precision) {
        return getCeil((double) num, precision);
    }
    public static double getCeil(long num) {
        return getCeil((double) num, 0);
    }
    public static double getCeil(long num, int precision) {
        return getCeil((double) num, precision);
    }
    public static double getCeil(float num) {
        return getCeil((double) num, 0);
    }
    public static double getCeil(float num, int precision) {
        return getCeil((double) num, precision);
    }
    public static double getCeil(double num) {
        return getCeil(num, 0);
    }
    public static double getCeil(double num, int precision) {
        double factor = Math.pow(10, precision);
        return Math.ceil(num * factor) / factor;
    }

    // 파라메터 값을 파라메터 지정한 위치로 내림한 값을 반환한다.
    public static double getFloor(int num) {
        return getFloor((double) num, 0);
    }
    public static double getFloor(int num, int precision) {
        return getFloor((double) num, precision);
    }
    public static double getFloor(long num) {
        return getFloor((double) num, 0);
    }
    public static double getFloor(long num, int precision) {
        return getFloor((double) num, precision);
    }
    public static double getFloor(float num) {
        return getFloor((double) num, 0);
    }
    public static double getFloor(float num, int precision) {
        return getFloor((double) num, precision);
    }
    public static double getFloor(double num) {
        return getFloor(num, 0);
    }
    public static double getFloor(double num, int precision) {
        double factor = Math.pow(10, precision);
        return Math.floor(num * factor) / factor;
    }

    // 파라메터 값을 파라메터 지정한 위치로 반올림한 값을 반환한다.
    public static double getRound(int num) {
        return getRound((double) num, 0);
    }
    public static double getRound(int num, int precision) {
        return getRound((double) num, precision);
    }
    public static double getRound(long num) {
        return getRound((double) num, 0);
    }
    public static double getRound(long num, int precision) {
        return getRound((double) num, precision);
    }
    public static double getRound(float num) {
        return getRound((double) num, 0);
    }
    public static double getRound(float num, int precision) {
        return getRound((double) num, precision);
    }
    public static double getRound(double num) {
        return getRound(num, 0);
    }
    public static double getRound(double num, int precision) {
        double factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    }

    // 파라메터 값을 파라메터 지정한 위치로 버림한 값을 반환한다.
    public static double getTrunc(int num) {
        return getTrunc((double) num, 0);
    }
    public static double getTrunc(int num, int precision) {
        return getTrunc((double) num, precision);
    }
    public static double getTrunc(long num) {
        return getTrunc((double) num, 0);
    }
    public static double getTrunc(long num, int precision) {
        return getTrunc((double) num, precision);
    }
    public static double getTrunc(float num) {
        return getTrunc((double) num, 0);
    }
    public static double getTrunc(float num, int precision) {
        return getTrunc((double) num, precision);
    }
    public static double getTrunc(double num) {
        return getTrunc(num, 0);
    }
    public static double getTrunc(double num, int precision) {
        double factor = Math.pow(10, precision);
        return Math.floor(num * factor) / factor;
    }

    /**********************************************************************
     * for String
     **********************************************************************/
    // 문자열의 Byte길이를 반환한다.
    public static int getByteLength(String str) {
        if (str == null) return 0;

        int byteLength = 0;
        for (int i = 0; i < str.length(); i++) {
            int charCode = str.codePointAt(i);

            if (charCode <= 0x7F) {
                byteLength += 1;
            } else if (charCode <= 0x7FF) {
                byteLength += 2; // LESSOREQ_0X7FF_BYTE
            } else if (charCode <= 0xFFFF) {
                byteLength += 3; // LESSOREQ_0XFFFF_BYTE
            } else {
                byteLength += 4; // GREATER_0XFFFF_BYTE
            }
        }
        return byteLength;
    }

    // 파라메터 문자열을 파라메터 Byte로 자른 값을 반환한다.
    public static String getCutByteLength(String str, int cutByte) {
        if (str == null) return "";
        int byteLength = 0;
        int cutIndex = str.length();

        for (int i = 0; i < str.length(); i++) {
            int charCode = str.codePointAt(i);

            if (charCode <= 0x7F) {
                byteLength += 1;
            } else if (charCode <= 0x7FF) {
                byteLength += 2;
            } else if (charCode <= 0xFFFF) {
                byteLength += 3;
            } else {
                byteLength += 4;
            }

            if (byteLength > cutByte) {
                cutIndex = i;
                break;
            }
        }
        return str.substring(0, cutIndex);
    }

    // 파라메터 문자열에 사이사이 일정한 공백을 추가하여 길이 규격을 맞춘 값을 반환한다.
    public static String getStringLenForm(String str, int length) {
        if (str == null) return null;
        int strLength = str.length();
        if (strLength >= length) {
            return str;
        }

        int totalSpaces = length - strLength;
        int gaps = strLength - 1;
        int spacePerGap = Math.floorDiv(totalSpaces, gaps);
        int extraSpaces = totalSpaces % gaps;

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < gaps; i++) {
            result.append(str.charAt(i));
            int spacesToAdd = spacePerGap + (i < extraSpaces ? 1 : 0);
            for (int j = 0; j < spacesToAdd; j++) {
                result.append(' ');
            }
        }
        result.append(str.charAt(strLength - 1));
        return result.toString();
    }

    //파라메터 문자열 왼쪽에 파라메터 특정 문자를 반복해 채운 값을 반환한다.
    public static String getLpad(String str, String padStr, int length) {
        if (str == null) str = "";
        if (padStr == null || padStr.isEmpty()) throw new IllegalArgumentException("Pad string cannot be null or empty");

        int padLength = length - str.length();
        if (padLength <= 0) {
            return str;
        }

        StringBuilder pad = new StringBuilder();
        while (pad.length() < padLength) {
            pad.append(padStr);
        }

        return pad.substring(0, padLength) + str;
    }

    //파라메터 문자열 오른쪽에 파라메터 특정 문자를 반복해 채운 값을 반환한다.
    public static String getRpad(String str, String padStr, int length) {
        if (str == null) str = "";
        if (padStr == null || padStr.isEmpty()) throw new IllegalArgumentException("Pad string cannot be null or empty");

        int padLength = length - str.length();
        if (padLength <= 0) {
            return str;
        }

        StringBuilder pad = new StringBuilder();
        while (pad.length() < padLength) {
            pad.append(padStr);
        }

        return str + pad.substring(0, padLength);
    }

    //값이 null인 경우 지정된 값을 반환한다.
    public static <T> T nvl(T value, T defaultValue) {
        return value == null ? defaultValue : value;
    }

    //파라메터 값을 파라메터 숫자 형식으로 변환한 값을 반환한다.
    public static String getNumberFormat(String value, String format) {
        Pattern pattern = Pattern.compile("^(.*?)([#0,.]+)(.*?)$");
        Matcher matcher = pattern.matcher(format);

        if (!matcher.find()) {
            throw new IllegalArgumentException("Invalid format");
        }

        String result = "";
        String prefix = matcher.group(1);
        String numberFormat = matcher.group(2);
        String suffix = matcher.group(3);

        String[] parts = numberFormat.split("\\.");
        String integerPartFormat = parts[0];
        String decimalPartFormat = parts.length > 1 ? parts[1] : "";

        // 소수 부분 포맷이 #과 0이 섞인 경우 검증
        if (decimalPartFormat.contains("#") && decimalPartFormat.contains("0")) {
            throw new IllegalArgumentException("Invalid format: Mixed '#' and '0' in decimal format");
        }

        // 숫자 변환
        boolean isNull = false;
        boolean doZeroByNull = "0".equals(integerPartFormat.substring(integerPartFormat.length() - 1));
        if("".equals(value) || value == null) {
            isNull = true;
            value = "0";
        }
        BigDecimal number = new BigDecimal(value);
        if (suffix.trim().equals("%")) {
            number = number.multiply(BigDecimal.valueOf(100));
        }

        // 정수 부분 포맷팅
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.ENGLISH);
        String formattedInteger = formatIntegerPart(number, integerPartFormat, symbols);

        // 소수 부분 포맷팅
        String formattedDecimal = formatDecimalPart(number, decimalPartFormat);

        if(isNull && !doZeroByNull) {
            result = prefix + "" + (formattedDecimal.isEmpty() ? "" : "." + formattedDecimal) + suffix;
        } else {
            result = prefix + formattedInteger + (formattedDecimal.isEmpty() ? "" : "." + formattedDecimal) + suffix;
        }

        return result;
    }

    private static String formatIntegerPart(BigDecimal number, String format, DecimalFormatSymbols symbols) {
        DecimalFormat decimalFormat = new DecimalFormat(format, symbols);
        decimalFormat.setGroupingUsed(format.contains(","));
        // decimalFormat.setMinimumIntegerDigits(format.startsWith("0") ? 1 : 0);
        decimalFormat.setMaximumFractionDigits(0);  // 소수점 없음
        return decimalFormat.format(number);
    }

    private static String formatDecimalPart(BigDecimal number, String format) {
        if (format.isEmpty()) return "";

        int dotIndex = number.toPlainString().indexOf('.');
        String decimalPart = dotIndex != -1 ? number.toPlainString().substring(dotIndex + 1) : "";

        if (format.contains("#")) {
            return decimalPart;
        } else if (format.contains("0")) {
            return String.format("%-" + format.length() + "s", decimalPart).replace(' ', '0');
        }
        return "";
    }
    public static String getNumberFormat(int value, String format) {
        return getNumberFormat(String.valueOf(value), format);
    }
    public static String getNumberFormat(long value, String format) {
        return getNumberFormat(String.valueOf(value), format);
    }
    public static String getNumberFormat(float value, String format) {
        return getNumberFormat(String.valueOf(value), format);
    }
    public static String getNumberFormat(double value, String format) {
        return getNumberFormat(String.valueOf(value), format);
    }

    //파라메터 문자열의 숫자를 제외한 모든 문자를 제거한 값을 반환한다.
    public static String getRemoveExceptNumbers(String str) {
        if (str == null) return "";
        return str.replaceAll("[^0-9]", "");
    }

    //파라메터 문자열의 모든 숫자를 제거한 값을 반환한다.
    public static String getRemoveNumbers(String str) {
        if (str == null) return "";
        return str.replaceAll("[0-9]", "");
    }

    //파라메터 문자열의 반전값을 반환한다.
    public static String getReverse(String str) {
        if (str == null) return "";
        return new StringBuilder(str).reverse().toString();
    }

    /**********************************************************************
     * etc
     **********************************************************************/
    //클라이언트의 IP주소를 리턴한다.
    public static String getClientIpAddress(HttpServletRequest request) {
        // 여러 헤더를 순서대로 확인
        String[] headers = {
            "X-Forwarded-For", // 일반적으로 프록시를 통과하는 IP 주소 목록을 포함 (가장 신뢰할 수 있는 소스)
            "Proxy-Client-IP", // 프록시 서버에서 사용할 수 있는 대체 헤더
            "WL-Proxy-Client-IP", // WebLogic 서버 환경에서 사용되는 헤더
            "HTTP_X_FORWARDED_FOR", // 표준이 아닌, 일부 프록시 서버에서 사용
            "HTTP_X_FORWARDED", // 표준이 아닌, 일부 프록시 서버에서 사용
            "HTTP_X_CLUSTER_CLIENT_IP", // 클러스터 환경에서 사용하는 클라이언트 IP
            "HTTP_CLIENT_IP", // 클라이언트의 IP 주소를 나타내는 일반 헤더
            "HTTP_FORWARDED_FOR", // 원본 IP 주소를 위한 일반 헤더
            "HTTP_FORWARDED", // 원본 IP 주소를 위한 일반 헤더
            "HTTP_VIA", // 프록시 또는 게이트웨이를 통해 전달된 정보
            "REMOTE_ADDR" // 클라이언트의 실제 IP 주소 (프록시 또는 로드 밸런서를 사용하지 않는 경우)
        };

        for (String header : headers) {
            // 각 헤더를 순서대로 확인하여 유효한 IP 주소 찾기
            String ip = request.getHeader(header);
            if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip)) {
                // 여러 IP 주소 중 첫 번째 주소 사용 (가장 신뢰할 수 있는 주소)
                return ip.split(",")[0].trim();
            }
        }

        // 헤더에서 유효한 IP 주소를 찾지 못한 경우, getRemoteAddr 사용
        return request.getRemoteAddr();
    }
}
