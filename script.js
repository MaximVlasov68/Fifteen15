
const GameBox = document.querySelector(".GameBox");

const cellSize = 100; // размер ячейки
const empty = document.querySelector(".empty"); // пустая ячейка
let correctCount = 0; // счётчик корректности 

let divTime = document.querySelector(".time"); //див для  таймера

let divMove = document.querySelector(".move"); // див для счётчика шагов
let countMove = 0; // счётчик шагов

let isStart = false; // флажок для таймера
let timer;

let isFinished = false; // флажок для блокировки перемещения

readTable(); // первое заполнение таблицы

let seconds = 0; // секунды
let min = 0;   // минуты

const fon = ['fon1', 'fon2', 'fon3', 'fon4', 'fon5']; // масив с фонами

function timeCount() { // функция таймера
    seconds++;
    if (seconds === 60) {
        min++;
        seconds = 0;
    }
    divTime.innerHTML = min + " : " + seconds;
    //console.log(min, counter);
}

function moveCell() { // вызывается на cell, поэтому в функцию ничего не передаётся 
    if (!isFinished) {
        const difLeft = Math.abs(Number.parseInt(empty.style.left) - Number.parseInt(this.style.left)); // parseInt вырежет пиксели для работы с числами
        const difTop = Math.abs(Number.parseInt(empty.style.top) - Number.parseInt(this.style.top));

        if ((difLeft == 0 && difTop == cellSize) || (difLeft == cellSize && difTop == 0)) { // строго сравниваем соседние клетки отступ слева 0 и 100 или 100 и 0
            let top = this.style.top;         //создаём третбю переменную для того, чтобы не потерять значения                       
            let left = this.style.left;

            this.style.left = empty.style.left;   // меняем местами 
            this.style.top = empty.style.top;

            empty.style.left = left;
            empty.style.top = top;

            countMove++;   // увеличение счётчика шагов
            divMove.innerHTML = countMove; // заполняем див счётчика шагов

            console.log(countMove);

            if (!isStart) { // для старта таймера
                seconds = 0;
                min = 0;
                timer = setInterval(timeCount, 1000);
                isStart = true;
            }

            if (isCorrect(this)) {    // this это элемент на который было вызвано событие т.е. cell
                this.classList.add('correct'); // добавление класса correct если ячейка на своём месте
                correctCount++;

            } else {
                if (this.classList.contains('correct')) { // метод contains проверяет есть ли у элемента класс 'correct'
                    this.classList.remove('correct')  // если у ячейки есть класс correct, но она не на своём месте, удалить класс
                    correctCount--;
                }
                console.log(correctCount);
            }
            if (correctCount === 15) { // если все клетки занимают корректное положение 
                alert("You won");
                clearInterval(timer) // остановка таймера при победе
                let nickName = prompt("Введите никнейм");
                writeTable(nickName, countMove, min * 60 + seconds); //записываем в базу данные о победе
                readTable(); // перерисовываем таблицу с новыми данными

                isFinished = true; // для того чтобы не выполнялись перемещения когда все ячейки на своём месте
            }
        }
    }
}


function isCorrect(elem) {  /// функция проверки коректного положения ячеек  
    const value = Number(elem.innerHTML) - 1,  // вспоминаем что мы к значению каждой ячейки добавляли 1
        column = (value % 4),
        row = (value - column) / 4,
        top = Number.parseInt(elem.style.top),
        left = Number.parseInt(elem.style.left);
    return (top == row * cellSize && left == column * cellSize) // условие проверки корректности возвращает true или false
}

game(); // вызываем первый раз 

function game() { // обработчик кнопки Новая игра

    isFinished = false; // возвращаем флажок к прежнему значению

    correctCount = 0; // чистим счётчик корректности
    countMove = 0; // чистим счётчик ходов

    GameBox.innerHTML = ""; // чистим поле

    empty.style.left = empty.style.top = "300px"; // определеям  пустую ячейку чтобы она стояла на совём месте
    GameBox.append(empty); // добавляем её

    clearInterval(timer); // очищаем таймер
    isStart = false;    // для каждой новой игры  - false чтобы понимать первый мув ячейки и для того чтобы таймер начинался с начала)

    const randomNumber = [...Array(15).keys()] // рандомные значения клеток  
        .sort( () => Math.random() - 0.5);  // - 0,5 для того чтобы диапазон возвращаемых значений был на половину отриц и полож (если отриц то пара чисел меняется если полож то не меняются)

    const randFon = fon[Math.round(Math.random()*4)]; //выбор рандомного элемента из массива фонов

    for (let i = 0; i <= 14; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerHTML = randomNumber[i] + 1;

        cell.classList.add(randFon);     //добавляем  рандомный стиль ячеек

        GameBox.append(cell);

        const column = (i % 4); // отступ слева
        const row = (i - column) / 4; // отступ сверху


        cell.style.left = (column * cellSize) + "px";
        cell.style.top = (row * cellSize) + "px";

        cell.onclick =  moveCell; //ставим на ячейку обработчик 

    }
}

