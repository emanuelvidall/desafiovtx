const canvas = document.getElementById('canvas');

//drawing chessboard
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 400, 400);

//drawing white squares
ctx.fillStyle = 'white';

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
        ctx.fillRect(i * 50, j * 50, 50, 50);
        }
    }
}

const entrada = document.getElementById('entrada').value;

function getEntrada(){
    const codigos = ['Vazio', 'Peão', 'Bispo', 'Cavalo', 'Torre', 'Rei', 'Rainha'];
    //remocao de todo e qualquer espaco em branco, incluindo empty strings no caso de enter na entrada de dados. Usando .replace para remover os enters e .split para separar os elementos em um array e usando .filter para remover os elementos vazios combinado com o .trim para remover os espacos em branco incluindo empty strings.
    const arrayEntrada = document.getElementById('entrada').value.replace( /\n/g, " ").split(' ').filter(e => String(e).trim());
    arrayEntrada.forEach(element => {
        console.log(element);
    });
    console.log(arrayEntrada);
    // const resultado = arrayEntrada.filter(checkPeca);
    // console.log(resultado.filter(checkPeca));
    // console.log(resultado.length);
    // console.log("Peão: " + resultado.length + " peça(s) ");
    // function checkPeao(peca){
    //     return peca == 1;
    // } function checkTorre(peca){
    //     return peca == 4;
    // } function checkRainha(peca){
    //     return peca == 6;
    // }

    const divResultado = document.getElementById('resultadoM');
    // divResultado.style.visibility= 'visible';

    for (let i = 0; i < 6; i++){
        function checkPeca(peca){
            return peca == i;
        }
        let resultado = arrayEntrada.filter(checkPeca);
        divResultado.innerHTML +="<b>" + codigos[i] + "</b>" + " " + resultado.length + " peça(s) " + "<br>";
        console.log(codigos[i] + " " + resultado.length + " peça(s) ");
        console.log(resultado.filter(checkPeca));
    }
}

const arrayTest = [2, 2, 2, 4, 5, 5, 9, 8, 7, 7];

function getArrayTest(){
    let counter = 0;
    arrayTest.forEach(element => {
        const sobra = Math.sqrt(element)
        console.log(sobra);
        // counter += sobra;
        // console.log(counter);   
    });
}
//getArrayTest();
//Vazio = 0 Torre = 4 Peão = 1 Rainha = 6 Bispo = 2 Rei = 5 Cavalo = 3

function countingPecas(){
    const mapeada = arrayTest.reduce((cont, y) => cont.set(y, (cont.get(y) || 0) + 1), new Map());
    console.log(mapeada);
    // mapeada.forEach((value, key) => {
    //     console.log(`A peça ${key} tem ${value} peças`);
    // }
    // );
}

countingPecas();

// console.log('Array 2: ')
    // console.log(arrayEntrada2)
    // const arrayEntrada = document.getElementById('entrada').value.replace( /\n/g, " ").split(' ').filter(e => String(e).trim());
    // arrayEntrada.forEach(element => {
    //     console.log(element);
    // });