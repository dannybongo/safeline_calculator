
const buttons = document.querySelectorAll(".linkBtn");

function openNewWindow(url) {
  window.location.href = url
}

buttons.forEach(button => {
  button.addEventListener("click", function () {
    const url = this.getAttribute("data-url");
    openNewWindow(url);
  });
}
)



// window.location.href="../index.html"
// window.open(url, "_blank");