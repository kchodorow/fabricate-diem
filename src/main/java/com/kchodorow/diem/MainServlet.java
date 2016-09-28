package com.kchodorow.diem;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyModule;
import com.google.template.soy.data.SoyMapData;
import com.google.template.soy.tofu.SoyTofu;
import com.kchodorow.diem.user.UserStorage;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

/**
 * Display the index.
 */
public class MainServlet extends HttpServlet{
    private final SoyTofu.Renderer renderer;

    public MainServlet() {
        super();
        Injector injector = Guice.createInjector(new SoyModule());
        SoyFileSet.Builder sfsBuilder = injector.getInstance(SoyFileSet.Builder.class);
        SoyFileSet sfs = sfsBuilder.add(new File("templates/main.soy")).build();
        SoyTofu tofu = sfs.compileToTofu();
        this.renderer = tofu.newRenderer("diem.main");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse resp) throws IOException {
        SoyMapData data = new UserStorage(request.getRequestURI()).getLoggedInUser();
        renderer.setData(data);
        resp.setContentType("text/html");
        resp.getWriter().write(renderer.render());
    }
}
