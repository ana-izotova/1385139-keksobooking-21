'use strict';

const errorLoadHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style.cssText = `
  z-index: 100;
  width: 300px;
  margin: 0 auto;
  padding: 25px;
  text-align: center;
  background-color: #f0f0ea;
  border: #ff5635 2px solid;
  border-radius: 25px;
  box-shadow: 0 0 40px #ff5635;
  color: #ff5635;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  `;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.utils = {
  errorLoadHandler
};
