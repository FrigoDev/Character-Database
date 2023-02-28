const btn = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const close = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

close.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
