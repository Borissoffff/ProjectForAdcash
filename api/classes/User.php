<?php

class User
{
    public int $id;
    public string $firstName;
    public string $lastName;
    public string $personalId;
    public int $age;
    public string $email;
    public string $phone;
    public bool $canTakeLoan = true;

    public function __construct(
        string $firstName,
        string $lastName,
        string $personalId,
        int $age,
        string $email,
        string $phone)
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->personalId = $personalId;
        $this->age = $age;
        $this->email = $email;
        $this->phone = $phone;
    }

    public function setId(int $id) {
        $this->id = $id;
    }
}