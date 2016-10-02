package com.kchodorow.diem.account;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
import com.google.common.escape.Escaper;
import com.google.common.net.UrlEscapers;
import com.kchodorow.diem.template.DataBuilder;

import javax.annotation.Nullable;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

import static com.googlecode.objectify.ObjectifyService.ofy;

/**
 * For setting the account's username.
 */
public class SetUsernameServlet extends HttpServlet {

    private static final String USERNAME_REGEX = "[A-Za-z_0-9]{3,12}";

    private final DataBuilder builder;

    private enum UsernameError {
        NONE(""),
        TAKEN("taken"),
        INVALID("invalid"),
        UNKNOWN("unknown");

        private final String type;

        UsernameError(String type) {
            this.type = type;
        }

        public boolean matches(String error) {
            return Objects.equals(type, error);
        }

        @Override
        public String toString() {
            return this.type;
        }
    }

    public SetUsernameServlet() {
        super();
        this.builder = new DataBuilder(
                "diem.user.setusername",
                ImmutableList.of("templates/user.soy", "templates/main.soy"));
        // We don't want to redirect if the username isn't set.
        this.builder.setEnsureUsernameSet(false);
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String redirect = request.getParameter("redirect");
        Escaper formEscaper = UrlEscapers.urlFormParameterEscaper();
        builder.put("uri", formEscaper.escape(redirect));
        String error = request.getParameter("error");
        if (error != null
                && !UsernameError.INVALID.matches(error) && !UsernameError.TAKEN.matches(error)) {
            // Sanitize error string.
            error = UsernameError.UNKNOWN.toString();
        }
        builder.put("error", error);
        builder.build(request, response);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String uri = UrlEscapers.urlFragmentEscaper().escape(request.getParameter("redirect"));
        UserService userService = UserServiceFactory.getUserService();
        if (!userService.isUserLoggedIn()) {
            response.sendRedirect(userService.createLoginURL(uri));
            return;
        }

        User user = userService.getCurrentUser();
        Preconditions.checkNotNull(user);
        Account account = AccountStorage.getOrCreate(user.getUserId(), user.getEmail());
        Preconditions.checkNotNull(account);

        UsernameError error = setUsername(account, request.getParameter("username"));
        if (error != UsernameError.NONE) {
            // Creating the username failed, try again.
            uri = DataBuilder.getSetUsernameUri(uri);
            response.sendRedirect(uri + "&error=" + error);
            return;
        }

        // People can't have "-" in their username, so this shouldn't catch any usernames.
        if (uri.startsWith("/set-username")) {
            uri = "/";
        }
        System.out.println("In post! " + uri);
        response.sendRedirect(uri);
    }

    @Nullable
    private UsernameError setUsername(Account account, String unsafeUsername) {
        if (!unsafeUsername.matches(USERNAME_REGEX)) {
            return UsernameError.INVALID;
        }
        String username = unsafeUsername;
        int duplicate = ofy().load().type(Account.class).filter("username", username).count();
        if (duplicate > 0) {
            return UsernameError.TAKEN;
        }
        account.setUsername(username);
        ofy().save().entity(account);
        return UsernameError.NONE;
    }
}
