import { API_URL } from '../constants/constants.js';

const fetchAllPosts =async () => (await fetch(`${API_URL}/posts?_sort=createDate,id&_order=desc`)).json();
const fetchPostById =async (id) => (await fetch(`${API_URL}/posts/${id}`)).json();
const fetchAllTags =async () => (await fetch(`${API_URL}/tags`)).json();
const fetchAllAuthors =async () => (await fetch(`${API_URL}/authors`)).json();
const fetchAllUsers =async () => (await fetch(`${API_URL}/users`)).json();
const fetchCommentsByPostId =async (id) => (await fetch(`${API_URL}/comments?postId=${id}`)).json();
const addlikeToPost =async (postId,newLikesNumber,post) => {
    await fetch(`${API_URL}/posts/${postId}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...post,likes:newLikesNumber,
        author:post.author.id,
        tags:post.tags.map(tag=>tag.id) 
    })
})
return {...post,likes:newLikesNumber}
};
const deletePost =async (id)=>{await fetch(`${API_URL}/posts/${id}`,{method: 'DELETE'})
}

export {
    fetchAllPosts,
    fetchPostById,
    fetchAllTags,
    fetchAllAuthors,
    fetchAllUsers,
    fetchCommentsByPostId,
    addlikeToPost,
    deletePost
}

