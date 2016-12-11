package com.fabdm.editor;

import com.fabdm.account.Account;
import com.fabdm.account.AccountStorage;
import com.fabdm.editor.pdf.PdfServlet;
import com.fabdm.project.Project;
import com.fabdm.template.DataBuilder;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
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
    private final static String PDF = "pdf";

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
        if (format == null) {
            builder.put("description", project.getDescription());
            builder.build(request, response);
            return;
        }
        switch (format) {
            case JSON:
                response.getWriter().write("{\"model\":" + project.getModel() + "}");
                break;
            case PDF:
                PdfServlet servlet = new PdfServlet();
                servlet.doGet(request, response);
                break;
            default:
                throw new IllegalStateException("Not supposed to get here.");
        }
    }

    // TODO: test logged in -> edit -> save.
    // TODO: test logged out -> edit -> login -> save
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        if (!userService.isUserLoggedIn()) {
            response.sendRedirect(userService.createLoginURL(request.getRequestURI()));
            return;
        }
        User user = userService.getCurrentUser();
        Preconditions.checkNotNull(user);
        Account account = AccountStorage.getById(user.getUserId());
        Preconditions.checkNotNull(account);
        Preconditions.checkNotNull(account.getUsername());

        ProjectLoader loader = new ProjectLoader(request);
        Project project = loader.getProject();
        if (project == null) {
            errorBuilder.put("project", loader.getProjectName());
            errorBuilder.build(request, response);
            return;
        }

        String data = request.getParameter("data");
        if (account.getUsername().equals(loader.getUsername())) {
            project.setModel(data);
        } else {  // fork.
            project = Project.builder()
                .setForkedFrom(project.getId())
                .setUsername(account.getUsername())
                .setModel(data)
                .setDescription(project.getDescription())
                .setUri(project.getUri())
                .build();
        }
        ofy().save().entity(project).now();
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
