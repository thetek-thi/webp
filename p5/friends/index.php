<!DOCTYPE html>
<?php require '../start.php'; ?>
<html lang="de">
<head>
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
        <ul>
            <li><a href="chat.html">Tom (3)</a></li>
            <li><a href="chat.html">Marvin (1)</a></li>
            <li><a href="chat.html">Tick</a></li>
            <li> <a href="chat.html">Trick</a></li>
        </ul>
        <hr>
        <h2>New Requests</h2>
        <ol>
            <li><a href="">Friend request from <b>Track</b></a></li>
        </ol>
        <hr>
        <form name="form1" id="form1"> <!-- TODO: action, method -->
            <input class="biginput" type="text" name="addFriend" placeholder="Add Friend to List" list="listoffriends" oninput="loadUsers()" id="friendinput" autocomplete="off">
            <datalist id="listoffriends"></datalist>
            <input class="nomaxwidthonmobile" type="submit" value="Add" id="button01">
        </form>
    </p>
</body>
</html>
