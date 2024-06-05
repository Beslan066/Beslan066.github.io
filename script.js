document.addEventListener("DOMContentLoaded", function() {
    let mainWords;
    let currentWordIndex = 0;
    let currentMainWord;
    let usedWords = [];

    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            mainWords = data['главные слова'];
            loadNextMainWord();
        });

    const mainWordContainer = document.getElementById('main-word');
    const inputWord = document.getElementById('input-word');
    const submitWord = document.getElementById('submit-word');
    const wordsList = document.getElementById('words-list');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const congratsModal = document.getElementById('congrats-modal');
    const closeCongratsModal = document.getElementById('close-congrats-modal');

    submitWord.addEventListener('click', checkWord);
    inputWord.addEventListener('input', hideModal);
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    closeCongratsModal.addEventListener('click', () => {
        congratsModal.style.display = 'none';
        loadNextMainWord();
    });
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    congratsModal.addEventListener('click', (event) => {
        if (event.target === congratsModal) {
            congratsModal.style.display = 'none';
            loadNextMainWord();
        }
    });

    function loadNextMainWord() {
        if (currentWordIndex < mainWords.length) {
            currentMainWord = mainWords[currentWordIndex];
            mainWordContainer.textContent = currentMainWord['слово'];
            wordsList.innerHTML = '';
            usedWords = [];
            currentWordIndex++;
        } else {
            mainWordContainer.textContent = 'Вы прошли все слова!';
            inputWord.disabled = true;
            submitWord.disabled = true;
        }
    }

    function checkWord() {
        const word = inputWord.value.trim().toLowerCase();
        if (currentMainWord['подслова'].includes(word) && !usedWords.includes(word)) {
            const wordElement = document.createElement('div');
            wordElement.textContent = word;
            wordsList.appendChild(wordElement);
            usedWords.push(word);
            inputWord.value = '';
            if (usedWords.length === currentMainWord['подслова'].length) {
                showCongratsModal();
                setTimeout(() => {
                    congratsModal.style.display = 'none';
                    loadNextMainWord();
                }, 3000); // После 3 секунд переходим к следующему слову
            }
        } else {
            modal.style.display = 'flex';
        }
    }

    function showCongratsModal() {
        congratsModal.style.display = 'flex';
    }

    function hideModal() {
        modal.style.display = 'none';
    }
});
