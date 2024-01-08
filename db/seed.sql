INSERT INTO department (name)
VALUES ("Science"),
       ("Math"),
       ("History"),
       ("Literature");
       
INSERT INTO role (title, salary, department_id)
VALUES ("instructor", 50000.00, 1),
       ("manager", 70000.00, 2),
       ("staff", 50000.00, 3),
       ("teacher", 60000.00, 4);
       
INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ("Daniel", "Goss", 1, null),
       ("Shelby", "Smith", 2, null),
       ("Yoda", "Little", 3, 1),
       ("John", "Smith", 4, 2);