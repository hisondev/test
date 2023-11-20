package com.example.demo.config.data;

import com.example.demo.common.data.DataModelConverterDefault;

public class CustomDataModelConverter extends DataModelConverterDefault{
    @Override
    protected Object convertDataModelToEntity(Object value, Class<?> targetType) {
        return super.convertDataModelToEntity(value, targetType);
    }
    @Override
    protected Object convertDataModelToEntityValueIsBoolean(Object value, Class<?> targetType) {
        return super.convertDataModelToEntityValueIsBoolean(value, targetType);
    }
    @Override
    protected Object convertDataModelToEntityValueIsNull(Object value, Class<?> targetType) {
        return super.convertDataModelToEntityValueIsNull(value, targetType);
    }
    @Override
    protected Object convertDataModelToEntityValueIsNumber(Object value, Class<?> targetType) {
        return super.convertDataModelToEntityValueIsNumber(value, targetType);
    }
    @Override
    protected Object convertDataModelToEntityValueIsString(Object value, Class<?> targetType) {
        return super.convertDataModelToEntityValueIsString(value, targetType);
    }
    @Override
    protected Object convertEntityToDataModel(Object value) {
        return super.convertEntityToDataModel(value);
    }
    @Override
    protected String getDateFormatEntityToDataModel() {
        return super.getDateFormatEntityToDataModel();
    }
    @Override
    protected String[] getDateFormatsDataModelToEntity() {
        return super.getDateFormatsDataModelToEntity();
    }
    @Override
    protected boolean isEntity(Object obj) {
        return super.isEntity(obj);
    }
}