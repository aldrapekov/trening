// --- СЛОВАРЬ ПЕРЕВОДОВ ---
const translations = {
    ru: {
        homeBtn: "🏠 Главная",
        formTitle: "Анкета инкогнито 🕵️‍♂️",
        formSubtitle: "Заполните профиль. Ваше имя будет скрыто до самого конца!",
        labelName: "Ваше Имя и Фамилия",
        placeName: "Например: Иван Иванов",
        labelQ1: "1. Ваша главная IT-суперспособность в школе?",
        placeQ1: "Чиню принтер взглядом...",
        labelQ2: "2. Если не информатика, то какой предмет вели бы?",
        placeQ2: "Физкультура, потому что...",
        labelQ3: "3. Как отдыхаете от мониторов на выходных?",
        placeQ3: "Копаюсь в машине, играю в настолки...",
        labelQ4: "4. Любимая видеоигра, настолка или вселенная?",
        placeQ4: "D&D, CS2, Cyberpunk 2077...",
        labelQ5: "5. Ваше коронное блюдо для гостей?",
        placeQ5: "Пеку вафли, варю казы...",
        submitBtn: "Отправить инкогнито",
        successTitle: "✅ Принято!",
        successText: "Ваша анкета улетела на главный экран.<br>Ждем начала игры!",
        errorEmpty: "Пожалуйста, заполните все поля!"
    },
    kk: {
        homeBtn: "🏠 Басты бет",
        formTitle: "Инкогнито сауалнама 🕵️‍♂️",
        formSubtitle: "Профильді толтырыңыз. Сіздің аты-жөніңіз соңына дейін жасырын болады!",
        labelName: "Аты-жөніңіз",
        placeName: "Мысалы: Асан Үсенов",
        labelQ1: "1. Мектептегі басты IT-суперқабілетіңіз?",
        placeQ1: "Принтерді көзбен жөндеймін...",
        labelQ2: "2. Информатика болмаса, қандай пәннен сабақ берер едіңіз?",
        placeQ2: "Дене шынықтыру, өйткені...",
        labelQ3: "3. Демалыста монитордан қалай демаласыз?",
        placeQ3: "Көлік жөндеймін, үстел ойындарын ойнаймын...",
        labelQ4: "4. Сүйікті бейнеойын, үстел ойыны немесе ғалам?",
        placeQ4: "D&D, CS2, Cyberpunk 2077...",
        labelQ5: "5. Қонақтарға арналған фирмалық тағамыңыз?",
        placeQ5: "Вафли пісіремін, қазы асып беремін...",
        submitBtn: "Инкогнито жіберу",
        successTitle: "✅ Қабылданды!",
        successText: "Сауалнамаңыз басты экранға жіберілді.<br>Ойынның басталуын күтеміз!",
        errorEmpty: "Барлық өрістерді толтырыңыз!"
    },
    en: {
        homeBtn: "🏠 Home",
        formTitle: "Incognito Profile 🕵️‍♂️",
        formSubtitle: "Fill out your profile. Your name will be hidden until the end!",
        labelName: "Full Name",
        placeName: "E.g., John Doe",
        labelQ1: "1. Your main IT superpower at school?",
        placeQ1: "I fix printers with a stare...",
        labelQ2: "2. If not CS, what subject would you teach?",
        placeQ2: "PE, because...",
        labelQ3: "3. How do you relax away from screens on weekends?",
        placeQ3: "Tinkering with cars, playing board games...",
        labelQ4: "4. Favorite video game, board game, or universe?",
        placeQ4: "D&D, CS2, Cyberpunk 2077...",
        labelQ5: "5. Your signature dish for guests?",
        placeQ5: "Baking waffles, cooking kazy...",
        submitBtn: "Submit Incognito",
        successTitle: "✅ Done!",
        successText: "Your profile was sent to the main screen.<br>Waiting for the game to start!",
        errorEmpty: "Please fill in all fields!"
    }
};

let currentLang = 'ru'; // Язык по умолчанию

// Функция смены языка
function setLanguage(lang) {
    currentLang = lang;
    
    // Переводим обычный текст (innerHTML)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Переводим плейсхолдеры в инпутах
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}
const firebaseConfig = {
  apiKey: "AIzaSyDPN8eYRrU3JbBRs12MeROOu3zd7o9QIgU",
  authDomain: "kartochki-ade77.firebaseapp.com",
  databaseURL: "https://kartochki-ade77-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kartochki-ade77",
  storageBucket: "kartochki-ade77.firebasestorage.app",
  messagingSenderId: "467392945380",
  appId: "1:467392945380:web:cd7bb9d8c4f2998003e0f1",
  measurementId: "G-NY9BN4G7LT"
};
// Инициализация
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function submitForm() {
    const name = document.getElementById('qName').value;
    const q1 = document.getElementById('q1').value;
    const q2 = document.getElementById('q2').value;
    const q3 = document.getElementById('q3').value;
    const q4 = document.getElementById('q4').value;
    const q5 = document.getElementById('q5').value;

    if(!name || !q1 || !q2 || !q3 || !q4 || !q5) {
        alert(translations[currentLang].errorEmpty);
        return;
    }

    // Отправляем данные в базу с перехватом ошибок
    db.ref("training_profiles").push({
        name: name,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5
    }).then(() => {
        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    }).catch((error) => {
        alert("Ошибка базы данных: " + error.message);
        console.error(error);
    });
}
