<!DOCTYPE html>
<?php
require '../start.php';
if (isset($_SESSION['user']))
    $user = $_SESSION['user'];
else {
    header('Location: ../login');
    exit();
}

$userdata = $service->load_user($user);
?>
<!--Input, Texterea, Select-Elemente, Radio Button,Button,-->
<html>
    <head>
        <title>Profile Settings</title>
        <link rel="stylesheet" href="../style/main.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <h1>Profile Settings</h1>
        <br>
        <form method="POST" action="./savesettings.php">
            <fieldset>
                <legend>Base Data</legend>

                <label for="firstname">First Name</label>
                <?php
                echo '<input class="smallinput" id="firstname" type="text" name="firstname" placeholder="Your name" value="' . $userdata->get_first_name() . '">';
                ?>
                <br>
                <label for="lastname">Last Name</label>
                <?php
                echo '<input class="smallinput" id="lastname" type="text" name="lastname" placeholder="Your surname" value="' . $userdata->get_last_name() . '">';
                ?>
                <br>
                <label for="Coffee or Tea">Coffee or Tea?</label>
                <select class="smallinput" name="coffee_or_tea" id="coffee_or_tea">
                    <option value="0">Neither nor</option>
                    <option value="1">Coffee</option>
                    <option value="2" selected>Tea</option>
                </select>
            </fieldset>

            <fieldset>
                <legend>Tell Something About You</legend>
                <textarea name="sth_about_u" id="sth_about_u" placeholder="Leave a comment here"><?=$userdata->get_description()?></textarea>
            </fieldset>

            <fieldset>
                <legend>Prefered Chat Layout</legend>

                <input class="radio" type="radio" id="Layout1" name="Layout" value="Layout1" checked>
                <label class="radio" for="Layout1">Username and message in one line</label><br>

                <input class="radio" type="radio" id="Layout2" name="Layout" value="Layout2">
                <label class="radio" for="Layout2">Username and message in separated lines</label>
            </fieldset>
            <br>

            <div class="center">
                <a href="../friends"><button type="button" class="nomaxwidthonmobile">Cancel</button></a>
                <input type="submit" value="Save" class="nomaxwidthonmobile">
            </div>
        </form>

    </body>
</html>
