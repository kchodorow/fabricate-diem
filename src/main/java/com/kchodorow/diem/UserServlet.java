package com.kchodorow.diem;

import com.google.appengine.api.urlfetch.HTTPResponse;
import com.google.common.collect.ImmutableList;
import com.kchodorow.diem.account.Account;
import com.kchodorow.diem.account.AccountStorage;
import com.kchodorow.diem.template.DataBuilder;

import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserServlet extends HttpServlet {
    private static final int USERNAME_IDX = 6;

    private final DataBuilder dataBuilder;

    public UserServlet() {
        super();
        this.dataBuilder = new DataBuilder(
                "diem.user.main", ImmutableList.of("templates/user.soy", "templates/main.soy"));
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
        String username = getUsername(request.getRequestURI());
        Account userInfo = AccountStorage.getByUsername(username);
        if (userInfo != null) {
            dataBuilder.put("username", userInfo.getUsername());
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        dataBuilder.build(request, response);
    }

    private String getUsername(String requestURI) {
        // "/account/someone"
        String username = requestURI.substring(USERNAME_IDX);
        if (username.contains("/")) {
            username = username.substring(0, username.indexOf('/'));
        }
        return username;
    }
}
