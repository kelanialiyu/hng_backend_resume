<?php
$json = file_get_contents('php://input');
$data = json_decode($json);

function sanitize_my_email($field) {
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
        return true;
    } else {
        return false;
    }
}
$to_email = 'kelanialiyu@gmail.com';
$subject = "Message From my Resume by {$data->name}";
$message = $data->message;
$headers = "From: {$data->email}";
//check if the email address is invalid $secure_check
$secure_check = sanitize_my_email($to_email);
if ($secure_check == false) {
    echo "false";
} else { //send email 
    mail($to_email, $subject, $message, $headers);
    echo "true";
}