<?php
require '../start.php';

$failed = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $desc = $_POST['sth_about_u'];
    $cot = $_POST['coffee_or_tea'];
    $lay = $_POST['Layout'];
    $first = $_POST['firstname'];
    $last = $_POST['lastname'];
} else
    $failed = true;

if ($failed) {
    header('Location: ../friends');
    exit();
}

$user = new User($_SESSION['user']);
// whatever our lecturer wanted to create here is a piece of shit, please dont sue me for this abomination
$user->{'coffeeOrTea'} = $cot;
$user->{'firstName'} = $first;
$user->{'lastName'} = $last;
$user->set_description($desc);
$user->set_layout($lay);
$service->save_user($user);
header('Location: ../friends');
?>
