 const posts =[
  {
    id:1, title:"Post one"
  },

      {
    id:2, title:"Post two"
  },

]


export const getPostsLength = ()=> posts.length;

export default function getPost (){
  return(posts);
}

