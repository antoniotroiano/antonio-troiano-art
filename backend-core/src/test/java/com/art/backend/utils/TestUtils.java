package com.art.backend.utils;

import java.lang.reflect.Field;

public class TestUtils {

    private TestUtils() {
    }

    public static void setField(final Object target, final String fieldName, final Object value) {
        try {
            final Field field = target.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target, value);
        } catch (final Exception e) {
            throw new RuntimeException(e);
        }
    }
}
