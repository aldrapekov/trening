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
