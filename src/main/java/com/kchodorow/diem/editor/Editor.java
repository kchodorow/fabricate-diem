package com.kchodorow.diem.editor;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyModule;
import com.google.template.soy.tofu.SoyTofu;

import java.io.File;

/**
 * Renders the HTML template for editing patterns.
 */
public class Editor {
    public static void main (String[] args) {
        // Create a Guice injector that contains the SoyModule and use it get a SoyFileSet.Builder.
        Injector injector = Guice.createInjector(new SoyModule());
        SoyFileSet.Builder sfsBuilder = injector.getInstance(SoyFileSet.Builder.class);

        // Bundle the Soy files for your project into a SoyFileSet.
        SoyFileSet sfs = sfsBuilder.add(new File("src/main/java/com/kchodorow/diem/editor/editor.soy")).build();

        // Compile the template into a SoyTofu object.
        // SoyTofu's newRenderer method returns an object that can render any template in the file set.
        SoyTofu tofu = sfs.compileToTofu();

        // Render the template with no data.
        System.out.println(tofu.newRenderer("examples.simple.helloWorld").render());
    }
}
