<!DOCTYPE html>
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
  <form name="register" action="friends.html" onsubmit="return submission()">
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
    </fieldset>
    <p class="center">
      <button type="button" class="nomaxwidthonmobile">Cancel</button>
      <input type="submit" class="nomaxwidthonmobile" value="Create Account">
    </p>
  </form>
</body>
</html>

