'use strict';

import {addForm,loadingText,startMessage,getComments,fetchPost,comments,buttonElement,commentInputElement,nameInputElement} from "./api.js";

import { renderComments } from "./render.js";

export const listElement = document.getElementById('list');


//   const buttonElement = document.getElementById("add-button");
//   const listElement = document.getElementById("list");
//   const nameInputElement = document.getElementById("name-input");
//   const commentInputElement = document.getElementById("comment-input");

//  let comments = []

// const startMessage = document.getElementById('start-message')
startMessage.textContent = 'Подождите комментарии загружаются . . . ';

// const getComments = () => {

//   return  fetch(
//     'https://webdev-hw-api.vercel.app/api/v1/vladimir-ulashenko/comments',
//     {
//       method:'GET',
//     }

//   )
//   .then((response) => {
//   return response.json();
//   })
//   .then((responseData) => {
//    const appComments = responseData.comments.map((comment) => {
//    return {
//     name: comment.author.name,
//     date: new Date(comment.date).toLocaleString('ru'),
//     text: comment.text,
//     likes: comment.likes,
//     isLiked: false,
//    };

//   });
//   comments = appComments;
//   renderComments();
//   startMessage.textContent = '';

//   });
 
// };


 export const animateLikesButtons = () => {
 
 const likesButtonsElements = document.querySelectorAll('.like-button');

 for (let i = 0; i < likesButtonsElements.length; i++ ) {
  likesButtonsElements[i].addEventListener ('click' , (event) => {
    event.stopPropagation();
     if (comments[i].isLiked === false) {
     comments[i].isLiked = true;
     comments[i].likes += 1;
  } else if (comments[i].isLiked === true) {
    comments[i].isLiked = false;
    comments[i].likes -= 1;
  }
   renderComments();
   
  });

 }

 };


//  const renderComments = () => {
//         const commentsHtml = comments
//         .map((comment, index) => {
//           const text = comment.comment;
//           return `
//           <li class="comment" data-index="${index}">
//             <div class="comment-header">
//               <div>${comment.name}</div>
//               <div>${comment.date}</div>
//             </div>
//             <div class="comment-body">
//               <div class="comment-text">
//               ${comment.text}
//               </div>
//             </div>
//             <div class="comment-footer">
//               <div class="likes">
//                 <span class="likes-counter">${comment.likes}</span>
//                 <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
//               </div>
//             </div>
//           </li>
//         `;
//         })
//         .join('');
//       listElement.innerHTML = commentsHtml;
//       animateLikesButtons();
//       getAnswer();
//       };
 getComments();
 renderComments();
 
export function getAnswer () {
 const commentElements = document.querySelectorAll('.comment');
      for (let i = 0; i < commentElements.length; i++) {
        commentElements[i].addEventListener('click', (event) => {
          const index = event.currentTarget.dataset.index;
          const comment = comments[index];
          commentInputElement.value =`>${comment.text}\n${comment.name}\n`;
        });
      };
 };
 
 

 
    buttonElement.addEventListener('click',() => {
    nameInputElement.classList.remove('error');
    if (nameInputElement.value === "") {
      nameInputElement.classList.add('error');
      return;
    }
     
    commentInputElement.classList.remove('error');
    if (commentInputElement.value === "") {
      commentInputElement.classList.add('error');
      return;
    }
          
    // const loadingText = document.getElementById('loading-message');
    // const addForm = document.getElementById('add-form');
    addForm.classList.add('none');
    loadingText.textContent = 'Подождите ваш комментарий загружается . . . ';

  //    fetch(
  //   'https://webdev-hw-api.vercel.app/api/v1/vladimir-ulashenko/comments',{
  //     method: 'POST',
  //     body: JSON.stringify({
  //       // forceError: true,
  //       text: commentInputElement.value
  //       .replaceAll("&", "&amp;")
  //       .replaceAll("<", "&lt;")
  //       .replaceAll(">", "&gt;")
  //       .replaceAll('"', "&quot;"),
  //       name: nameInputElement.value
  //       .replaceAll("&", "&amp;")
  //       .replaceAll("<", "&lt;")
  //       .replaceAll(">", "&gt;")
  //       .replaceAll('"', "&quot;"),
     
      
  //   }),      
  //   })
  //   .catch((error) =>{
  //   alert('Кажется, у вас сломался интернет, попробуйте позже');
  //   })
  //   .then((response) => {
  //    if(response.status === 201) {
  //    return response.json();
  //    } 
  //    if(response.status === 500) {
  //    return Promise.reject(500);
  //    }
  //    if(response.status === 400) {
  //    return Promise.reject(400);
  //    }
          
  //   })
  //   .then((responseData) => {
  //     getComments();
  //   })
  //  .then((data) => {
  //   addForm.classList.remove('none');
  //   addForm.classList.add('add-form');
  //   nameInputElement.value = ''; 
  //   commentInputElement.value = '';
  //   })
  //   .catch((error) => {
  //    if(error === 500) {
  //     alert('Сервер сломался, попробуй позже');
  //    }
  //    if(error === 400) {
  //     alert('Имя и комментарий должны быть не короче 3 символов');
  //    } 
  //   })
  //   .then((data) => {
  //     loadingText.textContent = '';
  //   });
   
  //   addForm.classList.remove('none');
  //   addForm.classList.add('add-form');
  fetchPost();        
  });
