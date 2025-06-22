// في مسار /auth/google/callback
$token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
if (!isset($token['error'])) {
    $client->setAccessToken($token);
    $google_service = new Google_Service_Oauth2($client);
    $user = $google_service->userinfo->get();
    
    // معالجة بيانات المستخدم
    $_SESSION['user_email'] = $user->email;
    header('Location: /dashboard');
} else {
    die("Error: " . $token['error']);
}
