package com.example.demo.config;

import com.example.demo.common.data.converter.DataConverterDefault;

public class CustomDataConverter extends DataConverterDefault{
    @Override
    public Object convertDataModelToEntity(Object value, Class<?> targetType) {
        System.out.println("### This is a CustomDataModelConverter convertDataModelToEntity ###");
        return super.convertDataModelToEntity(value, targetType);
    }
    @Override
    public Object convertDataModelToEntityValueIsBoolean(Object value, Class<?> targetType) {
        System.out.println("### This is a CustomDataModelConverter convertDataModelToEntityValueIsBoolean ###");
        return super.convertDataModelToEntityValueIsBoolean(value, targetType);
    }
    @Override
    public Object convertDataModelToEntityValueIsNull(Object value, Class<?> targetType) {
        System.out.println("### This is a CustomDataModelConverter convertDataModelToEntityValueIsNull ###");
        return super.convertDataModelToEntityValueIsNull(value, targetType);
    }
    @Override
    public Object convertDataModelToEntityValueIsNumber(Object value, Class<?> targetType) {
        System.out.println("### This is a CustomDataModelConverter convertDataModelToEntityValueIsNumber ###");
        return super.convertDataModelToEntityValueIsNumber(value, targetType);
    }
    @Override
    public Object convertDataModelToEntityValueIsString(Object value, Class<?> targetType) {
        System.out.println("### This is a CustomDataModelConverter convertDataModelToEntityValueIsString ###");
        return super.convertDataModelToEntityValueIsString(value, targetType);
    }
    @Override
    public Object convertEntityToDataModel(Object value) {
        System.out.println("### This is a CustomDataModelConverter convertEntityToDataModel ###");
        return super.convertEntityToDataModel(value);
    }
    @Override
    public String getDateFormatEntityToDataModel() {
        System.out.println("### This is a CustomDataModelConverter getDateFormatEntityToDataModel ###");
        return super.getDateFormatEntityToDataModel();
    }
    @Override
    public String[] getDateFormatsDataModelToEntity() {
        System.out.println("### This is a CustomDataModelConverter getDateFormatsDataModelToEntity ###");
        return super.getDateFormatsDataModelToEntity();
    }
    @Override
    public boolean isEntity(Object obj) {
        System.out.println("### This is a CustomDataModelConverter isEntity ###");
        return super.isEntity(obj);
    }
}
