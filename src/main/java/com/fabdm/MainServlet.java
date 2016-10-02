package com.fabdm;

import com.fabdm.template.DataBuilder;
import com.google.common.collect.ImmutableList;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Display the index.
 */
public class MainServlet extends HttpServlet{

    private final DataBuilder builder;

    public MainServlet() {
        super();
        this.builder = new DataBuilder(
                "diem.main", ImmutableList.of("templates/main.soy"));
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        builder.build(request, response);
    }
}
