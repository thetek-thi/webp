<!DOCTYPE html>
<?php require '../start.php'; ?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Register yourself</title>
  <link rel="stylesheet" href="../style/main.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <img src="../img/user.png" alt="user icon" width="100px" class="center round">
  <h1 class="center">Register yourself</h1>
  <form action="./register.php" method="POST">
    <fieldset>
      <legend>Register</legend>
      <label for="username">Username</label>
      <input class="smallinput" type="text" placeholder="Username" id="username" name="username" oninput="checkUserExistence()" required>
      <br>
      <label for="password">Password</label>
      <input class="smallinput" type="password" placeholder="Password" id="password" name="password" oninput="checkPassword()" required>
      <br>
      <label for="confirmPassword">Confirm Password</label>
      <input class="smallinput" type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" oninput="checkConfirm()" required>
      <?php
        if (isset($_GET['err_user_exist']))
          echo '<p style="color:red;">User already exists.</p>';
        if (isset($_GET['err_user_len']))
          echo '<p style="color:red;">Username must be 3 characters or longer.</p>';
        if (isset($_GET['err_pwd_len']))
          echo '<p style="color:red;">Password must be 8 characters or longer.</p>';
        if (isset($_GET['err_pwd_match']))
          echo '<p style="color:red;">Passwords must match.</p>';
        if (isset($_GET['error']))
          echo '<p style="color:red;">Error during login.</p>';
      ?>
    </fieldset>
    <p class="center">
      <button type="button" class="nomaxwidthonmobile">Cancel</button>
      <input type="submit" class="nomaxwidthonmobile" value="Create Account">
    </p>
  </form>
</body>
</html>
