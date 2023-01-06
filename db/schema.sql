
DROP DATABASE IF EXISTS states_db;
CREATE DATABASE states_db;

USE states_db;

CREATE TABLE states (
  id INT NOT NULL,
  state_name VARCHAR(30) NOT NULL,
  size VARCHAR(30) NOT NULL,
  fun_fact VARCHAR(250) NOT NULL
);

DROP DATABASE IF EXISTS travel_db;
CREATE DATABASE travel_db;
