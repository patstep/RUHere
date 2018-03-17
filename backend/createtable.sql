DROP DATABASE IF EXISTS RUHere;
CREATE database RUHere;

USE RUHere;

CREATE TABLE mentor (
  user_id INT NOT NULL,
  mentee_identifier VARCHAR(100) NULL,
  q1 INT NOT NULL,
  q1WF INT NOT NUll,
  q2 INT NOT NULL,
  q2WF INT NOT NUll,
  q3 INT NOT NULL,
  q3WF INT NOT NUll,
  q4 INT NOT NULL,
  q4WF INT NOT NUll,
  q5 INT NOT NULL,
  q5WF INT NOT NUll,
  PRIMARY KEY (user_id)
);

CREATE TABLE mentee (
  user_id INT NOT NULL,
  mentee_identifier VARCHAR(100) NULL,
  q1 INT NOT NULL,
  q1WF INT NOT NUll,
  q2 INT NOT NULL,
  q2WF INT NOT NUll,
  q3 INT NOT NULL,
  q3WF INT NOT NUll,
  q4 INT NOT NULL,
  q4WF INT NOT NUll,
  q5 INT NOT NULL,
  q5WF INT NOT NUll,
  PRIMARY KEY (user_id)
);


USE RUHere;

ALTER TABLE mentee DROP COLUMN mentee_identifier;