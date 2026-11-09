/**
 * src/translations.ts
 * ═══════════════════════════════════════════════════════════════
 * DATA MODULE — Translation Dictionaries (EN / AR / TR)
 *
 * Single source of truth for all UI strings and product content.
 * Pure data. No DOM, no logic.
 * ═══════════════════════════════════════════════════════════════
 */

import { LanguageCode } from './types.js';

export const SUPPORTED_LANGS: readonly LanguageCode[] = ['en', 'ar', 'tr'];
export const DEFAULT_LANG: LanguageCode = 'en';

export const LANG_LABELS: Record<LanguageCode, string> = {
  en: 'EN',
  ar: 'AR',
  tr: 'TR',
};

export const RTL_LANGS: ReadonlySet<LanguageCode> = new Set<LanguageCode>(['ar']);

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.quiz': 'Quiz',

    'hero.eyebrow': 'Premium Artisan Coffee',
    'hero.title': 'Discover the perfect taste',
    'hero.titleAccent': 'in every sip!',
    'hero.desc':
      "Coffee is not just a drink — it's an art. We invite you on a unique culinary journey where every sip is a meeting with impeccable taste.",
    'hero.cta': 'Select Coffee',

    'shop.title': 'Our Menu',
    'shop.subtitle': 'Handcrafted with passion, served with love',
    'shop.searchPlaceholder': 'Search drinks…',
    'shop.sortDefault': 'Default',
    'shop.sortAsc': 'Price: Low → High',
    'shop.sortDesc': 'Price: High → Low',
    'shop.addToCart': 'Add to Cart',
    'shop.emptyState': 'No drinks found. Try a different search.',

    'cat.All': 'All',
    'cat.Espresso': 'Espresso',
    'cat.Latte': 'Latte',
    'cat.Specialty': 'Specialty',
    'cat.Cold': 'Cold',

    'badge.Popular': 'Popular',
    'badge.New': 'New',

    'cart.title': 'Your Cart',
    'cart.emptyTitle': 'Your cart is empty.',
    'cart.emptyHint': 'Add a drink to get started!',
    'cart.totalLabel': 'Total',
    'cart.clearCart': 'Clear Cart',
    'cart.checkout': 'Checkout',
    'cart.each': '₽ each',
    'cart.openLabel': 'Open cart',
    'cart.closeLabel': 'Close cart',

    'about.title': 'BODREN is',
    'about.card1.title': 'High Quality Beans',
    'about.card1.text':
      'We source only single-origin, specialty-grade beans from the finest estates across Ethiopia, Colombia and Guatemala.',
    'about.card2.title': 'Individual Approach',
    'about.card2.text':
      'Every order is personal. Our baristas craft each cup to your exact taste — strength, milk, temperature, everything.',
    'about.card3.title': 'Cozy Atmosphere',
    'about.card3.text':
      'Warm lighting, curated music, and thoughtful interiors create the perfect space to work, meet friends, or simply unwind.',
    'about.card4.title': 'Professional Baristas',
    'about.card4.text':
      'Our award-winning team trains rigorously. Each barista is a certified specialist dedicated to coffee excellence.',

    'quiz.eyebrow': 'Coffee Finder',
    'quiz.mainTitle': 'Discover which coffee fits you best',
    'quiz.startBtn': 'Take the Quiz →',
    'quiz.resultLabel': 'Your perfect match is',
    'quiz.retakeBtn': 'Retake Quiz',
    'quiz.progress': 'Question {current} of {total}',

    'quiz.q1.question': 'How do you like your coffee strength?',
    'quiz.q1.opt1': 'Light & mild',
    'quiz.q1.opt2': 'Balanced',
    'quiz.q1.opt3': 'Bold & intense',
    'quiz.q1.opt4': 'Extra strong',

    'quiz.q2.question': 'What flavor notes do you enjoy most?',
    'quiz.q2.opt1': 'Creamy & sweet',
    'quiz.q2.opt2': 'Chocolatey',
    'quiz.q2.opt3': 'Earthy & green',
    'quiz.q2.opt4': 'Spiced & warm',

    'quiz.q3.question': 'What time of day are you having coffee?',
    'quiz.q3.opt1': 'Morning kick-start',
    'quiz.q3.opt2': 'Lazy morning',
    'quiz.q3.opt3': 'Afternoon pick-me-up',
    'quiz.q3.opt4': 'Any time!',

    'quiz.result.latte': 'Smooth, creamy, and comforting — perfect for a gentle coffee experience.',
    'quiz.result.cappuccino':
      'A timeless Italian classic with the perfect balance of espresso and velvety foam.',
    'quiz.result.espresso': 'Pure, concentrated intensity — for those who mean serious business.',
    'quiz.result.cold_brew':
      'Ultra-smooth and naturally sweet cold concentrate. Zero acidity, maximum flavour.',
    'quiz.result.caramel_macchiato': 'Sweet, silky, and indulgent — a dessert in a cup.',
    'quiz.result.mocha': 'Rich espresso meets chocolate. The best of both worlds.',
    'quiz.result.matcha_latte':
      'Earthy, vibrant, and energising — a mindful alternative to coffee.',
    'quiz.result.chai_latte': 'Warm spices and creamy milk — cozy comfort in every sip.',
    'quiz.result.flat_white':
      'Stronger than a latte, smoother than a cappuccino. Perfectly balanced.',
    'quiz.result.iced_latte': 'Chilled espresso over ice. Refreshingly simple.',
    'quiz.result.cortado': 'Equal parts espresso and milk — bold yet perfectly mellowed.',
    'quiz.result.americano': 'Bold double espresso diluted to a long, clean, satisfying cup.',
    'quiz.result.default': 'A wonderful coffee choice — enjoy every sip!',

    'footer.tagline': 'Artisan Coffee & Specialty Drinks',
    'footer.menu': 'Menu',
    'footer.about': 'About',
    'footer.quiz': 'Quiz',
    'footer.copy': '© 2026 BODREN. All rights reserved.',
    'lang.label': 'Choose language',

    'prod.1.name': 'Cappuccino',
    'prod.1.desc': 'Rich espresso with velvety steamed milk foam. Classic Italian perfection.',
    'prod.2.name': 'Latte',
    'prod.2.desc': 'Smooth espresso blended with creamy steamed milk. Soft and satisfying.',
    'prod.3.name': 'Mocha',
    'prod.3.desc': 'Espresso meets rich chocolate sauce topped with whipped cream.',
    'prod.4.name': 'Americano',
    'prod.4.desc': 'Bold double espresso diluted with hot water for a long, clean cup.',
    'prod.5.name': 'Flat White',
    'prod.5.desc': 'Concentrated espresso with microfoam milk. Stronger than a latte.',
    'prod.6.name': 'Cold Brew',
    'prod.6.desc': 'Steeped 18 hours in cold water for an ultra-smooth, low-acidity concentrate.',
    'prod.7.name': 'Matcha Latte',
    'prod.7.desc': 'Ceremonial-grade Japanese matcha whisked with oat milk. Earthy and refreshing.',
    'prod.8.name': 'Espresso',
    'prod.8.desc': 'A single, perfectly pulled shot of intense, aromatic espresso.',
    'prod.9.name': 'Caramel Macchiato',
    'prod.9.desc': 'Vanilla syrup, steamed milk, espresso, and silky caramel drizzle.',
    'prod.10.name': 'Iced Latte',
    'prod.10.desc': 'Espresso poured over ice with cold milk. Chilled and refreshing.',
    'prod.11.name': 'Cortado',
    'prod.11.desc': 'Equal parts espresso and warm milk. Bold yet balanced.',
    'prod.12.name': 'Chai Latte',
    'prod.12.desc': 'Spiced black tea concentrate blended with creamy steamed oat milk.',
  },

  ar: {
    'nav.home': 'الرئيسية',
    'nav.shop': 'القائمة',
    'nav.about': 'من نحن',
    'nav.quiz': 'الاختبار',

    'hero.eyebrow': 'قهوة أرتيزانية فاخرة',
    'hero.title': 'اكتشف النكهة المثالية',
    'hero.titleAccent': 'في كل رشفة!',
    'hero.desc':
      'القهوة ليست مجرد مشروب — إنها فن. ندعوك في رحلة طهوية فريدة حيث تكون كل رشفة لقاءً مع طعم لا يُضاهى.',
    'hero.cta': 'اختر قهوتك',

    'shop.title': 'قائمتنا',
    'shop.subtitle': 'مصنوعة بشغف، تُقدَّم بمحبة',
    'shop.searchPlaceholder': 'ابحث عن مشروب...',
    'shop.sortDefault': 'افتراضي',
    'shop.sortAsc': 'السعر: من الأقل إلى الأعلى',
    'shop.sortDesc': 'السعر: من الأعلى إلى الأقل',
    'shop.addToCart': 'أضف للسلة',
    'shop.emptyState': 'لم يُعثر على مشروبات. جرِّب بحثًا مختلفًا.',

    'cat.All': 'الكل',
    'cat.Espresso': 'إسبريسو',
    'cat.Latte': 'لاتيه',
    'cat.Specialty': 'متخصص',
    'cat.Cold': 'بارد',

    'badge.Popular': 'الأكثر طلبًا',
    'badge.New': 'جديد',

    'cart.title': 'سلة المشتريات',
    'cart.emptyTitle': 'سلتك فارغة.',
    'cart.emptyHint': 'أضف مشروبًا للبدء!',
    'cart.totalLabel': 'الإجمالي',
    'cart.clearCart': 'إفراغ السلة',
    'cart.checkout': 'الدفع',
    'cart.each': '₽ للوحدة',
    'cart.openLabel': 'فتح سلة المشتريات',
    'cart.closeLabel': 'إغلاق سلة المشتريات',

    'about.title': 'BODREN هي',
    'about.card1.title': 'حبوب عالية الجودة',
    'about.card1.text':
      'نستورد حبوبًا من أصول واحدة وذات جودة متخصصة من أفضل المزارع في إثيوبيا وكولومبيا وغواتيمالا.',
    'about.card2.title': 'نهج فردي',
    'about.card2.text':
      'كل طلب شخصي. يصنع باريستا لدينا كل كوب وفقًا لذوقك الدقيق — القوة والحليب ودرجة الحرارة وكل شيء.',
    'about.card3.title': 'أجواء دافئة ومريحة',
    'about.card3.text':
      'إضاءة دافئة وموسيقى منتقاة وديكورات مدروسة تخلق المكان المثالي للعمل ولقاء الأصدقاء أو الاسترخاء.',
    'about.card4.title': 'باريستا محترف',
    'about.card4.text':
      'فريقنا الحائز على جوائز يتدرب باستمرار. كل باريستا متخصص معتمد مكرَّس لتميُّز القهوة.',

    'quiz.eyebrow': 'مكتشف القهوة',
    'quiz.mainTitle': 'اكتشف أيّ قهوة تناسبك أكثر',
    'quiz.startBtn': '← ابدأ الاختبار',
    'quiz.resultLabel': 'قهوتك المثالية هي',
    'quiz.retakeBtn': 'إعادة الاختبار',
    'quiz.progress': 'السؤال {current} من {total}',

    'quiz.q1.question': 'كيف تفضل قوة قهوتك؟',
    'quiz.q1.opt1': 'خفيفة وناعمة',
    'quiz.q1.opt2': 'متوازنة',
    'quiz.q1.opt3': 'قوية ومركزة',
    'quiz.q1.opt4': 'قوية جدًا',

    'quiz.q2.question': 'ما النكهات التي تستمتع بها أكثر؟',
    'quiz.q2.opt1': 'كريمية وحلوة',
    'quiz.q2.opt2': 'شوكولاتة',
    'quiz.q2.opt3': 'ترابية وخضراء',
    'quiz.q2.opt4': 'متبلة ودافئة',

    'quiz.q3.question': 'في أيّ وقت من اليوم تشرب القهوة؟',
    'quiz.q3.opt1': 'انطلاقة الصباح',
    'quiz.q3.opt2': 'صباح هادئ',
    'quiz.q3.opt3': 'منتصف النهار',
    'quiz.q3.opt4': 'في أيّ وقت!',

    'quiz.result.latte': 'ناعم وكريمي ومريح — مثالي لمن يستمتع بتجربة قهوة لطيفة.',
    'quiz.result.cappuccino':
      'كلاسيكية إيطالية خالدة بالتوازن المثالي بين الإسبريسو والرغوة المخملية.',
    'quiz.result.espresso': 'كثافة نقية ومركزة — لمن يأخذ القهوة بجدية.',
    'quiz.result.cold_brew': 'مركز بارد فائق النعومة وحلو بشكل طبيعي. صفر حموضة وأقصى نكهة.',
    'quiz.result.caramel_macchiato': 'حلو وحريري ومنغمس — حلوى في كوب.',
    'quiz.result.mocha': 'إسبريسو غني يلتقي بالشوكولاتة. أفضل العالمين.',
    'quiz.result.matcha_latte': 'ترابي ونابض بالحياة ومنشط — بديل واعٍ للقهوة.',
    'quiz.result.chai_latte': 'توابل دافئة وحليب كريمي — راحة ناعمة في كل رشفة.',
    'quiz.result.flat_white': 'أقوى من اللاتيه وأنعم من الكابتشينو. متوازن تمامًا.',
    'quiz.result.iced_latte': 'إسبريسو بارد فوق الثلج. منعش وبسيط.',
    'quiz.result.cortado': 'أجزاء متساوية من الإسبريسو والحليب — جريء ومتناسق.',
    'quiz.result.americano': 'إسبريسو مزدوج مخفف لكوب طويل ونظيف ومُرضٍ.',
    'quiz.result.default': 'اختيار قهوة رائع — استمتع بكل رشفة!',

    'footer.tagline': 'قهوة أرتيزانية ومشروبات متخصصة',
    'footer.menu': 'القائمة',
    'footer.about': 'من نحن',
    'footer.quiz': 'الاختبار',
    'footer.copy': '© 2026 BODREN. جميع الحقوق محفوظة.',
    'lang.label': 'اختر اللغة',

    'prod.1.name': 'كابتشينو',
    'prod.1.desc': 'إسبريسو غني مع رغوة حليب مخملية مبخرة. كمال إيطالي كلاسيكي.',
    'prod.2.name': 'لاتيه',
    'prod.2.desc': 'إسبريسو ناعم ممزوج بحليب مبخر كريمي. لطيف ومُرضٍ.',
    'prod.3.name': 'موكا',
    'prod.3.desc': 'إسبريسو يلتقي بصلصة الشوكولاتة الغنية مغطى بالكريمة المخفوقة.',
    'prod.4.name': 'أمريكانو',
    'prod.4.desc': 'إسبريسو مزدوج قوي مخفف بالماء الساخن لكوب طويل ونظيف.',
    'prod.5.name': 'فلات وايت',
    'prod.5.desc': 'إسبريسو مركز مع رغوة حليب دقيقة. أقوى من اللاتيه.',
    'prod.6.name': 'كولد برو',
    'prod.6.desc': 'منقوع 18 ساعة في الماء البارد لمركز فائق النعومة ومنخفض الحموضة.',
    'prod.7.name': 'ماتشا لاتيه',
    'prod.7.desc': 'ماتشا يابانية احتفالية مخفوقة بحليب الشوفان. ترابية ومنعشة.',
    'prod.8.name': 'إسبريسو',
    'prod.8.desc': 'جرعة واحدة مسحوبة بدقة من الإسبريسو المركز والعطري.',
    'prod.9.name': 'كراميل ماكياتو',
    'prod.9.desc': 'شراب الفانيليا، حليب مبخر، إسبريسو، ولمسة كراميل حريرية.',
    'prod.10.name': 'آيس لاتيه',
    'prod.10.desc': 'إسبريسو يسكب فوق الثلج مع الحليب البارد. منعش ومبرد.',
    'prod.11.name': 'كورتادو',
    'prod.11.desc': 'أجزاء متساوية من الإسبريسو والحليب الدافئ. قوي ومتوازن.',
    'prod.12.name': 'تشاي لاتيه',
    'prod.12.desc': 'مركز الشاي الأسود المتبل ممزوج بحليب الشوفان المبخر الكريمي.',
  },

  tr: {
    'nav.home': 'Anasayfa',
    'nav.shop': 'Mağaza',
    'nav.about': 'Hakkımızda',
    'nav.quiz': 'Test',

    'hero.eyebrow': 'Premium El Yapımı Kahve',
    'hero.title': 'Her yudumda mükemmel tadı',
    'hero.titleAccent': 'keşfedin!',
    'hero.desc':
      'Kahve sadece bir içecek değil — bir sanattır. Sizi her yudumun kusursuz bir tatla buluştuğu eşsiz bir mutfak yolculuğuna davet ediyoruz.',
    'hero.cta': 'Kahve Seç',

    'shop.title': 'Menümüz',
    'shop.subtitle': 'Tutku ile hazırlanmış, sevgiyle sunulmuştur',
    'shop.searchPlaceholder': 'İçecek ara…',
    'shop.sortDefault': 'Varsayılan',
    'shop.sortAsc': 'Fiyat: Düşükten Yükseğe',
    'shop.sortDesc': 'Fiyat: Yüksekten Düşüğe',
    'shop.addToCart': 'Sepete Ekle',
    'shop.emptyState': 'İçecek bulunamadı. Farklı bir arama deneyin.',

    'cat.All': 'Tümü',
    'cat.Espresso': 'Espresso',
    'cat.Latte': 'Latte',
    'cat.Specialty': 'Özel',
    'cat.Cold': 'Soğuk',

    'badge.Popular': 'Popüler',
    'badge.New': 'Yeni',

    'cart.title': 'Sepetiniz',
    'cart.emptyTitle': 'Sepetiniz boş.',
    'cart.emptyHint': 'Başlamak için bir içecek ekleyin!',
    'cart.totalLabel': 'Toplam',
    'cart.clearCart': 'Sepeti Temizle',
    'cart.checkout': 'Ödeme',
    'cart.each': '₽ / adet',
    'cart.openLabel': 'Sepeti aç',
    'cart.closeLabel': 'Sepeti kapat',

    'about.title': 'BODREN şudur',
    'about.card1.title': 'Yüksek Kaliteli Çekirdekler',
    'about.card1.text':
      "Etiyopya, Kolombiya ve Guatemala'daki en iyi çiftliklerden yalnızca tek kökenli, özel kalitede çekirdekler tedarik ediyoruz.",
    'about.card2.title': 'Bireysel Yaklaşım',
    'about.card2.text':
      'Her sipariş kişiseldir. Baristalarımız her fincanı tam damak zevkinize göre hazırlar — sertlik, süt, sıcaklık, her şey.',
    'about.card3.title': 'Sıcak Atmosfer',
    'about.card3.text':
      'Sıcak aydınlatma, özenle seçilmiş müzik ve düşünceli iç mekanlar çalışmak, arkadaşlarla buluşmak ya da dinlenmek için mükemmel bir ortam yaratır.',
    'about.card4.title': 'Profesyonel Baristalar',
    'about.card4.text':
      'Ödüllü ekibimiz titizlikle eğitim alır. Her barista, kahve mükemmeliyetine adanmış sertifikalı bir uzmandır.',

    'quiz.eyebrow': 'Kahve Bulucu',
    'quiz.mainTitle': 'Size en uygun kahveyi keşfedin',
    'quiz.startBtn': 'Teste Başla →',
    'quiz.resultLabel': 'Mükemmel eşleşmeniz',
    'quiz.retakeBtn': 'Testi Tekrarla',
    'quiz.progress': 'Soru {current} / {total}',

    'quiz.q1.question': 'Kahvenizin gücünü nasıl seversiniz?',
    'quiz.q1.opt1': 'Hafif ve yumuşak',
    'quiz.q1.opt2': 'Dengeli',
    'quiz.q1.opt3': 'Bold ve yoğun',
    'quiz.q1.opt4': 'Ekstra güçlü',

    'quiz.q2.question': 'En çok hangi tat notalarını seviyorsunuz?',
    'quiz.q2.opt1': 'Kremalı ve tatlı',
    'quiz.q2.opt2': 'Çikolatalı',
    'quiz.q2.opt3': 'Toprak ve yeşil',
    'quiz.q2.opt4': 'Baharatlı ve sıcak',

    'quiz.q3.question': 'Kahvenizi günün hangi saatinde içiyorsunuz?',
    'quiz.q3.opt1': 'Sabah enerjisi',
    'quiz.q3.opt2': 'Yavaş sabah',
    'quiz.q3.opt3': 'Öğle arası',
    'quiz.q3.opt4': 'Her zaman!',

    'quiz.result.latte':
      'Pürüzsüz, kremalı ve rahatlatıcı — nazik bir kahve deneyimini sevenler için mükemmel.',
    'quiz.result.cappuccino':
      'Espresso ve kadifemsi köpüğün mükemmel dengesiyle zamansız bir İtalyan klasiği.',
    'quiz.result.espresso': 'Saf, yoğun yoğunluk — işi ciddiye alanlar için.',
    'quiz.result.cold_brew':
      'Ultra pürüzsüz ve doğal olarak tatlı soğuk konsantre. Sıfır asidite, maksimum lezzet.',
    'quiz.result.caramel_macchiato': 'Tatlı, ipeksi ve lüks — bir bardakta tatlı.',
    'quiz.result.mocha': 'Zengin espresso çikolatası ile buluşuyor. İki dünyanın en iyisi.',
    'quiz.result.matcha_latte': 'Toprak, canlı ve enerji verici — kahveye bilinçli bir alternatif.',
    'quiz.result.chai_latte': 'Sıcak baharatlar ve kremalı süt — her yudumda sıcak konfor.',
    'quiz.result.flat_white': "Latte'den güçlü, cappuccino'dan pürüzsüz. Mükemmel dengeli.",
    'quiz.result.iced_latte': 'Buz üzerinde soğutulmuş espresso. Ferahlatıcı ve sade.',
    'quiz.result.cortado': 'Eşit parça espresso ve süt — güçlü ama mükemmel yumuşatılmış.',
    'quiz.result.americano': 'Uzun, temiz ve doyurucu bir kupa için sulandırılmış çift espresso.',
    'quiz.result.default': 'Harika bir kahve seçimi — her yudumun tadını çıkarın!',

    'footer.tagline': 'El Yapımı Kahve ve Özel İçecekler',
    'footer.menu': 'Menü',
    'footer.about': 'Hakkımızda',
    'footer.quiz': 'Test',
    'footer.copy': '© 2026 BODREN. Tüm hakları saklıdır.',
    'lang.label': 'Dil seçin',

    'prod.1.name': 'Kapuçino',
    'prod.1.desc':
      'Kadifemsi buharda pişirilmiş süt köpüğü ile zengin espresso. Klasik İtalyan mükemmelliği.',
    'prod.2.name': 'Latte',
    'prod.2.desc':
      'Kremalı buharda ısıtılmış sütle harmanlanmış pürüzsüz espresso. Yumuşak ve doyurucu.',
    'prod.3.name': 'Moka',
    'prod.3.desc': 'Espresso zengin çikolata sosu ve krem şanti ile buluşuyor.',
    'prod.4.name': 'Americano',
    'prod.4.desc': 'Uzun ve temiz bir fincan için sıcak su ile seyreltilmiş yoğun çift espresso.',
    'prod.5.name': 'Flat White',
    'prod.5.desc': 'Mikro köpüklü sütlü konsantre espresso. Latte’den daha güçlü.',
    'prod.6.name': 'Cold Brew',
    'prod.6.desc':
      'Son derece pürüzsüz ve düşük asitli bir konsantre için 18 saat soğuk suda demlenmiştir.',
    'prod.7.name': 'Matcha Latte',
    'prod.7.desc': 'Yulaf sütü ile çırpılmış törensel Japon matchası. Topraksı ve ferahlatıcı.',
    'prod.8.name': 'Espresso',
    'prod.8.desc': 'Yoğun ve aromatik mükemmel çekilmiş tek shot espresso.',
    'prod.9.name': 'Karamel Macchiato',
    'prod.9.desc': 'Vanilya şurubu, buharda süt, espresso ve ipeksi karamel sosu.',
    'prod.10.name': 'Buzlu Latte',
    'prod.10.desc': 'Soğuk süt ile buz üzerine dökülmüş espresso. Soğuk ve ferahlatıcı.',
    'prod.11.name': 'Cortado',
    'prod.11.desc': 'Eşit oranda espresso ve ılık süt. Güçlü ama dengeli.',
    'prod.12.name': 'Chai Latte',
    'prod.12.desc':
      'Kremalı buharda pişirilmiş yulaf sütüyle harmanlanmış baharatlı siyah çay konsantresi.',
  },
};
