import { renderComments } from "./render.js";

export  const buttonElement = document.getElementById("add-button");
export  const listElement = document.getElementById("list");
export  const nameInputElement = document.getElementById("name-input");
export  const commentInputElement = document.getElementById("comment-input");

export let comments = []

export const startMessage = document.getElementById('start-message')




export const getComments = () => {

    return  fetch(
      'https://webdev-hw-api.vercel.app/api/v1/vladimir-ulashenko/comments',
      {
        method:'GET',
      }
  
    )
    .then((response) => {
    return response.json();
    })
    .then((responseData) => {
     const appComments = responseData.comments.map((comment) => {
     return {
      name: comment.author.name,
      date: new Date(comment.date).toLocaleString('ru'),
      text: comment.text,
      likes: comment.likes,
      isLiked: false,
     };
  
    });
    comments = appComments;
    renderComments();
    startMessage.textContent = '';
  
    });
   
  };

  getComments();

  export const loadingText = document.getElementById('loading-message');
  export  const addForm = document.getElementById('add-form');

 export function fetchPost () { 
    fetch('https://webdev-hw-api.vercel.app/api/v1/vladimir-ulashenko/comments',{
      method: 'POST',
      body: JSON.stringify({
        // forceError: true,
        text: commentInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        name: nameInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
     
      
    }),      
    })
    .catch((error) =>{
    alert('Кажется, у вас сломался интернет, попробуйте позже');
    })
    .then((response) => {
     if(response.status === 201) {
     return response.json();
     } 
     if(response.status === 500) {
     return Promise.reject(500);
     }
     if(response.status === 400) {
     return Promise.reject(400);
     }
          
    })
    .then((responseData) => {
      getComments();
    })
   .then((data) => {
    addForm.classList.remove('none');
    addForm.classList.add('add-form');
    nameInputElement.value = ''; 
    commentInputElement.value = '';
    })
    .catch((error) => {
     if(error === 500) {
      alert('Сервер сломался, попробуй позже');
     }
     if(error === 400) {
      alert('Имя и комментарий должны быть не короче 3 символов');
     } 
    })
    .then((data) => {
      loadingText.textContent = '';
    });
   
    addForm.classList.remove('none');
    addForm.classList.add('add-form');

  
};
