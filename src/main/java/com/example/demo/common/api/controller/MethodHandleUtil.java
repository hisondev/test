package com.example.demo.common.api.controller;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;

public class MethodHandleUtil {
    public static MethodHandle getMethodHandle(Class<?> clazz, String methodName, Class<?> returnType, Class<?>... parameterTypes) throws NoSuchMethodException, IllegalAccessException {
        MethodHandles.Lookup lookup = MethodHandles.lookup();
        MethodType methodType = MethodType.methodType(returnType, parameterTypes);
        return lookup.findVirtual(clazz, methodName, methodType);
    }
}