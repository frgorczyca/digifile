CREATE TABLE cases (id int, case_state int, department_id int, judge_id int);
CREATE TABLE documents (id int, case_id int, received_on timestamp, sender varchar, description varchar, raw_data bytea);
CREATE TABLE departments (id int, department_name varchar);
CREATE TABLE judges (id int, department_id int, full_name varchar);

CREATE SEQUENCE departments_sequence START 1;
CREATE SEQUENCE judges_sequence START 1;
CREATE SEQUENCE documents_sequence START 1;
CREATE SEQUENCE cases_sequence START 1;