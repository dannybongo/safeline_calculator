
const buttons = document.querySelectorAll(".linkBtn");

function openNewWindow(url) {
  window.location.href = url
}

buttons.forEach(button => {

  //The below three lines are code are temporary and will be modified as more pages are created.
  const buttonText = button.innerHTML
  if (buttonText !== 'Signature Touch') {
    button.style.backgroundColor = '#ff6666';
  }

  button.addEventListener("click", function () {
    const url = this.getAttribute("data-url");
    openNewWindow(url);
  });
}
)