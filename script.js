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

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function getEntrada(){
    const codigos = ['Vazio', 'Peão', 'Bispo', 'Cavalo', 'Torre', 'Rei', 'Rainha'];
    //remocao de todo e qualquer espaco em branco, incluindo empty strings no caso de enter na entrada de dados. Usando .replace para remover os enters e .split para separar os elementos em um array e usando .filter para remover os elementos vazios combinado com o .trim para remover os espacos em branco incluindo empty strings.
    const arrayEntrada = document.getElementById('entrada').value.split("").join(" ").replace( /\n/g, " ").split(' ').filter(e => String(e).trim());
    if (arrayEntrada.length > 64 || arrayEntrada.length < 64){
            toastr.error("Preencha com 64 peças ou espaços vazios");
            return false;
        }else{
        const formulario = document.getElementById('formulario');
        const divResultado = document.getElementById('resultadoM');
        divResultado.innerHTML = "";
        const modal = document.getElementById('modal');
        for (let i = 0; i < 7; i++){
            function checkPeca(peca){
                return peca == i;
            }
            let resultado = arrayEntrada.filter(checkPeca);
            if(i !== 0){
                divResultado.innerHTML += "<strong>" + codigos[i] + "</strong>" + ": " + resultado.length + " peça(s) " + "<br>";
                divResultado.innerHTML += `<progress class="progress is-primary" value="${resultado.length}" max="64">15%</progress>`;
                console.log(codigos[i] + " " + resultado.length + " peça(s) ");
                console.log(resultado.filter(checkPeca));
            }else{
                divResultado.innerHTML += `Existem ${resultado.length}<strong> espacos vazios</strong><br> <strong>Contagem de pecas</strong>:<br>`
            }
        }
    }
        modal.classList.add('is-active');
        formulario.reset();
}

function fecharModal(){
    const modal = document.getElementById('modal');
    modal.classList.remove('is-active');
}

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
