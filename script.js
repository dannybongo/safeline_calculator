
//querySelector and function for opening a new window from home page

let buttons = document.querySelectorAll(".linkBtn");

function openNewWindow(url) {
  window.open(url, "_blank");
}

buttons.forEach(button => {
  button.addEventListener("click", function () {
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
  }

  document.getElementById("outputApetureWidth").value = inputApetureWidth;
  document.getElementById("outputApetureHeight").value = inputApetureHeight;
  document.getElementById("dimension100_RHS").value = 100;
  document.getElementById("dimension100_LHS").value = 100;
  document.getElementById("dimension88").value = 88;

  //The Sig-Touch & Sig-Touch RZ share the 3 below calculated dimensions in common
  signatureTouchDimWcTCalc(inputApetureWidth);
  signatureTouchThkCalc(caseDutyType, caseMaterialSelect);
  signatureTouchCableDimCalc(caseMaterialSelect);

  function signatureTouchDimWcTCalc(inputApetureWidth) {
    let dimensionWcT = inputApetureWidth + 200
    document.getElementById("dimensionWcT").value = dimensionWcT;
  }
  function signatureTouchThkCalc(caseDutyType, caseMaterialSelect) {

    if (caseDutyType.value === "heavyDuty" && caseMaterialSelect.value === "paintedAluminium") {
      document.getElementById("dimensionThk_LHS").value = 17
      document.getElementById("dimensionThk_RHS").value = 17
    }
    if (caseDutyType.value === "heavyDuty" && caseMaterialSelect.value === "stainlessSteel") {
      document.getElementById("dimensionThk_LHS").value = 17
      document.getElementById("dimensionThk_RHS").value = 17
    }
    else if (caseDutyType.value === "mediumDuty" && caseMaterialSelect.value === "paintedAluminium") {
      document.getElementById("dimensionThk_LHS").value = 4.5
      document.getElementById("dimensionThk_RHS").value = 4.5
    }
    else if (caseDutyType.value === "mediumDuty" && caseMaterialSelect.value === "stainlessSteel") {
      document.getElementById("dimensionThk_LHS").value = 13
      document.getElementById("dimensionThk_RHS").value = 13
    }
  }
  function signatureTouchCableDimCalc(caseMaterialSelect) {
    if (caseMaterialSelect.value === "stainlessSteel") {
      document.getElementById("cableDim").value = 122;
    } else {
      document.getElementById("cableDim").value = 125;
    }
  }

  if (detectorTypeSelect.value === "signatureTouch") {
    signatureTouchCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect)
  } else {
    signatureTouchRZCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect, array)
  }

  function signatureTouchCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect) {
    signatureTouchDimACalc(inputApetureWidth, inputApetureHeight);
    signatureTouchDimZCalc(apetureMin, caseMaterialSelect);
    signatureTouchDimZcTCalc(apetureMin, caseMaterialSelect);
    signatureTouchDimMFZCalc(inputApetureWidth, inputApetureHeight);

    function signatureTouchDimACalc(inputApetureWidth, inputApetureHeight) {
      if (inputApetureHeight === 50 && inputApetureWidth >= 100 && inputApetureWidth <= 1000) {
        dimensionA = 137.5
      } else if (inputApetureHeight >= 75 && inputApetureWidth >= 100 && inputApetureWidth <= 250) {
        dimensionA = 125
      } else if (inputApetureHeight >= 75 && inputApetureWidth >= 275 && inputApetureWidth <= 1000) {
        dimensionA = 135
      } else if (inputApetureHeight >= 50 && inputApetureWidth >= 1025 && inputApetureWidth <= 1500) {
        dimensionA = 145
      } else if (inputApetureHeight >= 50 && inputApetureWidth >= 1525 && inputApetureWidth <= 2000) {
        dimensionA = 155
      } else if (inputApetureHeight >= 50 && inputApetureWidth >= 2025 && inputApetureWidth <= 2500) {
        dimensionA = 165
      } else if (inputApetureHeight >= 50 && inputApetureWidth >= 2525 && inputApetureWidth <= 3000) {
        dimensionA = 175
      }

      document.getElementById("dimensionA1").value = dimensionA
      document.getElementById("dimensionA2").value = dimensionA
      document.getElementById("dimensionA3").value = dimensionA

      signatureTouchLengthCalc(inputApetureWidth, dimensionA);
      signatureTouchHeightCalc(inputApetureHeight, dimensionA);

      function signatureTouchLengthCalc(inputApetureWidth, dimensionA) {
        let length = (2 * dimensionA) + inputApetureWidth + 172 - 6 - 6 //Ask tom where this comes from. Was it writtern as 172-6-6
        let lengthPlusModule = length + 88
        let lengthFrontToApeture = length - inputApetureWidth - dimensionA

        document.getElementById("length").value = length
        document.getElementById("lengthPlusModule").value = lengthPlusModule
        document.getElementById("lengthFrontToApeture").value = lengthFrontToApeture
      }
      function signatureTouchHeightCalc(inputApetureHeight, dimensionA) {
        let height = dimensionA + dimensionA + inputApetureHeight
        document.getElementById("height").value = height
      }
    }
    function signatureTouchDimZCalc(apetureMin, caseMaterialSelect) {
      if (caseMaterialSelect.value === "stainlessSteel") {
        dimensionZ = apetureMin / 2 + 163
        if (dimensionZ <= 275){
          dimensionZ = 275
        }
      } else if (caseMaterialSelect.value === "paintedAluminium") {
        dimensionZ = apetureMin / 2 + 169
        if (dimensionZ <= 281){
          dimensionZ = 281
        }
      }

      document.getElementById("dimensionZ").value = dimensionZ;

    }
    function signatureTouchDimZcTCalc(apetureMin) {
      dimensionZcT = apetureMin / 2 + 125

      if (dimensionZcT <= 237){
        dimensionZcT = 237
      }
      document.getElementById("dimensionZcT").value = dimensionZcT;
      document.getElementById("dimensionZ2_LHS").value = dimensionZcT / 2;
      document.getElementById("dimensionZ2_RHS").value = dimensionZcT / 2;
    }
    function signatureTouchDimMFZCalc(apetureMin) {
      let MFZ = apetureMin * 1.5
      let DMFZ = apetureMin * 2
      document.getElementById("dimensionMFZ_LHS").value = MFZ
      document.getElementById("dimensionMFZ_RHS").value = MFZ
      document.getElementById("dimensionDMFZ_LHS").value = DMFZ
      document.getElementById("dimensionDMFZ_RHS").value = DMFZ
    }

    signatureTouchWeightCalc(inputApetureWidth, inputApetureHeight, dimensionA, dimensionZ, length, caseMaterialSelect);

    function signatureTouchWeightCalc(inputApetureWidth, inputApetureHeight, dimensionA, dimensionZ, length, caseMaterialSelect) {

     pottingCrossSectionalAreaValue1 = (dimensionA + inputApetureWidth + dimensionA) * dimensionA
     pottingCrossSectionalAreaValue2 = inputApetureHeight * dimensionA
     pottingCrossSectionalArea = (pottingCrossSectionalAreaValue1 + pottingCrossSectionalAreaValue2) * 2
     pottingCrossSectionalVolume = pottingCrossSectionalArea * (dimensionZ - 6 - 6)
     sandAndResinDensity = 0.0016 //Unit Of Measure g/mm^
     pottingWeight = (pottingCrossSectionalVolume * sandAndResinDensity)/1000 //Unit of Measure KG

     caseSideArea = length * (inputApetureHeight + dimensionA + dimensionA)
     caseFrontArea = dimensionZ * (inputApetureHeight + dimensionA + dimensionA)
     caseTopArea = length * dimensionZ
     caseOverallArea = (caseFrontArea * caseSideArea * caseTopArea) * 2
     stainlessDensity = 0.008 //Unit of measure g/mm^3
     aluminiumDensity = 0.0027 //Unit of measure g/mm^3
     stainlessSteelCaseWeight = stainlessDensity * caseOverallArea
     PaintedAluminiumCaseWeight = aluminiumDensity * caseOverallArea

     console.log("dimensionA " + dimensionA)
     console.log("dimensionZ " + dimensionZ)
     console.log("inputApetureWidth " + inputApetureWidth)
     console.log("inputApetureHeight " + inputApetureHeight)
     console.log("length " + length)
      
     console.log("pottingCrossSectionalAreaValue1 " + pottingCrossSectionalAreaValue1)
     console.log("pottingCrossSectionalAreaValue2 " +  pottingCrossSectionalAreaValue2)
     console.log("pottingCrossSectionalArea " + pottingCrossSectionalArea)
     console.log("pottingCrossSectionalVolume " + pottingCrossSectionalVolume)
     console.log("pottingWeight " + pottingWeight)

     console.log("caseSideArea " + caseSideArea)
     console.log("caseFrontArea " + caseFrontArea)
     console.log("caseTopArea " + caseTopArea)
     console.log("caseOverallArea " + caseOverallArea)
     console.log("stainlessSteelCaseWeight " + stainlessSteelCaseWeight)
     console.log("PaintedAluminiumCaseWeight " + PaintedAluminiumCaseWeight)

     if (caseMaterialSelect === "stainlessSteel"){
     stainlessSteelOverallWeight = stainlessSteelCaseWeight + pottingWeight
     document.getElementById("weight").value = stainlessSteelOverallWeight
     console.log("SS " + stainlessSteelOverallWeight)
     } else {
      PaintedAluminiumOverallWeight = PaintedAluminiumCaseWeight + pottingWeight
      document.getElementById("weight").value = PaintedAluminiumCaseWeight
      console.log("PA " + PaintedAluminiumOverallWeight)
     }

     //need to understand pottingCrossSectionalValue calculations
     //why is the case volume for aluminium * 6?
     //The same formula is used for the RZ, but not sure how to use the variables in both calcs
    }


  }

  function signatureTouchRZCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect, array) {

    signatureTouchRZ_DimA_SS_Calc(inputApetureHeight)
    signatureTouchRZ_DimMFZ_SS_Calc(apetureMin)

    function signatureTouchRZ_DimA_SS_Calc(inputApetureWidth) {
      if (inputApetureWidth <= 50) {
        RZDimensionA = 137.5;
      } else if (inputApetureWidth > 51 && inputApetureWidth <= 250) {
        RZDimensionA = 125;
      } else {
        RZDimensionA = 135;
      }

      document.getElementById("dimensionA1").value = RZDimensionA
      document.getElementById("dimensionA2").value = RZDimensionA
      document.getElementById("dimensionA3").value = RZDimensionA

      signatureTouchRZLengthCalc(inputApetureWidth, RZDimensionA, caseMaterialSelect);
      signatureTouchRZHeightCalc(inputApetureHeight, RZDimensionA);

      function signatureTouchRZLengthCalc(inputApetureWidth, RZDimensionA, caseMaterialSelect) {
        if (caseMaterialSelect === "stainlessSteel") {
          RZdimensionLength = ((inputApetureWidth + 15) + (RZDimensionA - 7.5) + (RZDimensionA + 122.5) - 6 - 6)
        } else {
          RZdimensionLength = inputApetureWidth + 14 + RZDimensionA + RZDimensionA + 130

          RZlengthPlusModule = RZdimensionLength + 88
          let RZlengthFrontToApeture = RZdimensionLength - inputApetureWidth - RZDimensionA;

          document.getElementById("length").value = RZdimensionLength;
          document.getElementById("lengthPlusModule").value = RZlengthPlusModule;
          document.getElementById("lengthFrontToApeture").value = RZlengthFrontToApeture;
        }
      }
      function signatureTouchRZHeightCalc(inputApetureHeight, RZDimensionA) {
        let height = RZDimensionA + RZDimensionA + inputApetureHeight
        document.getElementById("height").value = height
      }
    }

    function signatureTouchRZ_DimMFZ_SS_Calc(apetureMin) {

      RZ_MFZ = apetureMin / 2

      document.getElementById("dimensionMFZ_LHS").value = RZ_MFZ
      document.getElementById("dimensionMFZ_RHS").value = RZ_MFZ
      document.getElementById("dimensionDMFZ_LHS").value = apetureMin
      document.getElementById("dimensionDMFZ_RHS").value = apetureMin
    }

    if (caseMaterialSelect.value === "stainlessSteel") {
      signatureTouchRZ_DimZ_SS_Calc(inputApetureHeight, inputApetureWidth, array);
      signatureTouchRZ_DimZcT_SS_Calc(inputApetureHeight, inputApetureWidth, array);
    } else {
      signatureTouchRZ_DimZ_PA_Calc(inputApetureHeight, inputApetureWidth, array);
      signatureTouchRZ_DimZcT_PA_Calc(inputApetureHeight, inputApetureWidth, array);
    }

    function signatureTouchRZ_DimZ_SS_Calc(inputApetureHeight, inputApetureWidth, array) {

      let index = array.indexOf(inputApetureHeight); //if the apeture height is in the array, return the index of the value in the array
      let signatureTouchRZ_DimZ_SS_Oversquare_Array = [275, 275, 275, 275, 275, 275, 275, 275, 306, 338, 369, 400, 432, 464, 494, 525, 556, 588, 619, 650, 682, 713, 744, 775, 807, 838, 869, 900, 932, 963, 994, 1025, 1057, 1088, 1119, 1150, 1182, 1213, 1244];
      let signatureTouchRZ_DimZ_SS_Rect_Array = [275, 275, 275, 275, 275, 319, 354, 387, 419, 434, 444, 457, 469, 481, 494, 525, 556, 588, 619, 650, 682, 713, 744, 775, 807, 838, 869, 900, 932, 963, 994, 1025, 1057, 1088, 1119, 1150, 1182, 1213, 1244];

      if (inputApetureHeight >= inputApetureWidth) {
        document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_SS_Oversquare_Array[index]
      } else {
        document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_SS_Rect_Array[index]
      }
    }
    function signatureTouchRZ_DimZcT_SS_Calc(inputApetureHeight, inputApetureWidth, array) {

      let index = array.indexOf(inputApetureHeight);
      let signatureTouchRZ_DimZcT_SS_Oversquare_Array = [237, 237, 237, 237, 237, 237, 237, 237, 268, 300, 331, 362, 394, 426, 456, 487, 518, 550, 581, 612, 644, 675, 706, 737, 769, 800, 830, 862, 894, 925, 956, 987, 1019, 1050, 1081, 1112, 1144, 1175, 1206]
      let signatureTouchRZ_DimZcT_SS_Rect_Array = [237, 237, 237, 237, 237, 281, 316, 349, 381, 396, 406, 419, 431, 443, 456, 487, 518, 550, 581, 612, 644, 675, 706, 737, 769, 800, 830, 862, 894, 925, 956, 987, 1019, 1050, 1081, 1112, 1144, 1175, 1206]

      if (inputApetureHeight >= inputApetureWidth) {
        document.getElementById("dimensionZcT").value = signatureTouchRZ_DimZcT_SS_Oversquare_Array[index]
        document.getElementById("dimensionZ2_RHS").value = signatureTouchRZ_DimZcT_SS_Oversquare_Array[index] / 2
        document.getElementById("dimensionZ2_LHS").value = signatureTouchRZ_DimZcT_SS_Oversquare_Array[index] / 2
      } else {
        document.getElementById("dimensionZcT").value = signatureTouchRZ_DimZcT_SS_Rect_Array[index]
        document.getElementById("dimensionZ2_RHS").value = signatureTouchRZ_DimZcT_SS_Rect_Array[index] / 2
        document.getElementById("dimensionZ2_LHS").value = signatureTouchRZ_DimZcT_SS_Rect_Array[index] / 2
      }

    }
    function signatureTouchRZ_DimZ_PA_Calc(inputApetureHeight, inputApetureWidth, array) {

      let index = array.indexOf(inputApetureHeight);
      let signatureTouchRZ_DimZ_PA_Oversquare_Array = [1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111] //Tom to confirm these values
      let signatureTouchRZ_DimZ_PA_Rect_Array = [275, 275, 275, 275, 275, 325, 360, 393, 425, 440, 450, 463, 475, 487, 500, 531, 562, 594, 625, 625, 625, 625, 750, 750, 750, 750, 875, 875, 875, 875, 1000, 1000, 1000, 1000, 1125, 1125, 1125, 1125, 1250]


      if (inputApetureHeight >= inputApetureWidth) {
        document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_PA_Oversquare_Array[index]
      } else {
        document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_PA_Rect_Array[index]
      }
    }
    function signatureTouchRZ_DimZcT_PA_Calc(inputApetureHeight, inputApetureWidth, array) {

      let index = array.indexOf(inputApetureHeight);
      let signatureTouchRZ_ZctDim_SS_Oversquare_Array = [1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111] //Tom to confirm these values
      let signatureTouchRZ_ZctDim_SS_Rect_Array = [237, 237, 237, 237, 237, 281, 316, 349, 381, 396, 406, 419, 431, 443, 456, 487, 518, 550, 581, 581, 581, 581, 706, 706, 706, 706, 830, 830, 830, 830, 956, 956, 956, 956, 1081, 1081, 1081, 1081, 1206]

      if (inputApetureHeight >= inputApetureWidth) {
        document.getElementById("dimensionZcT").value = signatureTouchRZ_ZctDim_SS_Oversquare_Array[index]
        document.getElementById("dimensionZ2_RHS").value = signatureTouchRZ_ZctDim_SS_Oversquare_Array[index] / 2
        document.getElementById("dimensionZ2_LHS").value = signatureTouchRZ_ZctDim_SS_Oversquare_Array[index] / 2
      } else {
        document.getElementById("dimensionZcT").value = signatureTouchRZ_ZctDim_SS_Rect_Array[index]
        document.getElementById("dimensionZ2_RHS").value = signatureTouchRZ_ZctDim_SS_Rect_Array[index] / 2
        document.getElementById("dimensionZ2_LHS").value = signatureTouchRZ_ZctDim_SS_Rect_Array[index] / 2
      }
    }
  }
}

/*
lessons learnt

It clicked nesting functions within functions and using variables within the nested functions by initialising them in the top level function and passing them down to the lower functions



Improvements

Dont use buttons for naviagtion, only for performing actions
Review the HTML, should only be using 1 H1 tag per page - Review semantic HTML practices
*/
