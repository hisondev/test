package com.example.demo.common.api.exception;

/**
 * 
 * @author Hani son
 * @version 1.0.2
 */
public class ApiException extends RuntimeException {
    private String code = "0000";
    /**
     * Constructs a new {@code ApiException} with the specified detail message.
     * 
     * @param message the detail message
     */
    public ApiException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code ApiException} with the specified detail message.
     * 
     * @param message the detail message
     */
    public ApiException(String message, String error) {
        super(message);
        this.code = error;
    }

    public String getCode() {
        return this.code;
    }
}
