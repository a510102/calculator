let buttoms = document.querySelectorAll('.number p');
const conent = document.querySelector('.content');
const answer = document.querySelector('.answer');

let conentstr = '';
let answerstr ='0';

conent.innerText = conentstr;
answer.innerText = answerstr;

function stringSizeBottom(){
  answerstr = answerstr.toString();
  let L = answerstr.length;
  switch(true){
    case L < 9 :
      answer.setAttribute('style','font-size :54px');
      break;
    case L > 9 && L < 16:
      answer.setAttribute('style','font-size :36px');
      break;
    case L > 15 && L <24 :
      answer.setAttribute('style','font-size :24px');
      break; 
    case L > 23 && L < 36:
      answer.setAttribute('style','font-size :15px');
      break;     
  }
}

function stringSizeTop(){
  conentstr = conentstr.toString();
  let L = conentstr.length;
  switch(true){
    case L > 34 && L < 40:
      conent.setAttribute('style','font-size: 16px');
      break;  
    case  L > 39 :
      conent.setAttribute('style','font-size: 12px'); 
      break; 
  }
}

function toCurrency(num){
  if(num.indexOf(',') !== -1){
    num.toString();
    num = num.replace(',','')
    console.log(num.indexOf(','),num);
  }
  var parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

let calcul = function () {
  let text = this.textContent;
  if(answerstr.length > 33){
    answerstr = answerstr.substring(0, 32);
  }
  switch (true) {
    case text ===  'AC':    //使數字歸零 
      answerstr = '0';
      conentstr = '';
      break;
    case  text === '⌫': //上排清空下排減少一位數字  
      conentstr = '';
      answerstr = answerstr.substring(0, (answerstr.length-1) );
      break;
    case conentstr.charAt(conentstr.length-1) === '=': //
      conentstr = '';
      conentstr += answerstr + text;
      answerstr = '0';
      if(text === '0' || text === '00'){
        conentstr ='';
        answerstr = '0';  
      }
      break;
    case (answerstr === '' || answerstr === "0") && (text ==='+'|| text ==='-'||text ==='×'||text ==='÷')://避免重複點+-/* 或者數字為0的時候
      answerstr = '0';
      break;    
    case text ==='+':
    case text ==='-':
    case text ==='×':
    case text ==='÷':
      conentstr += answerstr;
      answerstr = '0';
      conentstr += text;
      console.log('4',conentstr)
      break;
    case text === '=':
      conentstr += answerstr + text;
      let calcont = conentstr.substring(0, conentstr.length-1);
      calcont = calcont.replace('×', '*');
      calcont = calcont.replace('÷', '/');
      calcont = eval(calcont);
      answerstr = calcont;
      break;
    case answerstr.indexOf('.') !== -1 :
      if(text === '.'){
        answerstr;
      } else {
        answerstr += text;
      }
      break;
    case (answerstr === '' || answerstr === "0") && text === '.':
      answerstr = '0.';
      console.log(answerstr)
      break;
    case (answerstr === '' || answerstr === "0") && text === '00':
      answerstr = '0';
      break;
    case answerstr.indexOf("0") === 0 && isNaN(parseInt(text)) === false:
      answerstr = text;
      break;   
    default:
        answerstr += text;    
  }
  answerstr = toCurrency(answerstr);
  conent.textContent  = conentstr;
  answer.textContent  = answerstr;
  stringSizeBottom();
  stringSizeTop();
}

for(let i = 0; i < 19;i++) {
  buttoms[i].addEventListener('click',calcul, false)
}

