USE employee_db;

INSERT INTO department(name)
VALUES
("Marketing"),
("Sales"),
("Accounting"),
("Customer Service");

INSERT INTO role(title,salary,department_id)
VALUES
("Sales Manager",170000,2),
("Customer Service Rep",50000,4),
("Marketing Intern",45000,1),
("Business Manager",95000,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES
("Marleen","Davis",4,NULL),
("Eli","Geiger",2,NULL),
("Carla","Stone",3,NULL),
("Tom","Smith",1,NULL);

UPDATE employee SET manager_id =4 WHERE id=2;
UPDATE employee SET manager_id =1 WHERE id=3;

