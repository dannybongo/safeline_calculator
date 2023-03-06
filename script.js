
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
  let caseDutyType = document.getElementById("caseDutyType");
  let detectorTypeSelect = document.getElementById("detectorType");

  let array = [];
  for (let i = 50; i <= 1000; i += 25) {
    array.push(i)

  document.getElementById("outputApetureWidth").value = inputApetureWidth;
  document.getElementById("outputApetureHeight").value = inputApetureHeight;

  //The Sig-Touch & Sig-Touch RZ share the same WcT and flange thickness dimensions
  signatureTouchDimWcTCalc(inputApetureWidth);
  signatureTouchThkCalc(caseDutyType, caseMaterialSelect);

  if (detectorTypeSelect.value === "signatureTouch") {
    signatureTouchCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect)
  } else {
    signatureTouchRZCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect)
  }
}
}

function signatureTouchCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect){
  signatureTouchDimACalc(inputApetureWidth,inputApetureHeight);
  signatureTouchDimZCalc(apetureMin, caseMaterialSelect);
  signatureTouchDimZcTCalc(apetureMin, caseMaterialSelect);
  signatureTouchDimMFZCalc(inputApetureWidth,inputApetureHeight);
}

function signatureTouchRZCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect){

  // signatureTouchRZ_DimA_SS_Calc()
  // signatureTouchRZ_DimMFZ_SS_Calc()
  // signatureTouchRZ_DimDMFZ_SS_Calc()

  if (caseMaterialSelect.value === "stainlessSteel" ){
    signatureTouchRZ_DimZ_SS_Calc(inputApetureHeight, inputApetureWidth, array);
    signatureTouchRZ_DimZcT_SS_Calc(inputApetureHeight, inputApetureWidth, array);
  } else {
    signatureTouchRZ_DimZ_PA_Calc(inputApetureHeight, inputApetureWidth, array);
    signatureTouchRZ_DimZcT_PA_Calc(inputApetureHeight, inputApetureWidth, array);
  }

}

function signatureTouchRZ_DimZ_SS_Calc(inputApetureHeight, inputApetureWidth, array) {

  let index = array.indexOf(inputApetureHeight); //if the apeture height is in the array, return the index of the value in the array
  let signatureTouchRZ_DimZ_SS_Oversquare_Array = [275,275,275,275,275,275,275,275,306,338,369,400,432,464,494,525,556,588,619,650,682,713,744,775,807,838,869,900,932,963,994,1025,1057,1088,1119,1150,1182,1213,1244];
  let signatureTouchRZ_DimZ_SS_Rect_Array = [275,275,275,275,275,319,354,387,419,434,444,457,469,481,494,525,556,588,619,650,682,713,744,775,807,838,869,900,932,963,994,1025,1057,1088,1119,1150,1182,1213,1244];
  
  if (inputApetureHeight >= inputApetureWidth){
    document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_SS_Oversquare_Array[index]
  } else {
    document.getElementById("dimensionZ").value =signatureTouchRZ_DimZ_SS_Rect_Array[index]
  }
 }

function signatureTouchRZ_DimZcT_SS_Calc(inputApetureHeight, inputApetureWidth, array) {

  let index = array.indexOf(inputApetureHeight);
  let signatureTouchRZ_DimZcT_SS_Oversquare_Array = [237,237,237,237,237,237,237,237,268,300,331,362,394,426,456,487,518,550,581,612,644,675,706,737,769,800,830,862,894,925,956,987,1019,1050,1081,1112,1144,1175,1206]
  let signatureTouchRZ_DimZcT_SS_Rect_Array = [237,237,237,237,237,281,316,349,381,396,406,419,431,443,456,487,518,550,581,612,644,675,706,737,769,800,830,862,894,925,956,987,1019,1050,1081,1112,1144,1175,1206]

  if (inputApetureHeight >= inputApetureWidth){
    document.getElementById("dimensionZcT").value = signatureTouchRZ_DimZcT_SS_Oversquare_Array[index]
  } else {
    document.getElementById("dimensionZcT").value = signatureTouchRZ_DimZcT_SS_Rect_Array[index]
  }
 }

 function signatureTouchRZ_DimZ_PA_Calc(inputApetureHeight, inputApetureWidth, array) {

  let index = array.indexOf(inputApetureHeight);
  let signatureTouchRZ_DimZ_PA_Oversquare_Array = [1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111] //Tom to confirm these values
  let signatureTouchRZ_DimZ_PA_Rect_Array = [275,275,275,275,275,325,360,393,425,440,450,463,475,487,500,531,562,594,625,625,625,625,750,750,750,750,875,875,875,875,1000,1000,1000,1000,1125,1125,1125,1125,1250]


  if (inputApetureHeight >= inputApetureWidth){
    document.getElementById("dimensionZcT").value = signatureTouchRZ_DimZ_PA_Oversquare_Array[index]
  } else {
    document.getElementById("dimensionZcT").value = signatureTouchRZ_DimZ_PA_Rect_Array[index]
  }
 }

 function signatureTouchRZ_DimZcT_PA_Calc(inputApetureHeight, inputApetureWidth, array) {

  let index = array.indexOf(inputApetureHeight);
  let signatureTouchRZ_ZctDim_SS_Oversquare_Array = [1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111,1111111] //Tom to confirm these values
  let signatureTouchRZ_ZctDim_SS_Rect_Array = [237,237,237,237,237,281,316,349,381,396,406,419,431,443,456,487,518,550,581,581,581,581,706,706,706,706,830,830,830,830,956,956,956,956,1081,1081,1081,1081,1206]
 
  if (inputApetureHeight >= inputApetureWidth){
    document.getElementById("dimensionZcT").value = signatureTouchRZ_ZctDim_SS_Oversquare_Array[index]
  } else {
    document.getElementById("dimensionZcT").value = signatureTouchRZ_ZctDim_SS_Rect_Array[index]
  }
 }

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

  if (caseDutyType.value === "heavyDuty" && caseMaterialSelect.value === "paintedAluminium"){
    document.getElementById("dimensionThk_LHS").value = 17
    document.getElementById("dimensionThk_RHS").value = 17
  }
  if (caseDutyType.value === "heavyDuty" && caseMaterialSelect.value === "stainlessSteel"){
    document.getElementById("dimensionThk_LHS").value = 17
    document.getElementById("dimensionThk_RHS").value = 17
  }
  else if (caseDutyType.value === "mediumDuty" && caseMaterialSelect.value === "paintedAluminium"){
    document.getElementById("dimensionThk_LHS").value = 4.5
    document.getElementById("dimensionThk_RHS").value = 4.5
  }
  else if (caseDutyType.value === "mediumDuty" && caseMaterialSelect.value === "stainlessSteel"){
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