package com.fabdm.account;

import com.fabdm.project.Project;
import com.google.appengine.repackaged.com.google.api.client.util.Maps;
import com.google.common.base.Preconditions;
import com.googlecode.objectify.Key;
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
        Preconditions.checkNotNull(project.getId());
        Key<Project> projectKey = Key.create(Project.class, project.getId());
        projects.put(project.getUri(), Ref.create(projectKey));
    }

    @Nullable
    public Project getProject(String projectName) {
        return projects.containsKey(projectName) ? projects.get(projectName).get() : null;
    }

    // TODO: add saved patterns.
}
