-- npx sequelize-auto -o "./models" -d RegistrationDB -h localhost -u postgres --x 3003 -e postgres
DROP TABLE IF EXISTS account CASCADE;

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  email varchar(50) NOT NULL,
  password varchar(400) NOT NULL,
  full_name varchar(50) NOT NULL,
  is_deleted SMALLINT
);
