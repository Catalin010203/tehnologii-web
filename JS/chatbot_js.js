
let questions = [
    {
        question: "Te-ai apucat de ideea de proiect?",
        options: {
            a: "Da, am deja o schiță!",
            b: "Nu încă, dar mă gândesc la ceva",
            c: "Nu prea știu ce să fac..."
        },
        correctAnswer: "a",
        correctResponse: "Excelent! Abia aștept să văd ce iese!",
        incorrectResponse: "Nu-i nimic! Discutăm idei împreună."
    },
    {
        question: "Cum merge echipa ta la proiect?",
        options: {
            a: "Ne organizăm bine!",
            b: "Mai greu cu sincronizarea...",
            c: "Sunt singur"
        },
        correctAnswer: "a",
        correctResponse: "Foarte tare! Munca în echipă e cheia succesului!",
        incorrectResponse: "O să găsim soluții împreună, nu-ți face griji."
    },
    {
        question: "Ai stabilit tehnologiile pe care le vei folosi?",
        options: {
            a: "Da, am ales tehnologiile!",
            b: "Am câteva idei, dar nu sunt sigur",
            c: "Nu știu ce tehnologii să folosesc"
        },
        correctAnswer: "a",
        correctResponse: "Perfect! Acum poți începe implementarea!",
        incorrectResponse: "Nicio problemă! Putem analiza împreună ce tehnologii ți se potrivesc."
    },
    {
        question: "Ai început să scrii cod pentru proiect?",
        options: {
            a: "Da, am început!",
            b: "Am făcut doar câteva lucruri",
            c: "Nu încă"
        },
        correctAnswer: "a",
        correctResponse: "Super! Continuă în ritmul acesta!",
        incorrectResponse: "Nu te grăbi! Important este să ai un plan clar și să începi pas cu pas."
    },
    {
        question: "Ai întâmpinat probleme până acum?",
        options: {
            a: "Nu, totul merge bine!",
            b: "Da, câteva probleme",
            c: "Am rămas blocat"
        },
        correctAnswer: "a",
        correctResponse: "Mă bucur! Sper să meargă la fel de bine în continuare!",
        incorrectResponse: "Nu te îngrijora! Problemele fac parte din procesul de dezvoltare. Le putem rezolva împreună."
    }
];

// Indexul întrebării curente
let currentQuestionIndex = 0;

// Preluăm elementele HTML
const chatContainer = document.getElementById("chat-container");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Verificăm dacă elementele HTML există
if (chatContainer && chatForm && userInput) {
    displayQuestion();
} else {
    console.error(
        "Nu au fost găsite toate elementele HTML. Verifică ID-urile din fișierul HTML."
    );
}

// Afișează întrebarea curentă
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    const optionsHTML = Object.keys(currentQuestion.options)
        .map(key => `${key}. ${currentQuestion.options[key]}`)
        .join("<br>");

    const botResponse = document.createElement("div");
    botResponse.classList.add("message", "bot-message");

    botResponse.innerHTML = `
        <strong>Bot:</strong> ${currentQuestion.question}
        <br><br>
        ${optionsHTML}
        <br><br>
        <small>Răspunde cu a, b sau c.</small>
    `;

    chatContainer.appendChild(botResponse);

    scrollChatContainerToBottom();
}

// Derulează conversația până la ultimul mesaj
function scrollChatContainerToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Gestionează trimiterea răspunsului utilizatorului
chatForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userResponse = userInput.value.toLowerCase().trim();

    // Nu acceptăm răspunsuri goale
    if (userResponse === "") {
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Verificăm dacă răspunsul este valid
    if (!Object.keys(currentQuestion.options).includes(userResponse)) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("message", "bot-message");

        errorMessage.innerHTML = `
            <strong>Bot:</strong>
            Te rog să răspunzi cu a, b sau c.
        `;

        chatContainer.appendChild(errorMessage);

        userInput.value = "";
        scrollChatContainerToBottom();
        return;
    }

    // Afișăm răspunsul utilizatorului
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");

    userMessage.innerHTML = `
        <strong>You:</strong> ${userResponse}
    `;

    chatContainer.appendChild(userMessage);

    // Creăm răspunsul chatbotului
    const botResponse = document.createElement("div");
    botResponse.classList.add("message", "bot-message");

    if (userResponse === currentQuestion.correctAnswer) {
        botResponse.innerHTML = `
            <strong>Bot:</strong>
            ${currentQuestion.correctResponse}
        `;
    } else {
        botResponse.innerHTML = `
            <strong>Bot:</strong>
            ${currentQuestion.incorrectResponse}
        `;
    }

    chatContainer.appendChild(botResponse);

    // Trecem la următoarea întrebare
    currentQuestionIndex =
        (currentQuestionIndex + 1) % questions.length;

    // Golim câmpul de introducere
    userInput.value = "";

    // Afișăm următoarea întrebare după 800 ms
    setTimeout(function () {
        displayQuestion();
        scrollChatContainerToBottom();
    }, 800);
});
