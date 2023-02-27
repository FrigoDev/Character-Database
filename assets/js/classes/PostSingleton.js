import { fetchAllPosts, fetchPostById } from "../utils/dataFetcher.js";
import PostFactory from "./PostFactory.js";
let instance;
let posts = [];

class Feed {
  constructor() {
    if (instance) {
      throw new Error("You can only create on instance");
    }
    instance = this;
  }
  getPosts() {
    return posts;
  }
  async fetchPosts() {
    const data = await PostFactory(await fetchAllPosts());
    if (JSON.stringify(data) !== JSON.stringify(posts)) {
      posts = data;
      const onUpdate = new CustomEvent("onupdate", {
        detail: {
          type: "post",
        },
      });
      document.dispatchEvent(onUpdate);
    }
  }
  async fetchPostById(id) {
    const post = await PostFactory([await fetchPostById(id)]);
    if (JSON.stringify(post) !== JSON.stringify(posts)) {
      posts = post;
      const onUpdate = new CustomEvent("onupdate", {
        detail: {
          type: "post",
        },
      });
      document.dispatchEvent(onUpdate);
    }
  }
}

const feed = Object.freeze(new Feed());
export default feed;
