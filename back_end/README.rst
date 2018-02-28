nstall
install mysql-server,

-------

In command line :

.. code-block::
sudo apt install mysql-server


in sql, type : 

.. code-block::
CREATE USER 'ent_upmc'@'localhost' IDENTIFIED BY '1234';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'ent_upmc'@'localhost' WITH GRANT OPTION;

load the file Db.sql in mysql.


Then run with npm install, npm start.

