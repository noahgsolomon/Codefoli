package com.codefolio.backend.util;


public record Response(StatusType status, String message, Object data) {}
