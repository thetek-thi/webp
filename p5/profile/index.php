<!DOCTYPE html>
<?php
require '../start.php';

if (isset($_GET['user'])) {
    $current_user = $_GET['user'];
    $profile = $service->load_user($current_user);
} else {
    header('Location: ../friends');
    exit();
}
?>

<html>
    <head>
        <title>User profile view</title>
        <link rel="stylesheet" href="../style/main.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <h1>Profile of <?=$current_user?></h1>
        <?php echo "<a href=\"../chat?user=$current_user\">&lt; Back to Chat</a>"; ?>
        |
        <?php echo "<a class=\"spec1\" href=\"../friends?remove=$current_user\">Remove Friend</a>"; ?>

        <br><br>

        <img src="../img/profile.png" class="aside-left">

        <div class="aside-right">
            <div>
                <?php
                if ($profile->get_description())
                    echo $profile->get_description();
                else
                    echo "user did not set a description yet.";
                ?>
            </div>

            <br><br>

            <b>Coffee or Tea?</b>
            <blockquote>
                <?php
                if ($profile->get_coffee_or_tea())
                    echo $profile->get_coffee_or_tea();
                else
                    echo "user did not set a preference yet.";
                ?>
            </blockquote>

            <b>Name</b>
            <blockquote>
                <?php
                $first = $profile->get_first_name();
                $last = $profile->get_last_name();
                if ( $first &&  $last) echo "$first $last";
                if ( $first && !$last) echo $first;
                if (!$first &&  $last) echo $last;
                if (!$first && !$last) echo $current_user;
                ?>
            </blockquote>
        </div>
    </body>
</html>
