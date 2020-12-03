let tbody = document.querySelector("tbody");
let tr = tbody.querySelector("tr");
tr.remove(); // удаляем шаблон для того чтобы не отоборжался пустым

let firebaseConfig = {
    apiKey: "AIzaSyD6NXbHIIdA-5gbf_mxmZHlJQCgyQm-Gw4",
    authDomain: "fifteen15.firebaseapp.com",
    databaseURL: "https://fifteen15.firebaseio.com",
    projectId: "fifteen15",
    storageBucket: "fifteen15.appspot.com",
    messagingSenderId: "1080681526270",
    appId: "1:1080681526270:web:12d74ad5a03504ff5346af"
};

firebase.initializeApp(firebaseConfig); // Инициализируем Firebase  

function writeTable (nickName, moves, time) { //запись в базу
    firebase.database().ref(nickName).set({   // родитель Nickname , сохранение данных в виде ключ значение
        moves: moves,
        time: time
    });
}

function readTable() { //вывод в таблицу
    let rank = 1; 
    tbody.innerHTML="";// чистим таблицу для перерисовки
    let dataRef = firebase.database().ref("/").orderByChild("moves"); // запрос к базе в корень выбрать всё и отсортировать дочернии элементы по moves
    dataRef.on("child_added", function (snapshot) {  // указатель на местоположение в базе  // child-added запускается один раз для каждого дочернего элемента // в function мы передаем снимок базы данных 
        
        //console.log(snapshot.val());

        let data = snapshot.val() //  получение данных в виде объектов
        //console.log(data);

        let row = tr.cloneNode(true); // клонируем строку таблицы пустую которую изначально удалили

        row.children[0].innerHTML = rank;   // заполняем ячейки внутри строки
        row.children[1].innerHTML = snapshot.key;
        row.children[2].innerHTML = `${Math.floor(data.time / 60)}:${data.time % 60}`;
        row.children[3].innerHTML = data.moves;
        rank++;
        //console.log(row.children);
        tbody.append(row); // добавляем строку в tbody потому что браузер добавил его неявно


    });
}