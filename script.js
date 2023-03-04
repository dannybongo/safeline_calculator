
//querySelector and function for opening a new window from home page

let buttons = document.querySelectorAll(".linkBtn");

function openNewWindow(url) {
    window.open(url, "_blank");
}

buttons.forEach(button => {
  button.addEventListener("click", function() {
    const url = this.getAttribute("data-url");
    openNewWindow(url);
  });
});


let calculateBtn = document.getElementById("calculateBtn");
calculateBtn.addEventListener("click", calculate);

function calculate() {

  let inputApetureWidth = parseInt(document.getElementById("inputApetureWidth").value);
  let inputApetureHeight = parseInt(document.getElementById("inputApetureHeight").value);
  let apetureMin = Math.min(inputApetureWidth, inputApetureHeight);
  let caseMaterialSelect = document.getElementById("caseMaterial");
  let caseDutyType = document.getElementById('caseDutyType');
  let detectorTypeSelect = document.getElementById('detectorType');

  document.getElementById("outputApetureWidth").value = inputApetureWidth;
  document.getElementById("outputApetureHeight").value = inputApetureHeight;

 
    if (detectorTypeSelect.value === 'signatureTouch') {
      signatureTouchDimACalc(inputApetureWidth,inputApetureHeight);
      signatureTouchDimZCalc(apetureMin, caseMaterialSelect);
      signatureTouchDimZcTCalc(apetureMin, caseMaterialSelect);
      signatureTouchDimWcTCalc(inputApetureWidth);
      signatureTouchThkCalc(caseDutyType, caseMaterialSelect);
      signatureTouchDimMFZCalc(inputApetureWidth,inputApetureHeight);
    }
    else {(detectorTypeSelect.value === 'rzSignatureTouch');{
      console.log('rzSignatureTouch');
    }}
  };


function signatureTouchDimACalc(inputApetureWidth,inputApetureHeight){

  if (inputApetureHeight === 50 && inputApetureWidth >= 100 && inputApetureWidth <= 1000){
    dimensionA = 137.5
  } else if (inputApetureHeight >= 75 && inputApetureWidth >= 100 && inputApetureWidth <= 250){
    dimensionA = 125
  } else if (inputApetureHeight >= 75 && inputApetureWidth >= 275 && inputApetureWidth <= 1000){
    dimensionA = 135
  } else if (inputApetureHeight >= 50 && inputApetureWidth >= 1025 && inputApetureWidth <= 1500){
    dimensionA = 145
  } else if (inputApetureHeight >= 50 && inputApetureWidth >= 1525 && inputApetureWidth <= 2000){
    dimensionA = 155
  } else if (inputApetureHeight >= 50 && inputApetureWidth >= 2025 && inputApetureWidth <= 2500){
    dimensionA = 165
  } else if (inputApetureHeight >= 50 && inputApetureWidth >= 2525 && inputApetureWidth <= 3000){
    dimensionA = 175
  }
  document.getElementById("dimensionA1").value = dimensionA
  document.getElementById("dimensionA2").value = dimensionA
  document.getElementById("dimensionA3").value = dimensionA
  }


function signatureTouchDimZCalc(apetureMin, caseMaterialSelect){
  if (caseMaterialSelect.value === "stainlessSteel"){
    dimensionZ = apetureMin/2 + 163
  } else if (caseMaterialSelect.value === "paintedAluminium"){
    dimensionZ = apetureMin/2 + 169
  }
  document.getElementById("dimensionZ").value = dimensionZ;
}

function signatureTouchDimZcTCalc(apetureMin){
  dimensionZcT = apetureMin/2 + 125
  document.getElementById("dimensionZcT").value = dimensionZcT;
}

function signatureTouchDimWcTCalc(inputApetureWidth){
  let dimensionWcT = inputApetureWidth + 200
  document.getElementById("dimensionWcT").value = dimensionWcT;
}


function signatureTouchThkCalc(caseDutyType, caseMaterialSelect){

  if (caseDutyType.value === 'heavyDuty' && caseMaterialSelect.value === "paintedAluminium"){
    document.getElementById("dimensionThk_LHS").value = 17
    document.getElementById("dimensionThk_RHS").value = 17
  }
  if (caseDutyType.value === 'heavyDuty' && caseMaterialSelect.value === "stainlessSteel"){
    document.getElementById("dimensionThk_LHS").value = 17
    document.getElementById("dimensionThk_RHS").value = 17
  }
  else if (caseDutyType.value === 'mediumDuty' && caseMaterialSelect.value === "paintedAluminium"){
    document.getElementById("dimensionThk_LHS").value = 4.5
    document.getElementById("dimensionThk_RHS").value = 4.5
  }
  else if (caseDutyType.value === 'mediumDuty' && caseMaterialSelect.value === "stainlessSteel"){
    document.getElementById("dimensionThk_LHS").value = 13
    document.getElementById("dimensionThk_RHS").value = 13
  }
}

//Calculates MFZ & DMFZ
function signatureTouchDimMFZCalc(apetureMin){
  let MFZ = apetureMin * 1.5
  let DMFZ = apetureMin * 2
  document.getElementById("dimensionMFZ_LHS").value = MFZ
  document.getElementById("dimensionMFZ_RHS").value = MFZ
  document.getElementById("dimensionDMFZ_LHS").value = DMFZ
  document.getElementById("dimensionDMFZ_RHS").value = DMFZ
}






/*
lessons learnt

It clicked nesting functions within functions and using variables within the nested functions by initialising them in the top level function and passing them down to the lower functions





Improvements

Dont use buttons for naviagtion, only for performing actions
Review the HTML, should only be using 1 H1 tag per page - Review semantic HTML practices
*/