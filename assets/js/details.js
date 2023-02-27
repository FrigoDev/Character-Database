import postStorage from "./classes/PostSingleton.js";
import "./utils/detailRender.js";

if(window.location.search!==""){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if(id){
        await postStorage.fetchPostById(id)
        const [post]=postStorage.getPosts()
        console.log(post);
    }
}  