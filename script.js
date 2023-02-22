let buttons = document.querySelectorAll(".linkBtn");
console.log(buttons)
// buttons = Array.from(buttons)
// console.log(buttons)

function openNewWindow(url) {
    window.open(url, "_blank");
}

buttons.forEach(button => {
  button.addEventListener("click", function() {
    console.log("hello")
    const url = this.getAttribute("data-url");
    console.log(url)
    openNewWindow(url);
  });
});


let calculateBtn = document.getElementById("calculateBtn");
console.log(calculateBtn)
calculateBtn.addEventListener("click", calculate);





function calculate() {
  // Get the values of the input tags
  let input1Value = document.getElementById("apetureWidth").value;
  let input2Value = document.getElementById("apetureHeight").value;

  // Set the values of the output tags
  document.getElementById("testA").value = input1Value;
  document.getElementById("testB").value = input2Value;
  console.log(input1Value)
  console.log(input2Value)
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