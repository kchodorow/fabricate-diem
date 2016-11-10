package com.fabdm.project;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.fabdm.account.Account;
import com.fabdm.account.AccountStorage;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Creates a new project.
 */
public class NewProjectServlet extends HttpServlet {

    private static final Pattern ENDS_WITH_VERSION = Pattern.compile("^\\w+-([0-9])+$");

    // TODO: add forking.
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        User user = userService.getCurrentUser();
        if (user == null) {
            response.sendRedirect(userService.createLoginURL(request.getRequestURI()));
            return;
        }

        Account account = AccountStorage.getById(user.getUserId());
        if (account == null) {
            response.sendRedirect("/set-username");
            return;
        }

        Project project = Project.createProject(account.getUsername());
        if (account.getProject(project.getUri()) != null) {
            dedupProject(project, account);
        }

        ofy().save().entity(project).now();
        account.addProject(project);
        ofy().save().entity(account).now();
        response.sendRedirect("/" + account.getUsername() + "/" + project.getUri());
    }

    private void dedupProject(Project project, Account account) {
        String projectName = project.getUri();

        while (account.getProject(projectName) != null) {
            int version = 1;
            Matcher m = ENDS_WITH_VERSION.matcher(projectName);
            if (m.matches()) {
                version = Integer.parseInt(m.group(1));
                version++;
            }
            project.setVersion(version);
            projectName = project.getUri();
        }
    }
}
