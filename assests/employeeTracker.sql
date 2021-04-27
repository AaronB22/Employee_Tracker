drop database if exists employeetracker_db;

create database employeetracker_db;
use employeetracker_db;

drop table if exists employees;

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

update emp_role Set title ="HR Agent" where emp_role.id = 2;

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

-- select role_id, first_name from employees  inner join emp_role On employees.role_id=emp_role.id
-- 	 join department on emp_role.id=department.id;

select employees.role_id, employees.first_name, department.dep_name from employees
join emp_role on employees.role_id= emp_role.id
join department on department.id=emp_role.id;

select * from employees;

select employees.id, employees.first_name, employees.last_name, emp_role.title, department.dep_name, emp_role.salary, mgr.first_name, mgr.last_name from department
join emp_role on department.id=emp_role.department_id
left join employees on emp_role.id= employees.role_id
left join employees mgr on employees.manager_id = mgr.id;

select employees.id, employees.first_name, employees.last_name, emp_role.title, department.dep_name, emp_role.salary, mgr.first_name, mgr.last_name from department
            join emp_role on department.id=emp_role.department_id
            join employees on emp_role.id= employees.role_id
            left join employees mgr on employees.manager_id = mgr.id


select employees.first_name, employees.last_name , employees.first_name as employees.first_name,
from employees join employees on employees.id= employees.manager_id;


select 
emp.first_name,
emp.last_name,
emp.manager_id,
mgr.first_name,
mgr.last_name
from employees emp
left join employees mgr On emp.manager_id= mgr.id