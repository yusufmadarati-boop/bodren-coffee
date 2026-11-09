/**
 * src/translations.js
 * ═══════════════════════════════════════════════════════════════
 * DATA MODULE — Translation dictionary (EN / AR / TR)
 *
 * ⛔ STRICT RULES:
 *   - Zero DOM access.
 *   - Zero imports.
 *   - Zero event listeners.
 *   - This file is READ-ONLY data. Never mutate at runtime.
 * ═══════════════════════════════════════════════════════════════
 */

/** Languages supported by the app. */
export const SUPPORTED_LANGS = /** @type {const} */ (['en', 'ar', 'tr']);

/** Default fallback language. */
export const DEFAULT_LANG = 'en';

/** Display labels shown on the language-selector buttons. */
export const LANG_LABELS = Object.freeze({
  en: 'EN',
  ar: 'AR',
  tr: 'TR',
});

/**
 * Languages that require RTL document direction.
 * @type {ReadonlySet<string>}
 */
export const RTL_LANGS = new Set(['ar']);

/**
 * Full translation dictionary.
 * Keys are dot-separated identifiers; values are translated strings.
 * {placeholder} tokens are interpolated by i18n.t().
 *
 * @type {Record<string, Record<string, string>>}
 */
export const TRANSLATIONS = {
  /* ═══════════════════ ENGLISH ══════════════════════════════ */
  en: {
    /* Navigation */
    'nav.home':            'Home',
    'nav.shop':            'Shop',
    'nav.about':           'About',
    'nav.quiz':            'Quiz',

    /* Hero */
    'hero.eyebrow':        'Premium Artisan Coffee',
    'hero.title':          'Discover the perfect taste',
    'hero.titleAccent':    'in every sip!',
    'hero.desc':           "Coffee is not just a drink — it's an art. We invite you on a unique culinary journey where every sip is a meeting with impeccable taste.",
    'hero.cta':            'Select Coffee',

    /* Shop controls */
    'shop.title':          'Our Menu',
    'shop.subtitle':       'Handcrafted with passion, served with love',
    'shop.searchPlaceholder': 'Search drinks…',
    'shop.sortDefault':    'Default',
    'shop.sortAsc':        'Price: Low → High',
    'shop.sortDesc':       'Price: High → Low',
    'shop.addToCart':      'Add to Cart',
    'shop.emptyState':     'No drinks found. Try a different search.',

    /* Category chips */
    'cat.All':       'All',
    'cat.Espresso':  'Espresso',
    'cat.Latte':     'Latte',
    'cat.Specialty': 'Specialty',
    'cat.Cold':      'Cold',

    /* Product badges */
    'badge.Popular': 'Popular',
    'badge.New':     'New',

    /* Cart drawer */
    'cart.title':       'Your Cart',
    'cart.emptyTitle':  'Your cart is empty.',
    'cart.emptyHint':   'Add a drink to get started!',
    'cart.totalLabel':  'Total',
    'cart.clearCart':   'Clear Cart',
    'cart.checkout':    'Checkout',
    'cart.each':        '₽ each',
    'cart.openLabel':   'Open cart',
    'cart.closeLabel':  'Close cart',

    /* About section */
    'about.title':         'BODREN is',
    'about.card1.title':   'High Quality Beans',
    'about.card1.text':    'We source only single-origin, specialty-grade beans from the finest estates across Ethiopia, Colombia and Guatemala.',
    'about.card2.title':   'Individual Approach',
    'about.card2.text':    'Every order is personal. Our baristas craft each cup to your exact taste — strength, milk, temperature, everything.',
    'about.card3.title':   'Cozy Atmosphere',
    'about.card3.text':    'Warm lighting, curated music, and thoughtful interiors create the perfect space to work, meet friends, or simply unwind.',
    'about.card4.title':   'Professional Baristas',
    'about.card4.text':    'Our award-winning team trains rigorously. Each barista is a certified specialist dedicated to coffee excellence.',

    /* Quiz chrome */
    'quiz.eyebrow':      'Coffee Finder',
    'quiz.mainTitle':    'Discover which coffee fits you best',
    'quiz.startBtn':     'Take the Quiz →',
    'quiz.resultLabel':  'Your perfect match is',
    'quiz.retakeBtn':    'Retake Quiz',
    'quiz.progress':     'Question {current} of {total}',

    /* Quiz questions & options */
    'quiz.q1.question': 'How do you like your coffee strength?',
    'quiz.q1.opt1':     'Light & mild',
    'quiz.q1.opt2':     'Balanced',
    'quiz.q1.opt3':     'Bold & intense',
    'quiz.q1.opt4':     'Extra strong',

    'quiz.q2.question': 'What flavor notes do you enjoy most?',
    'quiz.q2.opt1':     'Creamy & sweet',
    'quiz.q2.opt2':     'Chocolatey',
    'quiz.q2.opt3':     'Earthy & green',
    'quiz.q2.opt4':     'Spiced & warm',

    'quiz.q3.question': 'What time of day are you having coffee?',
    'quiz.q3.opt1':     'Morning kick-start',
    'quiz.q3.opt2':     'Lazy morning',
    'quiz.q3.opt3':     'Afternoon pick-me-up',
    'quiz.q3.opt4':     'Any time!',

    /* Quiz result descriptions (key = lowercase product name, spaces → _) */
    'quiz.result.latte':             'Smooth, creamy, and comforting — perfect for a gentle coffee experience.',
    'quiz.result.cappuccino':        'A timeless Italian classic with the perfect balance of espresso and velvety foam.',
    'quiz.result.espresso':          'Pure, concentrated intensity — for those who mean serious business.',
    'quiz.result.cold_brew':         'Ultra-smooth and naturally sweet cold concentrate. Zero acidity, maximum flavour.',
    'quiz.result.caramel_macchiato': 'Sweet, silky, and indulgent — a dessert in a cup.',
    'quiz.result.mocha':             'Rich espresso meets chocolate. The best of both worlds.',
    'quiz.result.matcha_latte':      'Earthy, vibrant, and energising — a mindful alternative to coffee.',
    'quiz.result.chai_latte':        'Warm spices and creamy milk — cozy comfort in every sip.',
    'quiz.result.flat_white':        'Stronger than a latte, smoother than a cappuccino. Perfectly balanced.',
    'quiz.result.iced_latte':        'Chilled espresso over ice. Refreshingly simple.',
    'quiz.result.cortado':           'Equal parts espresso and milk — bold yet perfectly mellowed.',
    'quiz.result.americano':         'Bold double espresso diluted to a long, clean, satisfying cup.',
    'quiz.result.default':           'A wonderful coffee choice — enjoy every sip!',

    /* Footer */
    'footer.tagline':  'Artisan Coffee & Specialty Drinks',
    'footer.menu':     'Menu',
    'footer.about':    'About',
    'footer.quiz':     'Quiz',
    'footer.copy':     '© 2026 BODREN. All rights reserved.',

    /* Lang selector */
    'lang.label': 'Choose language',
  },

  /* ═══════════════════ ARABIC ════════════════════════════════ */
  ar: {
    /* Navigation */
    'nav.home':  'الرئيسية',
    'nav.shop':  'القائمة',
    'nav.about': 'من نحن',
    'nav.quiz':  'الاختبار',

    /* Hero */
    'hero.eyebrow':     'قهوة أرتيزانية فاخرة',
    'hero.title':       'اكتشف النكهة المثالية',
    'hero.titleAccent': 'في كل رشفة!',
    'hero.desc':        'القهوة ليست مجرد مشروب — إنها فن. ندعوك في رحلة طهوية فريدة حيث تكون كل رشفة لقاءً مع طعم لا يُضاهى.',
    'hero.cta':         'اختر قهوتك',

    /* Shop controls */
    'shop.title':            'قائمتنا',
    'shop.subtitle':         'مصنوعة بشغف، تُقدَّم بمحبة',
    'shop.searchPlaceholder': 'ابحث عن مشروب...',
    'shop.sortDefault':      'افتراضي',
    'shop.sortAsc':          'السعر: من الأقل إلى الأعلى',
    'shop.sortDesc':         'السعر: من الأعلى إلى الأقل',
    'shop.addToCart':        'أضف للسلة',
    'shop.emptyState':       'لم يُعثر على مشروبات. جرِّب بحثًا مختلفًا.',

    /* Category chips */
    'cat.All':       'الكل',
    'cat.Espresso':  'إسبريسو',
    'cat.Latte':     'لاتيه',
    'cat.Specialty': 'متخصص',
    'cat.Cold':      'بارد',

    /* Product badges */
    'badge.Popular': 'الأكثر طلبًا',
    'badge.New':     'جديد',

    /* Cart drawer */
    'cart.title':      'سلة المشتريات',
    'cart.emptyTitle': 'سلتك فارغة.',
    'cart.emptyHint':  'أضف مشروبًا للبدء!',
    'cart.totalLabel': 'الإجمالي',
    'cart.clearCart':  'إفراغ السلة',
    'cart.checkout':   'الدفع',
    'cart.each':       '₽ للوحدة',
    'cart.openLabel':  'فتح سلة المشتريات',
    'cart.closeLabel': 'إغلاق سلة المشتريات',

    /* About section */
    'about.title':       'BODREN هي',
    'about.card1.title': 'حبوب عالية الجودة',
    'about.card1.text':  'نستورد حبوبًا من أصول واحدة وذات جودة متخصصة من أفضل المزارع في إثيوبيا وكولومبيا وغواتيمالا.',
    'about.card2.title': 'نهج فردي',
    'about.card2.text':  'كل طلب شخصي. يصنع باريستا لدينا كل كوب وفقًا لذوقك الدقيق — القوة والحليب ودرجة الحرارة وكل شيء.',
    'about.card3.title': 'أجواء دافئة ومريحة',
    'about.card3.text':  'إضاءة دافئة وموسيقى منتقاة وديكورات مدروسة تخلق المكان المثالي للعمل ولقاء الأصدقاء أو الاسترخاء.',
    'about.card4.title': 'باريستا محترف',
    'about.card4.text':  'فريقنا الحائز على جوائز يتدرب باستمرار. كل باريستا متخصص معتمد مكرَّس لتميُّز القهوة.',

    /* Quiz chrome */
    'quiz.eyebrow':     'مكتشف القهوة',
    'quiz.mainTitle':   'اكتشف أيّ قهوة تناسبك أكثر',
    'quiz.startBtn':    '← ابدأ الاختبار',
    'quiz.resultLabel': 'قهوتك المثالية هي',
    'quiz.retakeBtn':   'إعادة الاختبار',
    'quiz.progress':    'السؤال {current} من {total}',

    /* Quiz Q1 */
    'quiz.q1.question': 'كيف تفضل قوة قهوتك؟',
    'quiz.q1.opt1':     'خفيفة وناعمة',
    'quiz.q1.opt2':     'متوازنة',
    'quiz.q1.opt3':     'قوية ومركزة',
    'quiz.q1.opt4':     'قوية جدًا',

    /* Quiz Q2 */
    'quiz.q2.question': 'ما النكهات التي تستمتع بها أكثر؟',
    'quiz.q2.opt1':     'كريمية وحلوة',
    'quiz.q2.opt2':     'شوكولاتة',
    'quiz.q2.opt3':     'ترابية وخضراء',
    'quiz.q2.opt4':     'متبلة ودافئة',

    /* Quiz Q3 */
    'quiz.q3.question': 'في أيّ وقت من اليوم تشرب القهوة؟',
    'quiz.q3.opt1':     'انطلاقة الصباح',
    'quiz.q3.opt2':     'صباح هادئ',
    'quiz.q3.opt3':     'منتصف النهار',
    'quiz.q3.opt4':     'في أيّ وقت!',

    /* Quiz results */
    'quiz.result.latte':             'ناعم وكريمي ومريح — مثالي لمن يستمتع بتجربة قهوة لطيفة.',
    'quiz.result.cappuccino':        'كلاسيكية إيطالية خالدة بالتوازن المثالي بين الإسبريسو والرغوة المخملية.',
    'quiz.result.espresso':          'كثافة نقية ومركزة — لمن يأخذ القهوة بجدية.',
    'quiz.result.cold_brew':         'مركز بارد فائق النعومة وحلو بشكل طبيعي. صفر حموضة وأقصى نكهة.',
    'quiz.result.caramel_macchiato': 'حلو وحريري ومنغمس — حلوى في كوب.',
    'quiz.result.mocha':             'إسبريسو غني يلتقي بالشوكولاتة. أفضل العالمين.',
    'quiz.result.matcha_latte':      'ترابي ونابض بالحياة ومنشط — بديل واعٍ للقهوة.',
    'quiz.result.chai_latte':        'توابل دافئة وحليب كريمي — راحة ناعمة في كل رشفة.',
    'quiz.result.flat_white':        'أقوى من اللاتيه وأنعم من الكابتشينو. متوازن تمامًا.',
    'quiz.result.iced_latte':        'إسبريسو بارد فوق الثلج. منعش وبسيط.',
    'quiz.result.cortado':           'أجزاء متساوية من الإسبريسو والحليب — جريء ومتناسق.',
    'quiz.result.americano':         'إسبريسو مزدوج مخفف لكوب طويل ونظيف ومُرضٍ.',
    'quiz.result.default':           'اختيار قهوة رائع — استمتع بكل رشفة!',

    /* Footer */
    'footer.tagline': 'قهوة أرتيزانية ومشروبات متخصصة',
    'footer.menu':    'القائمة',
    'footer.about':   'من نحن',
    'footer.quiz':    'الاختبار',
    'footer.copy':    '© 2026 BODREN. جميع الحقوق محفوظة.',

    /* Lang selector */
    'lang.label': 'اختر اللغة',
  },

  /* ═══════════════════ TURKISH ═══════════════════════════════ */
  tr: {
    /* Navigation */
    'nav.home':  'Anasayfa',
    'nav.shop':  'Mağaza',
    'nav.about': 'Hakkımızda',
    'nav.quiz':  'Test',

    /* Hero */
    'hero.eyebrow':     'Premium El Yapımı Kahve',
    'hero.title':       'Her yudumda mükemmel tadı',
    'hero.titleAccent': 'keşfedin!',
    'hero.desc':        "Kahve sadece bir içecek değil — bir sanattır. Sizi her yudumun kusursuz bir tatla buluştuğu eşsiz bir mutfak yolculuğuna davet ediyoruz.",
    'hero.cta':         'Kahve Seç',

    /* Shop controls */
    'shop.title':            'Menümüz',
    'shop.subtitle':         'Tutku ile hazırlanmış, sevgiyle sunulmuştur',
    'shop.searchPlaceholder': 'İçecek ara…',
    'shop.sortDefault':      'Varsayılan',
    'shop.sortAsc':          'Fiyat: Düşükten Yükseğe',
    'shop.sortDesc':         'Fiyat: Yüksekten Düşüğe',
    'shop.addToCart':        'Sepete Ekle',
    'shop.emptyState':       'İçecek bulunamadı. Farklı bir arama deneyin.',

    /* Category chips */
    'cat.All':       'Tümü',
    'cat.Espresso':  'Espresso',
    'cat.Latte':     'Latte',
    'cat.Specialty': 'Özel',
    'cat.Cold':      'Soğuk',

    /* Product badges */
    'badge.Popular': 'Popüler',
    'badge.New':     'Yeni',

    /* Cart drawer */
    'cart.title':      'Sepetiniz',
    'cart.emptyTitle': 'Sepetiniz boş.',
    'cart.emptyHint':  'Başlamak için bir içecek ekleyin!',
    'cart.totalLabel': 'Toplam',
    'cart.clearCart':  'Sepeti Temizle',
    'cart.checkout':   'Ödeme',
    'cart.each':       '₽ / adet',
    'cart.openLabel':  'Sepeti aç',
    'cart.closeLabel': 'Sepeti kapat',

    /* About section */
    'about.title':       'BODREN şudur',
    'about.card1.title': 'Yüksek Kaliteli Çekirdekler',
    'about.card1.text':  "Etiyopya, Kolombiya ve Guatemala'daki en iyi çiftliklerden yalnızca tek kökenli, özel kalitede çekirdekler tedarik ediyoruz.",
    'about.card2.title': 'Bireysel Yaklaşım',
    'about.card2.text':  'Her sipariş kişiseldir. Baristalarımız her fincanı tam damak zevkinize göre hazırlar — sertlik, süt, sıcaklık, her şey.',
    'about.card3.title': 'Sıcak Atmosfer',
    'about.card3.text':  'Sıcak aydınlatma, özenle seçilmiş müzik ve düşünceli iç mekanlar çalışmak, arkadaşlarla buluşmak ya da dinlenmek için mükemmel bir ortam yaratır.',
    'about.card4.title': 'Profesyonel Baristalar',
    'about.card4.text':  'Ödüllü ekibimiz titizlikle eğitim alır. Her barista, kahve mükemmeliyetine adanmış sertifikalı bir uzmandır.',

    /* Quiz chrome */
    'quiz.eyebrow':     'Kahve Bulucu',
    'quiz.mainTitle':   'Size en uygun kahveyi keşfedin',
    'quiz.startBtn':    'Teste Başla →',
    'quiz.resultLabel': 'Mükemmel eşleşmeniz',
    'quiz.retakeBtn':   'Testi Tekrarla',
    'quiz.progress':    'Soru {current} / {total}',

    /* Quiz Q1 */
    'quiz.q1.question': 'Kahvenizin gücünü nasıl seversiniz?',
    'quiz.q1.opt1':     'Hafif ve yumuşak',
    'quiz.q1.opt2':     'Dengeli',
    'quiz.q1.opt3':     'Bold ve yoğun',
    'quiz.q1.opt4':     'Ekstra güçlü',

    /* Quiz Q2 */
    'quiz.q2.question': 'En çok hangi tat notalarını seviyorsunuz?',
    'quiz.q2.opt1':     'Kremalı ve tatlı',
    'quiz.q2.opt2':     'Çikolatalı',
    'quiz.q2.opt3':     'Toprak ve yeşil',
    'quiz.q2.opt4':     'Baharatlı ve sıcak',

    /* Quiz Q3 */
    'quiz.q3.question': 'Kahvenizi günün hangi saatinde içiyorsunuz?',
    'quiz.q3.opt1':     'Sabah enerjisi',
    'quiz.q3.opt2':     'Yavaş sabah',
    'quiz.q3.opt3':     'Öğle arası',
    'quiz.q3.opt4':     'Her zaman!',

    /* Quiz results */
    'quiz.result.latte':             'Pürüzsüz, kremalı ve rahatlatıcı — nazik bir kahve deneyimini sevenler için mükemmel.',
    'quiz.result.cappuccino':        'Espresso ve kadifemsi köpüğün mükemmel dengesiyle zamansız bir İtalyan klasiği.',
    'quiz.result.espresso':          'Saf, yoğun yoğunluk — işi ciddiye alanlar için.',
    'quiz.result.cold_brew':         'Ultra pürüzsüz ve doğal olarak tatlı soğuk konsantre. Sıfır asidite, maksimum lezzet.',
    'quiz.result.caramel_macchiato': 'Tatlı, ipeksi ve lüks — bir bardakta tatlı.',
    'quiz.result.mocha':             'Zengin espresso çikolatası ile buluşuyor. İki dünyanın en iyisi.',
    'quiz.result.matcha_latte':      'Toprak, canlı ve enerji verici — kahveye bilinçli bir alternatif.',
    'quiz.result.chai_latte':        'Sıcak baharatlar ve kremalı süt — her yudumda sıcak konfor.',
    'quiz.result.flat_white':        "Latte'den güçlü, cappuccino'dan pürüzsüz. Mükemmel dengeli.",
    'quiz.result.iced_latte':        'Buz üzerinde soğutulmuş espresso. Ferahlatıcı ve sade.',
    'quiz.result.cortado':           'Eşit parça espresso ve süt — güçlü ama mükemmel yumuşatılmış.',
    'quiz.result.americano':         'Uzun, temiz ve doyurucu bir kupa için sulandırılmış çift espresso.',
    'quiz.result.default':           'Harika bir kahve seçimi — her yudumun tadını çıkarın!',

    /* Footer */
    'footer.tagline': 'El Yapımı Kahve ve Özel İçecekler',
    'footer.menu':    'Menü',
    'footer.about':   'Hakkımızda',
    'footer.quiz':    'Test',
    'footer.copy':    '© 2026 BODREN. Tüm hakları saklıdır.',

    /* Lang selector */
    'lang.label': 'Dil seçin',
  },
};
