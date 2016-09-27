package com.kchodorow.diem.user;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.appengine.api.users.User;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Result;

/**
 * Helper class for retrieving user details from Datastore.
 */
public class UserStorage {
    static {
        ObjectifyService.register(Account.class);
    }

    public Account get(User user) {
        Result<Account> result = ofy().load().entity(new Account(user.getUserId()));
        Account account = result.now();

        if (account == null) {
            account = UserStorage.createUser(user);
        }
        return account;
    }

    private static Account createUser(User user) {
        Account account = new Account(user);
        ofy().save().entity(account).now();
        return account;
    }
}
