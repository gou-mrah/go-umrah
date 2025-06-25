export const ar = {
  superAdmin: {
    title: "لوحة تحكم السوبر أدمن",
    description: "التحكم الشامل: صلاحيات كاملة على المنصة. إدارة المستخدمين، الطلبات والحجوزات، المحتوى والبرامج، الدعم الفني، إعدادات الموقع، الصلاحيات، التقارير والإحصائيات.",
    features: {
      userManagement: "إدارة المستخدمين",
      ordersBookingsManagement: "إدارة الطلبات والحجوزات",
      contentProgramsManagement: "إدارة المحتوى والبرامج",
      technicalSupport: "الدعم الفني",
      siteSettings: "إعدادات الموقع",
      permissionsManagement: "إدارة الصلاحيات",
      reportsStatistics: "التقارير والإحصائيات",
      hotels: "إدارة الفنادق (يدوي/API)",
      flights: "إدارة عروض الطيران (API GDS)",
      train: "إدارة قطار الحرمين (API)",
      visas: "متابعة طلبات التأشيرات",
      transport: "إدارة عروض النقل",
      store: "إدارة المتجر (مخزون، طلبات)"
    },
    siteControlGuide: {
      title: "دليل التحكم بالموقع",
      tabs: {
        providerManagement: "إدارة مقدمي الخدمات",
        contentManagement: "التحكم بمحتوى الموقع",
        advancedControl: "التحكم المتقدم"
      },
      contentManagementIntro: "يمكنك تغيير أي نص تقريبًا على موقع الويب الخاص بك عن طريق تعديل ملفات المحتوى النصية. هذه الملفات موجودة في مجلد `src/lib/content/`. ما عليك سوى فتح الملف وتغيير النص بين علامتي الاقتباس.",
      files: [
        { name: "`general.js`", description: "الاسم العام للموقع، الشعار، ونصوص التذييل." },
        { name: "`navigation.js`", description: "عناوين جميع الروابط في شريط التنقل العلوي والقوائم." },
        { name: "`hero.js`", description: "العنوان الرئيسي والوصف في الصفحة الرئيسية." },
        { name: "`services.js`", description: "عناوين وأوصاف جميع الخدمات المعروضة في الصفحة الرئيسية." },
        { name: "`featuresSection.js`", description: "ميزات 'لماذا تختارنا' مثل الثقة والدعم." },
        { name: "`contact.js`", description: "معلومات الاتصال مثل البريد الإلكتروني والهاتف." },
        { name: "ملفات الصفحات", description: "تحتوي كل صفحة تقريبًا على بيانات نصية خاصة بها (مثل `HajjPackagesPage.jsx`) يمكنك تعديلها مباشرة." }
      ],
      functionalManagementTitle: "الإدارة الوظيفية",
      functionalManagementIntro: "بصفتك المشرف المتميز، لديك سيطرة مباشرة على الوظائف الديناميكية الرئيسية للمنصة:",
      functions: [
        { name: "الموافقة على مقدمي الخدمة", description: "من علامة التبويب 'إدارة مقدمي الخدمات'، يمكنك مراجعة طلبات شركات السياحة الجديدة والموافقة عليها أو رفضها. فقط الشركات المعتمدة يمكنها إضافة باقاتها." },
        { name: "الباقات الديناميكية", description: "بمجرد الموافقة، يمكن لمقدمي الخدمة إضافة باقات العمرة والحج الخاصة بهم من لوحة التحكم الخاصة بهم. ستظهر هذه الباقات تلقائيًا على الموقع لجميع الزوار." }
      ],
      advancedControlTitle: "التحكم المتقدم والمستقبلي",
      advancedControlIntro: "للتغييرات الأكثر تعقيدًا التي تتجاوز تعديل النصوص، أنا هنا للمساعدة. يمكنك طلب:",
      advancedFeatures: [
        { name: "تغييرات في التصميم والتخطيط", description: "تعديل بنية الصفحات أو تصميم مكونات جديدة." },
        { name: "ميزات جديدة", description: "إضافة صفحات جديدة بالكامل أو وظائف مثل نظام المدونات." },
        { name: "تكامل قاعدة البيانات", description: "لتخزين دائم للبيانات، يمكننا دمج خدمات مثل Supabase. هذا مثالي لإدارة المستخدمين، والحجوزات، والبيانات الأخرى بشكل آمن." },
        { name: "تكامل واجهات برمجة التطبيقات (API) التابعة لجهات خارجية", description: "الاتصال بخدمات خارجية للحصول على بيانات حية للرحلات الجوية، والفنادق، وبوابات الدفع." }
      ],
      conclusion: "اطلب أيًا من هذه الميزات المتقدمة في رسالتك التالية!"
    }
  },
  serviceProvider: {
    title: "لوحة تحكم مقدم الخدمة",
    description: "بروفايل التسجيل: رفع المستندات الرسمية (سجل تجاري، رخصة سياحة)، بيانات التواصل، شعار. (التفعيل بعد المراجعة). إدارة الخدمات الخاصة، متابعة الطلبات، تقارير الأداء، إدارة التقييمات. نظام الإعلانات.",
    features: {
      profileRegistration: "بروفايل التسجيل (المستندات)",
      serviceManagement: "إدارة الخدمات الخاصة",
      requestTracking: "متابعة الطلبات",
      performanceReports: "تقارير الأداء",
      reviewManagement: "إدارة التقييمات",
      advertisingSystem: "نظام الإعلانات (مجاني/مدفوع)",
      hajjProgramRegistration: "تسجيل برامج الحج"
    }
  },
  customer: {
    title: "لوحة تحكم العميل",
    description: "إنشاء حساب: عبر منصات التواصل (Google, Facebook, Apple ID, Twitter). التحقق عبر واتساب: رمز OTP عبر واتساب لإكمال الحجز الأول. ملف شخصي، سجل الحجوزات، تتبع الطلبات، المفضلة، التقييمات، الدعم، الإشعارات.",
    features: {
      profileManagement: "ملف شخصي",
      bookingHistory: "سجل الحجوزات",
      orderTracking: "تتبع الطلبات",
      favorites: "المفضلة",
      reviews: "التقييمات",
      support: "الدعم",
      notifications: "الإشعارات",
      whatsappVerification: "التحقق عبر واتساب (للحجز الأول)"
    }
  }
};

