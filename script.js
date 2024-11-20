const questions = [
    {
        question:"What does HTML stand for?",
        answers:[
            {text:"Hyper Text Preprocessor",correct:false},
            {text:"Hyper Text Markup Language",correct:true},
            {text:"Hyper Text Multiple Language",correct:false},
            {text:"Hyper Tool Multi Language",correct:false},
        ]
    },
    {
        question:"What does CSS stand for?",
        answers:[
            {text:"Common Style Sheet",correct:false},
            {text:"Colorful Style Sheet",correct:false},
            {text:"Computer Style Sheet",correct:false},
            {text:"Cascading Style Sheet",correct:true},
        ]
    },
    {
        question:"What does PHP stand for?",
        answers:[
            {text:"Hypertext Preprocessor",correct:true},
            {text:"Hypertext Programming",correct:false},
            {text:"Hypertext Preprogramming",correct:false},
            {text:"Hometext Preprocessor",correct:false},
            
        ]
    },
    {
        question:"What does SQL stand for?",
        answers:[
            {text:"Stylish Question Language",correct:false},
            {text:"Stylesheet Query Language",correct:false},
            {text:"Statement Question Language",correct:false},
            {text:"Structured Query Language",correct:true},
        ]
    },
    {
        question:"What does XML stand for?",
        answers:[
            {text:"eXtensible Markup Language",correct:true},
            {text:"eXecutable Multiple Language",correct:false},
            {text:"eXTra Multi-Program Language",correct:false},
            {text:"eXamine Multiple Language",correct:false},
        ]
    }
];

const questionElement= document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score = 0;

function startQuiz(){

    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." +currentQuestion.question;
    
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetstate(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}
function showscore(){
    resetstate();
    questionElement.innerHTML = "You scored $(score) out of $(questions.length)!";
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();