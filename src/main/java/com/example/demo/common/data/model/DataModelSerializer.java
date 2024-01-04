package com.example.demo.common.data.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

/**
 * @author Hani son
 * @version 1.0.5
 */
public class DataModelSerializer extends JsonSerializer<DataModel> {

    @Override
    public void serialize(DataModel dataModel, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        dataModel.serialize(dataModel, gen, serializers);
    }
}
