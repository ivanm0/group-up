SET sql_safe_updates = FALSE;

USE defaultdb;
DROP DATABASE IF EXISTS groupup CASCADE;
CREATE DATABASE IF NOT EXISTS groupup;

USE groupup;

CREATE TABLE teachers (
    id STRING PRIMARY KEY NOT NULL,
    firstname STRING,
    lastname STRING
);

CREATE TABLE students (
    id STRING PRIMARY KEY NOT NULL,
    firstname STRING,
    lastname STRING,
    email STRING
);

CREATE TABLE courses (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    coursename STRING,
    teacher_id STRING
);

CREATE TABLE enrollments (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    student_id STRING,
    course_id uuid,
    bio STRING
);

CREATE TABLE projects (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    course_id uuid,
    projectname STRING,
    min_size INT,
    max_size INT
);

CREATE TABLE groups (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    groupname STRING,
    project_id uuid,
    student_ids STRING,
    lock BOOLEAN 
);

CREATE TABLE requests (
    id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    group_id uuid,
    req_student_id STRING,
    status INT
);
