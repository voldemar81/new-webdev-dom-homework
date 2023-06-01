'use strict';

import {addForm,loadingText,startMessage,getComments,fetchPost,comments,buttonElement,commentInputElement,nameInputElement} from "./api.js";

import { renderComments } from "./render.js";

export const listElement = document.getElementById('list');


startMessage.textContent = 'Подождите комментарии загружаются . . . ';

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
          
    
    addForm.classList.add('none');
    loadingText.textContent = 'Подождите ваш комментарий загружается . . . ';

  
  fetchPost();        
  });
