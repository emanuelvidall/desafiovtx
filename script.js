//definindo canvas, cores dos rects e desenhando o tabuleiro com canvas grid 8x8, usando forloop para desenhar os rects e usando condicional para alternar as cores dos rects, tamanho do rect 50x50

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#E8EDF9';
ctx.fillRect(0, 0, 400, 400);
ctx.fillStyle = '#B7C0D8';

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
        ctx.fillRect(i * 50, j * 50, 50, 50);
        }
    }
}
//definicoes do script toastr para notificacoes de erro
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//restringindo input do usuario a 64 numeros, com espacos entre si, 8 por linha, usando eventlistener para ouvir todo input e tratar o valor do input, usando condicional para restringir o input a 64 numeros, usando forloop para adicionar espacos entre os numeros e usando condicional para adicionar enter de nova linha a cada 8 numeros
const areatexto = document.getElementById('entrada');
areatexto.value = "";
areatexto.addEventListener("input", () => {
    const maxLength = 8;
    let value = areatexto.value.replace(/\n/g, "").replace(/ /g, "");
    let newvalue = "";
    const maxCharacters = 64;

    if (value !== value.replace(/[^0-6]/g, "")){
        toastr.error("Preencha apenas com números de 0 a 6");
        value = value.replace(/[^0-6]/g, "");
    }
    if (value.length > maxCharacters) {
        toastr.error("Máximo de 64 peças ou espaços vazios")
    areatexto.value = areatexto.value.slice(0, -1);
    return;
    }

    for (let i = 0; i < value.length; i++) {
        if(i > 0 && i % maxLength === 0){
            newvalue += "\n";
        }
        newvalue += value[i];
        if(i < value.length -1){
            newvalue += " ";
        }
    }
    areatexto.value = newvalue;
});
//eventlistener para abrir e fechar modal quando cursor estiver na textarea
areatexto.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        getEntrada();
    }else if(e.key === "Escape"){
        fecharModal();
    }
});
const tabuleiro = document.getElementById('drawIcons')
//funcao principal com definicao das pecas, tratamento do input do usuario para tratar quaisquer erros, gerando no final uma array de 64 items cada item com um numero de 0-6
function getEntrada(){
    const codigos = ['Vazio', 'Peão', 'Bispo', 'Cavalo', 'Torre', 'Rainha', 'Rei'];
    //remocao de todo e qualquer espaco em branco, incluindo empty strings no caso de enter na entrada de dados. Usando .replace para remover os enters e .split para separar os elementos em um array e usando .filter para remover os elementos vazios combinado com o .trim para remover os espacos em branco incluindo empty strings.
    const arrayEntrada = document.getElementById('entrada').value.split("").join(" ").replace( /\n/g, " ").split(' ').filter(e => String(e).trim());
    tabuleiro.innerHTML = "";
    for (let i = 0; i < arrayEntrada.length ; i++){
        if (arrayEntrada[i] == 1){
            tabuleiro.innerHTML += `<div class="a${i}"<h1><i mousetip mousetip-msg="Sou um <b>Peao (1)</b>" class="fas fa-chess-pawn animate__animated animate__bounce"></i></h1></div>`
        }else if(arrayEntrada[i] == 2){
            tabuleiro.innerHTML += `<div class="a${i}"<h1><i mousetip mousetip-msg="Sou uma <b>Torre (2)</b>" class="fas fa-chess-rook animate__animated animate__bounce"></i></h1></div>`
        }else if(arrayEntrada[i] == 3){
            tabuleiro.innerHTML += `<div class="a${i}"<h1><i mousetip mousetip-msg="Sou um <b>Cavalo (3)</b>" class="fas fa-chess-knight animate__animated animate__bounce"></i></h1></div>`
        }else if(arrayEntrada[i] == 4){
            tabuleiro.innerHTML += `<div class="a${i}"<h1><i mousetip mousetip-msg="Sou um <b>Bispo (4)</b>" class="fas fa-chess-bishop animate__animated animate__bounce"></i></h1></div>`
        }else if(arrayEntrada[i] == 5){
            tabuleiro.innerHTML += `<div class="a${i}"<h1><i mousetip mousetip-msg="Sou a <b>Rainha (5)</b>" class="fas fa-chess-queen animate__animated animate__bounce"></i></h1></div>`
        }else if(arrayEntrada[i] == 6){
            tabuleiro.innerHTML += `<div class="a${i}"<h1><i mousetip mousetip-msg="Sou o <b>Rei (6)</b>" class="fas fa-chess-king animate__animated animate__bounce"></i></h1></div>`
        }else if(arrayEntrada[i] == 0){
            tabuleiro.innerHTML += `<div class="a${i}"<h1></i></h1></div>`
        }
    //notificacao para usuario caso o input nao tenha 64 numeros
    if (arrayEntrada.length > 64 || arrayEntrada.length < 64){
            toastr.error("Preencha com 64 peças ou espaços vazios");
            return false;
        }else{
        const formulario = document.getElementById('formulario');
        const divResultado = document.getElementById('resultadoM');
        divResultado.innerHTML = "";
        //definicao do modal para exibir o resultado usando funcao checkPeca que retorna o valor de cada peca do array e usando .filter para filtrar o array e retornar apenas os valores iguais ao valor da peca, usando condicional para exibir o resultado no modal 
        const modal = document.getElementById('modal');
        for (let i = 0; i < 7; i++){
            function checkPeca(peca){
                return peca == i;
            }
            let resultado = arrayEntrada.filter(checkPeca);
            if(i !== 0){
//quando nao for espaco vazio, exibir o resultado no modal com o nome da peça e uma progress bar
                divResultado.innerHTML += "<strong>" + codigos[i] + "</strong>" + ": " + resultado.length + " peça(s) " + "<br>";
                divResultado.innerHTML += `<progress class="progress is-primary" value="${resultado.length}" max="64">15%</progress>`;
            }else{
//quando for espaco vazio, avisa quantos espacos vazios possui
                divResultado.innerHTML += `Existem ${resultado.length}<strong> espacos vazios</strong><br> <strong>Contagem de pecas</strong>:<br>`
            }
        }
    }
    let mouseTip = new MouseTip();
    mouseTip.start();
        
//rest do formulario para novos inputs e adiciona a classe is-active para exibir o modal
        modal.classList.add('is-active');
        const cavaloRoda = document.getElementById('cavaloRoda');
        cavaloRoda.innerHTML = "";
        cavaloRoda.innerHTML = `<spline-viewer loading-anim url="https://prod.spline.design/HxbMr6oeaxA-YFjP/scene.splinecode"></spline-viewer>`;
        formulario.reset();
}
}
//funcao para fechar o modal com remocao da classe
function fecharModal(){
    const modal = document.getElementById('modal');
    modal.classList.remove('is-active');
}
//funcao para fechar o modal com o botao de fechar e com escape e rodar o script com enter
function keyPress (e) {
    if(e.key === "Escape") {
        fecharModal();
    }else if(e.key === "Enter"){
        getEntrada();
    }
}

const explicacao = document.getElementById('explicacao');

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        fecharModalExplicacao();
    }
});

function modalExplicacao(){
    explicacao.classList.add('is-active');
}
function fecharModalExplicacao(){
    explicacao.classList.remove('is-active');
}

