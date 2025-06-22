// ملف callback.php (أو ما يعادله في مسارك)
$client = new Google_Client();
// ... إعدادات العميل

if(isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    
    if(!isset($token['error'])) {
        // معالجة تسجيل الدخول الناجح
        $client->setAccessToken($token);
        $google_service = new Google_Service_Oauth2($client);
        $user_data = $google_service->userinfo->get();
        
        // ... حفظ بيانات المستخدم في الجلسة/قاعدة البيانات
        header('Location: /dashboard'); // توجيه بعد التسجيل
        exit();
    } else {
        // معالجة الخطأ
        die("Error: " . $token['error']);
    }
}
