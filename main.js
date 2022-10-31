import './style.css';
import IMask from 'imask';
const data = new Date();
const confimBtn = document.querySelector("#confim-btn")
const anoAtual = data.getFullYear()
const ccLogo = document.querySelector(".card-infos img:first-child")
const cardHolderName = document.querySelector("#name")
const errorDiv = document.getElementsByClassName("error-msg")

function setCardType(type) {
  ccLogo.setAttribute("src", `cc-${type}.svg`);
  if (type == "visa") {
    ccLogo.style = 'height:38px;'

  }
  else {
    ccLogo.style = 'width:80px'
  }


}

globalThis.setCardType = setCardType;
//Security Code
const cvcCode = document.querySelector("#cvc-code");
const maskPatternCvc = {
  mask: '0000'
};
const CvcMask = IMask(cvcCode, maskPatternCvc);

//Month Exp
const mmExp = document.querySelector("#expdate-m");
const maskPatternMm = {
  mask: IMask.MaskedRange,
  from: 1,
  to: 12
};
const mmMask = IMask(mmExp, maskPatternMm);

// Year Exp
const yearExp = document.querySelector("#expdate-y");
const maskPatternYear = {
  mask: IMask.MaskedRange,
  from: parseInt(anoAtual.toString().slice(2)),
  to: parseInt(anoAtual.toString().slice(2)) + 10
}
const yearMask = IMask(yearExp, maskPatternYear);

//Card Number
const cardNumber = document.querySelector("#cardnumber");
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard"
    },
    {
      mask: "0000 0000 0000 0000",

      cardType: "default"
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find(
      function (item) {
        return number.match(item.regex)
      }
    );

    return foundMask

  }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)



//Change cvc
const cvcCardImg = document.querySelector(".card-infos-2 span")
cvcCode.addEventListener("input", () => {
  if (cvcCode.value.length > 0) {
    cvcCardImg.innerHTML = CvcMask._value
  }
  else {
    cvcCardImg.innerHTML = "000"
  }
})

//change Name
const nameCardImg = document.querySelector(".card-content div span:first-child")
cardHolderName.addEventListener("input", () => {
  if (cardHolderName.value.length > 0) {
    nameCardImg.innerHTML = cardHolderName.value
  }
  else {
    nameCardImg.innerHTML = "JANE APPLESEED"
  }
})

//change mm
const mmCardImg = document.querySelector(".mes-span")
mmExp.addEventListener("input", () => {
  if (mmExp.value.length > 0) {
    mmCardImg.innerHTML = mmExp.value
  }
  else {
    mmCardImg.innerHTML = "00"
  }
})

//change yy
const yyCardImg = document.querySelector(".ano-span")
yearExp.addEventListener("input", () => {
  if (yearExp.value.length > 0) {
    yyCardImg.innerHTML = yearExp.value
  }
  else {
    yyCardImg.innerHTML = "00"
  }
})

//change cardNumber
const ccCardImg = document.querySelector(".card-content > span")
cardNumber.addEventListener("input", () => {
  if (cardNumber.value.length > 0) {
    let tipoCartao = cardNumberMasked.masked.currentMask.cardType
    ccCardImg.innerHTML = cardNumber.value
    setCardType(tipoCartao)
  }
  else {
    ccCardImg.innerHTML = "0000 0000 0000 0000"
    setCardType("default")
  }
})


confimBtn.addEventListener("click", (event) => {
  
  errorDiv[0].style.display = "none"
  errorDiv[1].style.display = "none"
  errorDiv[2].style.display = "none"

  if (cardHolderName.value == "") {
    event.preventDefault()
    errorDiv[0].style.display = "block"
  }
  else if (cardNumber.value == "") {

    event.preventDefault()
    errorDiv[1].style.display = "block"

  }
  else if(yearExp.value == "" || mmExp.value == "" || cvcCode.value == "" ){
    event.preventDefault()
    errorDiv[2].style.display = "block"
  }
  else{
    const form = document.getElementById("form-cc")
    const sucess = document.querySelector(".newpage")
    form.style.display = "none"
    sucess.style.display = "flex"
    event.preventDefault()
    
  }

 

  }

)

// display: grid; justify-items:center; text-align:center;