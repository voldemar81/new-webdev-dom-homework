let token = null;
let comments = [];
let loadingComments = true;
let isLoadingAdd = false;

import {fetchPost, getComments } from "./api.js";
import { renderLogin, name } from "./login-component.js";

const getExistingComments = () => {
  renderApp(loadingComments);
  return getComments({ token })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString('ru'),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
          isLikeLoading: false,
        };
      });
      comments = appComments;
      loadingComments = false;
      renderApp(loadingComments);
    })
    .catch((error) => {
      alert(error.message);
    });
};

const renderForm = (isLoading) => {
  const formWindow = document.querySelector(".add-form");
  const loaderText = document.getElementById("loader");

  if (isLoading) {
    loaderText.classList.remove("none");
    formWindow.classList.add("none");
  } else {
    loaderText.classList.add("none");
    formWindow.classList.remove("none");
  }
};

const renderApp = (loadingComments) => {
  const appEl = document.getElementById("app");

  const commentsHTML = comments
    .map((comment, index) => {
            return `<li class="comment" data-index='${index}'>
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.text
                  .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
                  .replaceAll("QUOTE_END", "</div>")}
              </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button data-index='${index}' class="like-button ${
        comment.isLiked ? "-active-like" : ""
      } ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
              </div>
            </div>
          </li>`;
    })
    .join("");

  if (!token) {
    const appHtml = `
                    <ul class="comments">
                            ${
                              loadingComments
                                ? "<p>Подождите, комментарии загружаются...</p>"
                                : ""
                            }
                            ${commentsHTML}
                        </ul>
                        <p class="info">Для добавления  комментария,<a class="login-button-one" href="#">авторизуйтесь</a></p>
                    `;

    appEl.innerHTML = appHtml;
    document.querySelector(".login-button-one").addEventListener("click", () => {
      renderLogin({
        appEl,
        setToken: (newToken) => {
          token = newToken;
        },
        getExistingComments,
      });
    });

    return;
  }

  const appHtml = `
                <ul class="comments">
                        ${
                          loadingComments
                            ? "<p>Подождите, комментарии загружаются...</p>"
                            : ""
                        }
                        ${commentsHTML}
                    </ul>
                    <div class="add-form">
                        <input
                        type="text"
                        class="add-form-name"
                        placeholder="Введите ваше имя"
                        oninput=""
                        />
                        <textarea
                        type="textarea"
                        class="add-form-text"
                        placeholder="Введите ваш коментарий"
                        rows="4"
                        oninput=""
                        ></textarea>
                        <div class="add-form-row">
                        <button class="add-form-button">Написать</button>
                        </div>
                    </div>

                    <div class="loading-comment none" id="loader">
                        Комментарий добавляется...
                    </div>
                `;

  appEl.innerHTML = appHtml;

  const buttonComments = document.querySelector(".add-form-button");
  const nameUser = document.querySelector(".add-form-name");
  const commentUser = document.querySelector(".add-form-text");
  buttonComments.disabled = true;

  nameUser.value = name;
  nameUser.disabled = true;


  commentUser.addEventListener("input", () => {
    buttonComments.disabled = false;
  });


  buttonComments.addEventListener("click", () => {
    commentUser.classList.remove("error");

    if (commentUser.value == "") {
      commentUser.classList.add("error");
      return;
    }
    isLoadingAdd = true;
    renderForm(isLoadingAdd);

    fetchPost({
      text: commentUser.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      token,
    })
    .then(() => {
        return getExistingComments();
      })
      .then(() => {
        isLoadingAdd = false;
        renderForm(isLoadingAdd);
        commentUser.value = "";
        buttonComments.disabled = true;
      })
      .catch((error) => {
        isLoadingAdd = false;

        renderForm(isLoadingAdd);
        alert(error.message);
      });
  });
  
  giveAnswer(comments);

  giveLikes(comments);
  
};

getExistingComments();


const giveAnswer = (comments) => {
  const commentElements = document.querySelectorAll('.comment');
  const textComment = document.querySelector(".add-form-text");
       for (let i = 0; i < commentElements.length; i++) {
         commentElements[i].addEventListener('click', (event) => {
           const index = event.currentTarget.dataset.index;
           const comment = comments[index];
           textComment.value =`>${comment.text}\n${comment.name}\n`;
         });
       };
  };

  async function giveLikes() {
    const likesButtonElements = document.querySelectorAll('.like-button');
  
    for (let i = 0; i < likesButtonElements.length; i++) {
      const likesButtonElement = likesButtonElements[i];
      likesButtonElement.addEventListener('click', async (event) => {
        event.stopPropagation();
        const index = likesButtonElement.dataset.index;
        const comment = comments[index];
  
        comment.isLikeLoading = true;
        renderApp();
  
        await new Promise(resolve => setTimeout(resolve, 1000));
  
        comment.isLiked = !comment.isLiked;
        likesButtonElement.classList.toggle('-active-like');
        comment.likes += comment.isLiked ? 1 : -1;
        comment.isLikeLoading = false;
        renderApp();
      });
    }
  }

