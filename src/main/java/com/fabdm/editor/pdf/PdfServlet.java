package com.fabdm.editor.pdf;

import com.fabdm.editor.ProjectLoader;
import com.fabdm.project.GsonFactory;
import com.fabdm.project.Model;
import com.fabdm.project.Project;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;


/**
 * Serves PDF files.
 * TODO: only allow downloads if the project is visible to the user.
 */
public class PdfServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        ProjectLoader loader = new ProjectLoader(request);
        Project project = loader.getProject();
        if (project == null) {
            return;
        }

        Gson gson = new GsonBuilder().registerTypeAdapterFactory(GsonFactory.create()).create();
        Model model = gson.fromJson(project.getModel(), Model.class);
        File pdf;
        if (pdfCacheContains(model)) {
            pdf = getFromPdfCache(model);
        } else {
            Exporter exporter = new Exporter(project);
            try {
                pdf = new File(exporter.generate(model));
            } catch (Exporter.PdfException e) {
                e.printStackTrace();
                return;
            }
            cachePdf(model, pdf);
        }

        response.setContentType("application/pdf");
        response.getOutputStream().write(Files.readAllBytes(Paths.get(pdf.getAbsolutePath())));
    }

    private void cachePdf(Model model, File pdf) {
        // TODO
    }

    private File getFromPdfCache(Model model) {
        // TODO
        return null;
    }

    private boolean pdfCacheContains(Model model) {
        // TODO
        return false;
    }
}
