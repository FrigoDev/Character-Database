import {
  fetchAllPosts,
  fetchPostById,
  addlikeToPost,
  deletePost,
  createPost,
} from "../utils/crudAPI.js";
import PostFactory from "./PostFactory.js";

let loading = false;
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
    if (loading) return;
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

  async likePost(id) {
    loading = true;
    const likedPost = posts.find((post) => post.id === id);
    const newLikesNumber = likedPost.likes + 1;
    const updatedPost = await addlikeToPost(id, newLikesNumber, likedPost);
    posts = posts.map((post) => (post.id === id ? updatedPost : post));
    const onUpdate = new CustomEvent("onupdate", {
      detail: {
        type: "post",
      },
    });
    document.dispatchEvent(onUpdate);
    loading = false;
  }

  async deletePost(id) {
    loading = true;
    await deletePost(id);
    posts = posts.filter((post) => post.id !== id);
    const onUpdate = new CustomEvent("onupdate", {
      detail: {
        type: "post",
      },
    });
    document.dispatchEvent(onUpdate);
    loading = false;
  }
  async createNewPost(post) {
    loading = true;
    await createPost(post);
    posts = posts.concat(post);
    const onUpdate = new CustomEvent("onupdate", {
      detail: {
        type: "post",
      },
    });
    document.dispatchEvent(onUpdate);
    loading = false;
  }
}

const feed = Object.freeze(new Feed());
export default feed;
