CREATE TABLE projects
(
    id       UUID         NOT NULL,
    name     VARCHAR(255) NOT NULL,
    owner_id UUID,
    CONSTRAINT pk_projects PRIMARY KEY (id)
);

CREATE TABLE tasks
(
    id           UUID         NOT NULL,
    project_id   UUID,
    owner_id     UUID         NOT NULL,
    title        VARCHAR(255) NOT NULL,
    description  VARCHAR(255),
    priority     SMALLINT     NOT NULL,
    completed_at TIMESTAMP WITHOUT TIME ZONE,
    created_at   TIMESTAMP WITHOUT TIME ZONE,
    updated_at   TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_tasks PRIMARY KEY (id)
);

CREATE TABLE users
(
    id         UUID         NOT NULL,
    full_name  VARCHAR(255),
    username   VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255),
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE users
    ADD CONSTRAINT uc_users_email UNIQUE (email);

ALTER TABLE users
    ADD CONSTRAINT uc_users_username UNIQUE (username);

ALTER TABLE projects
    ADD CONSTRAINT FK_PROJECTS_ON_OWNER FOREIGN KEY (owner_id) REFERENCES users (id);

ALTER TABLE tasks
    ADD CONSTRAINT FK_TASKS_ON_OWNER FOREIGN KEY (owner_id) REFERENCES users (id);

ALTER TABLE tasks
    ADD CONSTRAINT FK_TASKS_ON_PROJECT FOREIGN KEY (project_id) REFERENCES projects (id);