package com.example.demo.common.api.controller;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;

import com.example.demo.common.data.wrapper.DataWrapper;

public class MethodHandleUtil {
    public static MethodHandle getMethodHandle(Class<?> clazz, String methodName, Class<?> returnType, Class<?>... parameterTypes) throws NoSuchMethodException, IllegalAccessException {
        MethodHandles.Lookup lookup = MethodHandles.lookup();
        MethodType methodType = MethodType.methodType(returnType, parameterTypes);
        return lookup.findVirtual(clazz, methodName, methodType);
    }

    public static MethodHandle getFlexibleMethodHandle(Class<?> clazz, String methodName, Object serviceInstance) throws NoSuchMethodException, IllegalAccessException {
        MethodHandles.Lookup lookup = MethodHandles.lookup();
        try {
            MethodType methodType = MethodType.methodType(void.class);
            return lookup.findVirtual(clazz, methodName, methodType).bindTo(serviceInstance);
        } catch (NoSuchMethodException e) {}
        try {
            MethodType methodType = MethodType.methodType(DataWrapper.class);
            return lookup.findVirtual(clazz, methodName, methodType).bindTo(serviceInstance);
        } catch (NoSuchMethodException ex) {}
        try {
            MethodType methodType = MethodType.methodType(void.class, DataWrapper.class);
            return lookup.findVirtual(clazz, methodName, methodType).bindTo(serviceInstance);
        } catch (NoSuchMethodException e) {}
        try {
            MethodType methodType = MethodType.methodType(DataWrapper.class, DataWrapper.class);
            return lookup.findVirtual(clazz, methodName, methodType).bindTo(serviceInstance);
        } catch (NoSuchMethodException exc) {}
        throw new NoSuchMethodException("Method not found: " + methodName);
    }
}
