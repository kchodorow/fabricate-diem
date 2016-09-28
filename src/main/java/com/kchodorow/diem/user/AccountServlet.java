package com.kchodorow.diem.user;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyModule;
import com.google.template.soy.data.SoyMapData;
import com.google.template.soy.tofu.SoyTofu;

import java.io.File;
import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AccountServlet extends HttpServlet {

    private final SoyTofu.Renderer renderer;

    public AccountServlet() {
        super();
        Injector injector = Guice.createInjector(new SoyModule());
        SoyFileSet.Builder sfsBuilder = injector.getInstance(SoyFileSet.Builder.class);
        SoyFileSet sfs = sfsBuilder
                .add(new File("templates/user.soy"))
                .add(new File("templates/main.soy"))
                .build();

        SoyTofu tofu = sfs.compileToTofu();
        this.renderer = tofu.newRenderer("diem.user.main");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
        SoyMapData data = new UserStorage(request.getRequestURI()).getSoyMapData();
        renderer.setData(data);
        response.setContentType("text/html");
        response.getWriter().write(renderer.render());
    }
}
