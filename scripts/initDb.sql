DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS judges CASCADE;
DROP TABLE IF EXISTS cases CASCADE;
DROP TABLE IF EXISTS documents CASCADE;

CREATE TABLE departments (
	id SERIAL PRIMARY KEY,
	department_name varchar
);

CREATE TABLE judges (
	id SERIAL PRIMARY KEY, 
	department_id int NOT NULL, 
	full_name varchar NOT NULL, 
	CONSTRAINT fk_department_judges FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE cases (
	id SERIAL PRIMARY KEY,
	case_state int NOT NULL,
	department_id int NOT NULL,
	judge_id int NOT NULL,
	signature varchar,
	CONSTRAINT fk_department_cases FOREIGN KEY(department_id) REFERENCES departments(id),
	CONSTRAINT fk_judges FOREIGN KEY(judge_id) REFERENCES judges(id)
);

CREATE TABLE documents (
	id SERIAL PRIMARY KEY, 
	case_id int NOT NULL,
	received_on timestamp NOT NULL,
	sender varchar NOT NULL,
	description varchar NOT NULL,
	raw_data bytea NOT NULL,
	CONSTRAINT fk_cases FOREIGN KEY(case_id) REFERENCES cases(id)
);
