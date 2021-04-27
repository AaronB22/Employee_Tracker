drop database if exists employeetracker_db;

create database employeetracker_db;
use employeetracker_db;

drop table if exists department;

create table department(
id int Not Null auto_increment,
dep_name varchar(100) not null, 
primary key(id)
);
drop table if exists emp_role;
create table emp_role(
id int Not Null auto_increment primary key,
title varchar(200) not null,
salary decimal,
department_id int
);


drop table if exists employees;
create table employees(
id int Not Null auto_increment primary key,
first_name varchar(30),
last_name varchar(30),
role_id int,
manager varchar(40)
);


insert into employees(first_name, last_name, role_id) value("Kieth", "Supercool",1);
select * from department;

select * from employees;
select * from emp_role;
select * from department;









