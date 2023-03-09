<?php

class BlackListRecord
{
    public int $id;
    public int $userId;

    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }
}