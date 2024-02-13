package com.example.demo.common.utils;

/**
 * Represents a custom exception type for errors encountered in the {@code Utils} class.
 * <p>
 * {@code UtilsException} extends {@code RuntimeException}, making it an unchecked exception that
 * can be thrown during the operation of methods in the {@code Utils} class to indicate issues that
 * cannot be recovered from and should be handled at a higher level of the application. This exception
 * is designed to encapsulate errors related to utility operations, providing more context and detail
 * about the nature of the error.
 * </p>
 * <p>
 * It supports various constructors to allow for flexibility in specifying the error message and cause,
 * facilitating better error diagnostics and enabling calling code to understand and potentially react
 * to specific issues.
 * </p>
 *
 * Constructors:
 * <ul>
 * <li>{@code UtilsException(String message)}: Initializes a new instance of {@code UtilsException} with a detailed message.</li>
 * <li>{@code UtilsException(String message, Throwable cause)}: Initializes a new instance of {@code UtilsException} with a detailed message and a cause.</li>
 * <li>{@code UtilsException(Throwable cause)}: Initializes a new instance of {@code UtilsException} with a cause, using the cause's message as its detail message.</li>
 * <li>{@code UtilsException(UtilsException cause)}: Initializes a new instance of {@code UtilsException} using another {@code UtilsException} as its cause, which can be useful for exception chaining.</li>
 * </ul>
 *
 * <p>By providing detailed context about the errors encountered within utility methods, {@code UtilsException} aids in debugging and maintaining the application.</p>
 */
public class UtilsException extends RuntimeException {
    /**
     * Constructs a new {@code UtilsException} with the specified detail message.
     * 
     * @param message the detail message
     */
    public UtilsException(String message) {
        this(message, null);
    }

    /**
     * Constructs a new {@code UtilsException} with the specified detail message and cause.
     * 
     * @param message the detail message
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public UtilsException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructs a new {@code UtilsException} with the specified cause and a detail message of {@code (cause==null ? null : cause.toString())}.
     * 
     * @param cause the cause of the exception (a {@code null} value is permitted, and indicates that the cause is nonexistent or unknown)
     */
    public UtilsException(Throwable cause) {
        super(cause.toString(), cause);
    }

    /**
     * Constructs a new {@code UtilsException} using another {@code UtilsException} as its cause.
     * 
     * @param cause the cause of the exception
     */
    public UtilsException(UtilsException cause) {
        super(cause.toString(), cause);
    }
}
