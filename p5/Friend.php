<?php
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

    function set_status_requested() {
        $this->status = 'requested';
    }

    function jsonSerialize(): mixed {
        return get_object_vars($this);
    }

    static function fromJson(object $data): Friend {
//      THIS IS A HORRILBE SOLUTION:
//      foreach ($data as $key => $value) {
//          $user->{$key} = $value;
//      }
        if (!is_string($data->{'username'}))
            $data->{'username'} = $data->{'username'}->{'username'};
        $user = new Friend($data->{'username'});
        if (property_exists($data, 'status')) {
            if ($data->{'status'} === 'accepted')
                $user->set_status_accepted();
            else if ($data->{'status'} === 'requested')
                $user->set_status_requested();
            else if ($data->{'status'} === 'dismissed')
                $user->set_status_dismissed();
        }
        return $user;
    }
}
?>
