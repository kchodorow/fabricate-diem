package com.fabdm.editor;

import com.fabdm.project.GsonFactory;
import com.fabdm.project.Model;
import com.fabdm.project.Project;
import com.fabdm.template.DataBuilder;
import com.google.gson.GsonBuilder;
import com.google.gson.Gson;
import com.google.common.collect.ImmutableList;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.googlecode.objectify.ObjectifyService.ofy;

/**
 * Renders the HTML template for editing patterns.
 */
public class EditorServlet extends HttpServlet {

    private final static String JSON = "json";

    private final DataBuilder builder;
    private final DataBuilder errorBuilder;

    public EditorServlet() {
        super();
        this.builder = new DataBuilder(
                "diem.pattern.editor",
                ImmutableList.of("templates/pattern.soy", "templates/main.soy"));
        this.errorBuilder = new DataBuilder(
                "diem.errors.project_not_found",
                ImmutableList.of("templates/errors.soy", "templates/main.soy"));
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        ProjectLoader loader = new ProjectLoader(request);
        Project project = loader.getProject();
        if (project == null) {
            errorBuilder.put("project", loader.getProjectName());
            errorBuilder.build(request, response);
            return;
        }
        String format = request.getParameter("format");
        if (format != null && format.equals(JSON)) {
            response.getWriter().write("{\"model\":" + project.getModel() + "}");
            return;
        }
        builder.put("description", project.getDescription());
        builder.build(request, response);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        ProjectLoader loader = new ProjectLoader(request);
        Project project = loader.getProject();
        if (project == null) {
            errorBuilder.put("project", loader.getProjectName());
            errorBuilder.build(request, response);
            return;
        }
        String data = request.getParameter("data");
        project.setModel(data);
        ofy().save().entity(project).now();
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
