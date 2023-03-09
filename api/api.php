<?php

require_once 'classes\User.php';
require_once 'classes\Loan.php';
require_once 'classes\BlackListRecord.php';
require_once 'DAO\UserDao.php';
require_once 'DAO\LoanDao.php';
require_once 'DAO\BlackListDao.php';

$cmd = $_GET['cmd'] ?? 'show-users';

$userDao = new UserDao();
$loanDao = new LoanDao();
$blackListDao = new BlackListDao();

$PERMITTED_LOANS_AMOUNT = 3;

if ($cmd == 'show-users') {

    header("Content-type: application/json");

    print json_encode(
        array_reverse($userDao->getUsers()));
}
else if ($cmd == 'get-user') {
    $id = $_GET['id'];

    header("Content-type: application/json");

    print json_encode($userDao->getUserById($id));
}
else if ($cmd == 'save-user') {
    $jsonAsText = file_get_contents('php://input');

    $object = json_decode($jsonAsText);

    $user = new User(
        $object->firstName,
        $object->lastName,
        $object->personalId,
        $object->age,
        $object->email,
        $object->phone);

    $userDao->saveUser($user);

    header("Content-type: application/json");

    print json_encode("saved");
}
else if ($cmd == 'delete-user') {
    $id = $_GET['id'];

    $userDao->deleteUser($id);

    header("Content-type: application/json");

    print json_encode("deleted");
}
else if ($cmd == 'save-loan') {
    date_default_timezone_set('Europe/Helsinki');


    $jsonAsText = file_get_contents('php://input');

    $object = json_decode($jsonAsText);

    $now = date_create()->format('Y-m-d H:i:s');

    $loan = new Loan(
        $object->name,
        $object->amount,
        $object->term,
        $object->months,
        date('Y-m-d H:i:s',time()));

    $loan->setUserId($object->userId);

    $loanDao->saveLoan($loan);

    $userLoans = $loanDao->countUserLoansWithin24H($object->userId);

    if ($userLoans >= $PERMITTED_LOANS_AMOUNT) {
        $blackListDao->saveUserInBlackList($object->userId);
    }

    header("Content-type: application/json");

    print json_encode("saved");
}
else if ($cmd == 'get-loans') {

    if (isset($_GET['userId'])) {
        $userId = $_GET['userId'];

        header("Content-type: application/json");

        print json_encode(
            array_reverse($loanDao->getLoansByUserId($userId)));

    } else {
        header("Content-type: application/json");

        print json_encode(
            array_reverse($loanDao->getAllLoans()));
    }
}
else if ($cmd == 'get-blacklist-user') {
    $userId = $_GET['id'];

    $userInList = $blackListDao->userInBlackList($userId);

    header("Content-type: application/json");
    if ($userInList) {
        $data = array("status" => "denied");
    } else {
        $data = array("status" => "accepted");
    }
    print json_encode($data);
}
else if ($cmd == 'get-blacklist-users') {

    header("Content-type: application/json");

    print json_encode(
        array_reverse($blackListDao->getUsers()));

}
else if ($cmd == 'delete-loan') {
    $loanId = $_GET['id'];

    $loanDao->deleteLoanById($loanId);

    header("Content-type: application/json");

    print json_encode("deleted");
}