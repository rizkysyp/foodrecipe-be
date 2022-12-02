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

SELECT * FROM recipes WHERE id_recipes='3';

CREATE Table comments(
    id_comments INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comments VARCHAR(300) NOT NULL,
    id_users VARCHAR(300) REFERENCES  users(id_users) NOT NULL,
    id_recipes INT REFERENCES  recipes(id_recipes) NOT NULL,
    posted_at timestamp default current_timestamp
);

SELECT comments.comments from comments WHERE id_recipes='3';

SELECT comments.comments, users.name from comments, users WHERE id_recipes='4' AND comments.id_users=users.id_users;

CREATE Table bookmarks(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_users VARCHAR(300) REFERENCES  users(id_users) NOT NULL,
    id_recipes INT REFERENCES  recipes(id_recipes) NOT NULL,
    saved_at timestamp default current_timestamp
);

SELECT bookmarks.id,recipes.id_recipes,recipes.recipes_name, recipes.photo from bookmarks,recipes WHERE bookmarks.id_users='879a0ec0-ba39-4966-b5d1-45f1fed62a80' AND bookmarks.id_recipes=recipes.id_recipes;

DELETE FROM bookmarks WHERE id='4'