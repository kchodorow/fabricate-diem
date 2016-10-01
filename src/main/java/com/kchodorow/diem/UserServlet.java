package com.kchodorow.diem;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyModule;
import com.google.template.soy.data.SoyMapData;
import com.google.template.soy.tofu.SoyTofu;
import com.kchodorow.diem.account.Account;
import com.kchodorow.diem.account.AccountStorage;
import com.kchodorow.diem.template.DataBuilder;

import java.io.File;
import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserServlet extends HttpServlet {
    private static final int USERNAME_IDX = 6;

    private final SoyTofu.Renderer renderer;

    public UserServlet() {
        super();
        Injector injector = Guice.createInjector(new SoyModule());
        SoyFileSet.Builder sfsBuilder = injector.getInstance(SoyFileSet.Builder.class);
        SoyFileSet sfs = sfsBuilder
                .add(new File("templates/user.soy"))
                .add(new File("templates/main.soy"))
                .build();

        SoyTofu tofu = sfs.compileToTofu();
        this.renderer = tofu.newRenderer("diem.account.main");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
        SoyMapData data = new DataBuilder().setUri(request.getRequestURI()).build();
        String username = getUsername(request.getRequestURI());
        Account userInfo = AccountStorage.getByUsername(username);
        if (userInfo != null) {
            data.put("username", userInfo.getUsername());
        }
        renderer.setData(data);
        response.setContentType("text/html");
        response.getWriter().write(renderer.render());
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
