// callback.php
<?php
require_once 'config.php';

if(isset($_GET['code'])) {
    $token = $googleClient->fetchAccessTokenWithAuthCode($_GET['code']);
    
    if(!isset($token['error'])) {
        $googleClient->setAccessToken($token);
        $google_service = new Google_Service_Oauth2($googleClient);
        $data = $google_service->userinfo->get();
        
        // معالجة بيانات المستخدم هنا
        $_SESSION['user_email'] = $data['email'];
        $_SESSION['user_name'] = $data['name'];
        
        header('Location: dashboard.php');
        exit();
    }
}
?>