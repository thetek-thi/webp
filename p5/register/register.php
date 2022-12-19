<?php
require '../start.php';

$err_user_exist = false;
$err_user_len = false;
$err_pwd_len = false;
$err_pwd_match = false;
$failed = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirmpw = $_POST['confirmPassword'];
    if (strlen($password) < 3)
        $err_user_len = true;
    if ($service->user_exists($username))
        $err_user_exist = true;
    if (strlen($password) < 8)
        $err_pwd_len = true;
    if ($password !== $confirmpw)
        $err_pwd_match = true;
} else
    $failed = true;
$err = $failed || $err_user_exist || $err_user_len || $err_pwd_len || $err_pwd_match;

if ($err) {
    $loc = 'Location: ../register?';
    $ea = array();
    if ($failed)         $ea[] = "error";
    if ($err_user_exist) $ea[] = "err_user_exist";
    if ($err_user_len)   $ea[] = "err_user_len";
    if ($err_pwd_len)    $ea[] = "err_pwd_len";
    if ($err_pwd_match)  $ea[] = "err_pwd_match";
    $loc .= implode('&', $ea);
    header($loc);
    exit();
}

if ($service->register($username, $password)) {
    header('Location: ../friends');
    exit();
} else {
    header('Location: ../register?error');
    exit();
}
?>
