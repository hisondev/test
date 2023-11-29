package com.example.demo.common.data.converter;

import java.util.List;

import com.example.demo.common.data.model.DataModel;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public interface DataConverter{
    boolean isEntity(Object obj);

    String getConvertJsonValueNodeToDataModelRowValue(JsonNode valueNode);

    JsonNode getConvertedJson(DataModel dm);

    ObjectMapper getObjectMapperForConvertDataModelToJson();

    <T> List<T> getConvertedEntities(Class<T> entityClass, DataModel dm);

    ObjectMapper getObjectMapperForConvertDataModelToEntities();

    ObjectMapper getObjectMapperForConvertEntitiesToDataModel();

    Object getConvertValueToDataModelRowValue(Object value);
    
    String getDateFormat();
}
