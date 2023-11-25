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
        question: "01: CSS stands for ______",
        option1: " Cascade Sheets Style",
        option2: "Cascade Style Sheet",
        option3: "Cascading Style Sheets",
        correctAns: "Cascading Style Sheets"

    },
    {
        question: "02: What is CSS?",
        option1: " CSS is a style sheet language",
        option2: "CSS is the language used to style the HTML documents",
        option3: "All of the above",
        correctAns: "All of the above"


    },
    {
        question: "03: Which tag is used to embed CSS in HTML document?",
        option1: "< CSS >",
        option2: "< lb >",
        option3: "< style >",
        correctAns: "< style >"
    },
    {
        question: "04: The < link > tag goes inside",
        option1: "the body section",
        option2: "the head section",
        option3: "None of the above",
        correctAns: "the head section"
    },
    {
        question: "05: What CSS define in HTML ?",
        option1: "How to send HTML elements",
        option2: "How to save HTML elements",
        option3: "How to display HTML elements",
        correctAns: "How to display HTML elements"
    },
    {
        question: "06: Which HTML attribute is used to define inline styles ?",
        option1: "style",
        option2: "styles",
        option3: "class",
        correctAns: "style"
    },
    {
        question: "07: CSS is also created and maintained by group of people within",
        option1: " W3D",
        option2: "W3B",
        option3: "W3C",
        correctAns: "W3C"
    },
    {
        question: "08: CSS1 Developed in _____ by the W3C, describes CSS language and simple visual formatting for all HTML tags.",
        option1: "1996",
        option2: "1994",
        option3: "1992",
        correctAns: "1996"
    },
    {
        question: "09: From which version of CSS under development since the late 1990s, added a lot of extra features ?",
        option1: "CSS1",
        option2: "CSS2",
        option3: "CSS3",
        correctAns: "CSS2"
    },
    {
        question: "10: How many types of levels in style sheets ?",
        option1: "two level",
        option2: "one level",
        option3: " three level",
        correctAns: " three level"
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
        let percent = (score / questions.length
        ) * 100;
        if (percent >= 80) {
            Swal.fire(
                'Great job!',
                `Your percentage is ${percent.toFixed(2)}`,
                'success'
            );
        } else if (percent >= 70) {
            Swal.fire(
                'Well done!',
                `Your percentage is ${percent.toFixed(2)}`,
                'success'
            );
        } else if (percent >= 60) {
            Swal.fire(
                'Better!',
                `Your percentage is ${percent.toFixed(2)}`,
                'success'
            );
        } else if (percent >= 50) {
            Swal.fire(
                'You can do better than this!',
                `Your percentage is ${percent.toFixed(2)}`,
                'success'
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Sorry! You are Failed',
                text: `Your percentage is ${percent.toFixed(2)}`,
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
    firebase.database().ref('CSS-Quiz').push(quizObj)

}


// ======Function to enable button when user select any options==========

function clicked() {
    button.disabled = false
}