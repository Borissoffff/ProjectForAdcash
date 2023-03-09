<?php

class Loan
{
    public int $id;
    public int $userId;
    public string $name;
    public float $amount;
    public string $term;
    public int $months;
    public string $wasTaken;

    public float $interest = 0.05;
    public float $monthlyReturn;
    public float $fullReturn;

    public function __construct(string $name, float $amount, string $term, int $months, string $wasTaken)
    {
        $this->name = $name;
        $this->amount = $amount;
        $this->term = $term;
        $this->months = $months;
        $this->wasTaken = $wasTaken;
    }

    public function setId($id) : void {
        $this->id = $id;
    }

    public function setUserId($id) : void {
        $this->userId = $id;
    }

    public function setFullReturn($sum) : void {
        $this->fullReturn = $sum;
    }

    public function setMonthlyReturn($sum) : void {
        $this->monthlyReturn = $sum;
    }

    public function calculateLoan() : float {
        return round($this->amount + $this->amount * $this->interest, 2);
    }

    public function calculateMonthlyPay() : float {
        $monthPayWithoutLoan = $this->amount / $this->months;
        return round($monthPayWithoutLoan + $monthPayWithoutLoan * $this->interest, 2);
    }
}