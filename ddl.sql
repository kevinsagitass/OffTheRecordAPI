USE offtherecord;

CREATE TABLE GENRE (
	genre_id INT PRIMARY KEY auto_increment,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE POST (
	post_id INT PRIMARY KEY auto_increment,
    title VARCHAR(100),
    thumbnail_url VARCHAR(255),
    genre_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (genre_id) REFERENCES GENRE(genre_id)
);

CREATE TABLE USER (
	user_id INT PRIMARY KEY auto_increment,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE REVIEW (
	review_id INT PRIMARY KEY auto_increment,
    post_id INT,
    user_id INT,
    review_comment LONGTEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES POST(post_id),
	FOREIGN KEY (user_id) REFERENCES USER(user_id)
);

CREATE TABLE USER_POST_INTERACTION (
	user_id INT,
    post_id INT,
    interaction_type VARCHAR(15),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USER(user_id),
    FOREIGN KEY (post_id) REFERENCES POST(post_id)
);

SELECT * FROM POST A JOIN GENRE B ON A.genre_id = B.genre_id WHERE LOWER(B.name) = LOWER(null) OR (ISNULL(null) OR null = '') ORDER BY created_at DESC LIMIT 0 , 12;

SELECT * FROM POST A JOIN GENRE B ON A.genre_id = B.genre_id WHERE A.post_id IN (
	SELECT temp.post_id FROM (
		SELECT post_id, COUNT(user_id) 
        FROM USER_POST_INTERACTION 
        WHERE interaction_type = 'liked' 
        GROUP BY post_id 
	) temp
) AND (LOWER(B.name) = LOWER(null) OR (ISNULL(null) OR null = ''))  ORDER BY A.created_at DESC LIMIT 10;