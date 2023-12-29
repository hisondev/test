package com.example.demo.common.api.exception;

/**
 * 
 * @author Hani son
 * @version 1.0.2
 */
public class ServiceRuntimeException extends RuntimeException {
    private String code = "0000";

    /**
     * Constructs a new {@code ServiceRuntimeException} with the specified detail message.
     * 
     * @param message the detail message
     */
    public ServiceRuntimeException(String message) {
        super(message);
    }

    /**
     * Constructs a new {@code ServiceRuntimeException} with the specified detail message.
     * 
     * @param message the detail message
     */
    public ServiceRuntimeException(String message, String code) {
        super(message);
        this.code = code;
    }

    /**
     * Constructs a new {@code ServiceRuntimeException} with the specified detail message and cause.
     * 
     * @param message the detail message
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public ServiceRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructs a new {@code ServiceRuntimeException} with the specified detail message and cause.
     * 
     * @param message the detail message
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public ServiceRuntimeException(String message, Throwable cause, String code) {
        super(message, cause);
        this.code = code;
    }

    /**
     * Constructs a new {@code ServiceRuntimeException} with the specified cause and a detail message of {@code (cause==null ? null : cause.toString())}.
     * 
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public ServiceRuntimeException(Throwable cause) {
        super(cause.toString(), cause);
    }

    /**
     * Constructs a new {@code ServiceRuntimeException} with the specified cause and a detail message of {@code (cause==null ? null : cause.toString())}.
     * 
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public ServiceRuntimeException(Throwable cause, String code) {
        super(cause.toString(), cause);
        this.code = code;
    }

    /**
     * Constructs a new {@code ServiceRuntimeException} using another {@code ServiceRuntimeException} as its cause.
     * 
     * @param cause the cause of the exception
     */
    public ServiceRuntimeException(ServiceRuntimeException cause) {
        super(cause.toString(), cause);
    }

    /**
     * Constructs a new {@code ServiceRuntimeException} using another {@code ServiceRuntimeException} as its cause.
     * 
     * @param cause the cause of the exception
     */
    public ServiceRuntimeException(ServiceRuntimeException cause, String code) {
        super(cause.toString(), cause);
        this.code = code;
    }

    public String getCode() {
        return this.code;
    }
}
