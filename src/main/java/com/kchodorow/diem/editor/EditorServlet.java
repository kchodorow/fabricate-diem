package com.kchodorow.diem.editor;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyModule;
import com.google.template.soy.data.SoyMapData;
import com.google.template.soy.tofu.SoyTofu;
import com.kchodorow.diem.template.DataBuilder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

/**
 * Renders the HTML template for editing patterns.
 */
public class EditorServlet extends HttpServlet {

    private final SoyTofu.Renderer renderer;

    public EditorServlet() {
        super();
        Injector injector = Guice.createInjector(new SoyModule());
        SoyFileSet.Builder sfsBuilder = injector.getInstance(SoyFileSet.Builder.class);
        SoyFileSet sfs = sfsBuilder
                .add(new File("templates/editor.soy"))
                .add(new File("templates/main.soy"))
                .build();

        SoyTofu tofu = sfs.compileToTofu();
        this.renderer = tofu.newRenderer("diem.editor.editor");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        SoyMapData data = new DataBuilder().setUri(request.getRequestURI()).build();
        renderer.setData(data);
        response.setContentType("text/html");
        response.getWriter().write(renderer.render());
    }
}
