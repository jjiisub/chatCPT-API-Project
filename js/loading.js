export { switchLoad };

function switchLoad() {
  let loaderContainer = document.querySelector(".loader-container");
  loaderContainer.classList.toggle("show");
}
