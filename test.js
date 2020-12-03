let timer = setInterval(timeCount, 1000);
let div = document.querySelector(".time");
let counter = 0;
let min = 0;

function timeCount(){
    counter++;
    if(counter === 60){
        min++;
        counter = 0;
    }
    div.innerHTML = min + " минут" + " : " + counter  + " секунд" ;
    //console.log(min, counter);
}
let fon = ['fon1','fon2','fon3'];
let randFon = fon[Math.round(Math.random()*2)];

const randomNumber = [...Array(15).keys()] // рандом значений клеток  !???!
        .sort(() => Math.random() - 0.5);
        console.log(randomNumber );