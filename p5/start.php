<?php
spl_autoload_register(function ($class) {
    include str_replace('\\', '/', $class) . '.php';
});

session_start();

define('CHAT_SERVER_URL', 'https://online-lectures-cs.thi.de/chat');
define('CHAT_SERVER_ID', '56ce2af0-ee84-4e78-85bc-6bba6c51c739');

require 'Utils/BackendService.php';
$service = new Utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
?>
