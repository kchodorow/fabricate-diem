package com.fabdm.editor.pdf;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;


/**
 * Serves PDF files.
 */
public class PdfServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setContentType("application/pdf");
        response.getOutputStream().write(Files.readAllBytes(Paths.get("foo.pdf")));
    }
}
