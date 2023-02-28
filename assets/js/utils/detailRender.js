import feed from "../classes/PostSingleton.js";
import postDetail from "../components/postDetail.js";
import {
  fetchCommentsByPostId,
  fetchAllUsers,
  createComment,
} from "./crudAPI.js";
import GenComment from "../components/comment.js";

const modal = document.getElementById("alert-modal");

document.addEventListener("onupdate", async () => {
  const postSection = document.querySelector(".card-container");
  const commentsSection = document.querySelector(".post-comments");
  const commentForm = document.querySelector("form.comments-input");
  const [post] = feed.getPosts();

  postSection.innerHTML = postDetail(post);
  postSection
    .querySelector("button.post-button.like")
    .addEventListener("click", async () => {
      await feed.likePost(post.id);
    });
  postSection
    .querySelector("button.post-button.delete")
    .addEventListener("click", async () => {
      modal.style.display = "block";
      modal
        .querySelector("#delete-post")
        .addEventListener("click", async () => {
          await feed.deletePost(Number(post.id));
          modal.style.display = "none";
          window.location.href = "index.html";
        });
      modal.querySelector("#cancel-delete").addEventListener("click", () => {
        modal.style.display = "none";
      });
    });

  const [userComments, users] = await Promise.all([
    fetchCommentsByPostId(post.id),
    fetchAllUsers(),
  ]);

  const handleOnSutmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const comment = formData.get("comment");
    const user = Number(formData.get("user"));
    const author = Number(form.elements["comment-user"].value);
    const newComment = {
      comment,
      user,
      author,
      postId: Number(post.id),
    };
    await createComment(newComment);
    commentsSection.innerHTML += GenComment({
      ...newComment,
      user: users.find((user) => user.id == author),
    });
    form.reset();
  };
  commentForm.addEventListener("submit", handleOnSutmit);
  commentForm.querySelector("select").innerHTML = users
    .map(
      (user) =>
        `<option value="${user.id}">${`${user.name} ${user.lastName}`}</option>`
    )
    .join("\n");

  const reStructureUserComments = userComments.map((comment) => {
    const user = users.find((user) => user.id == comment.user);
    return { ...comment, user };
  });
  commentsSection.innerHTML = reStructureUserComments
    .map((comment) => GenComment(comment))
    .join("\n");
});
