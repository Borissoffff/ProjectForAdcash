<?php

function getConnection() : PDO {
    return new PDO('sqlite:identifier.sqlite');
}