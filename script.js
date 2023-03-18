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
        console.log("presisonado enter");
    }else if(e.key === "Escape"){
        fecharModal();
        console.log("pressionado escape");
    }
});

//funcao principal com definicao das pecas, tratamento do input do usuario para tratar quaisquer erros, gerando no final uma array de 64 items cada item com um numero de 0-6
function getEntrada(){
    const codigos = ['Vazio', 'Peão', 'Bispo', 'Cavalo', 'Torre', 'Rei', 'Rainha'];
    //remocao de todo e qualquer espaco em branco, incluindo empty strings no caso de enter na entrada de dados. Usando .replace para remover os enters e .split para separar os elementos em um array e usando .filter para remover os elementos vazios combinado com o .trim para remover os espacos em branco incluindo empty strings.
    const arrayEntrada = document.getElementById('entrada').value.split("").join(" ").replace( /\n/g, " ").split(' ').filter(e => String(e).trim());
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
                console.log(codigos[i] + " " + resultado.length + " peça(s) ");
                console.log(resultado.filter(checkPeca));
            }else{
//quando for espaco vazio, avisa quantos espacos vazios possui
                divResultado.innerHTML += `Existem ${resultado.length}<strong> espacos vazios</strong><br> <strong>Contagem de pecas</strong>:<br>`
            }
        }
    }
//rest do formulario para novos inputs e adiciona a classe is-active para exibir o modal
        modal.classList.add('is-active');
        formulario.reset();
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
        console.log("presisonado escape")
    }else if(e.key === "Enter"){
        getEntrada();
        console.log("presisonado enter")
    }
}

//preencher canvas com icones do fa de cada peca, usando o codigo de cada peca como referencia para o icone. No canvas, cada espaco sera uma nova div com icone correspondente ou posso usar uma div em cima do canvas e dividir com uma grid 8x8 e cada element seria o icone referente.

//desenhar os icones com ctxdrawimage?
