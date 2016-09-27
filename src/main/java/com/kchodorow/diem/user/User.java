package com.kchodorow.diem.user;

import com.sun.istack.internal.Nullable;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

/**
 * Holds user info.
 */
public class User {

    @Nullable
    public static User get(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        if (principal == null) {
            // TODO: use cookies.
            return null;
        } else {
            return new User(principal.getName());
        }
    }

    private final String name;

    private User(String name) {
        this.name = name;
    }

}
