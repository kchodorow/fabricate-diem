package com.kchodorow.diem.editor;

import com.google.common.base.Preconditions;
import com.kchodorow.diem.project.Project;
import com.kchodorow.diem.account.Account;
import com.kchodorow.diem.account.AccountStorage;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Store things in the data store.
 */
public class StorageServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        // parts: ["", "username", "project"]
        String[] parts = request.getRequestURI().split("/");
        Preconditions.checkState(parts.length >= 3, "URI length is too short: " + parts.length);
        String username = parts[1];
        String projectName = parts[2];
        Account account = AccountStorage.getByUsername(username);
        Project project = account.getProject(projectName);
        // TODO: use json library.
        System.out.println(request.getParameter("anchors"));
    }
}
