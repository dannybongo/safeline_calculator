const calculateBtn = document.getElementById("calculateBtn");
calculateBtn.addEventListener("click", calculate);

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", reset);

const returnHomeBtn = document.getElementById("homeBtn")
returnHomeBtn.addEventListener("click", returnHome);

function calculate() {
  const inputApetureWidth = parseInt(document.getElementById("inputApetureWidth").value);
  const inputApetureHeight = parseInt(document.getElementById("inputApetureHeight").value);
  const apetureMin = Math.min(inputApetureHeight, inputApetureWidth);
  const caseMaterialSelect = document.getElementById("caseMaterial");
  const caseDutyType = document.getElementById("caseDutyType");
  const detectorTypeSelect = document.getElementById("detectorType");


  //validation to ensure the user has typed/selected viable inputs.
  if (detectorTypeSelect.value === ""){
    alert("Please populate the detector type box.")
    return
  }
  if (caseMaterialSelect.value === ""){
    alert("Please populate the case material box.")
    return
  }
  if (caseDutyType.value ===""){
    alert("Please populate the case type box.")
    return
  }
  if (inputApetureWidth % 25 !== 0 || (inputApetureWidth % 10 !== 0 && inputApetureWidth % 10 !== 5)) {
    alert("Aperture width and height must be an increment of 25, e.g. 200W x 325H");
    return
  }
  if (inputApetureHeight % 25 !== 0 || (inputApetureHeight % 10 !== 0 && inputApetureHeight % 10 !== 5)) {
    alert("Aperture width and height must be an increment of 25, e.g. 200W x 325H");
    return
  }
  if (inputApetureWidth > 3000 || inputApetureWidth < 100){
    alert("Detector apeture Width outside of available product range. We can offer a width between the range of 100-3000. Please check and re-run the calculator.")
    return
  }
  if (inputApetureHeight > 1000 || inputApetureHeight < 100){
    alert("Detector apeture height outside of available product range. We can offer a width between the range of 100-1000. Please check and re-run the calculator.")
    return
  }

  document.getElementById("outputApetureWidth").value = inputApetureWidth;
  document.getElementById("outputApetureHeight").value = inputApetureHeight;
  document.getElementById("dimension100_RHS").value = 100;
  document.getElementById("dimension100_LHS").value = 100;
  document.getElementById("dimension88").value = 88;



  const array = [];
  for (let i = 50; i <= 1000; i += 25) {
    array.push(i)
  }

  //The Sig-Touch & Sig-Touch RZ share the 3 below calculated dimensions in common
  signatureTouchDimWcTCalc(inputApetureWidth);
  signatureTouchThkCalc(caseDutyType, caseMaterialSelect);
  signatureTouchCableDimCalc(caseMaterialSelect);
  detectorInfoTooltip(detectorTypeSelect);

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
  function detectorInfoTooltip(detectorTypeSelect){

    if (detectorTypeSelect.value === "signatureTouch"){
      let information = "Signature Touch metal detectors are suitable for the inspection of multiple products with different product signals without the need for adjustment or programme changes. In addition, the Signature Touch offers automatic product clustering, allowing numerous products to be inspected on one common setting."
      document.getElementById("detectorInfoOutput").value = information;
    } else {
      information = "Inspection of multiple products with different product signals without the need for adjustment or programme changes. In addition, the Signature Touch offers automatic product clustering, allowing numerous products to be inspected on one common setting. The revolutionary 'Zero Metal Free Zone' (ZMFZ) technology allows the detector to be installed in close proximity to other metal structures and equipment."
      document.getElementById("detectorInfoOutput").innerHTML = information;
    }
    }


  if (detectorTypeSelect.value === "signatureTouch") {
    signatureTouchCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect);
    console.log("test sig touch");
  } else if (detectorTypeSelect.value === "rzSignatureTouch") {
    console.log("test RZ");
    signatureTouchRZCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect, array);
  } else {
    console.log("select a detector type");
  }
  

  function signatureTouchCalc(inputApetureWidth, inputApetureHeight, apetureMin, caseMaterialSelect) {
    signatureTouchDimACalc(inputApetureWidth, inputApetureHeight);
    signatureTouchDimMFZCalc(apetureMin);
    signatureTouchDimZCalc(apetureMin, caseMaterialSelect);
    signatureTouchDimZcTCalc(apetureMin, caseMaterialSelect);
    signatureTouchLengthCalc(inputApetureWidth, dimensionA);
    signatureTouchHeightCalc(inputApetureHeight, dimensionA);
    signatureTouchWeightCalc(inputApetureWidth, inputApetureHeight, dimensionA, dimensionZ, caseMaterialSelect);

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

    }
    function signatureTouchDimMFZCalc(apetureMin) {
      let MFZ = apetureMin * 1.5
      let DMFZ = apetureMin * 2
      document.getElementById("dimensionMFZ_LHS").value = MFZ
      document.getElementById("dimensionMFZ_RHS").value = MFZ
      document.getElementById("dimensionDMFZ_LHS").value = DMFZ
      document.getElementById("dimensionDMFZ_RHS").value = DMFZ
    }
    function signatureTouchDimZCalc(apetureMin, caseMaterialSelect) {
      if (caseMaterialSelect.value === "stainlessSteel") {
        dimensionZ = apetureMin / 2 + 163
        if (dimensionZ <= 275){
          dimensionZ = 275
        }
      } else {
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
    function signatureTouchLengthCalc(inputApetureWidth, dimensionA) {
      const length = (2 * dimensionA) + inputApetureWidth + 172 - 6 - 6 //Ask tom where this comes from. Why was it written as 172-6-6
      const lengthPlusModule = length + 88
      const lengthFrontToApeture = length - inputApetureWidth - dimensionA

      document.getElementById("length").value = length
      document.getElementById("lengthPlusModule").value = lengthPlusModule
      document.getElementById("lengthFrontToApeture").value = lengthFrontToApeture
    }
    function signatureTouchHeightCalc(inputApetureHeight, dimensionA) {
      let height = dimensionA + dimensionA + inputApetureHeight
      document.getElementById("height").value = height
    }
    function signatureTouchWeightCalc(inputApetureWidth, inputApetureHeight, dimensionA, dimensionZ, caseMaterialSelect) {

    const length2 = (2 * dimensionA) + inputApetureWidth + 172 - 6 - 6 
    //the variable 'length' should passed through 'signatureTouchWeightCalc'. I kept getting 0 for an answear.  'length2' is a work-around but not the solution. Will investigate later.
      
      pottingCrossSectionalAreaValue1 = (dimensionA + inputApetureWidth + dimensionA) * dimensionA
      pottingCrossSectionalAreaValue2 = inputApetureHeight * dimensionA
      pottingCrossSectionalArea = (pottingCrossSectionalAreaValue1 + pottingCrossSectionalAreaValue2) * 2
      pottingCrossSectionalVolume = pottingCrossSectionalArea * (dimensionZ - 6 - 6)
      sandAndResinDensity = 0.0016 //Unit Of Measure g/mm^
      pottingWeight = (pottingCrossSectionalVolume * sandAndResinDensity)/1000 //Unit of Measure KG

      caseSideArea = length2 * (inputApetureHeight + dimensionA + dimensionA)
      caseFrontArea = dimensionZ * (inputApetureHeight + dimensionA + dimensionA)
      caseTopArea = length2 * dimensionZ
      caseOverallArea = (caseFrontArea + caseSideArea + caseTopArea) * 2
      caseOverallVolumeStainlessSteel = caseOverallArea * 3
      caseOverallVolumePaintedAluminium = caseOverallArea * 6
      stainlessDensity = 0.008 //Unit of measure g/mm^3
      aluminiumDensity = 0.0027 //Unit of measure g/mm^3
      stainlessSteelCaseWeight = (stainlessDensity * caseOverallVolumeStainlessSteel)/1000
      PaintedAluminiumCaseWeight = (aluminiumDensity * caseOverallVolumePaintedAluminium)/1000
      stainlessSteelOverallWeight = stainlessSteelCaseWeight + pottingWeight
      PaintedAluminiumOverallWeight = PaintedAluminiumCaseWeight + pottingWeight
      
      if (caseMaterialSelect.value === "stainlessSteel"){
        document.getElementById("weight").value = Math.round(stainlessSteelOverallWeight);
      } else {
        document.getElementById("weight").value = Math.round(PaintedAluminiumOverallWeight);
      }
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
function reset(){
  location.reload();
}
function returnHome(){
  window.location.href="../index.html"
}

/*
lessons learnt

It clicked nesting functions within functions and using variables within the nested functions by initialising them in the top level function and passing them down to the lower functions

There’s basically two places where you need to declare what variables your passing through the function.  I had not done this in both places. Simple user error
I feel like explaining the problem to a person helped me fix it. With bugs now, I have a checklist > check for typos, check for alignment between variables being called up, console log at each stage to pinpoint the issue is

Improvements

Dont use buttons for naviagtion, only for performing actions
Review the HTML, should only be using 1 H1 tag per page - Review semantic HTML practices
change to 'const' variable whwre possible!
unit tests for verifying data
the variable 'length' should passed through 'signatureTouchWeightCalc'. I kept getting 0 for an answear.  'length2' is a work-around but not the solution. Will investigate later.
correct any else if statements. if statments should end with 'else'

     //need to understand pottingCrossSectionalValue calculations
     //why is the case volume for aluminium * 6?
     //The same formula is used for the RZ, but not sure how to use the variables in both calcs
     //Need infomation from Tom on the RZ Al Oversquare figures.




to do list     


Program buttons:

reset
req dwg
print pdf
homepage

tidy information button up
verify calcs. unit testing?
*/
