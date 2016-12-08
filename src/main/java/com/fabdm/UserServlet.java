package com.fabdm;

import com.fabdm.template.DataBuilder;
import com.google.common.collect.ImmutableList;
import com.fabdm.account.Account;
import com.fabdm.account.AccountStorage;

import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserServlet extends HttpServlet {
    private static final String USERNAME_PREFIX = "/+/user/";
    private static final int USERNAME_IDX = USERNAME_PREFIX.length();

    private final DataBuilder dataBuilder;
    private final DataBuilder errorBuilder;

    public UserServlet() {
        super();
        this.dataBuilder = new DataBuilder(
                "diem.user.main", ImmutableList.of("templates/user.soy", "templates/main.soy"));
        this.errorBuilder = new DataBuilder(
                "diem.errors.user_not_found",
                ImmutableList.of("templates/errors.soy", "templates/main.soy"));
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
        String username = getUsername(request.getRequestURI());
        Account userInfo = AccountStorage.getByUsername(username);
        if (userInfo == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            errorBuilder.put("username", username);
            errorBuilder.build(request, response);
            return;
        }
        dataBuilder.put("projects", userInfo.getProjectNames());
        dataBuilder.put("username", userInfo.getUsername());
        dataBuilder.build(request, response);
    }

    private String getUsername(String requestURI) {
        // "/+/user/someone"
        String username = requestURI.substring(USERNAME_IDX);
        if (username.contains("/")) {
            username = username.substring(0, username.indexOf('/'));
        }
        return username;
    }
}