export const en = {
  superAdmin: {
    title: "Super Admin Dashboard",
    description: "Total Control: Full authority over the platform. Manage users, orders and bookings, content and programs, technical support, site settings, permissions, reports and statistics.",
    features: {
      userManagement: "User Management",
      ordersBookingsManagement: "Orders & Bookings Management",
      contentProgramsManagement: "Content & Programs Management",
      technicalSupport: "Technical Support",
      siteSettings: "Site Settings",
      permissionsManagement: "Permissions Management",
      reportsStatistics: "Reports & Statistics",
      hotels: "Hotel Management (Manual/API)",
      flights: "Flight Deals Management (GDS API)",
      train: "Haramain Train Management (API)",
      visas: "Visa Application Tracking",
      transport: "Transport Deals Management",
      store: "Store Management (Inventory, Orders)"
    },
    siteControlGuide: {
      title: "Site Control Guide",
      tabs: {
        providerManagement: "Provider Management",
        contentManagement: "Site Content Control",
        advancedControl: "Advanced Control"
      },
      contentManagementIntro: "You can change almost any text on your website by editing simple text content files. These files are located in the `src/lib/content/` folder. Just open the file and change the text inside the quotes.",
      files: [
        { name: "`general.js`", description: "The general site name, tagline, and footer texts." },
        { name: "`navigation.js`", description: "The names for all links in the top navigation bar and menus." },
        { name: "`hero.js`", description: "The main headline and description on the homepage." },
        { name: "`services.js`", description: "Titles and descriptions for all services shown on the homepage." },
        { name: "`featuresSection.js`", description: "The 'Why Choose Us' features like Trust and Support." },
        { name: "`contact.js`", description: "Contact information like email and phone." },
        { name: "Page Files", description: "Almost every page has its own text data (e.g., `HajjPackagesPage.jsx`) that you can edit directly." }
      ],
      functionalManagementTitle: "Functional Management",
      functionalManagementIntro: "As the super admin, you have direct control over key dynamic functions of the platform:",
      functions: [
        { name: "Provider Approval", description: "From the 'Provider Management' tab, you can review and approve or reject new tourism companies. Only approved companies can add their packages." },
        { name: "Dynamic Packages", description: "Once approved, service providers can add their own Umrah and Hajj packages from their dashboard. These will automatically appear on the site for all visitors." }
      ],
      advancedControlTitle: "Advanced & Future Control",
      advancedControlIntro: "For more complex changes that go beyond text edits, I am here to help. You can request:",
      advancedFeatures: [
        { name: "Design & Layout Changes", description: "Modifying the structure of pages or designing new components." },
        { name: "New Features", description: "Adding entirely new pages or functionality like a blog system." },
        { name: "Database Integration", description: "For persistent data storage, we can integrate services like Supabase. This is perfect for securely managing users, bookings, and other data." },
        { name: "Third-party API Integrations", description: "Connecting to external services for live flight data, hotels, and payment gateways." }
      ],
      conclusion: "Request any of these advanced features in your next prompt!"
    }
  },
  serviceProvider: {
    title: "Service Provider Dashboard",
    description: "Registration Profile: Upload official documents (commercial register, tourism license), contact details, logo. (Activation after review). Manage services, track orders, performance reports, manage ratings. Advertising system.",
    features: {
      profileRegistration: "Registration Profile (Documents)",
      serviceManagement: "Manage Services",
      requestTracking: "Track Orders/Bookings",
      performanceReports: "Performance Reports",
      reviewManagement: "Manage Reviews",
      advertisingSystem: "Advertising System (Free/Paid)",
      hajjProgramRegistration: "Register Hajj Programs"
    }
  },
  customer: {
    title: "Customer Dashboard",
    description: "Create Account: Via social platforms (Google, Facebook, Apple ID, Twitter). WhatsApp Verification: OTP via WhatsApp to complete the first booking. Profile, booking history, order tracking, favorites, ratings, support, notifications.",
    features: {
      profileManagement: "Profile Management",
      bookingHistory: "Booking History",
      orderTracking: "Order Tracking",
      favorites: "Favorites",
      reviews: "Reviews",
      support: "Support",
      notifications: "Notifications",
      whatsappVerification: "WhatsApp Verification (for 1st booking)"
    }
  }
};