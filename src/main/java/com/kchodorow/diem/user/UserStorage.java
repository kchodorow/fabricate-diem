package com.kchodorow.diem.user;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.common.base.Preconditions;
import com.google.template.soy.data.SoyMapData;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Result;

/**
 * Helper class for retrieving user details from Datastore.
 */
public class UserStorage {
    static {
        ObjectifyService.register(Account.class);
    }

    private final String uri;

    public UserStorage(String uri) {
        this.uri = uri;
    }

    public SoyMapData getLoggedInUser() {
        UserService userService = UserServiceFactory.getUserService();
        if (!userService.isUserLoggedIn()) {
            return new SoyMapData(
                    "name", null,
                    "login", userService.createLoginURL(uri));
        }

        User user = userService.getCurrentUser();
        Preconditions.checkNotNull(user);
        Account account = getOrCreate(user);
        return new SoyMapData(
                "name", account.getDisplayName(),
                "user_uri", account.getUsername(),
                "logout", userService.createLogoutURL(uri));
    }

    private Account getOrCreate(User user) {
        Account account = get(user.getUserId());

        if (account == null) {
            account = UserStorage.create(user);
        }
        return account;
    }

    private static Account create(User user) {
        Account account = new Account(user);
        ofy().save().entity(account).now();
        return account;
    }

    static Account get(String userId) {
        Result<Account> result = ofy().load().entity(new Account(userId));
        return result.now();
    }
}
