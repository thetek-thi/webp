<?php
class User implements JsonSerializable {
    private string|null $username = null;
    private string|null $description = null;
    private string|null $first_name = null;
    private string|null $last_name = null;
    private string|null $coffee_or_tea = null;
    private string|null $layout = null;
    private array|null $friends = null;
    private array|null $requests = null;

    function __construct(string|null $username = null) {
        $this->username = $username;
    }

    function get_username():      string|null { return $this->username;      }
    function get_description():   string|null { return $this->description;   }
    function get_first_name():    string|null { return $this->first_name;    }
    function get_last_name():     string|null { return $this->last_name;     }
    function get_coffee_or_tea(): string|null { return $this->coffee_or_tea; }
    function get_layout():        string|null { return $this->layout;        }
    function get_friends():       string|null { return $this->friends;       }
    function get_requests():      string|null { return $this->requests;      }

    function set_description  (string|null $v) { $this->description   = $v; }
    function set_first_name   (string|null $v) { $this->first_name    = $v; }
    function set_last_name    (string|null $v) { $this->last_name     = $v; }
    function set_coffee_or_tea(string|null $v) { $this->coffee_or_tea = $v; }
    function set_layout       (string|null $v) { $this->layout        = $v; }

    function jsonSerialize(): mixed {
        return get_object_vars($this);
    }

    static function fromJson(mixed $data): User {
//      THIS IS A HORRILBE SOLUTION:
//      foreach ($data as $key => $value) {
//          $user->{$key} = $value;
//      }
        $user = new User($data->{'username'});
        if (isset($data->{'friends'}))     $user->{'friends'} = $data->{'friends'};
        if (isset($data->{'requests'}))    $user->{'requests'} = $data->{'requests'};
        if (isset($data->{'description'})) $user->{'description'} = $data->{'description'};
        if (isset($data->{'firstName'}))   $user->{'first_name'} = $data->{'firstName'};
        if (isset($data->{'lastName'}))    $user->{'last_name'} = $data->{'lastName'};
        if (isset($data->{'coffeeOrTea'})) $user->{'coffee_or_tea'} = $data->{'coffeeOrTea'} === '0' ? 'neither nor' : ($data->{'coffeeOrTea'} === '1' ? 'coffee' : ($data->{'coffeeOrTea'} === '2' ? 'tea' : 'invalid choice'));
        if (isset($data->{'layout'}))      $user->{'layout'} = $data->{'layout'};
        return $user;
    }
}
?>
