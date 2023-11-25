var firebaseConfig = {
    apiKey: "AIzaSyAcN80mcz5U3eLL6cWY3O8B-GTaciYbRqo",
    authDomain: "quiz-app-24721.firebaseapp.com",
    databaseURL: "https://quiz-app-24721-default-rtdb.firebaseio.com",
    projectId: "quiz-app-24721",
    storageBucket: "quiz-app-24721.appspot.com",
    messagingSenderId: "91193434987",
    appId: "1:91193434987:web:76508a108fcf83a85ba22e"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

var questions = [
    {
        question: "01: What does HTML stand for?",
        option1: "Hyper Text Markup Language",
        option2: "Hyperlinks and Text Markup Language",
        option3: "Home Tool Markup Langauge",
        correctAns: "Hyper Text Markup Language"

    },
    {
        question: "02: Choose the correct HTML element for the largest heading:",
        option1: "< heading >",
        option2: "< h1 >",
        option3: "< h6 >",
        correctAns: "< h1 >"


    },
    {
        question: "03: What is the correct HTML element for inserting a line break?",
        option1: "< br >",
        option2: "< lb >",
        option3: "< break >",
        correctAns: "< br >"
    },
    {
        question: "04: What is the correct HTML for adding a background color? ",
        option1: "< body style = 'background-color:yellow'; >",
        option2: "< body bg = 'yellow >",
        option3: "< background >yellow",
        correctAns: "< body style = 'background-color:yellow'; >"
    },
    {
        question: "05: Who is the father of HTML?",
        option1: "Rasmus Lerdorf",
        option2: "Tim Berners-Lee",
        option3: "Brendan Eich",
        correctAns: "Tim Berners-Lee"
    },
    {
        question: "06: What do you understand by HTML?",
        option1: " HTML describes the structure of a webpage",
        option2: " HTML is the standard markup language mainly used to create web pages",
        option3: "All of the above",
        correctAns: "HTML is the standard markup language mainly used to create web pages"
    },
    {
        question: "07: Which is used to read an HTML page and render it?",
        option1: " Web network",
        option2: "Web matrix",
        option3: "Web browser",
        correctAns: "Web browser"
    },
    {
        question: "08: Which is used to create Web Pages ?",
        option1: "Java",
        option2: "HTML",
        option3: "JVM",
        correctAns: "HTML"
    },
    {
        question: "09: HTML is a set of markup ___.",
        option1: "tags",
        option2: "sets",
        option3: "attributes",
        correctAns: "tags"
    },
    {
        question: "10: HTML program is saved using ___ extension.",
        option1: ".htmn",
        option2: ".html",
        option3: ".htnl",
        correctAns: ".html"
    }]

var question = document.getElementById("questions");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var button = document.getElementById("button");
var homebutton = document.getElementById("homebtn");
let index = 0;
let score = 0;



function nextQuestion() {
    var getOption = document.getElementsByName("options");

    for (var i = 0; i < getOption.length; i++) {
        if (getOption[i].checked) {
            //    =======Getting the value of selected answer======== 
            var selectedValue = getOption[i].value;

            // =======Getting the selected Question========
            var selectedQuestion = questions[index - 1]["question"];
            console.log(selectedQuestion)

            // ======Getting the selected answer======
            var selectedAns = questions[index - 1][`option${selectedValue}`]

            // =======The Correct answer is=====
            var correctAnswer = questions[index - 1]["correctAns"];

            // ====Condition for cheking the correct answer======
            if (selectedAns === correctAnswer) {
                score++
            }
        }
        getOption[i].checked = false

    }

    //  =====Disbaling the button=====
    button.disabled = true
    homebutton.disabled = true

    if (index > questions.length - 1) {
        let percentage = (score / questions.length) * 100;
        if (percentage >= 80) {
            Swal.fire(
                'Great job!',
                `Your percentage is ${percentage.toFixed(2)}`,
                'success'
            );
        } else if (percentage >= 70) {
            Swal.fire(
                'Well done!',
                `Your percentage is ${percentage.toFixed(2)}`,
                'success'
            );
        } else if (percentage >= 60) {
            Swal.fire(
                'Better!',
                `Your percentage is ${percentage.toFixed(2)}`,
                'success'
            );
        } else if (percentage >= 50) {
            Swal.fire(
                'You can do better than this!',
                `Your percentage is ${percentage.toFixed(2)}`,
                'success'
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Sorry! You are Failed',
                text: `Your percentage is ${percentage.toFixed(2)}`,
            });

        }
        homebutton.disabled = false;

    } else {
        //    ========Showing the questions and options on document======
        question.innerHTML = questions[index].question;
        option1.innerHTML = questions[index].option1;
        option2.innerHTML = questions[index].option2;
        option3.innerHTML = questions[index].option3;
        index++
    }


    // =====Object for Database=====
    var quizObj = {
        selectedQuestion: selectedQuestion,
        selectedAns: selectedAns,
        CorrectAns: correctAnswer
    }

    // ====Sending Data to Firebase Database====
    firebase.database().ref('HTML-Quiz').push(quizObj)
}


// ======Function to enable button when user select any options==========

function clicked() {
    button.disabled = false
}
