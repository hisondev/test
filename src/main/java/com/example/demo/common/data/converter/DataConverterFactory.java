package com.example.demo.common.data.converter;

/**
 * @author Hani son
 * @version 1.0.5
 */
public class DataConverterFactory {

    private static DataConverter customConverter;
    
    public static DataConverter getConverter() {
        if (customConverter != null) {
            return customConverter;
        }
        return new DataConverterDefault();
    }

    public static void setCustomConverter(DataConverter converter) {
        customConverter = converter;
    }
}
