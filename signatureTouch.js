const calculateBtn = document.getElementById("calculateBtn");
calculateBtn.addEventListener("click", calculate);

function calculate() {
  const apetureWidth = parseInt(document.getElementById("apetureWidth").value);
  const apetureHeight = parseInt(document.getElementById("apetureHeight").value);
  const caseMaterial = document.getElementById("caseMaterialType");
  const caseDutyType = document.getElementById("caseDutyType");
  const detectorType = document.getElementById("detectorType");
  const apetureMin = Math.min(apetureHeight, apetureWidth);



  //validation to ensure the user has typed/selected viable s.
  if (detectorType.value === "") {
    alert("populate the detector type box.")
    return
  }
  if (caseMaterial.value === "") {
    alert("populate the case material box.")
    return
  }
  if (caseDutyType.value === "") {
    alert("populate the case type box.")
    return
  }
  if (apetureWidth % 25 !== 0 || (apetureWidth % 10 !== 0 && apetureWidth % 10 !== 5)) {
    alert("Aperture width and height must be an increment of 25, e.g. 200W x 325H");
    return
  }
  if (apetureHeight % 25 !== 0 || (apetureHeight % 10 !== 0 && apetureHeight % 10 !== 5)) {
    alert("Aperture width and height must be an increment of 25, e.g. 200W x 325H");
    return
  }
  if (apetureWidth > 3000 || apetureWidth < 100) {
    alert("Detector apeture Width outside of available product range. We can offer a width between the range of 100-3000. Please check and re-run the calculator.")
    return
  }
  if (apetureHeight > 1000 || apetureHeight < 100) {
    alert("Detector apeture height outside of available product range. We can offer a width between the range of 100-1000. Please check and re-run the calculator.")
    return
  }

  document.getElementById("outputapetureWidth").value = apetureWidth;
  document.getElementById("outputapetureHeight").value = apetureHeight;
  document.getElementById("dimension100_RHS").value = 100;
  document.getElementById("dimension100_LHS").value = 100;
  document.getElementById("dimension88").value = 88;



  const array = [];
  for (let i = 50; i <= 1000; i += 25) {
    array.push(i)
  }

  //The Sig-Touch & Sig-Touch RZ share the 3 below calculated dimensions in common
  signatureTouchDimWcTCalc(apetureWidth);
  signatureTouchThkCalc(caseDutyType, caseMaterial);
  signatureTouchCableDimCalc(caseMaterial);
  detectorInfoTooltip(detectorType);

  function signatureTouchDimWcTCalc(apetureWidth) {
    let dimensionWcT = apetureWidth + 200
    document.getElementById("dimensionWcT").value = dimensionWcT;
  }
  function signatureTouchThkCalc(caseDutyType, caseMaterial) {

    if (caseDutyType.value === "heavyDuty" && caseMaterial.value === "paintedAluminium") {
      document.getElementById("dimensionThk_LHS").value = 17
      document.getElementById("dimensionThk_RHS").value = 17
    }
    if (caseDutyType.value === "heavyDuty" && caseMaterial.value === "stainlessSteel") {
      document.getElementById("dimensionThk_LHS").value = 17
      document.getElementById("dimensionThk_RHS").value = 17
    }
    else if (caseDutyType.value === "mediumDuty" && caseMaterial.value === "paintedAluminium") {
      document.getElementById("dimensionThk_LHS").value = 4.5
      document.getElementById("dimensionThk_RHS").value = 4.5
    }
    else if (caseDutyType.value === "mediumDuty" && caseMaterial.value === "stainlessSteel") {
      document.getElementById("dimensionThk_LHS").value = 13
      document.getElementById("dimensionThk_RHS").value = 13
    }
  }
  function signatureTouchCableDimCalc(caseMaterial) {
    if (caseMaterial.value === "stainlessSteel") {
      document.getElementById("cableDim").value = 122;
    } else {
      document.getElementById("cableDim").value = 125;
    }
  }
  function detectorInfoTooltip(detectorType) {

    if (detectorType.value === "signatureTouch") {
      let information = "Signature Touch metal detectors are suitable for the inspection of multiple products with different product signals without the need for adjustment or programme changes. In addition, the Signature Touch offers automatic product clustering, allowing numerous products to be inspected on one common setting."
      document.getElementById("detectorInfoOutput").value = information;
    } else {
      information = "Inspection of multiple products with different product signals without the need for adjustment or programme changes. In addition, the Signature Touch offers automatic product clustering, allowing numerous products to be inspected on one common setting. The revolutionary 'Zero Metal Free Zone' (ZMFZ) technology allows the detector to be installed in close proximity to other metal structures and equipment."
      document.getElementById("detectorInfoOutput").innerHTML = information;
    }
  }


  if (detectorType.value === "signatureTouch") {
    signatureTouchCalc(apetureWidth, apetureHeight, apetureMin, caseMaterial);
    console.log("test sig touch");
  } else if (detectorType.value === "rzSignatureTouch") {
    console.log("test RZ");
    signatureTouchRZCalc(apetureWidth, apetureHeight, apetureMin, caseMaterial, array);
  } else {
    console.log("select a detector type");
  }


  function signatureTouchCalc(apetureWidth, apetureHeight, apetureMin, caseMaterial) {
    signatureTouchDimACalc(apetureWidth, apetureHeight);
    signatureTouchDimMFZCalc(apetureMin);
    signatureTouchDimZCalc(apetureMin, caseMaterial);
    signatureTouchDimZcTCalc(apetureMin, caseMaterial);
    signatureTouchLengthCalc(apetureWidth, dimensionA);
    signatureTouchHeightCalc(apetureHeight, dimensionA);
    signatureTouchWeightCalc(apetureWidth, apetureHeight, dimensionA, dimensionZ, caseMaterial);

    function signatureTouchDimACalc(apetureWidth, apetureHeight) {
      if (apetureHeight === 50 && apetureWidth >= 100 && apetureWidth <= 1000) {
        dimensionA = 137.5
      } else if (apetureHeight >= 75 && apetureWidth >= 100 && apetureWidth <= 250) {
        dimensionA = 125
      } else if (apetureHeight >= 75 && apetureWidth >= 275 && apetureWidth <= 1000) {
        dimensionA = 135
      } else if (apetureHeight >= 50 && apetureWidth >= 1025 && apetureWidth <= 1500) {
        dimensionA = 145
      } else if (apetureHeight >= 50 && apetureWidth >= 1525 && apetureWidth <= 2000) {

        dimensionA = 155
      } else if (apetureHeight >= 50 && apetureWidth >= 2025 && apetureWidth <= 2500) {
        dimensionA = 165
      } else if (apetureHeight >= 50 && apetureWidth >= 2525 && apetureWidth <= 3000) {
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
    function signatureTouchDimZCalc(apetureMin, caseMaterial) {
      if (caseMaterial.value === "stainlessSteel") {
        dimensionZ = apetureMin / 2 + 163
        if (dimensionZ <= 275) {
          dimensionZ = 275
        }
      } else {
        dimensionZ = apetureMin / 2 + 169
        if (dimensionZ <= 281) {
          dimensionZ = 281
        }
      }

      document.getElementById("dimensionZ").value = dimensionZ;

    }
    function signatureTouchDimZcTCalc(apetureMin) {
      dimensionZcT = apetureMin / 2 + 125

      if (dimensionZcT <= 237) {
        dimensionZcT = 237
      }
      document.getElementById("dimensionZcT").value = dimensionZcT;
      document.getElementById("dimensionZ2_LHS").value = dimensionZcT / 2;
      document.getElementById("dimensionZ2_RHS").value = dimensionZcT / 2;
    }
    function signatureTouchLengthCalc(apetureWidth, dimensionA) {
      const length = (2 * dimensionA) + apetureWidth + 172 - 6 - 6 //Ask tom where this comes from. Why was it written as 172-6-6
      const lengthPlusModule = length + 88
      const lengthFrontToApeture = length - apetureWidth - dimensionA

      document.getElementById("length").value = length
      document.getElementById("lengthPlusModule").value = lengthPlusModule
      document.getElementById("lengthFrontToApeture").value = lengthFrontToApeture
    }
    function signatureTouchHeightCalc(apetureHeight, dimensionA) {
      let height = dimensionA + dimensionA + apetureHeight
      document.getElementById("height").value = height
    }
    function signatureTouchWeightCalc(apetureWidth, apetureHeight, dimensionA, dimensionZ, caseMaterial) {

      const length2 = (2 * dimensionA) + apetureWidth + 172 - 6 - 6
      //the variable 'length' should passed through 'signatureTouchWeightCalc'. I kept getting 0 for an answear.  'length2' is a work-around but not the solution. Will investigate later.

      pottingCrossSectionalAreaValue1 = (dimensionA + apetureWidth + dimensionA) * dimensionA
      pottingCrossSectionalAreaValue2 = apetureHeight * dimensionA
      pottingCrossSectionalArea = (pottingCrossSectionalAreaValue1 + pottingCrossSectionalAreaValue2) * 2
      pottingCrossSectionalVolume = pottingCrossSectionalArea * (dimensionZ - 6 - 6)
      sandAndResinDensity = 0.0016 //Unit Of Measure g/mm^
      pottingWeight = (pottingCrossSectionalVolume * sandAndResinDensity) / 1000 //Unit of Measure KG

      caseSideArea = length2 * (apetureHeight + dimensionA + dimensionA)
      caseFrontArea = dimensionZ * (apetureHeight + dimensionA + dimensionA)
      caseTopArea = length2 * dimensionZ
      caseOverallArea = (caseFrontArea + caseSideArea + caseTopArea) * 2
      caseOverallVolumeStainlessSteel = caseOverallArea * 3
      caseOverallVolumePaintedAluminium = caseOverallArea * 6
      stainlessDensity = 0.008 //Unit of measure g/mm^3
      aluminiumDensity = 0.0027 //Unit of measure g/mm^3
      stainlessSteelCaseWeight = (stainlessDensity * caseOverallVolumeStainlessSteel) / 1000
      PaintedAluminiumCaseWeight = (aluminiumDensity * caseOverallVolumePaintedAluminium) / 1000
      stainlessSteelOverallWeight = stainlessSteelCaseWeight + pottingWeight
      PaintedAluminiumOverallWeight = PaintedAluminiumCaseWeight + pottingWeight

      if (caseMaterial.value === "stainlessSteel") {
        document.getElementById("weight").value = Math.round(stainlessSteelOverallWeight);
      } else {
        document.getElementById("weight").value = Math.round(PaintedAluminiumOverallWeight);
      }
    }

  }

  function signatureTouchRZCalc(apetureWidth, apetureHeight, apetureMin, caseMaterial, array) {

    signatureTouchRZ_DimA_SS_Calc(apetureHeight)
    signatureTouchRZ_DimMFZ_SS_Calc(apetureMin)

    function signatureTouchRZ_DimA_SS_Calc(apetureWidth) {
      if (apetureWidth <= 50) {
        RZDimensionA = 137.5;
      } else if (apetureWidth > 51 && apetureWidth <= 250) {
        RZDimensionA = 125;
      } else {
        RZDimensionA = 135;
      }

      document.getElementById("dimensionA1").value = RZDimensionA
      document.getElementById("dimensionA2").value = RZDimensionA
      document.getElementById("dimensionA3").value = RZDimensionA

      signatureTouchRZLengthCalc(apetureWidth, RZDimensionA, caseMaterial);
      signatureTouchRZHeightCalc(apetureHeight, RZDimensionA);

      function signatureTouchRZLengthCalc(apetureWidth, RZDimensionA, caseMaterial) {
        if (caseMaterial === "stainlessSteel") {
          RZdimensionLength = ((apetureWidth + 15) + (RZDimensionA - 7.5) + (RZDimensionA + 122.5) - 6 - 6)
        } else {
          RZdimensionLength = apetureWidth + 14 + RZDimensionA + RZDimensionA + 130

          RZlengthPlusModule = RZdimensionLength + 88
          let RZlengthFrontToApeture = RZdimensionLength - apetureWidth - RZDimensionA;

          document.getElementById("length").value = RZdimensionLength;
          document.getElementById("lengthPlusModule").value = RZlengthPlusModule;
          document.getElementById("lengthFrontToApeture").value = RZlengthFrontToApeture;
        }
      }
      function signatureTouchRZHeightCalc(apetureHeight, RZDimensionA) {
        let height = RZDimensionA + RZDimensionA + apetureHeight
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

    if (caseMaterial.value === "stainlessSteel") {
      signatureTouchRZ_DimZ_SS_Calc(apetureHeight, apetureWidth, array);
      signatureTouchRZ_DimZcT_SS_Calc(apetureHeight, apetureWidth, array);
    } else {
      signatureTouchRZ_DimZ_PA_Calc(apetureHeight, apetureWidth, array);
      signatureTouchRZ_DimZcT_PA_Calc(apetureHeight, apetureWidth, array);
    }
    function signatureTouchRZ_DimZ_SS_Calc(apetureHeight, apetureWidth, array) {

      let index = array.indexOf(apetureHeight); //if the apeture height is in the array, return the index of the value in the array
      let signatureTouchRZ_DimZ_SS_Oversquare_Array = [275, 275, 275, 275, 275, 275, 275, 275, 306, 338, 369, 400, 432, 464, 494, 525, 556, 588, 619, 650, 682, 713, 744, 775, 807, 838, 869, 900, 932, 963, 994, 1025, 1057, 1088, 1119, 1150, 1182, 1213, 1244];
      let signatureTouchRZ_DimZ_SS_Rect_Array = [275, 275, 275, 275, 275, 319, 354, 387, 419, 434, 444, 457, 469, 481, 494, 525, 556, 588, 619, 650, 682, 713, 744, 775, 807, 838, 869, 900, 932, 963, 994, 1025, 1057, 1088, 1119, 1150, 1182, 1213, 1244];

      if (apetureHeight >= apetureWidth) {
        document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_SS_Oversquare_Array[index]
      } else {
        document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_SS_Rect_Array[index]
      }
    }
    function signatureTouchRZ_DimZcT_SS_Calc(apetureHeight, apetureWidth, array) {

      let index = array.indexOf(apetureHeight);
      let signatureTouchRZ_DimZcT_SS_Oversquare_Array = [237, 237, 237, 237, 237, 237, 237, 237, 268, 300, 331, 362, 394, 426, 456, 487, 518, 550, 581, 612, 644, 675, 706, 737, 769, 800, 830, 862, 894, 925, 956, 987, 1019, 1050, 1081, 1112, 1144, 1175, 1206]
      let signatureTouchRZ_DimZcT_SS_Rect_Array = [237, 237, 237, 237, 237, 281, 316, 349, 381, 396, 406, 419, 431, 443, 456, 487, 518, 550, 581, 612, 644, 675, 706, 737, 769, 800, 830, 862, 894, 925, 956, 987, 1019, 1050, 1081, 1112, 1144, 1175, 1206]

      if (apetureHeight >= apetureWidth) {
        document.getElementById("dimensionZcT").value = signatureTouchRZ_DimZcT_SS_Oversquare_Array[index]
        document.getElementById("dimensionZ2_RHS").value = signatureTouchRZ_DimZcT_SS_Oversquare_Array[index] / 2
        document.getElementById("dimensionZ2_LHS").value = signatureTouchRZ_DimZcT_SS_Oversquare_Array[index] / 2
      } else {
        document.getElementById("dimensionZcT").value = signatureTouchRZ_DimZcT_SS_Rect_Array[index]
        document.getElementById("dimensionZ2_RHS").value = signatureTouchRZ_DimZcT_SS_Rect_Array[index] / 2
        document.getElementById("dimensionZ2_LHS").value = signatureTouchRZ_DimZcT_SS_Rect_Array[index] / 2
      }

    }
    function signatureTouchRZ_DimZ_PA_Calc(apetureHeight, apetureWidth, array) {

      let index = array.indexOf(apetureHeight);
      let signatureTouchRZ_DimZ_PA_Oversquare_Array = [1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111] //Tom to confirm these values
      let signatureTouchRZ_DimZ_PA_Rect_Array = [275, 275, 275, 275, 275, 325, 360, 393, 425, 440, 450, 463, 475, 487, 500, 531, 562, 594, 625, 625, 625, 625, 750, 750, 750, 750, 875, 875, 875, 875, 1000, 1000, 1000, 1000, 1125, 1125, 1125, 1125, 1250]


      if (apetureHeight >= apetureWidth) {
        document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_PA_Oversquare_Array[index]
      } else {
        document.getElementById("dimensionZ").value = signatureTouchRZ_DimZ_PA_Rect_Array[index]
      }
    }
    function signatureTouchRZ_DimZcT_PA_Calc(apetureHeight, apetureWidth, array) {

      let index = array.indexOf(apetureHeight);
      let signatureTouchRZ_ZctDim_SS_Oversquare_Array = [1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111, 1111111] //Tom to confirm these values
      let signatureTouchRZ_ZctDim_SS_Rect_Array = [237, 237, 237, 237, 237, 281, 316, 349, 381, 396, 406, 419, 431, 443, 456, 487, 518, 550, 581, 581, 581, 581, 706, 706, 706, 706, 830, 830, 830, 830, 956, 956, 956, 956, 1081, 1081, 1081, 1081, 1206]

      if (apetureHeight >= apetureWidth) {
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

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", reset);

function reset() {
  location.reload();
}

const returnHomeBtn = document.getElementById("homeBtn");
returnHomeBtn.addEventListener('click', () => {
  window.location.href = "../index.html"
});

const openDrawingRequestBtn = document.getElementById("requestDrawingBtn");
openDrawingRequestBtn.addEventListener('click', () => {
  document.getElementById("drawingRequestForm").style.display = "flex";
});

const returnBtn = document.getElementById("returnBtn");
returnBtn.addEventListener('click', () => {
  document.getElementById("drawingRequestForm").style.display = "none";
});

const sendDrawingRequestBtn = document.getElementById("sendDrawingRequestBtn");
sendDrawingRequestBtn.addEventListener("click", sendDrawingRequest);

function sendDrawingRequest() {
  const drawingNumber = document.getElementById('drawingNumber').value;
  const requestedBy = document.getElementById('requestedBy').value;
  const drawingRecipient = document.getElementById('drawingRecipient').value;
  const pdfRequired = document.getElementById('pdfRequired').checked;
  const dwgRequired = document.getElementById('dwgRequired').checked;
  const dfxRequired = document.getElementById('dfxRequired').checked;
  const stepRequired = document.getElementById('stepRequired').checked;
  const additionalNotes = document.getElementById('additionalNotes').value;

  if (drawingNumber === "") {
    alert("Please populate the 'drawing number' box")
    return
  }
  if (requestedBy === "") {
    alert("Please populate the 'requested by' box")
    return
  }
  if (drawingRecipient === "") {
    alert("Please populate 'drawing recipient' box")
    return
  }

  const emailTemplate =

    `Hi,
  
  I would like to request a drawing with the following details:

  Drawing Number: ${drawingNumber}
  Requested By: ${requestedBy}

  PDF Required: ${pdfRequired}
  DWG Required: ${dwgRequired}
  DFX Required: ${dfxRequired}
  STEP Required: ${stepRequired}

  Additional Notes: ${additionalNotes}

  Kind regards,
  [Your Name]`;


  const emailLink = `mailto:${"dan.eaton@mt.com"}?subject=${encodeURIComponent(`Drawing Request - ${drawingNumber}`)}&body=${encodeURIComponent(emailTemplate)}`;

  // Open email client with populated email template
  window.location.href = emailLink;
}

const printBtn = document.getElementById("printBtn");
printBtn.addEventListener('click', print);

function print() {
  let printElement = document.getElementById("container1");

  let options = {
    margin: 0.5,
    filename: "SignatureTouch.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1.5 },
    jsPDF: { unit: "mm", format: "A3", orientation: "landscape", precision: "12" }
  };

  html2pdf().set(options).from(printElement).save();
}

//https://blog.bitsrc.io/how-to-export-webpage-to-pdf-using-javascript-html2pdf-and-jspdf-6cdd549618c
/*
lessons learnt

template interpolation

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