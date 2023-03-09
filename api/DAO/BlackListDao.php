<?php

require_once 'classes/BlackListRecord.php';
require_once 'classes/User.php';

class BlackListDao
{
    public function __construct()
    {
    }

    function userInBlackList($userId) : bool {
        $conn = getConnection();

        $query = "select id from black_list where users_id=:ui";

        $stmt = $conn->prepare($query);

        $stmt->bindValue(":ui", $userId);

        $stmt->execute();

        foreach ($stmt as $row) if ($row['id'] !== null) {
            return true;
        }
        return false;
    }

    function saveUserInBlackList($userId) : void {
        $conn = getConnection();

        $query = "insert into black_list (users_id) values (:ui)";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(":ui", $userId);

        $stmt->execute();
    }

    function getUsers() : array {
        $conn = getConnection();

        $query = "select * from users left join black_list bl on users.id = bl.users_id where bl.users_id is not null";

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
}