package com.fabdm.project;

import com.google.common.collect.Sets;
import org.eclipse.jdt.internal.compiler.batch.FileSystem;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.model.InitializationError;
import org.junit.runners.model.RunnerBuilder;

import java.io.File;
import java.lang.reflect.Modifier;
import java.util.Set;

/**
 * Creates a list of all test classes.
 */
public class AllTests extends Suite {
    private static String CLASS_EXTENSION = ".class";

    public AllTests(Class<?> klass, RunnerBuilder builder) throws InitializationError {
        super(builder, klass, AllTests.getClasses());
    }

    private static void getClassLoader() {
        String[] classpath = System.getProperty("java.class.path").split(":");
        Set<Class<?>> klasses = Sets.newHashSet();
        for (String path : classpath) {
            File entry = new File(path);
            if (!entry.exists()) {
                continue;
            }
            klasses.addAll(findClassesInDirectory(entry));
            klasses.addAll(findClassesInJar(entry));
        }

        ClassLoader.getSystemClassLoader();
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader().;
    }

    private static Set<Class<?>> findClassesInJar(File entry) {
        if (entry.isDirectory()) {
            return Sets.newHashSet();
        }

        return null;
    }

    private static Set<Class<?>> findClassesInDirectory(File directory) {
        if (!directory.isDirectory()) {
            return Sets.newHashSet();
        }

        Set<Class<?>> klasses = Sets.newHashSet();
        for (File f : directory.listFiles()) {
            String name = f.getName();
            if (name.endsWith(CLASS_EXTENSION)) {
                String clzName = getClassName(pathPrefix + name);
                classNames.add(clzName);
            } else if (f.isDirectory()) {
                klasses.addAll(findClassesInDirectory(f, pathPrefix + name + "/"));
            }
        }
        return klasses;
    }

    private static Class<?>[] getClasses() {
        Set<Class<?>> result = Sets.newHashSet();
        for (Class<?> clazz : FileSystem.Classpath.findClasses(pkgName)) {
            if (isTestClass(clazz)) {
                result.add(clazz);
            }
        }
        return result;
    }

    private static boolean isTestClass(Class<?> container) {
        return container.isAnnotationPresent(RunWith.class)
                && !isSuite(container)
                && Modifier.isPublic(container.getModifiers())
                && !Modifier.isAbstract(container.getModifiers());
    }

    private static boolean isJunit4Test(Class<?> container) {
        return ;
    }

}
