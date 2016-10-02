package com.fabdm.template;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
import com.google.common.net.UrlEscapers;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyModule;
import com.google.template.soy.data.SoyMapData;
import com.google.template.soy.tofu.SoyTofu;
import com.fabdm.account.Account;
import com.fabdm.account.AccountStorage;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

/**
 * Gets SoyMapData to render the HTML header.
 */
public class DataBuilder {

    private final SoyMapData data;
    private final SoyTofu.Renderer renderer;
    private boolean ensureUsernameSet;

    public DataBuilder(String templateName, ImmutableList<String> templates) {
        Injector injector = Guice.createInjector(new SoyModule());
        SoyFileSet.Builder sfsBuilder = injector.getInstance(SoyFileSet.Builder.class);
        for (String template : templates) {
            sfsBuilder.add(new File(template));
        }
        SoyFileSet sfs = sfsBuilder.build();
        SoyTofu tofu = sfs.compileToTofu();
        this.renderer = tofu.newRenderer(templateName);
        this.data = new SoyMapData();
        this.ensureUsernameSet = true;
    }

    public void setEnsureUsernameSet(boolean ensureUsernameSet) {
        this.ensureUsernameSet = ensureUsernameSet;
    }

    public void put(String key, Object value) {
        data.put(key, value);
    }

    public void build(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        UserService userService = UserServiceFactory.getUserService();
        String uri = request.getRequestURI();
        if (!userService.isUserLoggedIn()) {
            data.put(
                    "name", null,
                    "login", userService.createLoginURL(uri));
        } else {
            User user = userService.getCurrentUser();
            Preconditions.checkNotNull(user);
            Account account = AccountStorage.getOrCreate(user.getUserId(), user.getEmail());
            Preconditions.checkNotNull(account);
            if (account.getUsername() == null && ensureUsernameSet) {
                response.sendRedirect(DataBuilder.getSetUsernameUri(uri));
                return;
            }
            data.put(
                    "name", account.getEmail(),
                    "user_uri", "/" + account.getUsername(),
                    "logout", userService.createLogoutURL(uri));
        }
        renderer.setData(data);
        response.setContentType("text/html");
        response.getWriter().write(renderer.render());
    }

    public static String getSetUsernameUri(String uri) throws IOException {
        // No username set, finish setting up account.
        uri = UrlEscapers.urlFragmentEscaper().escape(uri);
        return "/set-username?redirect=" + uri;
    }
}
