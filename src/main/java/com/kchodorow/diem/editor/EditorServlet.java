package com.kchodorow.diem.editor;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyModule;
import com.google.template.soy.tofu.SoyTofu;

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
        System.out.println("Currently in: " + System.getenv("PWD"));
        // Create a Guice injector that contains the SoyModule and use it get a SoyFileSet.Builder.
        Injector injector = Guice.createInjector(new SoyModule());
        SoyFileSet.Builder sfsBuilder = injector.getInstance(SoyFileSet.Builder.class);

        // Bundle the Soy files for your project into a SoyFileSet.
        SoyFileSet sfs = sfsBuilder.add(new File("templates/editor.soy")).build();

        // Compile the template into a SoyTofu object.
        // SoyTofu's newRenderer method returns an object that can render any template in the file set.
        SoyTofu tofu = sfs.compileToTofu();
        this.renderer = tofu.newRenderer("examples.simple.helloWorld");
    }

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.getWriter().write(renderer.render());
    }

    public static void main (String[] args) {
        EditorServlet servlet = new EditorServlet();

        // Render the template with no data.
        System.out.println(servlet.renderer.render());
    }
}
