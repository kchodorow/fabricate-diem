package com.kchodorow.diem.editor;

import com.google.common.collect.ImmutableList;
import com.kchodorow.diem.template.DataBuilder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Renders the HTML template for editing patterns.
 */
public class EditorServlet extends HttpServlet {

    private final DataBuilder builder;

    public EditorServlet() {
        super();
        this.builder = new DataBuilder(
                "diem.editor.editor",
                ImmutableList.of("templates/editor.soy", "templates/main.soy"));
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        builder.build(request, response);
    }
}
