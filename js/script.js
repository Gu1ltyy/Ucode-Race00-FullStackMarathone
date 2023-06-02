let menuVisible = false;
let darkTheme = false;
let isScann = false;
let convVis = false;
let conWorkVis = false;
let convButInTF = true;

let length = false;
let mass = false;
let area = false;

let memory = 0;

const calcDiv = document.querySelector("#calcDiv");
const menuButton = document.querySelector("#menuButton");
const dopMenu = document.querySelector("#dop-menu");
const buttInp = document.querySelector(".button");
const output = document.querySelector(".output");
const res = document.querySelector(".result");
const hidDiv = document.querySelector(".over");
const hidDivCh = document.querySelector(".overCh");
const hidDivResCh = document.querySelector(".overResCh");
const hidDivRes = document.querySelector(".overRes");
const screenn = document.querySelector(".screen");
const convMenu = document.querySelector(".row.hidMenConv");
const convWork = document.querySelector(".button.convM");
const outConv = document.querySelector(".outputChoose");
const resChoose = document.querySelector(".resultChoose");

var lnBut = document.querySelector(".button.dop.conv.ln");
var msBut = document.querySelector(".button.dop.conv.ms");
var arBut = document.querySelector(".button.dop.conv.ar");
var buttConv = document.querySelector(".button.dop.bott");
var baseSystem = document.getElementById('base');
var dropdown = document.getElementById("dropdownFrom");
var dropdownTo = document.getElementById("dropdownTo");

var buttons = document.querySelectorAll(".button");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", animateButton);
}

