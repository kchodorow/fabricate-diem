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

    public static Account getOrCreate(User user) {
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
