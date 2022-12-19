<?php
require '../start.php';

$failed = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    if (empty($username) || empty($password))
        $failed = true;
} else
    $failed = true;

if ($failed) {
    header('Location: ../login?error');
    exit();
}

if ($service->login($username, $password)) {
    header('Location: ../friends');
    exit();
} else {
    header('Location: ../login?error');
    exit();
}
?>
