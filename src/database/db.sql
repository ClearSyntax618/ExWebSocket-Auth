CREATE DATABASE app;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    password TEXT,
    created_at TIMESTAMP NOT NULL
);