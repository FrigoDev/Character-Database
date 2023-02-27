const postDetail=(post)=>`<div class="card" bis_skin_checked="1">
     <div class="text-container" bis_skin_checked="1">
       <h2 class="card-title">${post.title}</h2>
       <h5 class="card-subtitle">${post.subTitle}</h5>
       <p class="card-content">
         ${post.body}
       </p>
     </div>
     <div class="post-image-container" bis_skin_checked="1">
       <img class="post-image" src="${post.image}">
       <div class="post-image-footer" bis_skin_checked="1">
         <div class="post-tags" bis_skin_checked="1">${post.tags.map((tag)=>tag.name).join(', ')}</div>
         <div bis_skin_checked="1">${post.likes}  Likes</div>
       </div>
       <p class="card-author">Post by:${`${post.author.name} ${post.author.lastName}`}</p>
       <div class="post-buttons" bis_skin_checked="1">
         <div class="post-buttons-container" bis_skin_checked="1">
           <button class="post-button like" post="${post.id}">
             <i class="fas fa-heart" aria-hidden="true"></i>
             <p>Like</p>
           </button>
           <button class="post-button edit" post="${post.id}">
             <i class="fas fa-pen" aria-hidden="true"></i>
             <p>Edit</p>
           </button>
           <button class="post-button delete" post="${post.id}">
             <i class="fas fa-trash" aria-hidden="true"></i>
             <p>Delete</p>
           </button>
         </div>
       </div>
     </div>
   </div>` 

export default postDetail;