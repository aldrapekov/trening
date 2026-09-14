// ВАШ РЕАЛЬНЫЙ КОНФИГ ИЗ СТАРОГО ПРОЕКТА
const firebaseConfig = {
    apiKey: "ВАШ_API_KEY",
    authDomain: "ВАШ_PROJECT.firebaseapp.com",
    databaseURL: "https://ВАШ_ПРОЕКТ.firebaseio.com", 
    projectId: "ВАШ_PROJECT_ID",
    storageBucket: "ВАШ_BUCKET",
    messagingSenderId: "ВАШ_SENDER_ID",
    appId: "ВАШ_APP_ID"
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
        alert("Пожалуйста, заполните все поля!");
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
