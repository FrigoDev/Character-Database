import { API_URL } from '../constants/constants.js';

const fetchAllPosts =async () => {
    return  await (await fetch(`${API_URL}/posts`)).json();
    };
const fetchPostById =async (id) => {
    return  await (await fetch(`${API_URL}/posts/${id}`)).json();
    };
const fetchAllTags =async () => {
    return  await (await fetch(`${API_URL}/tags`)).json();
    };
const fetchAllAuthors =async () => {
    return  await (await fetch(`${API_URL}/authors`)).json();
    };
const fetchAllUsers =async () => {
    return  await (await fetch(`${API_URL}/users`)).json();
    };
const fetchCommentsByPostId =async (id) => {
    return  await (await fetch(`${API_URL}/comments?postId=${id}`)).json();
    };

export {
    fetchAllPosts,
    fetchPostById,
    fetchAllTags,
    fetchAllAuthors,
    fetchAllUsers,
    fetchCommentsByPostId
}

