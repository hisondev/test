package com.example.demo.config;

import com.example.demo.common.data.converter.DataConverterDefault;
import com.example.demo.common.data.converter.DataConverterFactory;

public class CustomDataConverter extends DataConverterDefault{
    public static void register() {
        DataConverterFactory.setCustomConverter(new CustomDataConverter());
    }
}
