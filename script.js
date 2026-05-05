// Language and Theme Management
let isArabic = true;
let isDark = false;

const translations = {
    ar: {
        title: "نظام درجات الطلاب",
        month1: "الشهر الأول",
        month2: "الشهر الثاني",
        month3: "الشهر الثالث",
        final: "النتيجة النهائية",
        evaluations: "التقييمات",
        homework: "الواجبات",
        behavior: "السلوك",
        month1Result: "نتيجة الشهر الأول",
        month2Result: "نتيجة الشهر الثاني",
        month3Result: "نتيجة الشهر الثالث",
        calculateFinal: "احسب النتيجة النهائية",
        month1Total: "مجموع درجات الشهر الأول",
        month2Total: "مجموع درجات الشهر الثاني",
        month3Total: "مجموع درجات الشهر الثالث",
        total14Weeks: "مجموع درجات الـ 14 أسبوع",
        average14Weeks: "متوسط مجموع درجات الـ 14 أسبوع",
        exam1: "امتحان الشهر الأول",
        exam2: "امتحان الشهر الثاني",
        finalResult: "النتيجة النهائية:",
        totalTerm2: "مجموع درجات الترم الثاني:",
        evalAvg: "متوسط التقييم:",
        homeAvg: "متوسط الواجب:",
        behAvg: "متوسط السلوك:",
        total: "المجموع:",
        languageBtn: "English",
        themeBtn: "🌙 Dark Mode"
    },
    en: {
        title: "Student Grades System",
        month1: "Month 1",
        month2: "Month 2",
        month3: "Month 3",
        final: "Final Result",
        evaluations: "Evaluations",
        homework: "Homework",
        behavior: "Behavior",
        month1Result: "Month 1 Result",
        month2Result: "Month 2 Result",
        month3Result: "Month 3 Result",
        calculateFinal: "Calculate Final Result",
        month1Total: "Month 1 Total Grades",
        month2Total: "Month 2 Total Grades",
        month3Total: "Month 3 Total Grades",
        total14Weeks: "Total 14 Weeks Grades",
        average14Weeks: "Average 14 Weeks Grades",
        exam1: "Month 1 Exam",
        exam2: "Month 2 Exam",
        finalResult: "Final Result:",
        totalTerm2: "Total Term 2 Grades:",
        evalAvg: "Evaluation Average:",
        homeAvg: "Homework Average:",
        behAvg: "Behavior Average:",
        total: "Total:",
        languageBtn: "العربية",
        themeBtn: "☀️ Light Mode"
    }
};

function toggleLanguage() {
    isArabic = !isArabic;
    updateLanguage();
}

function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    document.getElementById('themeBtn').innerHTML = isArabic ? (isDark ? '☀️ Light Mode' : '🌙 Dark Mode') : (isDark ? '☀️ Light Mode' : '🌙 Dark Mode');
}

function updateLanguage() {
    const lang = isArabic ? 'ar' : 'en';
    const t = translations[lang];

    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

    document.getElementById('title').innerHTML = t.title;

    // Update h2 headings (months)
    const h2Elements = document.querySelectorAll('h2[data-en]');
    h2Elements.forEach(h2 => {
        h2.innerHTML = isArabic ? h2.dataset.ar : h2.dataset.en;
    });

    // Update h3 headings (categories like Evaluations, Homework, Behavior)
    const h3Elements = document.querySelectorAll('h3[data-en]');
    h3Elements.forEach(h3 => {
        let text = isArabic ? h3.dataset.ar : h3.dataset.en;
        // Handle numbers in parentheses
        if (h3.dataset.ar && !isArabic) {
            // For English, we need to add the count from original HTML
            const originalHTML = h3.innerHTML;
            if (originalHTML.includes('(')) {
                const count = originalHTML.match(/\((\d+)\)/);
                if (count) {
                    text = `(${count[1]}) ${text}`;
                }
            }
        } else if (!h3.dataset.ar && isArabic) {
            // For Arabic, extract from English version if needed
            const originalHTML = h3.innerHTML;
            if (originalHTML.includes('(')) {
                const count = originalHTML.match(/\((\d+)\)/);
                if (count) {
                    text = `${text} (${count[1]})`;
                }
            }
        }
        h3.innerHTML = text;
    });

    // Update all input labels
    const labelTexts = document.querySelectorAll('.label-text');
    labelTexts.forEach(label => {
        const text = isArabic ? label.dataset.ar : label.dataset.en;
        label.textContent = text;
    });

    // Update buttons
    document.querySelector('button[onclick="month1Result()"]').innerHTML = t.month1Result;
    document.querySelector('button[onclick="month2Result()"]').innerHTML = t.month2Result;
    document.querySelector('button[onclick="month3Result()"]').innerHTML = t.month3Result;
    document.querySelector('button[onclick="finalResult()"]').innerHTML = t.calculateFinal;

    document.getElementById('languageBtn').innerHTML = t.languageBtn;
    document.getElementById('themeBtn').innerHTML = t.themeBtn;

    // Re-render results in the current language if already shown
    if (document.getElementById('result1').innerHTML.trim()) {
        month1Result();
    }
    if (document.getElementById('result2').innerHTML.trim()) {
        month2Result();
    }
    if (document.getElementById('result3').innerHTML.trim()) {
        month3Result();
    }
    if (document.getElementById('finalResult').innerHTML.trim()) {
        finalResult();
    }
}

