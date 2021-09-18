const questionNumber = document.querySelector(".question-number");

const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answer-indicator");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0 ;

// start the quiz
function submitForm(e) {
    e.preventDefault();
    let name = document.forms["welcome_form"]["name"].value;
  
    sessionStorage.setItem("name", name);
  
    location.href = "quiz.html";
  }


function goToHome(){
    location.href = "start.html";
}

function tryAgainQuiz(){
    location.href="quiz.html";
}


// push the questions into availableQuestions Array
function setAvailableQuestions(){
const totalQuestion = quiz.length;
for(let i=0; i<totalQuestion ; i++){
   availableQuestions.push(quiz[i])
} 
}


// set question number and question and options
function getNewQuestion() {
 //set question number
 questionNumber.innerHTML = "Question " + (questionCounter + 1 ) + " of " +    quiz.length;
 
//  set question text
// get random question
const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
currentQuestion = questionIndex;
questionText.innerHTML = currentQuestion.question;


// get the position of 'questionIndex' from the availableQuestions array
const index1 = availableQuestions.indexOf(questionIndex);


// remove the  'questionIndex' from the availableQuestions array , so that the question does not repeat 
availableQuestions.splice(index1, 1);

//set options 
//get the length of options
const optionLen = currentQuestion.options.length

// push options into availableOptions array
for(let i =0 ; i<optionLen; i++){
    availableOptions.push(i);
}
optionContainer.innerHTML = '';
let animationDelay = 0.15;

//create option in html
for (let i=0 ; i<optionLen; i++){
    const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // get the position of 'optionIndex' from the availableOptions  
    const index2 = availableOptions.indexOf(optionIndex);
    // remove the 'optionIndex' from the availableOptions , so that the option does not repeat 
    availableOptions.splice(index2 , 1);

    // console.log(availableOptions)
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex ;
    option.style.animationDelay = animationDelay + 's' ;
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onClick" , "getResult(this)");

}

questionCounter++ 

}

//get the result of current attempt question
function getResult(element){
    const id = parseInt(element.id) ;
    // get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        // set the answer by comparing the id of clicked option 
            element.classList.add("correct");
            //add the indicator to correct mark
            updateAnswerIndicator("correct");
            correctAnswers ++ ;
            // console.log("correct" + correctAnswers);
            
    }
    else{
        // set the red color to the incorrect option
        element.classList.add("wrong");
       //add the indicator to wrong mark
         updateAnswerIndicator("wrong");
    // if the answer is incorrect  show the correct option  by adding green color the correct  
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen ; i++){
        if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
            optionContainer.children[i].classList.add("correct");
        }
    }
    
    }
    attempt++;
    unclickableOptions();
}
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i = 0 ; i<optionLen ; i++){
        optionContainer.children[i].classList.add("already-answered");
       
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0 ; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator); 
    }
}

function updateAnswerIndicator(markType){
 answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}



function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }else{
     getNewQuestion();
    }
}


function quizOver(){
    // hide quiz Box
    quizBox.classList.add("hide");

    // show result box
    resultBox.classList.remove("hide");
   quizResult();

}


function quizResult(){

    resultBox.querySelector(".total-question").innerHTML= quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML= attempt;
    resultBox.querySelector(".total-correct").innerHTML=  correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML= attempt - correctAnswers; 
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".total-percentage").innerHTML= percentage.toFixed() + "%";
    resultBox.querySelector(".total-score").innerHTML= correctAnswers +" / " + quiz.length;
   
}

// function resetQuiz(){
// questionCounter = 0;
// correctAnswers = 0;
//  attempt = 0 ;
// }


// function tryAgainQuiz(){
   
//     resultBox.classList.add("hide");
 
//     quizBox.classList.remove("hide");

//     resetQuiz();
// }

window.onload = function()
{
    //first we will set all questions in availableQuestions Array
    setAvailableQuestions();   
    //second we will call getNewQuestion(); function
    getNewQuestion();
   //to create indicator of answers
   answersIndicator(); 
   

}

//user info 
let user_name = sessionStorage.getItem("name");
document.querySelector("span.name").innerHTML = user_name;

