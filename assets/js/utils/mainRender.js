import feed from "../classes/PostSingleton.js";
import { featured, feed as genFeed } from "../components/posts.js";
import tagFilter from "../components/tagFilter.js";

const postSection = document.querySelector(".main-section");
let tagsOnFilter = [];
let searchOnfilter = "";
export const renderCleaner = (element) => {
  element.innerHTML = "";
};
const filterPosts = (event) => {
  if (event.target.checked) {
    tagsOnFilter.push(Number(event.target.id));
  } else {
    tagsOnFilter = tagsOnFilter.filter((id) => id !== Number(event.target.id));
  }
  const posts = feed.getPosts();
  const filteredPosts =
    tagsOnFilter.length === 0
      ? posts
      : posts.filter((post) =>
          post.tags.some((tag) => tagsOnFilter.includes(tag.id))
        );

  postSection.innerHTML =
    featured(filteredPosts.slice(0, 3)) +
    genFeed(filteredPosts.slice(3, filteredPosts.length));
  postSection.querySelectorAll("button.post-button.like").forEach((like) => {
    const likedposts = like.getAttribute("post");
    like.addEventListener("click", async () => {
      await feed.likePost(Number(likedposts));
    });
  });
  postSection.querySelectorAll("button.post-button.delete").forEach((del) => {
    const deleteposts = del.getAttribute("post");
    del.addEventListener("click", async () => {
      await feed.deletePost(Number(deleteposts));
    });
  });
};

export const updateSearch = (text) => {
  if (searchOnfilter !== text) {
    searchOnfilter = text.toLocaleLowerCase();
    const onupdateEvent = new Event("onupdate");
    document.dispatchEvent(onupdateEvent);
  }
};

document.addEventListener("onupdate", () => {
  const tagsFilter = document.querySelector(".tag-filter");
  const posts = feed.getPosts();
  const tags = posts
    .map((post) => post.tags)
    .flat()
    .reduce((acc, tag) => {
      if (!acc.find((t) => t.id === tag.id)) {
        acc.push(tag);
      }
      return acc;
    }, []);

  tagsFilter.innerHTML = tagFilter(tags);
  tagsFilter.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", filterPosts);
  });
  const filteredPosts =
    searchOnfilter === ""
      ? posts
      : posts.filter((post) =>
          post.title.toLocaleLowerCase().includes(searchOnfilter)
        );
  if (filterPosts.length > 0) {
    const featuredHTML = featured(filteredPosts.slice(0, 3));
    postSection.innerHTML =
      featuredHTML + genFeed(filteredPosts.slice(3, filteredPosts.length));
    postSection.querySelectorAll("button.post-button.like").forEach((like) => {
      const likedposts = like.getAttribute("post");
      like.addEventListener("click", async () => {
        await feed.likePost(Number(likedposts));
      });
    });
    postSection.querySelectorAll("button.post-button.delete").forEach((del) => {
      const deleteposts = del.getAttribute("post");
      del.addEventListener("click", async () => {
        await feed.deletePost(Number(deleteposts));
      });
    });
  }
});
