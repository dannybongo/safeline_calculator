
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

//needed to initialise this button here because we need this variable in 2 functions
let caseMaterialSelect = document.getElementById("caseMaterial");



//Signature touch calculations
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
    document.getElementById("dimensionA").value = dimensionA;
  } else if (inputApetureHeight >= 75 && inputApetureWidth >= 100 && inputApetureWidth <= 250){
    dimensionA = 125
    document.getElementById("dimensionA").value = dimensionA;
  } else if (inputApetureHeight >= 75 && inputApetureWidth >= 275 && inputApetureWidth <= 1000){
    dimensionA = 135
    document.getElementById("dimensionA").value = dimensionA;
  } else if (inputApetureHeight >= 50 && inputApetureWidth >= 1025 && inputApetureWidth <= 1500){
    dimensionA = 145
    document.getElementById("dimensionA").value = dimensionA;
  } else if (inputApetureHeight >= 50 && inputApetureWidth >= 1525 && inputApetureWidth <= 2000){
    dimensionA = 155
    document.getElementById("dimensionA").value = dimensionA;
  } else if (inputApetureHeight >= 50 && inputApetureWidth >= 2025 && inputApetureWidth <= 2500){
    dimensionA = 165
    document.getElementById("dimensionA").value = dimensionA;
  } else if (inputApetureHeight >= 50 && inputApetureWidth >= 2525 && inputApetureWidth <= 3000){
    dimensionA = 175
    document.getElementById("dimensionA").value = dimensionA;
}}


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
ChatGPT Comments

In this example, we've created three buttons with a common class name of new-window-button, and we've added a data-url attribute to each button to specify the URL of the page to be loaded. We've also created a reusable openNewWindow() function that takes a URL parameter and uses the window.open() method to load the specified page.

Finally, we've used JavaScript to add a click event listener to each button. When a button is clicked, the listener calls the openNewWindow() function with the URL specified in the data-url attribute of the clicked button.

This approach allows you to add as many buttons and windows as you like, and makes it easy to update the functionality in one place if you need to make changes to the way windows are opened or managed.

My Comments

We might need to variable 'buttons' from node list to an array

For each element in our array of buttons, apply the function called button.
to each button, add an event listener. When clicked run the anonymous function. 
this. refers to object that is called the function, in this case our button. getAttribute is a method that returns the value of class. In our case this is the url assigned to the button
becuase 'url; is a variable, we can pass this as a argument through out function

the openNewWindow function simply opens out new URl into a new window.

The reason why the webpage is resetting when the button is clicked is because the default behavior of a button inside a form is to submit the form when it is clicked. In this case, the button has the type="button" attribute, which means it is not meant to submit the form.

However, since the button is inside a <form> tag and does not have the type="button" attribute, the default behavior of the button is to submit the form when it is clicked. This causes the page to reload and reset the form.

SOLUTION: SET CALCULATE BUTTON TYPE TO BUTTON IN THE HTML
*/