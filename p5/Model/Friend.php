<?php
namespace Model;

use JsonSerializable;

class Friend implements JsonSerializable {
    private string|null $username = null;
    private string|null $status = null; // why the heck a string? i guess my lecturer is too stupid for enums.

    function __construct(string|null $username = null) {
        $this->username = $username;
    }

    function get_username(): string|null {
        return $this->username;
    }

    function get_status(): string|null {
        return $this->status;
    }

    function set_status_accepted() {
        $this->status = 'accepted';
    }

    function set_status_dismissed() {
        $this->status = 'dismissed';
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
        if (property_exists($data, 'status')) {
            if ($data->{'status'} === 'accepted')
                $user->set_status_accepted();
            else if ($data->{'status'} === 'dismissed')
                $user->set_status_dismissed();
        }
        return $user;
    }
}
?>
