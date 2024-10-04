CREATE TABLE Alumni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    degree VARCHAR(100),
    year INT,
    industry VARCHAR(100),
    post VARCHAR(100),
    company VARCHAR(100),
    experience INT,
    skills TEXT,
    address VARCHAR(255),
    hometown VARCHAR(100),
    education_detail TEXT,
    schooling_ssc VARCHAR(100),
    schooling_hsc VARCHAR(100),
    ssc_year INT,   
    hsc_year INT,   
    contact_detail VARCHAR(100)
);
