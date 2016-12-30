package com.fabdm;

import com.fabdm.project.Project;
import com.fabdm.template.DataBuilder;
import com.google.common.base.Strings;
import com.google.common.hash.Hashing;
import com.google.common.collect.ImmutableList;
import com.fabdm.account.Account;
import com.fabdm.account.AccountStorage;

import java.io.IOException;
import java.nio.charset.Charset;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class UserServlet extends HttpServlet {
    private static final String USERNAME_PREFIX = "/+/user/";
    private static final int USERNAME_IDX = USERNAME_PREFIX.length();

    private final DataBuilder dataBuilder;
    private final DataBuilder errorBuilder;

    public UserServlet() {
        super();
        this.dataBuilder = new DataBuilder(
                "diem.user.main", ImmutableList.of("templates/user.soy", "templates/main.soy"));
        this.errorBuilder = new DataBuilder(
                "diem.errors.user_not_found",
                ImmutableList.of("templates/errors.soy", "templates/main.soy"));
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {
        String username = getUsername(request.getRequestURI());
        Account userInfo = AccountStorage.getByUsername(username);
        if (userInfo == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            errorBuilder.put("username", username);
            errorBuilder.build(request, response);
            return;
        }
        Account requestor = DataBuilder.getAccount();
        boolean self = false;
        if (requestor != null && requestor.getEmail().equals(userInfo.getEmail())) {
            self = true;
        }
        dataBuilder.put("projects", userInfo.getProjectNames());
        dataBuilder.put("username", userInfo.getUsername());
        dataBuilder.put(
            "hash",
            Hashing.md5().hashString(userInfo.getEmail(), Charset.forName("UTF-8")).toString());
        dataBuilder.put("self", self);
        dataBuilder.build(request, response);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        String projectName = request.getParameter("delete");
        if (Strings.isNullOrEmpty(projectName)) {
            return;
        }

        Account user = DataBuilder.getAccount();
        Project project = user.getProject(projectName);
        if (project == null) {
            return;
        }
        ofy().delete().entity(project).now();
    }

    private String getUsername(String requestURI) {
        // "/+/user/someone"
        String username = requestURI.substring(USERNAME_IDX);
        if (username.contains("/")) {
            username = username.substring(0, username.indexOf('/'));
        }
        return username;
    }
}
