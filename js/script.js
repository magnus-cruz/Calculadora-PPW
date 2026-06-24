// Variáveis para armazenar os números e a operação
let numeroAtual = "0";
let numeroAnterior = "";
let operacao = "";
let limparTela = false;
// Seleciona o elemento de exibição da calculadora e os botões
const display = document.getElementById("display");
const botoes = document.querySelectorAll(".btn-calculadora");
// Atualiza a tela da calculadora com o número atual
function atualizarTela() {
    display.value = numeroAtual;
}
// Adiciona um número ao número atual
function adicionarNumero(valor) {
    if (numeroAtual === "0" || limparTela) {
        numeroAtual = valor;
        limparTela = false;
        return;
    }
// Adiciona o valor ao número atual
    numeroAtual += valor;
}
/// Adiciona um ponto decimal ao número atual
function adicionarDecimal() {
    if (limparTela) {
        numeroAtual = "0";
        limparTela = false;
    }

    if (!numeroAtual.includes(".")) {
        numeroAtual += ".";
    }
}

function escolherOperacao(valor) {
    if (numeroAtual === "") {
        return;
    }

    if (numeroAnterior !== "") {
        calcular();
    }
// Armazena a operação e o número atual como o número anterior
    operacao = valor;
    numeroAnterior = numeroAtual;
    limparTela = true;
}

function calcular() {
    const anterior = parseFloat(numeroAnterior);
    const atual = parseFloat(numeroAtual);

    if (Number.isNaN(anterior) || Number.isNaN(atual)) {
        return;
    }

    let resultado = 0;

    if (operacao === "+") {
        resultado = anterior + atual;
    } else if (operacao === "-") {
        resultado = anterior - atual;
    } else if (operacao === "*") {
        resultado = anterior * atual;
    } else if (operacao === "/") {
        resultado = atual === 0 ? "Erro" : anterior / atual;
    } else {
        return;
    }

    numeroAtual = String(resultado);
    operacao = "";
    numeroAnterior = "";
    limparTela = true;
}

function limparCalculadora() {
    numeroAtual = "0";
    numeroAnterior = "";
    operacao = "";
    limparTela = false;
}

function apagarUltimoNumero() {
    if (limparTela) {
        return;
    }

    if (numeroAtual.length > 1) {
        numeroAtual = numeroAtual.slice(0, -1);
    } else {
        numeroAtual = "0";
    }
}

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent.trim();

        if (!isNaN(valor) || valor === ".") {
            if (valor === ".") {
                adicionarDecimal();
            } else {
                adicionarNumero(valor);
            }
        } else if (valor === "+" || valor === "-" || valor === "*" || valor === "/") {
            escolherOperacao(valor);
        } else if (valor === "=") {
            calcular();
        } else if (valor === "C") {
            limparCalculadora();
        } else if (valor === "Delete") {
            apagarUltimoNumero();
        }

        atualizarTela();
    });
});

atualizarTela();