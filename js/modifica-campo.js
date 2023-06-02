import { atualizaDados } from "./atualiza-dados.js";

const botaoNovoCampo = document.querySelector("[data-abrir-novo-campo]");
const novoCampo = document.querySelector("[data-criar-campo]");
const campoNovoCampo = document.querySelector("[data-novo-campo]");
const nomeNovoCampo = document.querySelector("[data-nome-novo-campo]");
const campoInputs = document.querySelector("[data-inputs]");

atualizaDados();

novoCampo.addEventListener("click", () => {
    botaoNovoCampo.style.display = "block";
    campoNovoCampo.style.display = "none";
    adicionarNovoCampo();
})

botaoNovoCampo.addEventListener("click", () => {
    botaoNovoCampo.style.display = "none";
    campoNovoCampo.style.display = "grid";
})



function adicionarNovoCampo() {
    const novoInput = document.createElement("fieldset");
    novoInput.className = "input_campo";
    novoInput.innerHTML = `
    <label class="input_etiqueta" data-etiquetas>${nomeNovoCampo.value}</label>
    <p class="porcentagem" data-porcentagem>0%</p>
    <input class="input_cor" data-jscolor="{previewSize:34}" value="#000000">
    <input class="campo_valores" type="text" value="0.00" data-valores>
    <button class="deletar-campo" data-deletar-campo><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
 `;
    campoInputs.appendChild(novoInput);
    nomeNovoCampo.value = "";
    jscolor.install();
    atualizaDados();
}

export function removeCampo(campo) {
    campo.parentNode.remove();
    atualizaDados();
}
