
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }




  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)


  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

 
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }


  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }


  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

 
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

 
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

 
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });


  // mouseover 
  document.addEventListener("DOMContentLoaded", function() {
    var h4Text = document.getElementById('myText');
  
    h4Text.addEventListener('mouseover', function() {
      h4Text.style.color = 'black'; 
    });
  
    h4Text.addEventListener('mouseout', function() {
      h4Text.style.color = 'Darkgreen'; 
    });
  });


  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

 
  new PureCounter();

})()

function animateOnIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target); 
    }
  });
}


const observer = new IntersectionObserver(animateOnIntersection, {
  root: null,
  rootMargin: '0px',
  threshold: 0.3 
});


const containers = document.querySelectorAll('.container2');


containers.forEach(container => {
  observer.observe(container);
});

function submitForm() {
  document.querySelector('.sent-message').style.display = 'block';
}

// quizz 
const questions = [
  {
    question: "Бұрынғы кездерде қазақтар қандай тұрмыс салтын ұстанған?",
    answers: [
      { text: "Көшпелі", correct: true},
      { text: "Жартылай көшпелі", correct: false},
      { text: "Тұрақты", correct: false},
      { text: "Жартылай тұрақты", correct: false},
    ]
  },
  {
    question: "Көшпенділердің ең басты жол серігі не болды?",
    answers: [
      { text: "Сиыр", correct: false},
      { text: "Жылқы", correct: true},
      { text: "Түйе", correct: false},
      { text: "Қой", correct: false},
    ]
  },
  {
    question: "Қазақстанда қанша пайыз қазақ ұлты тұрады?",
    answers: [
      { text: "80%", correct: false},
      { text: "91%", correct: false},
      { text: "69%", correct: false},
      { text: "71%", correct: true},
    ]
  },
  {
    question: "Шертпелі ішекті аспапқа қайсысы жатады?",
    answers: [
      { text: "Сылдырмақ", correct: false},
      { text: "Шыңқобыз", correct: false},
      { text: "Дабыл", correct: false},
      { text: "Жетіген", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextQuizButton = document.getElementById("next-btn-quiz");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextQuizButton.innerHTML = "Ары Қарай";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn_quiz");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextQuizButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtnQuiz = e.target;
  const isCorrect = selectedBtnQuiz.dataset.correct === "true";
  if(isCorrect){
    selectedBtnQuiz.classList.add("correct");
    score++;
  } else {
    selectedBtnQuiz.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextQuizButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

nextQuizButton.addEventListener("click", () =>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else {
    startQuiz();
  }
});
function showScore() {
  resetState();
  questionElement.innerHTML = `Сіздің ұпайыңыз ${score}/${questions.length}!`;
  nextQuizButton.innerHTML = "Қайтадан Өту";
  nextQuizButton.style.display = "block";
  document.body.classList.add("quiz-finished");
}
function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn_quiz");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);

    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");
    button.addEventListener("click", () => {
      audio.play();
    });
  });
}


startQuiz();



// Promise 
function sendFormData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Success'); 
    }, 1000);
  });
}


async function handleSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const formData = {
    name,
    email,
    subject,
    message,
  };

  // await 
  try {
    const response = await sendFormData(formData);
    console.log('Form data sent:', response);
    document.querySelector('.sent-message').style.display = 'block';
  } catch (error) {
    console.error('Error sending form data:', error);
  }
}

const form = document.querySelector('.php-email-form');
form.addEventListener('submit', handleSubmit);


