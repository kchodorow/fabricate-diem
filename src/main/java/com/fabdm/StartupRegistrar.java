package com.fabdm;

import com.fabdm.account.Account;
import com.fabdm.project.Project;
import com.googlecode.objectify.ObjectifyService;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Listener to be run on servlet startup.
 */
public class StartupRegistrar implements ServletContextListener {
    static {
        ObjectifyService.register(Account.class);
        ObjectifyService.register(Project.class);
    }

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("here");
        // No-op.
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        // No-op.
    }
}
