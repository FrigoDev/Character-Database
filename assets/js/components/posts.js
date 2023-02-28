import { URL } from "../constants/constants.js";

const frFeature = (post) => `<article class="featured-post">
    <div class="text-container" bis_skin_checked="1">
      <h3 class="post-title">${post.title}</h3>
      <h5 class="post-subtitle">${post.subTitle}</h5>
      <p class="post-content">
       ${post.body}
      </p>
    </div>
    <div class="post-image-container" bis_skin_checked="1">
      <img class="post-image" src="${post.image}">
      <div class="post-image-footer" bis_skin_checked="1">
        <div class="post-tags" bis_skin_checked="1">${post.tags
          .map((tag) => tag.name)
          .join(", ")}</div>
        <div bis_skin_checked="1">${post.likes} Likes</div>
      </div>
      <div class="post-buttons" bis_skin_checked="1">
        <div class="post-buttons-container" bis_skin_checked="1">
          <button class="post-button like" post="${post.id}">
            <i class="fas fa-heart" aria-hidden="true"></i>
            <p>Like</p> 
          </button>
          <a class="d-flex" href="${`${URL}/details.html?id=${post.id}`}">
          <button class="post-button details" post="${post.id}">
            <i class="fas fa-folder-open" aria-hidden="true"></i>
            <p>Details</p>
            </button>
          </a>
          <button class="post-button delete" post="${post.id}">
            <i class="fas fa-trash" aria-hidden="true"></i>
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  </article>`;
const sdFeature = (post) => `<article class="featured-card">
    <div class="featured-card-text-container" bis_skin_checked="1">
      <h3 class="featured-card-title">${post.title}</h3>
      <h5 class="featured-card-subtitle">${post.subTitle}</h5>
      <p class="featured-card-content">
      ${post.body}
      </p>
    </div>
    <div class="featured-card-image-container" bis_skin_checked="1">
      <img class="featured-card-image" src="${post.image}">
      <div class="post-image-footer" bis_skin_checked="1">
        <div class="post-tags" bis_skin_checked="1">${post.tags
          .map((tag) => tag.name)
          .join(", ")}</div>
        <div bis_skin_checked="1">${post.likes} Likes</div>
      </div>
      <div class="post-buttons" bis_skin_checked="1">
        <div class="post-buttons-container" bis_skin_checked="1">
          <button class="post-button like" post="${post.id}">
            <i class="fas fa-heart" aria-hidden="true"></i>
            <p>Like</p>
          </button>
          <a class="d-flex" href="${`${URL}/details.html?id=${post.id}`}">
            <button class="post-button details" post="${post.id}">
            <i class="fas fa-folder-open" aria-hidden="true"></i>
            <p>Details</p>
            </button>
          </a>
          </button>
          <button class="post-button delete" post="${post.id}">
            <i class="fas fa-trash" aria-hidden="true"></i>
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  </article>`;

export const featured = (posts) => {
  const secondaryFeature = `<article class="featured-post-2">
    ${
      posts.slice(1, 3).length !== 0
        ? posts
            .slice(1, 3)
            .map((post) => sdFeature(post))
            .join("\n")
        : ""
    }
    </article>`;
  return [frFeature(posts[0]), secondaryFeature].join("\n");
};

const renderPost = (post) => `<div class="card" bis_skin_checked="1">
    <div class="card-image-container" bis_skin_checked="1">
      <img src="${post.image}" class="card-image">
    </div>
    <div class="card-body" bis_skin_checked="1">
      <h3 class="card-title">${post.title}</h3>
      <h5 class="card-author">${`${post.author.name} ${post.author.lastName}`}</h5>
    </div>
    <a class="card-link" href="${`${URL}/details.html?id=${post.id}`}"></a>
  </div>`;

export const feed = (posts) => {
  const newFeed = posts.map((post) => renderPost(post));
  return `<div class="card-section" bis_skin_checked="1">${newFeed.join(
    "\n"
  )}</div>`;
};
