-- Active: 1669789253879@@127.0.0.1@5432@food@public
CREATE Table users(
    id_users VARCHAR PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(300) NOT NULL,
    phonenumber BIGINT NOT NULL,
    name VARCHAR NOT NULL,
    photo VARCHAR(300) DEFAULT NULL
);

-- Active: 1669789253879@@127.0.0.1@5432@food@public
CREATE Table recipes(
    id_recipes INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    recipes_name VARCHAR(300) NOT NULL,
    photo VARCHAR(300) NOT NULL,
    video VARCHAR(300) DEFAULT NULL, 
    description VARCHAR DEFAULT NULL,
    id_users VARCHAR(300) REFERENCES  users(id_users) NOT NULL,
    posted_at timestamp default current_timestamp
);
