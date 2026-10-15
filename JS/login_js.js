let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const emailRegex = /^[a-z]+\.[a-z]+[0-9]{0,2}@e-uvt\.ro$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

    if (!emailRegex.test(email)) {
        alert("Email-ul nu respecta formatul UVT!");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Parola trebuie sa contina cel putin 7 caractere, o litera mica, o litera mare, o cifra si un caracter special!");
        return;
    }

    window.location.href = "home.html";
});