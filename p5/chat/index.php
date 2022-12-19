<!DOCTYPE html>
<?php require '../start.php'; ?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chat with Jerry</title>
  <link rel="stylesheet" href="../style/main.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Chat with Jerry</h1>
  <p>
    <a href="friends.html">&lt; Back</a> |
    <a href="profile.html">Profile</a> |
    <a class="spec1" href="friends.html">Remove Friend</a>
  </p>
  <div class="borderaround" id="chatview">
    <p><small class="timelabel">Loading...</small></p>
  </div>
  <p>
    <input class="biginput nomaxwidthonmobile" type="text" id="msginput" placeholder="New Message" name="msg">
    <button class="bluebutton nomaxwidthonmobile" type="button" onclick="sendMessageHandler()">Send</button>
  </p>
</body>
</html>
