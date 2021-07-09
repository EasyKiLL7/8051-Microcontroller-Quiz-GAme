const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
     
    {
        question: ' What are the features of 8051 Microcontroller?',
        choice1: 'It has two 16-bit Timer/Counter',
        choice2: 'It has a 4KB of internal memory (ROM)',
        choice3: 'It is an 8-bit processor and 40 pin package microcontroller',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question:
            "The 8051 microcontroller is of _____ pin package as a _____ processor.",
        choice1: "20, 1 byte",
        choice2: "30, 1 byte",
        choice3: "40, 8 bit",
        choice4: "40, 8 byte",
        answer: 3,
    },
    {
        question: "Which bits of opcode specify the type of registers to be used in the register addressing mode?",
        choice1: "LSB",
        choice2: "MSB",
        choice3: "Both LSB & MSB",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What does the symbol '#' represent in the instruction MOV A, #55H?",
        choice1: "Direct datatype",
        choice2: "Indirect datatype",
        choice3: "immediate datatype",
        choice4: "Indexed dataype",
        answer: 3,
    },
    {
        "question": "Which flag allow to carry out the signed as well as unsigned addition and subtraction operations?",
        "choice1": "CY",
        "choice2": "OV",
        "choice3": "AC",
        "choice4": "F0",
        "answer": 2,
      },
      {
        "question": "What is the counting rate of a machine cycle in correlation to the oscillator frequency for timers?",

        "choice1": "1/10",
        "choice2": "1/12",
        "choice3": "1/15",
        "choice4": "1/20",
        "answer": 2
      }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()