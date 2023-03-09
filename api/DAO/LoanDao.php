<?php

require_once 'classes/Loan.php';
require_once 'db_connection.php';

class LoanDao
{
    public function __construct()
    {
    }

    function saveLoan(Loan $loan) : void {
        $conn = getConnection();

        $query = "insert into loans (users_id, loan_name, loan_amount, term, months, was_taken)
                    values (:ui, :ln, :la, :t, :m, :wt)";

        $stmt = $conn->prepare($query);

        $stmt->bindParam(":ui", $loan->userId);
        $stmt->bindParam(":ln", $loan->name);
        $stmt->bindParam(":la", $loan->amount);
        $stmt->bindParam(":t", $loan->term);
        $stmt->bindParam(":m", $loan->months);
        $stmt->bindParam(":wt", $loan->wasTaken);

        $stmt->execute();
    }

    function getAllLoans() : array {
        $conn = getConnection();

        $query = "select * from loans";

        $stmt = $conn->prepare($query);

        $stmt->execute();

        return $this->getLoansByStatement($stmt);
    }

    function getLoansByUserId($userId) : array {
        $conn = getConnection();

        $query = "select * from loans where users_id=:ui";

        $stmt = $conn->prepare($query);

        $stmt->bindValue(":ui", $userId);

        $stmt->execute();

        return $this->getLoansByStatement($stmt);
    }

    function deleteLoanById($loanId) {
        $conn = getConnection();

        $query = "delete  from loans where id=:li";

        $stmt = $conn->prepare($query);

        $stmt->bindValue(":li", $loanId);

        $stmt->execute();
    }

    function getLoansByStatement(PDOStatement $statement) : array
    {
        $loans = [];
        foreach ($statement as $row) {
            $loan = new Loan(
                $row['loan_name'],
                $row['loan_amount'],
                $row['term'],
                $row['months'],
                $row['was_taken'],
            );
            $loan->setId($row['id']);
            $loan->setUserId($row['users_id']);
            $loan->setFullReturn($loan->calculateLoan());
            $loan->setMonthlyReturn($loan->calculateMonthlyPay());

            $loans[] = $loan;
        }
        return $loans;
    }

    function countUserLoansWithin24H($userId) : int {
        $conn = getConnection();

        $query = "select count('id') from loans where was_taken >= datetime('now','-1 day') and users_id=:ui";

        $stmt = $conn->prepare($query);

        $stmt->bindValue(":ui", $userId);

        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row["count('id')"];
    }
}