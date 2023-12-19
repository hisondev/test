package com.example.demo.common.api.exception;

/**
 * 
 * @author Hani son
 * @version 1.0.2
 */
public class ApiException extends RuntimeException {
    /**
     * Constructs a new {@code ApiException} with the specified detail message.
     * 
     * @param message the detail message
     */
    public ApiException(String message) {
        this(message, null);
    }

    /**
     * Constructs a new {@code ApiException} with the specified detail message and cause.
     * 
     * @param message the detail message
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructs a new {@code ApiException} with the specified cause and a detail message of {@code (cause==null ? null : cause.toString())}.
     * 
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public ApiException(Throwable cause) {
        super(cause.toString(), cause);
    }

    /**
     * Constructs a new {@code ApiException} using another {@code ApiException} as its cause.
     * 
     * @param cause the cause of the exception
     */
    public ApiException(ApiException cause) {
        super(cause.toString(), cause);
    }
}
