<?php
require 'HttpClient.php';
require 'Friend.php';
require 'User.php';

class BackendService {
    private string $base;
    private string $id;

    function __construct(string $base, string $id) {
        $this->base = $base;
        $this->id = $id;
    }

    function test(): mixed {
        try {
            return HttpClient::get($this->base . '/test.json');
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    function login(string $username, string $password): bool {
        try {
            $res = HttpClient::post($this->get_url('login'), array('username' => $username, 'password' => $password));
            $_SESSION['chat_token'] = $res->{'token'};
            $_SESSION['user'] = $username;
            return true;
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    function register(string $username, string $password): bool {
        try {
            $res = HttpClient::post($this->get_url('register'), array('username' => $username, 'password' => $password));
            $_SESSION['chat_token'] = $res->{'token'};
            $_SESSION['user'] = $username;
            return true;
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    function load_user(string $username): User|null {
        try {
            $res = HttpClient::get($this->get_url('user') . '/' . $username, $_SESSION['chat_token']);
            return User::fromJson($res);
        } catch (\Exception $e) {
            error_log($e);
        }
        return null;
    }

    function save_user(mixed $data): mixed {
        try {
            return HttpClient::post($this->get_url('user'), $data, $_SESSION['chat_token']);
        } catch (\Exception $e) {
            error_log($e);
        }
        return null;
    }

    function load_friends(): array|null {
        try {
            $res = HttpClient::get($this->get_url('friend'), $_SESSION['chat_token']);
            $arr = array();
            foreach ($res as $i)
                $arr[] = Model\Friend::fromJson($i);
            return $arr;
        } catch (\Exception $e) {
            error_log($e);
        }
        return null;
    }

    function friend_request(Friend $friend): mixed {
        try {
            return HttpClient::post($this->get_url('friend'), array('username' => $friend->get_username()), $_SESSION['chat_token']);
        } catch (\Exception $e) {
            error_log($e);
        }
        return null;
    }

    function friend_accept(Friend $friend): mixed {
        try {
            return HttpClient::put($this->get_url('friend') . '/' . $friend->get_username(), array('status' => 'accepted'), $_SESSION['chat_token']);
        } catch (\Exception $e) {
            error_log($e);
        }
        return null;
    }

    function friend_dismiss(Friend $friend): mixed {
        try {
            return HttpClient::put($this->get_url('friend') . '/' . $friend->get_username(), array('status' => 'dismissed'), $_SESSION['chat_token']);
        } catch (\Exception $e) {
            error_log($e);
        }
        return null;
    }

    function friend_remove(Friend $friend): mixed {
        try {
            return HttpClient::delete($this->get_url('friend') . '/' . $friend->get_username(), $_SESSION['chat_token']);
        } catch (\Exception $e) {
            error_log($e);
        }
        return null;
    }

    function user_exists(string $username): bool {
        try {
            $res = HttpClient::get($this->get_url('user') . '/' . $username, $_SESSION['chat_token']);
            return json_encode($res) !== '{}';
        } catch (\Exception $e) {
            error_log($e);
            return false;
        }
    }

    function get_unread(): mixed {
        try {
            return HttpClient::get($this->get_url('unread'), $_SESSION['chat_token']);
        } catch (\Exception $e) {
            error_log($e);
        }
        return null;
    }

    private function get_url(string $url) {
        return $this->base . '/' . $this->id . '/' . $url;
    }
}
?>
