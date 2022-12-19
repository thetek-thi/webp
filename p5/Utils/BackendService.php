<?php
namespace Utils;

require 'HttpClient.php';

class BackendService {
    private string $base;
    private string $id;

    function __construct(string $base, string $id) {
        $this->base = $base;
        $this->id = $id;
    }

    public function test(): mixed {
        try {
            return HttpClient::get($this->base . '/test.json');
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }
}
?>
