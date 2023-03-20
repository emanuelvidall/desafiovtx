# Processo Seletivo Unifor Vortex 2023
## Desafio do Xadrez ♟️

&emsp;Este repositório contém a minha solução para o Desafio do Xadrez, requesito para participação do Processo Seletivo do Unifor Vortex em 2023.
<br>O desafio pede o seguinte:<br>

<pre>Neste desafio, você deverá contabilizar e exibir a quantidade de cada peça em um tabuleiro
de xadrez sem usar IF's, ELSE's, SWITCH CASES ou TERNARIO.
Exemplo
Vazio = 0 Torre = 4 Peão = 1 Rainha = 6 Bispo = 2 Rei = 5 Cavalo = 3
Exemplo de entrada:<br>
4 3 2 5 6 2 3 4
1 1 1 1 1 1 1 1
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
1 1 1 1 1 1 1 1
4 3 2 5 6 2 3 4
</pre>

***
## O que foi utilizado

### Linguagens <br>
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)<br><br>
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)<br><br>
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)<br>
***
### Libraries e Frameworks <br>
&emsp;[Bulma.io](https://bulma.io) - Modern CSS framework<br>

&emsp;[Toastr](https://github.com/CodeSeven/toastr) - para notificacoes em "toast"<br>

&emsp;[FontAwesome](https://fontawesome.com/) - para icones<br>

&emsp;[Spline Viewer](https://spline.com) - para exibicao do render 3d da peca de cavalo<br>

&emsp;[jQuery](https://jquery.com/) - apenas como requerimento para o Toastr<br>

&emsp;[Animate.CSS](https://github.com/animate-css/animate.css) - para animacoes em geral (hover, exibicao, etc)<br>

&emsp;[Pure JS MouseTip](https://github.com/joeleisner/purejs-mousetip) - para exibicao de tooltips on hover das pecas<br>

</pre>

***

## Sobre<br>
&emsp;Foi pensado numa abordagem 'mobile first' em termos de UI e UX, com uma aplicação pequena, porém dinamica o suficiente para exibir as habilidades consideradas pertinentes ao processo seletivo (HTML,CSS,JS, Lógica)
### User Interface<br>
&emsp;Utilizado um esquema de cores frio, com escuros nem sempre maximos<br>
&emsp;Botoes <i>call to action</i> foram desenhados para chamar atenção, mostrar serem interagíveis.
### A solução do desafio<br>
&emsp; Como mencionado anteriormente, aqui naão pode-se utilizar nenhum if,else, switch case ou ternario para fazer a contagem das peças do input do usuário.<br>
***
&emsp;Com isso, para realizacao da contagem das pecas, atraves de uma grid 8x8 introduzida pelo usuario, foi utilizado o método de conversão do input da textarea para uma array, contendo todos os 64 elementos inputados. Para que fique claro, o problema foi abordado considerando a matriz 8x8 como sendo apenas uma array inteira sequencial de 0 - 63 (64 dígitos).<br>
***
&emsp;Assim, restringiu-se o input da seguinte formas: 
<ul>
	<li>O input deve ser exato com 64 "pecas"</li>
	<li>Deve conter apenas números</li>
	<li>Os números somente podem variar entre 0-6 (inclusive)</li>
</ul>

&emsp;Ainda, já que inicialmente durante o desenvolvimento, estas restrições não foram aplicadas de imediato, foi idealizado uma limpeza da array de input, utilizando os métodos:<br>

	.split('').join(" ").replace(/\n/g, " ").trim()

&emsp;Com isso deixando a array "limpa" apenas com ints<br>
&emsp;Depois, foi criada a seguinte função: 

	function checkPeca(peca){
                return peca == i;
            }
	let resultado = arrayEntrada.filter(checkPeca);

&emsp;Que recebe como parâmetro a peça em int e retorna seu numero de acordo com a numeração, já que a fórmula é usada como parâmetro para o método .filter() e é passada em um for loop de 0 a 6, considerando como mencionado na descrição do desafio.<br>
&emsp;Com isso, pode-se criar uma array resultado, que nela e utilizada o metodo .filter(checkPeca) com o parametro check peca, assim, teremos uma array com a contagem de cada peca, que vale de 0 a 6, incluindo espacos em brancos.<br>
&emsp;A partir daí, utiliza-se este número para representar cada peça no modal, que é ativado apos o click do botão <b>CALCULAR</b>.<br>
&emsp;No modal, foram utilizados elementos como uma peça de xadrez do cavalo modelada em 3d no Spline, para melhor a experiência do usuário e além disso foram usados progress bars do Bulma.io para exibição dos resultados com uma barra abaixo de cada resultado, melhorando a visualização da quantidade de peças.

### O 'a mais'
Aqui, já que foram contadas as peças da forma mencionada anteriormente, não obsteu-se te utilizar if e else para criação de um canvas, contendo 64 rects, que representam os espaços possiveis em um tabuleiro de xadrez.<br>
&emsp;Tais rects sao criados com cores alternadas e possuem o mesmo tamanho (50x50)<br>

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

&emsp;Após, criou-se uma div em cima deste canvas para mapear todos os rects criados, utilizando a div com uma grid 8x8 (grid-template-areas) gerando um identificador para cada quadrado do board (a0, a1, a2.....a63).<br>

	.drawIcons{
    text-align: center;
    height: 330px;
    width: 330px;
    position: absolute;
    opacity: 0.8;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    a0 a1 a2 a3 a4 a5 a6 a7
    a8 a9 a10 a11 a12 a13 a14 a15
    a16 a17 a18 a19 a20 a21 a22 a23
    a24 a25 a26 a27 a28 a29 a30 a31
    a32 a33 a34 a35 a36 a37 a38 a39
    a40 a41 a42 a43 a44 a45 a46 a47
    a48 a49 a50 a51 a52 a53 a54 a55
    a56 a57 a58 a59 a60 a61 a62 a63;
    padding: 0;
    margin: 0;
	}

&emsp;Depois, um for loop, e adicionado o ícone referente a peça ao quadrado em que ela encontra-se, preenchendo assim o tabuleiro de xadrez.

Melhor visualizado no:<br>

![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)<br>

## Uso
&emsp; Insira uma matriz de 8x8 noa área de input e pressione o botão <b>CALCULAR</b>.<br>
&emsp; Qualquer dúvida pressione o ícone de interrogação.<br>

## Roadmap<br>

- [x] Elaborar solução para contagem
- [x] Elaborar layout
- [x] Adicionar micro animations
- [x] Adicionar modal de resultado
- [x] Adicionar modal de explicação