const buttons = document.querySelectorAll(".link-button");
const info = document.getElementById("click-info");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        info.textContent = `Você clicou em: ${name}`;

        // Animação de clique
        button.classList.add("active");

        setTimeout(() => {
            button.classList.remove("active");
        }, 200);
    });
});