function evalMath(exp) {
    const tokens = exp.match(/[-]?\d+(\.\d+)?|\^|\+|\-|\*|\//g);
  
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
    
    const operators = [];
    const outputMth = [];
    
    tokens.forEach(token => {
      if (!isNaN(token)) {
        outputMth.push(parseFloat(token));
      } else {
        while (operators.length > 0 && precedence[token] <= precedence[operators[operators.length - 1]]) {
          outputMth.push(operators.pop());
        }
        operators.push(token);
      }
    });
    
    while (operators.length > 0) {
      outputMth.push(operators.pop());
    }
    
    const stack = [];
    
    outputMth.forEach(token => {
      if (!isNaN(token)) {
        stack.push(token);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        
        switch (token) {
          case '+':
            stack.push(a + b);
            break;
          case '-':
            stack.push(a - b);
            break;
          case '*':
            stack.push(a * b);
            break;
          case '/':
            stack.push(a / b);
            break;
        }
      }
    });
    
    return stack[0];
}

function animateButton(event) {
    var button = event.target;
    button.classList.add("animate");
    setTimeout(function() {
        button.classList.remove("animate");
    }, 300);
}

function newOpts(newOptions, dropdw ,from) {
    newOptions.forEach(function(option, index) {
        var newOption = document.createElement("option");
        newOption.value = option.value;

        if (index === 0) {
            newOption.text = option.text;
        } else {
            if (from === 'area') {
                newOption.innerHTML = option.text + "&sup2;";
            }
            else {
                newOption.text = option.text;
            }
        }
        dropdw.appendChild(newOption);
    });
}

function dropChange(first, sec, third, from) {
  dropdown.innerHTML = "";
  dropdownTo.innerHTML = "";

  var newOptions = [
    { value: "", text: "" },
    { value: first, text: first },
    { value: sec, text: sec },
    { value: third, text: third }
  ];
  if (from === area) {
    newOptions = [
        { value: "", text: "" },
        { value: "cmsq", text: first },
        { value: "msq", text: sec },
        { value: "kmsq", text: third }
      ];
  }
  newOpts(newOptions, dropdown, from);
  newOpts(newOptions, dropdownTo, from);
}

function convLength() {
    lnBut.classList.add("act");
    msBut.classList.remove("act");
    arBut.classList.remove("act");
    if (!conWorkVis) {
        convWork.classList.add('opn');
        outConv.textContent = "0";
        resChoose.textContent = "0";
        dropChange('cm', 'm', 'km', length);
        conWorkVis = true;
        reset();
    }
    else {
        convWork.classList.remove('opn');
        conWorkVis = false;
        length = false;
        mass = false;
        area = false;
        lnBut.classList.remove("act");
    }
    convButtonsHide();
}

function convMass() {
    lnBut.classList.remove("act");
    msBut.classList.add("act");
    arBut.classList.remove("act");
    if (!conWorkVis) {
        convWork.classList.add('opn');
        outConv.textContent = "0";
        resChoose.textContent = "0";
        dropChange('g', 'kg', 'mg', mass);
        conWorkVis = true;
        reset();
    }
    else {
        convWork.classList.remove('opn');
        conWorkVis = false;
        length = false;
        mass = false;
        area = false;
        msBut.classList.remove("act");
    }
    convButtonsHide();
}

function convArea() {
    lnBut.classList.remove("act");
    msBut.classList.remove("act");
    arBut.classList.add("act");
    if (!conWorkVis) {
        convWork.classList.add('opn');
        outConv.textContent = "0";
        resChoose.textContent = "0";
        dropChange('cm', 'm', 'km', "area");
        conWorkVis = true;
        reset();
    }
    else {
        convWork.classList.remove('opn');
        conWorkVis = false;
        length = false;
        mass = false;
        area = false;
        arBut.classList.remove("act");
    }
    convButtonsHide();
}

function convButtonsHide() {
    var trash = ['M-', 'M+', 'MC', 'MR', 'x!', '√x', 'xn', '%', '/', '*', '-', '+', '+/-', '='];
    if (conWorkVis) {
        for (i in buttons) {
            if (trash.includes(buttons.item(i).textContent))
                buttons.item(i).classList.add('inactive');
        }
    } else {
        for (i in buttons) {
            if (buttons.item(i).classList.contains('inactive')) {
                if (buttons.item(i).textContent !== 'DEC')
                    buttons.item(i).classList.remove('inactive');
            }
        }
    }
}

function convWorkF(from) {
    if (from === 'length') {
        if (area === true || mass === true) {
            convWork.classList.remove('opn');
            conWorkVis = false;
            area = false;
            mass = false;
            length = true;
            setTimeout(convLength, 300);
            return;
        }
        length = true;
        mass = false;
        area = false;
        convLength();
    }
    else if (from === 'mass') {
        if (length === true || area === true) {
            convWork.classList.remove('opn');
            conWorkVis = false;
            area = false;
            length = false;
            mass = true;
            setTimeout(convMass, 300);
            return;
        }
        length = false;
        mass = true;
        area = false;
        convMass();
    }
    else if (from === 'area') {
        if (length === true || mass === true) {
            convWork.classList.remove('opn');
            conWorkVis = false;
            length = false;
            mass = false;
            area = true;
            setTimeout(convArea, 300);
            return;
        }
        length = false;
        mass = false;
        area = true;
        convArea();
    }
}

function conv() {
    if (!convButInTF)
        return;
    
    if (baseSystem.classList.contains('inactive')) {
        baseSystem.classList.remove('inactive');
        buttConv.classList.remove('switched');
    }
    else {
        baseSystem.classList.add('inactive');
        buttConv.classList.add('switched');
    }

    if (!convVis) {
        convMenu.classList.add('opn');
        convVis = true;
        lnBut.classList.remove("act");
        msBut.classList.remove("act");
        arBut.classList.remove("act");
    }
    else {
        hidDivCh.classList.remove('show');
        hidDivResCh.classList.remove('show');
        resChoose.textContent = "0";
        convMenu.classList.remove('opn');
        convWork.classList.remove('opn');
        convVis = false;
        conWorkVis = false;
        length = false;
        mass = false;
        area = false;
        convButtonsHide();
    }
}

function mathConvertation() {
    var fromVal = document.getElementById("dropdownFrom").value;
    var toVal = document.getElementById("dropdownTo").value;
    var numConv = outConv.textContent;
    fromToConv(fromVal, toVal, numConv);
    autoScroll('conv');
    return;
}

function fromToConv(fromVal, toVal, numConv) {
    const lengthCoefficients = {
        m: 1,
        km: 1000,
        cm: 0.01
      };
    
      const weightCoefficients = {
        g: 1,
        kg: 1000,
        mg: 1000000
      };
    
      const areaCoefficients = {
        cmsq: 0.0001,
        msq: 1,
        kmsq: 1000000
      };

      const isValidVal = (unit, coefficients) => Object.keys(coefficients).includes(unit);

      const isValidVals = (fromVal, toVal, coefficients) => isValidVal(fromVal, coefficients) && isValidVal(toVal, coefficients);

      const convert = (numConv, fromVal, toVal, coefficients) => {
        if (isValidVals(fromVal, toVal, coefficients)) {
            const fromCoefficient = coefficients[fromVal];
            const toCoefficient = coefficients[toVal];
            var longRes = numConv * fromCoefficient / toCoefficient;
            return Number(longRes.toFixed(5));
        }
      };
      if (isValidVals(fromVal, toVal, lengthCoefficients)) {
        resChoose.textContent = convert(numConv, fromVal, toVal, lengthCoefficients);
        return;
      } else if (isValidVals(fromVal, toVal, weightCoefficients)) {
        resChoose.textContent = convert(numConv, fromVal, toVal, weightCoefficients);
        return;
      } else if (isValidVals(fromVal, toVal, areaCoefficients)) {
        resChoose.textContent = convert(numConv, fromVal, toVal, areaCoefficients);
        return;
      } else {
        return;
      }
}

function updOutput(from) {
    if (from === 'default') {
        if (output.scrollWidth > output.clientWidth) {
            hidDiv.classList.add('show');
        }
        else {
            hidDiv.classList.remove('show');
        }
        if (res.scrollWidth > res.clientWidth) {
            hidDivRes.classList.add('show');
        }
        else {
            hidDivRes.classList.remove('show');
        }
    } else {
        if (outConv.scrollWidth > outConv.clientWidth) {
            hidDivCh.classList.add('show');
        }
        else {
            hidDivCh.classList.remove('show');
        }
        if (resChoose.scrollWidth > resChoose.clientWidth) {
            hidDivResCh.classList.add('show');
        }
        else {
            hidDivResCh.classList.remove('show');
        }        
    }
    
}

function firstMenu() {
    if (menuVisible) {
        calcDiv.classList.remove("menu-open");
        menuButton.innerHTML = "&#60;";
        menuVisible = false;
    } else {
        calcDiv.classList.add("menu-open");
        menuButton.innerHTML = "&#62;";
        menuVisible = true;
    }
}

menuButton.addEventListener("click", () => {
    if (convVis) {
        hidDivCh.classList.remove('show');
        hidDivResCh.classList.remove('show');
        resChoose.textContent = "0";
        convMenu.classList.remove('opn');
        convWork.classList.remove('opn');
        if(baseSystem.classList.contains('inactive')) {
            buttConv.classList.remove('switched');
            baseSystem.classList.remove('inactive');
            lnBut.classList.remove("act");
            msBut.classList.remove("act");
            arBut.classList.remove("act");
        }
        convVis = false;
        conWorkVis = false;
        length = false;
        mass = false;
        area = false;
        convButtonsHide();
        setTimeout(() => {
            firstMenu();
        }, 300);
    }
    else {
        firstMenu();
    }
});

function check(input) {
    const lastChar = input.trim().slice(-1);
    if (lastChar === '+' || lastChar === '-'  || lastChar === '*' || lastChar === '/'  || lastChar === '^') {
        return true;
    }
    return false;
}

function firstTime(from) {
    if (res.textContent !== '0') {
        if (from === "input") {
            res.textContent = '0';
            output.textContent = '';
            autoScroll('default');
            return true;
        }
        autoScroll('default');
        return true;
    }
    return false;
}

function inactiveCheck(n) {
    var inactive = document.getElementsByClassName('inactive');
    for (var i = 0; i < inactive.length; i++) {
        if (n === inactive[i].textContent)
            return true;
    }
    return false;
}

function toConvOut(valOut) {
    outConv.textContent = valOut;
}

function toNormOutput(valOut) {
    output.textContent = valOut;
}

function dotCheck(n, from) {
    var inpTxt = output.textContent;
    var charactersInp = output.textContent.split(" ");
    var lastNum = charactersInp[charactersInp.length - 1];
    var valOut = '';

    if (from === 'fromConvert') {
        inpTxt = outConv.textContent;
        charactersInp = outConv.textContent.split(" ");
        lastNum = charactersInp[charactersInp.length - 1];
    }

    if (inpTxt === '' && n === '.') {
        valOut = inpTxt + '0' + n;
        if (from === 'fromConvert') {
            toConvOut(valOut);
            return false;
        }
        toNormOutput(valOut);
        return false;
    }
    else if (lastNum === '.' && n === '.') {
        return false;
    }
    else if (lastNum.includes('.') && (n === '.'))  {
        return false;
    }
    else if (inpTxt === '' && (n === '.') && isNaN(parseFloat(lastNum)) || (n === '.' && inpTxt[inpTxt.length - 1]) && isNaN(parseFloat(lastNum))) {
        valOut = inpTxt + '0' + n;
        if (from === 'fromConvert') {
            toConvOut(valOut);
            return false;
        }
        toNormOutput(valOut);
        return false;
    }
    else if (!lastNum.includes('.')) {
        return true;
    }
    else if ((n === '+' || n === '-' || n === '*' || n === '/' || n === '^') && lastNum[lastNum.length - 1] === '.') {
        return false;
    }
    else if (n !== '.' && n !== '+' && n !== '-'  && n !== '*' && n !== '/'  && n !== '^') {
        return true;
    }
    return true;
}

function autoScroll(from) {
    if (from === 'default') {
        res.scrollLeft = res.scrollWidth - res.clientWidth;
        output.scrollLeft = output.scrollWidth - output.clientWidth;
    }
    else {
        resChoose.scrollLeft  = resChoose.scrollWidth - resChoose.clientWidth;
        outConv.scrollLeft = outConv.scrollWidth - outConv.clientWidth;
    }    
    updOutput(from);
}

function zeroCheck(n, from) {
    if (from === 'fromConvert') {
        var fromConvInp = outConv.textContent;
        var arrForZero = fromConvInp.toString().split('').map(Number);
        if (fromConvInp.includes('.')) {
            return true;
        }
        if (fromConvInp === '0' && n === '0') {
            return false;
        } else if (fromConvInp === '0' && n !== '0') {
            if (n !== '.') {
                arrForZero[arrForZero.length - 1] = n;
                outConv.textContent = arrForZero.join('');
                mathConvertation();
                return false;
            }
        }
        return true;
    }
    var charactersInp = output.textContent.split(" ");
    var lastNum = charactersInp[charactersInp.length - 1];
    if (lastNum.includes('.')) {
        return true;
    }
    if (lastNum === '0' && n === '0') {
        return false;
    } else if (lastNum === '0' && n !== '0') {
        if (n !== '.') {
            charactersInp[charactersInp.length - 1] = n;
            output.textContent = charactersInp.join(' ');
            return false;
        }
    }
    return true;
}

function input(n) {
    if (inactiveCheck(n))
        return;
    if (n === '^') {
        if (inactiveCheck('xn'))
        return;
    }
    if (conWorkVis) {
        var inpTxt = outConv.textContent;
        if (!dotCheck(n, 'fromConvert')) {
            return;
        }
        if (!zeroCheck(n, 'fromConvert'))
            return;
        outConv.textContent = inpTxt + n;
        autoScroll('conv');
        mathConvertation();
        return;
    }
    firstTime("input");
    var inpTxt = output.textContent;
    var charactersInp = output.textContent.split(" ");
    var lastNum = charactersInp[charactersInp.length - 1];
    if (charactersInp[charactersInp.length - 2] === '^' && (n === '+' || n === '-'  || n === '*' || n === '/'  || n === '^')) {
        let numFor = charactersInp[charactersInp.length - 3];
        let step = charactersInp[charactersInp.length - 1];
        expon(numFor, step, 'top');
        autoScroll('default');
    }
    if (inpTxt === '' && (n === '+' || n === '-'  || n === '*' || n === '/'  || n === '^')) {
        return;
    }
    if (!dotCheck(n, 'fromOutput')) {
        return;
    }
    else {
        if ((n === '+' || n === '-'  || n === '*' || n === '/'  || n === '^')) {
            if (check(inpTxt)) {
                inpTxt = inpTxt.slice(0, -3);
                output.textContent = inpTxt;
            }
            const textCurr = output.textContent;
            output.textContent = textCurr + ' ' + n + ' ';
            autoScroll();
            return;
        }

        if (!zeroCheck(n, 'fromOutput'))
            return;
        
        const textCurr = output.textContent;
        output.textContent = textCurr + n;        
        autoScroll('default');
    }
}

function reset() {
    if (conWorkVis) {
        outConv.textContent = '0';
        resChoose.textContent = '0';
        hidDivCh.classList.remove('show');
        hidDivResCh.classList.remove('show');
    }
    else {
        output.textContent = '';
        res.textContent = '0';
        hidDiv.classList.remove('show');
        hidDivRes.classList.remove('show');
    }
}

function binaryMath(n) {
    var newN = n.join("");
    var chMath = newN.match(/[+\-*/]|[\d]+/g);
    var oper = chMath.filter(function(match) {
        return !/[+\-*/]/.test(match);
    }).map(function(op) {
        return parseInt(op, 2);
    });
    var decLine = newN.replace(/[+\-*/]|[\d]+/g, function(match) {
        return /[+\-*/]/.test(match) ? match : oper.shift();
    });
    var result = evalMath(decLine);
    var resBin = result.toString(2);
    res.textContent = resBin;
}

function hexMath(n) {
    var newN = n.join("");
    var chMath = newN.match(/[+\-*/]|[\da-fA-F]+/g);
    var oper = chMath.filter(function(match) {
        return !/[+\-*/]/.test(match);
    }).map(function(op) {
        return parseInt(op, 16);
    });
    var hexLine = newN.replace(/[+\-*/]|[\da-fA-F]+/g, function(match) {
        return /[+\-*/]/.test(match) ? match : oper.shift();
    });
    var result = evalMath(hexLine);
    var resHex = result.toString(16).toUpperCase();
    res.textContent = resHex;
}

function equal() {
    if (conWorkVis)
        return;
    const actions = output.textContent;
    var chMath = output.textContent.split(" ");
    if (baseSystem.textContent === "BIN") {
        binaryMath(chMath);
        return;
    }
    if (baseSystem.textContent === "HEX") {
        hexMath(chMath);
        return;
    }
    
    for (let i = 0; i < chMath.length; i++) {
        if (chMath[i] === '^') {
            expon(chMath[i - 1], chMath[i + 1], 'bott');
            return;
        }
    }
    const result = evalMath(actions);
    res.textContent = result;
    autoScroll('default');
}

function switchSign() {
    if (firstTime("switch"))
        return;
    var inpTxt = output.textContent;
    var charactersInp = output.textContent.split(" ");
    var lastChar = charactersInp[charactersInp.length - 1];
    if (inpTxt === '') {
        return;
    }
    if (isNaN(parseFloat(lastChar))) {
        return;
    }
    var actions = output.textContent.split(" ");
    var change = actions[actions.length - 1];
    const newNum = parseFloat(change) * -1;
    actions[actions.length - 1] = newNum;

    output.textContent = actions.join(" ");
    autoScroll('default');
}

function percent() {
    if (inactiveCheck('%'))
        return;
    if (firstTime("percent"))
        return;
    var inpTxt = output.textContent;
    var charactersInp = output.textContent.split(" ");
    var lastNum = charactersInp[charactersInp.length - 1];
    if (inpTxt === '' || check(inpTxt)) {
        return;
    }
    if (charactersInp.length > 1 && (charactersInp[charactersInp.length - 2] === '+' || charactersInp[charactersInp.length - 2] === '-')) {
        var toFrom = parseFloat(charactersInp[charactersInp.length - 3]);
        var num = parseFloat(lastNum);
        var perRes = (toFrom * num) / 100;
        console.log(perRes);
        charactersInp[charactersInp.length - 1] = perRes;
        output.textContent = charactersInp.join(" ");
        return;
    }
    var num = parseFloat(lastNum);
    var perRes = num / 100;
    charactersInp[charactersInp.length - 1] = perRes;
    output.textContent = charactersInp.join(" ");
    autoScroll('default');
}

function expon(num, exp, place) {
    var resExp = Math.pow(parseFloat(num), parseFloat(exp));
    if (place === 'top') {
        output.textContent = resExp;
    }
    else {
        res.textContent = resExp;
    }
    
}

function factor() {
    if (inactiveCheck('x!'))
        return;
    if (firstTime("factor"))
        return;
    var input = output.textContent;
    var charactersInp = output.textContent.split(" ");
    var lastNum = charactersInp[charactersInp.length - 1];
    if (input === '' || check(input)) {
        return;
    }
    var num = parseInt(lastNum);
    var result = 1;
    if (num === 0)
        result = 0;
    for (var i = num; i > 0; i--) {
        result *= i;
    }
    charactersInp[charactersInp.length - 1] = result;
    output.textContent = charactersInp.join(" ");
    autoScroll('default');
}

function square() {
    if (inactiveCheck('√x'))
        return;
    if (firstTime("square"))
        return;
    var input = output.textContent;
    var charactersInp = output.textContent.split(" ");
    var lastNum = charactersInp[charactersInp.length - 1];
    if (input === '' || check(input)) {
        return;
    }
    var num = parseFloat(lastNum);
    if (num === 0 || num < 0)
        return;
    var result = Math.sqrt(num);
    charactersInp[charactersInp.length - 1] = result;
    output.textContent = charactersInp.join(" ");
    autoScroll('default');
}  

function theme() {
    if (darkTheme) {
        document.body.classList.remove('dark');
        document.getElementById('theme-div').innerHTML = "&#9728;&#65039;";
        darkTheme = false;
    } else {
        document.body.classList.add('dark');
        document.getElementById('theme-div').innerHTML = "&#127769;";
        darkTheme = true;
    }
}

function switchOutput(oldSys, newSys) {
    if (res !== 0) {
        if (res.textContent.indexOf('.') > -1) {
            res.textContent = '0';
        } else {
            var value = parseInt(res.textContent, oldSys);
            res.textContent = value.toString(newSys).toUpperCase();
        }
    }
    if (output.textContent.indexOf('.') > -1 || output.textContent === '') {
        output.textContent = '';
    } else {
        var expression = output.textContent.split(/([\^+\-*/])/);
        for (var i = 0; i < expression.length; i++) {
            if (!isNaN(parseInt(expression[i], oldSys))) {
                var value = parseInt(expression[i], oldSys);
                expression[i] = ' ' + value.toString(newSys).toUpperCase() + ' ';
            }
        }
        output.textContent = expression.join('');
    }
}

function systemBase() {
    if (baseSystem.classList.contains('inactive')) {
        return;
    }
    switch (baseSystem.textContent) {
        case 'DEC':
            baseSystem.textContent = 'BIN';
            switchOutput(10, 2);
            var trash = ['2', '3', '4', '5', '6', '7', '8', '9', '.', 'x!', '√x', 'xn', '%'];
            for (i in buttons) {
                if (trash.includes(buttons.item(i).textContent))
                    buttons.item(i).classList.add('inactive');
            }
            buttConv.classList.add('inactive');
            convButInTF = false;
            break;
        case 'BIN':
            baseSystem.textContent = 'HEX';
            switchOutput(2, 16);
            var trash = [ 'x!', '√x', '.', '%', 'xn'];
            for (i in buttons) {
                if (buttons.item(i).classList.contains('inactive')) {
                    if (!trash.includes(buttons.item(i).textContent)) {
                        buttons.item(i).classList.remove('inactive');
                    }
                }
            }
            buttConv.classList.add('inactive');
            convButInTF = false;
            calcDiv.classList.add("buttons-open");
            break;
        case 'HEX':
            baseSystem.textContent = 'DEC';
            switchOutput(16, 10);
            for (i in buttons) {
                if (buttons.item(i).classList.contains('inactive'))
                    buttons.item(i).classList.remove('inactive');
            }
            calcDiv.classList.remove("buttons-open");
            convButInTF = true;
            break;
    }
    document.getElementById('base').textContent = baseSystem.textContent;
    autoScroll('default');
}

function switchForMem() {
    let curSys = 0;

    if (baseSystem.textContent === 'BIN')
        curSys = 2;
    else
        curSys = 16;

    var expression = output.textContent.split(/([\^+\-*/])/);
    for (var i = 0; i < expression.length; i++) {
        if (!isNaN(parseInt(expression[i], curSys))) {
            var value = parseInt(expression[i], curSys);
            expression[i] = ' ' + value.toString(10) + ' ';
        }
    }

    return expression.join('');
}

function memReset() {
    if (inactiveCheck('MC'))
        return;
    memory = 0;
}

function memSumm() {
    if (inactiveCheck('M+'))
        return;
    let binRes = output.textContent;
    if (baseSystem.textContent === 'BIN' || baseSystem.textContent === 'HEX')
        binRes = switchForMem();
    
    if (check(binRes))
        binRes = binRes.slice(0, -3);

    memTemp = memory + ' + ' + evalMath(binRes);
    memory = evalMath(memTemp);
}

function memDiff() {
    if (inactiveCheck('M-'))
        return;
    let binRes = output.textContent;
    if (baseSystem.textContent === 'BIN' || baseSystem.textContent === 'HEX')
        binRes = switchForMem();
    
    if (check(binRes))
        binRes = binRes.slice(0, -3);

    memTemp = memory + ' - ' + evalMath(binRes);
    memory = evalMath(memTemp);
}

function isDotLast(input) {
    const lastChar = input.trim().slice(-1);
    if (lastChar === '.') {
        return true;
    }
    return false;
}

function memRecall() {
    if (inactiveCheck('MR'))
        return;
    let recallTemp = '';
    if (baseSystem.textContent === 'BIN') {
        recallTemp = memory.toString(2);
    } else if (baseSystem.textContent === 'HEX') {
        recallTemp = memory.toString(16).toUpperCase();
    } else {
        recallTemp = memory;
    }

    if (check(output.textContent) || isDotLast(output.textContent) || firstTime("input") || output.textContent === '') {
        output.textContent = output.textContent + recallTemp;
    } else {
        return;
    }
}
