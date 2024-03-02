const quizData = [ //Perguntas
    {
        question: 'Quanto resulta o valor de 1 + 1 ?',
        options: ['3', '1', '2', '4'],
        answer: '2'
    },
    {
        question: 'Qual a capital do Brasil?',
        options: ['Rio Grande do Sul', 'Bahia', 'Santa Catarina', 'Brasília'],
        answer: 'Brasília'
    },
    {
        question: 'Quanto resulta o valor de 1 + 2 ?',
        options: ['3', '1', '2', '4'],
        answer: '3'
    },
    {
        question: 'Qual a capital do Rio Grande do Sul',
        options: ['Porto-Alegre', 'Canoas', 'Esteio', 'Sapucaia'],
        answer: 'Porto-Alegre'
    },
    // Adicione mais perguntas conforme necessário
];

const quizContainer = document.getElementById('quiz'); //Todo
const questionElement = document.getElementById('question'); //Pergunta
const optionsElement = document.getElementById('options'); //Opções de resposta
const submitButton = document.getElementById('submit'); //Botão de enviar
const resultElement = document.getElementById('result'); //Resultado
const nextButton = document.getElementById('next'); //Botão de próxima pergunta

//Esta variável mantém o índice da pergunta atual no array quizData. Ela é inicializada com o valor 0, o que significa que a primeira pergunta será exibida inicialmente.
let currentQuestionIndex = 0; 
//Esta variável mantém o número de respostas corretas que o usuário deu até o momento. Ela é inicializada com o valor 0, pois o usuário ainda não respondeu a nenhuma pergunta corretamente no início do quiz.
let score = 0; 

function loadQuestion() { 
    const { question, options } = quizData[currentQuestionIndex];
    questionElement.textContent = question;
    //usei o método 'map()' para criar as opções de forma mais concisa
    optionsElement.innerHTML = options.map(option => ` 
        <label>
            <input type="radio" name="option" value="${option}">
            ${option}
        </label>
    `).join('');
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) return;

    const userAnswer = selectedOption.value;
    const correctAnswer = quizData[currentQuestionIndex].answer;
    
    if (userAnswer === correctAnswer) {
        score++;
        resultElement.textContent = 'Você acertou!';
    } else {
        resultElement.textContent = `Resposta incorreta. A resposta correta é: ${correctAnswer}`;
    }

    nextButton.style.display = 'block';
}

function showResult() {
    quizContainer.style.display = 'none';
    resultElement.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;
    resultElement.style.display = 'block';
}

submitButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.style.display = 'none';
        resultElement.textContent = '';
    } else {
        showResult();
    }
});

loadQuestion();