CREATE TABLE IF NOT EXISTS member (
    id INT PRIMARY KEY AUTO_INCREMENT,
    deptcode VARCHAR(10),
    membername VARCHAR(50),
    email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS dept (
    deptcode VARCHAR(10),
    deptname VARCHAR(50)
);