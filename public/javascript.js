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
        question: "01: Javascript is a _____ language.",
        option1: "Programming",
        option2: "Application",
        option3: "Scripting",
        correctAns: "Programming"

    },
    {
        question: "02: JavaScript is a _____ Side Scripting Language.",
        option1: "server",
        option2: "browser",
        option3: "ISP",
        correctAns: "browser"


    },
    {
        question: "03: Which of the following purpose, JavaScript is designed for ?",
        option1: " To Style HTML Pages",
        option2: "To Perform Server Side Scripting Opertion",
        option3: "To add interactivity to HTML Pages.",
        correctAns: "To add interactivity to HTML Pages."
    },
    {
        question: "04: JavaScript can be written",
        option1: "directly on the server script",
        option2: " directly into HTML page",
        option3: "All the above",
        correctAns: "All the above"
    },
    {
        question: "05: JavaScript code is written inside file having extension",
        option1: ".jvs",
        option2: ".js",
        option3: ".jsc",
        correctAns: ".js"
    },
    {
        question: "06: Why JavaScript is called as Lightweight Programming Language ?",
        option1: "  because JS is available free of cost.",
        option2: " because we can add programming functionality inside JS",
        option3: " because JS can provide programming functionality inside but up to certain extend.",
        correctAns: " because JS can provide programming functionality inside but up to certain extend."
    },
    {
        question: "07: JavaScript is also called as",
        option1: "Server Side Scripting Language",
        option2: " Client Side Scripting Language",
        option3: "All of the above",
        correctAns: " Client Side Scripting Language"
    },
    {
        question: "08: Local Browser used for validations on the Web Pages uses",
        option1: "Java",
        option2: "JS",
        option3: "CSS",
        correctAns: "JS"
    },
    {
        question: "09:JavaScript code can be called by using",
        option1: " RMI",
        option2: "Function / Method",
        option3: " None of the above",
        correctAns: "Function / Method"
    },
    {
        question: "10:Which of the following is not javascript data types?",
        option1: "Null type",
        option2: "undefined type",
        option3: "All the above",
        correctAns: "All the above"
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
        correctAnswer: correctAnswer
    }

      // ====Sending Data to Firebase Database====
      firebase.database().ref('JavaScript-Quiz').push(quizObj)
}


// ======Function to enable button when user select any options==========

function clicked() {
    button.disabled = false
}
