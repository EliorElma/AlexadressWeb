// ===================================================================
// אלכסה בריידל — קובץ הקונפיגורציה של כל האתר
// זה הקובץ היחיד שצריך לערוך כדי לשנות תוכן:
// תמונות, שמלות, מבחן, כלות, המלצות, אינסטגרם — הכל כאן.
// מבנה JSON רגיל. אחרי עריכה: git add . && git commit && git push
// ===================================================================

const SITE = {

  // ---------- כללי ----------
  "whatsappNumber": "972544806554",          // בינלאומי, בלי + ובלי 0
  "instagramHandle": "alexa.bridal",
  "fullSiteUrl": "https://bridals-il.com",
  "web3formsKey": "21ce0d52-6e7d-486d-81f7-e89a9ab53ca8",
  "leadEmailSubject": "ליד חדש ממבחן הסטייל — אלכסה בריידל",

  // ---------- תמונת הפתיחה (הירו) ----------
  "head_pic": "images/hero.jpg",

  // ---------- הרצועה הנעה העליונה (תמונות חתוכות, רקע שקוף) ----------
  // אפשר להוסיף/להסיר כמה שרוצים — הרצועה מסתדרת לבד
  "first_band": [
    "images/band-1.png",
    "images/band-2.png",
    "images/band-3.png",
    "images/band-4.png",
    "images/band-5.png",
    "images/band-6.png",
    "images/band-7.png",
    "images/band-8.png",
    "images/band-9.png",

  ],

  // ---------- הקולקציה ----------
  // detail = תמונה שלישית, אופציונלי! אם אין — פשוט למחוק את השורה
  // וכפתור ה-Detail לא יופיע לשמלה הזאת.
  "dresses": [
    {
      "name": "סלין",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/סלין/",
      "front": "images/Salin_front.jpg",
      "back": "images/Salin_back.jpg",
      "detail": "images/Salin_detail.jpg"
    },
    {
      "name": "אמור",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/אמור/",
      "front": "images/amor_front.jpg",
      "back": "images/amor_back.jpg",
      "detail": "images/amor_detial.jpg"
    },
    {
      "name": "לוסי",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/לוסי/",
      "front": "images/losi_front.jpg",
      "back": "images/losi_back.jpg",
      "detail": "images/losi_detial.jpg"
    },
    {
      "name": "קורל",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/קורל/",
      "front": "images/Koral_front.jpg",
      "back": "images/Koral_back.jpg",
      "detail": "images/Koral_detial.jpg"
    },
    {
      "name": "אדל",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/אדל/",
      "front": "images/Adel_front.jpg",
      "back": "images/Adel_back.jpg",
      "detail": "images/Adel_detial.jpg"
    },
    {
      "name": "נועה",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/נועה/",
      "front": "images/Noa_front.jpg",
      "back": "images/Noa_back.jpg",
      "detail": "images/Noa_detial.jpg"
    },
    {
      "name": "מוניק",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/מוניק/",
      "front": "images/Moniqe_Front.jpg",
      "back": "images/Moniqe_back.jpg",
      "detail": "images/Moniqe_detial.jpg"
    },
    {
      "name": "אלור",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/אלור/",
      "front": "images/Alor_front.jpg",
      "back": "images/Alor_back.jpg",
      "detail": "images/Alor_detials.jpg"
    },
    {
      "name": "פלור",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/פלור/",
      "front": "images/Flor_front.jpg",
      "back": "images/Flor_back.jpg",
      "detail": "images/Flor_Detials.jpg"
    }
  ],

  // ---------- מבחן הסטייל ----------
  // steps: השאלות והתשובות. answerDressMap: לכל תשובה — שם שמלה
  // (חייב להתאים ל-name מהרשימה למעלה). בסוף נלקחות עד 3 שמלות ייחודיות.
  "quiz": {
    "steps": [
      {
        "q": "עוד לא יודעת איזו שמלה מתאימה לך?",
        "sub": "עני על 3 שאלות קצרות ונבחר יחד את השמלות שהכי מתאימות לסגנון שלך.",
        "options": ["רומנטית וקלילה", "קלאסית ונקייה", "נועזת ומיוחדת"]
      },
      {
        "q": "איזו גזרה הכי את?",
        "sub": "",
        "options": ["A-line נשית", "מחשוף לב ותחרה", "נשפכת ומינימליסטית"]
      },
      {
        "q": "איפה תרקדי הכי הרבה?",
        "sub": "",
        "options": ["אולם מרווח", "חצר וגינה", "חוף ים"]
      }
    ],
    "answerDressMap": [
      { "רומנטית וקלילה": "סלין", "קלאסית ונקייה": "אמור", "נועזת ומיוחדת": "לוסי" },
      { "A-line נשית": "קורל", "מחשוף לב ותחרה": "אדל", "נשפכת ומינימליסטית": "נועה" },
      { "אולם מרווח": "מוניק", "חצר וגינה": "אלור", "חוף ים": "פלור" }
    ]
  },

  // ---------- הרצועה הנעה מאחורי THE DRESS THAT YOU... ----------
  "second_band": [
    "images/dress-1.jpg",
    "images/bride-1.jpg",
    "images/dress-2.jpg",
    "images/bride-2.jpg",
    "images/dress-3.jpg",
    "images/bride-3.jpg",
    "images/dress-4.jpg",
    "images/bride-4.jpg",
    "images/dress-5.jpg",
    "images/bride-5.jpg",
    "images/dress-6.jpg",
    "images/bride-6.jpg"
  ],

  // ---------- כלות אמיתיות ----------
  "real_brides": [
    { "name": "יעל", "date": "", "pic": "images/יעל.jpg" },
    { "name": "גתית", "date": "", "pic": "images/גתית.jpg" },
    { "name": "יובל", "date": "", "pic": "images/יובל.jpg" },
    { "name": "רוני", "date": "", "pic": "images/רוני.jpg" },
    { "name": "שחר", "date": "", "pic": "images/שחר.jpg" },
    { "name": "ענבר", "date": "", "pic": "images/ענבר.jpg" },
    { "name": "קרן", "date": "", "pic": "images/קרן.jpg" },
    { "name": "מור", "date": "", "pic": "images/מור.jpg" }
  ],

  // ---------- רגעים מהעולם של אלכסה (הקולאז') ----------
  "moments": [
    "images/mood-1.jpg",
    "images/mood-2.jpg",
    "images/mood-3.jpg",
    "images/mood-4.jpg",
    "images/mood-5.jpg",
    "images/mood-6.jpg",
    "images/mood-7.jpg",
    "images/mood-8.jpg",
    "images/mood-9.jpg"
  ],

  // ---------- מה הכלות שלנו אומרות ----------
  "testimonials": [
    {
      "text": "אלכסה מקצועית ונעימה בטירוף! מהשנייה הראשונה שנכנסתי לסטודיו הרגשתי שמצאתי, היא הבינה תוך שנייה מה אני רוצה ואיך אני מדמיינת את השמלה וידעה לתרגם את זה בלי שאצטרך להסביר יותר מידי. עשיתי אצלה גם שמלה וגם בגד שני ושניהם יצאו בול מה שדמיינתי! ויותר מזה, היה לי נוח, שזה היה לי הכי חשוב. לא הפסקתי לקבל מחמאות! ממליצה מכל הלב❤️",
      "who": "יובל"
    },
    {
      "text": "ממליצה בחום על אלכס לכל מי שמחפשת שמלת כלה עם יחס אישי, גמישות, אכפתיות ותוצאה יפהפייה ומדויקת.",
      "who": "מיכל"
    },
    {
      "text": "החוויה הייתה נעימה וכיפית והתוצאה הייתה פשוט מדהימה. אני הכי ממליצה בעולם על אלכס ועל השמלות היפייפיות שלה!",
      "who": "נטע"
    }
  ],

  // ---------- אינסטגרם ----------
  "instagram_pics": [
    "images/ig-1.jpg",
    "images/ig-2.jpg",
    "images/ig-3.jpg",
    "images/ig-4.jpg",
    "images/ig-5.jpg",
    "images/ig-6.jpg"
  ]

};
