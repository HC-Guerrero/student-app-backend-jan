DROP DATABASE IF EXISTS student_app;

CREATE DATABASE student_app;

\c student_app;

-- student table

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name text,
    last_name text,
    city text,
    skill text,
    email text,
    company text, 
    pic text

);

-- grades table