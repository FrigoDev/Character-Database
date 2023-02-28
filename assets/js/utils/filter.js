import { updateSearch } from "./mainRender.js";
const search = document.getElementById("input-search");

const searchText = search.addEventListener("input", (e) => {
  const searchValue = e.target.value.trim();
  if (/^[a-zA-Z0-9._-ñáéíóú]+$/i.test(searchValue)) {
    updateSearch(searchValue);
  } else {
    updateSearch("");
  }
});
