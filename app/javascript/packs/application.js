// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

document.addEventListener('DOMContentLoaded', () => {
  let currentNumber = 1;
  let startTime;
  let interval;

  const startButton = document.getElementById('start-game');
  const gameBoard = document.getElementById('game-board');
  const timerDisplay = document.getElementById('time');

  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameBoard.style.display = 'grid';
    startGame();
  });

  function startGame() {
    // リセット
    currentNumber = 1;
    gameBoard.innerHTML = '';
    timerDisplay.textContent = '0.00';

    // タイマー開始
    startTime = Date.now();
    interval = setInterval(updateTimer, 10);

    // 1〜25の数字のシャッフル
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);

    // ボタン生成
    numbers.forEach((number) => {
      const button = document.createElement('button');
      button.textContent = number;
      button.classList.add('number-button');
      button.addEventListener('click', () => handleButtonClick(button, number));
      gameBoard.appendChild(button);
    });
  }

  function handleButtonClick(button, number) {
    if (number === currentNumber) {
      button.style.visibility = 'hidden';
      currentNumber++;
      if (currentNumber > 25) {
        clearInterval(interval);
        alert(`ゲームクリア！時間: ${timerDisplay.textContent}秒`);
        startButton.style.display = 'block';
        gameBoard.style.display = 'none';
      }
    }
  }

  function updateTimer() {
    const elapsedTime = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = elapsedTime.toFixed(2);
  }
});





Rails.start()
// Turbolinks.start()
ActiveStorage.start()


