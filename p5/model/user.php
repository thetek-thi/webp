<?php
namespace Model;

use JsonSerializable;

class User implements JsonSerializable {
    private string|null $username = null;

    function __construct(string|null $username = null) {
        $this->username = $username;
    }

    function get_username(): string|null {
        return $this->username;
    }

    function jsonSerialize(): mixed {
        return get_object_vars($this);
    }

    static function fromJson(object $data): User {
//      THIS IS A HORRILBE SOLUTION:
//      foreach ($data as $key => $value) {
//          $user->{$key} = $value;
//      }
        $user = new User($data->{'username'});
        return $user;
    }
}
?>
