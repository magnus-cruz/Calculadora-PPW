// Variáveis globais para armazenar os valores e a operação
let numero1 = "";
let numero2 = "";
let resultado = "";
let operacao = "";
// Selecionar o checkbox do tema
const toggleTema = document.querySelector(".bb8-toggle__checkbox");
const body = document.body;
// Verificar se há um tema salvo no localStorage
const temaSalvo = localStorage.getItem("tema-calculadora");
if (temaSalvo === "light") {
    body.classList.add("light-theme");
    toggleTema.checked = true;
}
// Adicionar evento de mudança no checkbox
toggleTema.addEventListener("change", () => {
    const modoClaro = toggleTema.checked;
    body.classList.toggle("light-theme", modoClaro);
    body.classList.toggle("dark-theme", !modoClaro);
    localStorage.setItem("tema-calculadora", modoClaro ? "light" : "dark");
});

// Escutar o clique dos botões
document.querySelectorAll(".btn-calculadora").forEach(btn => {
    btn.addEventListener("click", () => {
        armazenarCalculo(btn.textContent);
    });
});

// Ler os cliques do teclado
document.addEventListener("keydown", (event) => {
    const tecla = event.key;

    if (/\d/.test(tecla)) {
        event.preventDefault();
        armazenarCalculo(tecla);
    } else if (tecla === ".") {
        event.preventDefault();
        armazenarCalculo(tecla);
    } else if (["+", "-", "*", "/"].includes(tecla)) {
        event.preventDefault();
        armazenarCalculo(tecla);
    } else if (tecla === "Enter" || tecla === "=") {
        event.preventDefault();
        armazenarCalculo("=");
    } else if (tecla === "Backspace") {
        event.preventDefault();
        armazenarCalculo("⌫");
    } else if (tecla === "c" || tecla === "C" || tecla === "Delete") {
        event.preventDefault();
        armazenarCalculo("C");
    }
});
// Função para armazenar os valores e operações
function armazenarCalculo(valor) {
   // Limpar valores se o resultado já estiver presente e uma operação não foi definida
    if (valor === "C") {
        limparValores();
        atualizarTela();
        return;
    }
// Apagar o último dígito se a tecla de apagar for pressionada
    if (valor === "⌫") {
        apagarUltimoDigito();
        atualizarTela();
        return;
    }
// Inserir decimal se a tecla de ponto for pressionada
    if (valor === ".") {
        inserirDecimal();
        atualizarTela();
        return;
    }

    if (valor === "=") {
        calcularResultado();
        atualizarTela();
        return;
    }

    if (["+", "-", "*", "/"].includes(valor)) {
        definirOperacao(valor);
        atualizarTela();
        return;
    }

    if (!isNaN(valor) && valor !== "") {
        inserirNumero(valor);
        atualizarTela();
    }
}

function inserirNumero(valor) {
    if (resultado !== "" && operacao === "") {
        limparValores();
    }

    if (operacao === "") {
        numero1 = numero1 === "" ? valor : numero1 + valor;
    } else {
        numero2 = numero2 === "" ? valor : numero2 + valor;
    }
}

function inserirDecimal() {
    if (operacao === "") {
        if (numero1.includes(".")) return;
        numero1 = numero1 === "" ? "0." : numero1 + ".";
    } else {
        if (numero2.includes(".")) return;
        numero2 = numero2 === "" ? "0." : numero2 + ".";
    }
}

function definirOperacao(valor) {
    if (numero1 === "") {
        return;
    }

    if (resultado !== "" && numero2 === "") {
        numero1 = resultado;
        resultado = "";
    }

    if (numero2 !== "" && operacao !== "") {
        calcularResultado();
        numero1 = resultado;
        numero2 = "";
        resultado = "";
    }

    operacao = valor;
}

function calcularResultado() {
    if (numero1 === "" || numero2 === "" || operacao === "") {
        return;
    }

    const n1 = Number(numero1);
    const n2 = Number(numero2);

    switch (operacao) {
        case "+":
            resultado = String(n1 + n2);
            break;
        case "-":
            resultado = String(n1 - n2);
            break;
        case "*":
            resultado = String(n1 * n2);
            break;
        case "/":
            resultado = n2 === 0 ? "Erro" : String(n1 / n2);
            break;
    }

    numero1 = resultado;
    numero2 = "";
    operacao = "";
}
// Função para apagar o último dígito
function apagarUltimoDigito() {
    if (resultado !== "") {
        resultado = "";
        return;
    }

    if (operacao !== "" && numero2 !== "") {
        numero2 = numero2.slice(0, -1);
    } else if (operacao !== "") {
        operacao = "";
    } else if (numero1 !== "") {
        numero1 = numero1.slice(0, -1);
    }
}

function limparValores() {
    numero1 = "";
    numero2 = "";
    operacao = "";
    resultado = "";
}

function atualizarTela() {
    const display = document.querySelector(".display");

    if (resultado !== "") {
        display.value = resultado;
    } else {
        display.value = numero1 + operacao + numero2;
    }
}
