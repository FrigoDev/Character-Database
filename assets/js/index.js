import data from "./classes/PostSingleton.js";
import throttle from "./utils/throttle.js";
import "./utils/modal.js";
import "./utils/createPost.js";
import "./utils/mainRender.js";
import "./utils/filter.js";
await data.fetchPosts();
const fetchthrottle = throttle(data.fetchPosts, 2000);
document.addEventListener("click", () => {
  fetchthrottle();
});
