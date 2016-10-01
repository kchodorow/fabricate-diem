package com.kchodorow.diem.template;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.common.base.Preconditions;
import com.google.template.soy.data.SoyMapData;
import com.kchodorow.diem.account.Account;
import com.kchodorow.diem.account.AccountStorage;

/**
 * Gets SoyMapData to render the HTML header.
 */
public class DataBuilder {

    private final SoyMapData data;
    private String uri;

    public DataBuilder() {
        this.data = new SoyMapData();
    }

    public DataBuilder setUri(String uri) {
        this.uri = uri;
        return this;
    }

    public SoyMapData build() {
        UserService userService = UserServiceFactory.getUserService();
        if (!userService.isUserLoggedIn()) {
            data.put(
                    "name", null,
                    "login", userService.createLoginURL(uri));
        } else {
            User user = userService.getCurrentUser();
            Preconditions.checkNotNull(user);
            Account account = AccountStorage.getOrCreate(user.getUserId(), user.getEmail());
            data.put(
                    "name", account.getEmail(),
                    "user_uri", "/" + account.getUsername(),
                    "logout", userService.createLogoutURL(uri));
        }
        return data;
    }
}
