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
    // TODO: this should probably be more human-readable.
    Long forkedFrom;
    String username;
    String title;
    String uri;
    int version;
    String model;

    public Project() {
    }

    private Project(
        Long forkedFrom, String username, String title, String uri, String model) {
        this.id = null;
        this.forkedFrom = forkedFrom;
        this.username = username;
        this.title = title;
        this.uri = uri;
        this.version = 0;
        this.model = model;
    }

    static Project createProject(String username) {
        RandomName randomName = new RandomName();
        return new Project(null, username, randomName.getDescription(), randomName.getUri(), null);
    }

    public Long getId() {
        return id;
    }

    public String getUri() {
        return uri;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    void setVersion(int version) {
        this.version = version;
        // TODO: strip existing version off of URI?
        this.uri = uri + "-" + version;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getModel() {
        return model;
    }

    public String toJson() {
        return "{\"model\":" + getModel() + "}";
    }

    public static Builder builder() {
        return new Builder();
    }

    public String getTitle() {
        return title;
    }

    public static class Builder {

        private Long forkedFrom;
        private String username;
        private String title;
        private String uri;
        private String model;

        public Builder setForkedFrom(Long forkedFrom) {
            this.forkedFrom = forkedFrom;
            return this;
        }
        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }
        public Builder setModel(String model) {
            this.model = model;
            return this;
        }
        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }
        public Builder setUri(String uri) {
            this.uri = uri;
            return this;
        }

        public Project build() {
            return new Project(forkedFrom, username, title, uri, model);
        }
    }
}
