package com.example.demo.common.utils;

/**
 * The {@code UtilsException} class represents exceptions specific to data processing
 * within the application. It is a custom exception that extends {@link RuntimeException} 
 * from Spring framework to provide context about data-related failures.
 * 
 * <p>This exception can be used to wrap other exceptions, providing a higher-level explanation
 * of what went wrong during data operations.</p>
 *
 * @author Hani son
 * @version 1.0.0
 */
public class UtilException extends RuntimeException {
    /**
     * Constructs a new {@code DataException} with the specified detail message.
     * 
     * @param message the detail message
     */
    public UtilException(String message) {
        this(message, null);
    }

    /**
     * Constructs a new {@code DataException} with the specified detail message and cause.
     * 
     * @param message the detail message
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public UtilException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructs a new {@code DataException} with the specified cause and a detail message of {@code (cause==null ? null : cause.toString())}.
     * 
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public UtilException(Throwable cause) {
        super(cause.toString(), cause);
    }

    /**
     * Constructs a new {@code DataException} using another {@code DataException} as its cause.
     * 
     * @param cause the cause of the exception
     */
    public UtilException(UtilException cause) {
        super(cause.toString(), cause);
    }
}
