import {fetchAllAuthors,fetchAllTags} from '../utils/dataFetcher.js'


const createPost=({id,title,subTitle,image,body,createDate,likes,author,tags},AllTags,authors)=>({
        id,
        title,
        subTitle,
        image,
        body,
        createDate,
        likes,
        author:authors.find(apiAuthor=>apiAuthor.id===author),
        tags:AllTags.filter(tag=>tags.includes(tag.id))
    })


export default async(posts)=>{
    const tags=await fetchAllTags();
    const authors=await fetchAllAuthors();
    return posts.map(post=>createPost(post,tags,authors));
}