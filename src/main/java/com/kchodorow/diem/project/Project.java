package com.kchodorow.diem.project;

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

    public Project() {
    }

    private Project(String username, String description, String uri) {
        this.username = username;
        this.description = description;
        this.uri = uri;
    }

    static Project createProject(String username) {
        RandomName randomName = new RandomName();
        return new Project(username, randomName.getDescription(), randomName.getUri());
    }

    public String getUri() {
        return uri;
    }
}
