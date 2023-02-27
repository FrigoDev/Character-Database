import feed from "../classes/PostSingleton.js";
import postDetail from "../components/postDetail.js";

document.addEventListener('onupdate', () => {
    const postSection= document.querySelector(".card")
    const [post]=feed.getPosts()
   
    postSection.innerHTML=postDetail(post)
    postSection.querySelector('button.post-button.like').addEventListener('click',async()=>{ 
        await feed.likePost(post.id)
    }
    )
    postSection.querySelector('button.post-button.delete').addEventListener('click',async()=>{
        await feed.deletePost(post.id)
        window.location.href = "index.html";
    }
    )
})