package com.kchodorow.diem;

import java.io.IOException;
import java.security.Principal;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
        throws IOException {
        Principal principal = req.getUserPrincipal();
        resp.setContentType("text/plain");
        if (principal == null) {
            // Not logged in.
            resp.getWriter().println("{ \"name\": \"not logged in\" }");
        } else {
            String account = principal.getName();
            resp.getWriter().println("{ \"name\": \"" + account + "\" }");
        }
    }
}