function avg(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i] || 0);
    }
    return Math.round(sum / arr.length);
}

/* ================= MONTH 1 ================= */
function month1Result() {

    let evalAvg = avg([m1_e1.value, m1_e2.value, m1_e3.value, m1_e4.value]);
    let homeAvg = avg([m1_h1.value, m1_h2.value, m1_h3.value, m1_h4.value, m1_h5.value]);
    let behAvg = avg([m1_b1.value, m1_b2.value, m1_b3.value, m1_b4.value, m1_b5.value]);

    let total = evalAvg + homeAvg + behAvg;

    const t = translations[isArabic ? 'ar' : 'en'];
    document.getElementById("result1").innerHTML =
        "<strong>" + t.month1 + ":</strong><br>" +
        t.evalAvg + " " + evalAvg + "<br>" +
        t.homeAvg + " " + homeAvg + "<br>" +
        t.behAvg + " " + behAvg + "<br>" +
        "<strong>" + t.total + " " + total + "</strong>";

    return total;
}

/* ================= MONTH 2 ================= */
function month2Result() {

    let evalAvg = avg([m2_e1.value, m2_e2.value, m2_e3.value]);
    let homeAvg = avg([m2_h1.value, m2_h2.value, m2_h3.value, m2_h4.value, m2_h5.value]);
    let behAvg = avg([m2_b1.value, m2_b2.value, m2_b3.value, m2_b4.value, m2_b5.value]);

    let total = evalAvg + homeAvg + behAvg;

    const t = translations[isArabic ? 'ar' : 'en'];
    document.getElementById("result2").innerHTML =
        "<strong>" + t.month2 + ":</strong><br>" +
        t.evalAvg + " " + evalAvg + "<br>" +
        t.homeAvg + " " + homeAvg + "<br>" +
        t.behAvg + " " + behAvg + "<br>" +
        "<strong>" + t.total + " " + total + "</strong>";

    return total;
}

/* ================= MONTH 3 ================= */
function month3Result() {

    let evalAvg = avg([m3_e1.value, m3_e2.value]);
    let homeAvg = avg([m3_h1.value, m3_h2.value, m3_h3.value, m3_h4.value]);
    let behAvg = avg([m3_b1.value, m3_b2.value, m3_b3.value, m3_b4.value]);

    let total = evalAvg + homeAvg + behAvg;

    const t = translations[isArabic ? 'ar' : 'en'];
    document.getElementById("result3").innerHTML =
        "<strong>" + t.month3 + ":</strong><br>" +
        t.evalAvg + " " + evalAvg + "<br>" +
        t.homeAvg + " " + homeAvg + "<br>" +
        t.behAvg + " " + behAvg + "<br>" +
        "<strong>" + t.total + " " + total + "</strong>";

    return total;
}

/* ================= FINAL RESULT ================= */
function finalResult() {

    // قراءة مجموع درجات الأشهر من المستخدم
    let month1Total = Number(document.getElementById("month1Total").value) || 0;
    let month2Total = Number(document.getElementById("month2Total").value) || 0;
    let month3Total = Number(document.getElementById("month3Total").value) || 0;

    // حساب مجموع درجات الـ 14 أسبوع
    let total14Weeks = month1Total + month2Total + month3Total;

    // قراءة متوسط درجات الـ 14 أسبوع من المستخدم
    let monthsAverage = Number(document.getElementById("average14Weeks").value) || 0;

    // قراءة درجات الامتحانات
    let exam1 = Number(document.getElementById("exam1").value) || 0;
    let exam2 = Number(document.getElementById("exam2").value) || 0;

    // مجموع درجات الترم الثاني
    let finalTotal = exam1 + exam2 + monthsAverage;

    // عرض القيمة في خانة المجموع
    document.getElementById("total14Weeks").innerHTML = total14Weeks;

    const t = translations[isArabic ? 'ar' : 'en'];
    document.getElementById("finalResult").innerHTML =
        "<strong>" + t.finalResult + "</strong><br>" +
        // t.exam1 + ": " + exam1 + "<br>" +
        // t.exam2 + ": " + exam2 + "<br>" +
        "<strong>" + t.totalTerm2 + " " + finalTotal + "</strong>";
}