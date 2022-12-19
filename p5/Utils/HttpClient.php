<?php
namespace Utils;

class HttpClient {
    public static function post(string $url, mixed $data, string|null $token = null) {
        // initiate curl.
        $ch = curl_init();

        // encode the array into json.
        $json_data_encoded = json_encode($data);

        // tell curl that we want to send a post request.
        curl_setopt($ch, CURLOPT_POST, true);

        // attach our encoded json string to the post fields.
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data_encoded);

        curl_setopt($ch, CURLOPT_URL, $url);

        // get result as string
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 

        // set the content type to application/json and authorization token if provided
        $headers = array('Content-Type: application/json');
        if($token)
            $headers[] = "Authorization: Bearer $token";
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // execute the request
        $result = curl_exec($ch);

        // get status
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // close request
        curl_close($ch);

        // handle response, if not empty, as json
        if ($status === 200 && !empty($result))
            return json_decode($result);
        else if ($status === 204)
            return true;
        throw new \Exception('Http status is ' . $status . ': ' . $result);
    }

    public static function put(string $url, mixed $data, string|null $token = null) {
        // initiate curl.
        $ch = curl_init();

        // encode the array into json.
        $json_data_encoded = json_encode($data);

        // tell curl that we want to send a post request.
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');

        // attach our encoded json string to the post fields.
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data_encoded);

        curl_setopt($ch, CURLOPT_URL, $url);

        // get result as string
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 

        // set the content type to application/json and authorization token if provided
        $headers = array('Content-Type: application/json');
        if ($token)
            $headers[] = "Authorization: Bearer $token";
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // execute the request
        $result = curl_exec($ch);

        // get status
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // close request
        curl_close($ch);

        // handle response, if not empty, as json
        if ($status === 200 && !empty($result))
            return json_decode($result);
        else if ($status === 204)
            return true;
        throw new \Exception("Http status is $status");
    }

    public static function get(string $url, string|null $token = null) {
        // initiate curl
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);

        // get result as string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // set authorization token if provided
        if ($token)
            curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: Bearer $token"));

        // execute the request
        $result = curl_exec($ch);

        // get status
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // close request
        curl_close($ch);

        // handle response, if not empty, as json
        if ($status === 200 && !empty($result))
            return json_decode($result);
        else if ($status === 204)
            return true;
        throw new \Exception("Http status is $status: $result");
    }

    public static function delete(string $url, string|null $token = null) {
        // initiate curl
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);

        // set custom request method
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');

        // get result as string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // set authorization token if provided
        if ($token)
            curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: Bearer $token"));

        // execute the request
        $result = curl_exec($ch);

        // get status
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // close request
        curl_close($ch);

        // handle response, if not empty, as json
        if ($status === 200 && !empty($result))
            return json_decode($result);
        else if ($status === 204)
            return true;
        throw new \Exception("Http status is $status: $result");
    }
}
