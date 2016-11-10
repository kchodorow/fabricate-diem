package com.fabdm.editor;

import com.fabdm.account.Account;
import com.fabdm.account.AccountStorage;
import com.fabdm.project.Project;
import com.fabdm.template.DataBuilder;
import com.google.appengine.repackaged.com.google.gson.Gson;
import com.google.appengine.repackaged.com.google.gson.JsonSyntaxException;
import com.google.common.base.Preconditions;
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
                "diem.editor.editor",
                ImmutableList.of("templates/editor.soy", "templates/main.soy"));
        this.errorBuilder = new DataBuilder(
                "diem.errors.project_not_found",
                ImmutableList.of("templates/errors.soy", "templates/main.soy"));
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        Project project = getProject(request, response);
        if (project == null) {
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
        Project project = getProject(request, response);
        if (project == null) {
            return;
        }
        String data = request.getParameter("data");
        try {
            new Gson().fromJson(data, Model.class);
        } catch (JsonSyntaxException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("text/json");
            response.getWriter().write("{\"msg\":\"" + e.getMessage() + "\"}");
            return;
        }
        project.setModel(data);
        ofy().save().entity(project).now();
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private Project getProject(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        // URI: /project/foo/bar
        String parts[] = request.getRequestURI().split("/");
        Preconditions.checkState(parts.length >= 4);
        String username = parts[2];
        String projectName = parts[3];
        Account account = AccountStorage.getByUsername(username);
        if (account == null) {
            errorBuilder.put("project", projectName);
            errorBuilder.build(request, response);
            return null;
        }
        Project project = account.getProject(projectName);
        if (project == null) {
            errorBuilder.put("project", projectName);
            errorBuilder.build(request, response);
            return null;
        }
        return ofy().load().entity(project).now();
    }
}
