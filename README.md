
Main Configurations:

1. PHP Interpreter must be minimum 8.1 version
2. enable SQLite in php.ini file (extension=pdo_sqlite);

Local deployment guideline:
1. clone repository
2. click "database" on right of the PHPStorm
3. click "+" symbol
4. select sqlite as data source
5. leave name by default "identifier.sqlite" and press "add".
6. test connection from the file /api/db_connection.php by running script (should return exit code 0)
7. paste sql script in identifier.sqlite and commit it.

``` sql
PRAGMA foreign_keys = ON;

CREATE TABLE loans (
    id integer NOT NULL CONSTRAINT loans_pk PRIMARY KEY,
    users_id integer NOT NULL,
    loan_name varchar(255) NOT NULL,
    loan_amount float NOT NULL,
    term text,
    months integer,
    was_taken datetime,
    CONSTRAINT loans_users FOREIGN KEY (users_id)
    REFERENCES users (id)
    on delete cascade
);

CREATE TABLE users (
    id integer NOT NULL CONSTRAINT users_pk PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    personal_id varchar(255) NOT NULL,
    age integer NOT NULL,
    email varchar(255) NOT NULL,
    phone varchar(255) NOT NULL
);

CREATE TABLE black_list (
    id integer NOT NULL CONSTRAINT users_pk PRIMARY KEY,
    users_id integer NOT NULL,
    CONSTRAINT loans_users FOREIGN KEY (users_id)
    REFERENCES users (id)
    on delete cascade
);
```

8. run command "php -S localhost:8080" from the root directory
9. feel free to use it :)

