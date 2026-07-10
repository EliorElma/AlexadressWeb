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
    "images/band-4.png"
  ],

  // ---------- הקולקציה ----------
  // detail = תמונה שלישית, אופציונלי! אם אין — פשוט למחוק את השורה
  // וכפתור ה-Detail לא יופיע לשמלה הזאת.
  "dresses": [
    {
      "name": "הילה",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/הילה/",
      "front": "images/dress-1.jpg",
      "back": "images/dress-1-back.jpg",
      "detail": "images/dress-1-third.jpg"
    },
    {
      "name": "קים",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/קים/",
      "front": "images/dress-2.jpg",
      "back": "images/dress-2-back.jpg",
      "detail": "images/dress-2-third.jpg"
    },
    {
      "name": "מיקה",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/מיקה/",
      "front": "images/dress-3.jpg",
      "back": "images/dress-3-back.jpg",
      "detail": "images/dress-3-third.jpg"
    },
    {
      "name": "עמית",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/עמית/",
      "front": "images/dress-4.jpg",
      "back": "images/dress-4-back.jpg",
      "detail": "images/dress-4-third.jpg"
    },
    {
      "name": "רומא",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/רומא/",
      "front": "images/dress-5.jpg",
      "back": "images/dress-5-back.jpg",
      "detail": "images/dress-5-third.jpg"
    },
    {
      "name": "פריז",
      "price": "3,800 ₪",
      "link": "https://bridals-il.com/product/פריז/",
      "front": "images/dress-6.jpg",
      "back": "images/dress-6-back.jpg",
      "detail": "images/dress-6-third.jpg"
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
      { "רומנטית וקלילה": "הילה", "קלאסית ונקייה": "קים", "נועזת ומיוחדת": "מיקה" },
      { "A-line נשית": "עמית", "מחשוף לב ותחרה": "רומא", "נשפכת ומינימליסטית": "פריז" },
      { "אולם מרווח": "הילה", "חצר וגינה": "קים", "חוף ים": "מיקה" }
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
    { "name": "שירן", "date": "12.06.2025", "pic": "images/bride-1.jpg" },
    { "name": "נועה", "date": "03.09.2025", "pic": "images/bride-2.jpg" },
    { "name": "תמר", "date": "21.05.2025", "pic": "images/bride-3.jpg" },
    { "name": "רותם", "date": "17.08.2025", "pic": "images/bride-4.jpg" },
    { "name": "יעל", "date": "02.10.2025", "pic": "images/bride-5.jpg" },
    { "name": "הדר", "date": "29.04.2025", "pic": "images/bride-6.jpg" }
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
      "text": "הרגשתי שהיא איתי בכל שלב, למדה מה אני רוצה עד שהשמלה יצאה מדויקת בדיוק כמו שדמיינתי.",
      "who": "כלה, 2025"
    },
    {
      "text": "נסענו מרחוק ולא התחרטנו לרגע — סטודיו אינטימי, יחס אישי ומחיר שבאמת הגיוני.",
      "who": "כלה, 2024"
    },
    {
      "text": "תוך פגישה אחת מצאתי את השמלה, עשינו את ההתאמות ויצאתי איתה הביתה. פשוט וקליל.",
      "who": "כלה, 2025"
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
