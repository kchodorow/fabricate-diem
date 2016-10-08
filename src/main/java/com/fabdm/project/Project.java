package com.fabdm.project;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

/**
 * Represents a user project.
 */
@Entity
public class Project {
    @Id
    Long id;
    String username;
    String description;
    String uri;
    int version;
    Action action;

    static class Vector2 {
        int x;
        int y;
    }

    static class Anchor {
        Vector2 anchor;
        Vector2 cwcp;
        Vector2 ccwcp;
    }

    public static class Action {
        Anchor[] anchors;
    }

    public Project() {
    }

    private Project(String username, String description, String uri) {
        this.id = null;
        this.username = username;
        this.description = description;
        this.uri = uri;
        this.version = 0;
    }

    static Project createProject(String username) {
        RandomName randomName = new RandomName();
        return new Project(username, randomName.getDescription(), randomName.getUri());
    }

    public Long getId() {
        return id;
    }

    public String getUri() {
        return uri;
    }

    public String getDescription() {
        return description;
    }

    void setVersion(int version) {
        this.version = version;
        // TODO: strip existing version off of URI?
        this.uri = uri + "-" + version;
    }

    public void setAction(Action action) {
        this.action = action;
    }
}
