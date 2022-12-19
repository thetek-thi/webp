<!DOCTYPE html>
<?php require '../start.php'; ?>
<html>

<head>
    <title>login site</title>
    <link rel="stylesheet" href="../style/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <img src="../img/chat.png" width="100px" class="center round">
    <h1 class="center">Please sign in</h1>
    <form> <!-- TODO action method -->
        <fieldset>
            <legend>Login</legend>
            <p>
                <label for="Username"> Username</label> 
                <input class="smallinput" type="text" name="Username" placeholder="Username">
                <br>
                <label for="Password">Password</label>
                <input class="smallinput" type="text" name="Password" placeholder="Password">
            </p>
        </fieldset>
        <div class="center">
            <a href="register.html"><button type="button" class="nomaxwidthonmobile">Register</button></a>
            <input type="submit" value="Login" class="nomaxwidthonmobile">
        </div>
    </form>
</body>
</html>
