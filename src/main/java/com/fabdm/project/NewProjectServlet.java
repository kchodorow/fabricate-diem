package com.fabdm.project;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.common.base.Preconditions;
import com.fabdm.account.Account;
import com.fabdm.account.AccountStorage;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Creates a new project.
 */
public class NewProjectServlet extends HttpServlet {

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
        Preconditions.checkNotNull(account);
        Project project = Project.createProject(account.getUsername());
        // TODO: dedup project name.

        ofy().save().entity(project).now();
        account.addProject(project);
        ofy().save().entity(account).now();
        response.sendRedirect("/" + account.getUsername() + "/" + project.getUri());
    }
}
