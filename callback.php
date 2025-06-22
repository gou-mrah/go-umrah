// في مسار /auth/google/callback
$client = new Google_Client();
// ... التكوين السابق

if(isset($_GET['code'])) {
    try {
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
        $client->setAccessToken($token);
        
        $oauth = new Google_Service_Oauth2($client);
        $user = $oauth->userinfo->get();
        
        // معالجة بيانات المستخدم
        $_SESSION['google_user'] = [
            'email' => $user->email,
            'name' => $user->name
        ];
        
        header('Location: /dashboard');
    } catch(Exception $e) {
        // تسجيل الخطأ
        error_log('Google Auth Error: '.$e->getMessage());
        header('Location: /login?error=google_auth_failed');
    }
}
