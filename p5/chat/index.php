<!DOCTYPE html>
<?php
require '../start.php';
if (!isset($_SESSION['chat_token'])) {
  header('Location: ../login');
  exit();
}
if (isset($_GET['user']))
  $user = $_GET['user'];
else {
  header('Location: ../friends');
  exit();
}
?>
<html lang="en">
<head>
<script>
window.chatToken = "<?= $_SESSION['chat_token'] ?>";
window.chatUser = "<?= $_GET['user'] ?>";
window.chatCollectionId = "<?= CHAT_SERVER_ID ?>";
window.chatServer = "<?= CHAT_SERVER_URL ?>";
</script>
<script type="text/javascript" src="./script.js"></script>
  <meta charset="UTF-8">
  <title>Chat with Jerry</title>
  <link rel="stylesheet" href="../style/main.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Chat with <?=$user?></h1>
  <p>
    <a href="../friends">&lt; Back</a> |
    <?php echo "<a href=\"../profile?user=$user\">Profile</a>"; ?> |
    <?php echo "<a class=\"spec1\" href=\"../friends?remove=$user\">Remove Friend</a>"; ?>
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
