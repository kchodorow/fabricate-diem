package com.kchodorow.diem.user;

import com.google.appengine.api.users.User;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

/**
 * Holds user account info.
 */
@Entity
public class Account {
    @Id
    String id;

    String displayName;
    @Index
    String username;
    String email;

    public Account() {
    }

    public Account(String id) {
        this.id = id;
    }

    Account(User user) {
        this.id = user.getUserId();
        this.displayName = user.getNickname();
        this.username = user.getUserId();
        this.email = user.getEmail();
    }

    public String getUsername() {
        return username;
    }

    public String getDisplayName() {
        return displayName;
    }

    // TODO: add saved patterns.
}
