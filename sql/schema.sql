CREATE TABLE rankings (
    id serial PRIMARY KEY,
    ranking_title text
);

CREATE TABLE topics (
    id serial PRIMARY KEY,
    topic_name text,
    topic_score integer REFERENCES rankings(id)
);