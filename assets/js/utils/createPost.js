import { fetchAllAuthors, fetchAllTags } from "./crudAPI.js";
import feed from "../classes/PostSingleton.js";

const fomularioCreador = document.querySelector("form.create-post");
const [authors, tags] = await Promise.all([fetchAllAuthors(), fetchAllTags()]);
const filertags = tags.map((tag) => new RegExp("^" + tag.slug + "$", "i"));
fomularioCreador.querySelector("select").innerHTML = authors
  .map(
    (author) =>
      `<option value="${
        author.id
      }">${`${author.name} ${author.lastName}`}</option>`
  )
  .join("\n");
let setTags = [];
const inputTags = fomularioCreador.querySelector("#tags-input");
inputTags.addEventListener("input", (e) => {
  setTags = [];
  const rawTags = e.target.value
    .trim()
    .split(",")
    .map((tag) => tag.trim());
  filertags.forEach((tag) => {
    const match = rawTags.filter((rawTag) => tag.test(rawTag));
    if (match.length > 0) {
      setTags.push(tags.find((tag) => tag.slug === match[0].toLowerCase()).id);
    }
  });
  const formgroup = fomularioCreador.querySelector(".tags-container");
  formgroup.innerHTML = tags
    .filter((tag) => setTags.includes(tag.id))
    .map((tag) => `<span class="tag">${tag.name}</span>`)
    .join("\n");
});

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const title = formData.get("Title");
  const subtitle = formData.get("Subtitle");
  const content = formData.get("Content");
  const imageURL = formData.get("ImageURL");
  const createDate = formData.get("Date").split("-").join("/");
  const author = Number(form.elements.author.value);
  const tags = setTags;
  const errors = [];
  const warning = document.querySelector(".warning");
  const success = document.querySelector(".success");
  if (title.length < 3) {
    errors.push("Title must be at least 3 characters long");
  }
  if (subtitle.length < 3) {
    errors.push("Subtitle must be at least 3 characters long");
  }
  if (content.length < 3) {
    errors.push("Content must be at least 3 characters long");
  }

  if (
    !/^(20[0-9]{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
      createDate
    )
  ) {
    errors.push("Date must be a valid date");
  }
  if (!authors.find((authorDb) => authorDb.id == author)) {
    errors.push("Author must be a valid author");
  }
  if (tags.length < 1) {
    errors.push("You must select at least one tag");
  }

  if (errors.length > 0) {
    warning.innerHTML = errors.map((error) => `<li>${error}</li>`).join("\n");
    warning.classList.add("show");
    success.classList.remove("show");
    return;
  }
  warning.classList.remove("show");
  const post = {
    title,
    subTitle: subtitle,
    body: content,
    image: imageURL,
    author,
    tags,
    likes: 0,
    createDate,
  };
  await feed.createNewPost(post);
  success.innerHTML = "Post created successfully";
  success.classList.add("show");
  form.reset();
}
fomularioCreador.addEventListener("submit", handleSubmit);
