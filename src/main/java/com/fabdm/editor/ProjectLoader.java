package com.fabdm.editor;

import com.fabdm.account.Account;
import com.fabdm.account.AccountStorage;
import com.fabdm.project.Project;
import com.google.common.base.Preconditions;

import javax.servlet.http.HttpServletRequest;

import static com.googlecode.objectify.ObjectifyService.ofy;

/**
 * Get a project from an HttpRequest.
 */
public class ProjectLoader {

    private final String username;
    private final String projectName;

    public ProjectLoader(HttpServletRequest request) {
        // URI: /+/project/foo/bar
        String parts[] = request.getRequestURI().split("/");
        Preconditions.checkState(parts.length >= 4);
        this.username = parts[3];
        this.projectName = parts[4];
    }

    public Project getProject() {
        Account account = AccountStorage.getByUsername(username);
        if (account == null) {
            return null;
        }
        Project project = account.getProject(projectName);
        if (project == null) {
            return null;
        }
        return ofy().load().entity(project).now();
    }

    String getProjectName() {
        return projectName;
    }

    public String getUsername() {
        return username;
    }
}
