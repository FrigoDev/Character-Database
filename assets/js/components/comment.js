export default (comment) => `<div class="comment" bis_skin_checked="1">
<div class="comment-author" bis_skin_checked="1">
  ${`${comment.user.name} ${comment.user.lastName}`}
</div>
<div class="post-comment-content" bis_skin_checked="1">
  ${comment.comment}
</div>
</div>`;
