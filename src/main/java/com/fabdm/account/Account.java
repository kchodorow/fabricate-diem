package com.fabdm.account;

import com.fabdm.project.Project;
import com.google.appengine.repackaged.com.google.api.client.util.Maps;
import com.googlecode.objectify.Ref;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.sun.istack.internal.Nullable;

import java.util.Map;

/**
 * Holds account account info.
 */
@Entity
public class Account {
    @Id
    String id;

    @Index
    String username;
    String email;

    // TODO: project visibility.
    Map<String, Ref<Project>> projects = Maps.newHashMap();

    public Account() {
    }

    Account(String userId, String email) {
        this.id = userId;
        this.email = email;
    }

    static Account createWithId(String userId) {
        Account account = new Account();
        account.id = userId;
        return account;
    }

    public String getUsername() {
        return username;
    }

    void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void addProject(Project project) {
        projects.put(project.getUri(), Ref.create(project));
    }

    @Nullable
    public Project getProject(String projectName) {
        return projects.get(projectName).get();
    }

    // TODO: add saved patterns.
}
