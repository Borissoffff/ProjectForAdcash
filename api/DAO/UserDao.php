<?php

require_once 'db_connection.php';
require_once 'classes/User.php';

class UserDao
{
    public function __construct()
    {
    }

    function saveUser(User $user) : void {
        $conn = getConnection();

        $query = "insert into users (first_name, last_name, personal_id, age, email, phone)
                    values (:fn, :ln, :pi, :a, :e, :p)";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(":fn", $user->firstName);
        $stmt->bindParam(":ln", $user->lastName);
        $stmt->bindParam(":pi", $user->personalId);
        $stmt->bindParam(":a", $user->age);
        $stmt->bindParam(":e", $user->email);
        $stmt->bindParam(":p", $user->phone);

        $stmt->execute();
    }

    function getUsers() : array {
        $conn = getConnection();

        $query = "select * from users";

        $stmt = $conn->prepare($query);

        $stmt->execute();

        $users = [];
        foreach ($stmt as $row) {
            $user = new User(
                $row['first_name'],
                $row['last_name'],
                $row['personal_id'],
                $row['age'],
                $row['email'],
                $row['phone'],
            );
            $user->setId($row['id']);

            $users[] = $user;
        }
        return $users;
    }

    function getUserById($id) : User
    {
        $conn = getConnection();

        $query = "select * from users where id = :id";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(":id", $id);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $user = new User(
            $row['first_name'],
            $row['last_name'],
            $row['personal_id'],
            $row['age'],
            $row['email'],
            $row['phone'],
        );
        $user->setId($row['id']);

        return $user;
    }

    public function deleteUser($id) : void
    {
        $conn = getConnection();

        $stmt = $conn->prepare("PRAGMA foreign_keys = ON");
        $stmt->execute();

        $query = "delete from users where id=:id";

        $stmt = $conn->prepare($query);

        $stmt->bindValue(":id", $id);

        $stmt->execute();
    }
}