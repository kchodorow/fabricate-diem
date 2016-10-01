package com.kchodorow.diem.account;

import static com.googlecode.objectify.ObjectifyService.ofy;

import com.google.appengine.api.datastore.QueryResultIterator;
import com.googlecode.objectify.ObjectifyService;

import javax.annotation.Nullable;

/**
 * Helper class for retrieving account details from Datastore.
 */
public class AccountStorage {
    static {
        ObjectifyService.register(Account.class);
    }

    public static Account getOrCreate(String userId, String email) {
        Account account = getById(userId);
        if (account == null) {
            account = AccountStorage.create(userId, email);
        }
        return account;
    }

    private static Account create(String userId, String email) {
        Account account = new Account(userId, email);
        ofy().save().entity(account).now();
        return account;
    }

    @Nullable
    public static Account getById(String userId) {
        return ofy().load().entity(Account.createWithId(userId)).now();
    }

    @Nullable
    public static Account getByUsername(String username) {
        QueryResultIterator<Account> result = ofy().load().type(Account.class)
                .filter("username", username).iterator();
        if (result.hasNext()) {
            return result.next();
        }
        return null;
    }
}
