let buttons = document.querySelectorAll("button");
console.log(buttons)
buttons = Array.from(buttons)
console.log(buttons)



function openNewWindow(url) {
    window.open(url, "_blank");
}


buttons.forEach(button => {
  button.addEventListener("click", function() {
    const url = this.getAttribute("data-url");
    openNewWindow(url);
  });
});


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
*/