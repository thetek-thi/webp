<!DOCTYPE html>
<?php
require '../start.php';
if (!isset($_SESSION['chat_token'])) {
    header('Location: ../login');
    exit();
}

$friends = $service->load_friends();
$unread = $service->get_unread();

if (isset($_GET['request']))
    $service->friend_request(new Friend($_GET['request']));
if (isset($_GET['remove']))
    $service->friend_remove(new Friend($_GET['remove']));
if (isset($_GET['accept']))
    $service->friend_accept(new Friend($_GET['accept']));
if (isset($_GET['dismiss']))
    $service->friend_dismiss(new Friend($_GET['dismiss']));
?>
<html lang="de">
<head>
<script>
window.chatToken = "<?= $_SESSION['chat_token'] ?>";
window.chatCollectionId = "<?= CHAT_SERVER_ID ?>";
window.chatServer = "<?= CHAT_SERVER_URL ?>";
</script>
<script src="./script.js"></script>
    <meta charset="UTF-8">
    <title>friendslist</title>
    <link rel="stylesheet" href="../style/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <p>
        <h2 class="big">Friends</h2>
        <a href="../logout">&lt; Logout</a> | <a href="../settings">Settings</a>
        <hr>
        <ul id="addfriendshere">
              <?php
//            foreach ($friends as $f)
//                if ($f->get_status() === 'accepted') {
//                    $u = $f->get_username();
//                    $m = '?';
//                    foreach ($unread as $k => $v)
//                        if ($k === $u)
//                            $m = $v;
//                    echo "<li><a href=\"../chat?user=$u\">$u<span style=\"float:right;\">($m)</span></a></li>";
//                }
              ?>
        </ul>
        <hr>
        <h2>New Requests</h2>
        <ol>
            <?php
            foreach ($friends as $f)
                if ($f->get_status() === 'requested')
                    echo "<li>Friend request from <b>" . $f->get_username() . "</b> &ndash; <a href=\"../friends?accept=" . $f->get_username() . "\">Accept</a> <a class=\"spec1\" href=\"../friends?dismiss=" . $f->get_username() . "\">Dismiss</a></li>";
            ?>
        </ol>
        <hr>
        <form action="../friends" method="GET">
            <input class="biginput" type="text" name="request" placeholder="Add Friend to List" list="listoffriends" oninput="loadUsers()" id="friendinput" autocomplete="off">
            <datalist id="listoffriends"></datalist>
            <input class="nomaxwidthonmobile" type="submit" value="Add" id="button01">
        </form>
    </p>
</body>
</html>
