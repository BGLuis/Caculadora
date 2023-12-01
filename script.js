let total = 0;
let buffer = "0";
let prevOP;

const tela = document.querySelector('#caculadora .tela')
const btns = document.querySelectorAll('#caculadora .btn')

function ClickBtn(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    tela.innerText = buffer;
}

function handleSymbol(simbolo){
    switch (simbolo) {
        case 'C':
            buffer = 0;
            total = 0;
            break;
    
        case '=':
            if(prevOP === null){
                return;
            }
            flushOperation(parseInt(buffer));
            prevOP = null;
            buffer = total;
            total = 0;
            break;

        case '←':
            if(buffer.length === 1){
                buffer = '0'
            }
            else{
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;

        case '+':
        case '-':
        case '÷':
        case 'X':
            handleMath(simbolo);
            break;

    }
}
function handleMath(simbolo){
    if(buffer === '0'){
        return;
    }
    const intBuffer = parseInt(buffer);
    if(total === 0){
        total = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    prevOP = simbolo;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(prevOP === '+'){
        total += intBuffer; 
    }
    else if(prevOP === '-'){
        total -= intBuffer; 
    }
    else if(prevOP === '÷'){
        total /= intBuffer; 
    }
    else if(prevOP === 'X'){
        total *= intBuffer; 
    }
}

function handleNumber(num) {
    if(buffer === '0'){
        buffer = num
    }
    else{
        buffer += num
    }
}

btns.forEach(btn => {
    btn.addEventListener("click",function() {
        ClickBtn(btn.innerText)
    })
});