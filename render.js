import { comments } from "./api.js";
import {animateLikesButtons,listElement, getAnswer} from "./main.js";

export const renderComments = () => {
    const commentsHtml = comments
    .map((comment, index) => {
      const text = comment.comment;
      return `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
          ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
          </div>
        </div>
      </li>
    `;
    })
    .join('');
  listElement.innerHTML = commentsHtml;
  animateLikesButtons();
  getAnswer();
  };
