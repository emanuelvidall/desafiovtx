# desafiovtx
Processo seletivo Unifor Vortex 2023
Sobre o Desafio do Xadrez

O que foi utilizado:
	Linguagens: 
		HTML5 - Markup
		CSS - Bulma.io framework
		JS Vanilla - sem framework
	Bibliotecas:
		Toastr (atraves de CDN) - para notificacoes em "toast"
		FontAwesome - para icones
		Spline Viewer - para exibicao do render 3d da peca de cavalo
		jQuery - apenas como requerimento para o Toastr
		Animate.CSS - para animacoes em geral (hover, exibicao, etc)
		Pure JS MouseTip - para exibicao de tooltips on hover das pecas
Sobre:
	Foi pensado numa abordagem 'mobile first', com uma apliacao pequena, porem dinamica o suficiente para exibicao das habilidades pertinentes (HTML,CSS,JS)
	Utilizado um esquema de cores frio, com escuros nem sempre maximos
	Botoes call to action foram desenhados para chamar atencao, mostrar serem interagiveis
A solucao(aqui nao utilizaremos nenhum if,else, switch case ou ternario, como solicitado):
	Para realizacao da contagem das pecas, atraves de uma grid 8x8 introduzida pelo usuario, foi utilizado o metodo de conversao do input da textarea para uma array, contendo todos os 64 elementos inputados.
	Para isso, restringiu-se o input de 3 formas: 
		exatamente 64 "pecas"

		sendo estas representadas apenas por numeros
		variacao destes apenas de 1 a 6
	Ainda, ja que inicialmente estas restricoes nao foram utilizadas, tambem realiza-se a limpeza da array de input, utilizando os metodos .split('') .join(" ") .replace(/\n/g, " ") .trim(), buscando deixara a array "limpa" apenas com ints
	Depois, foi criada uma funcao checkPeca(peca), que recebe como parametro a peca e retorna seu numero de acordo com a numeracao, em um for loop de 0 a 6, onde 0 consideraremos os espacos vazios, e 6 consideraremos o rei, e para os outros numeros consideraram-se as demais pecas
	Com isso, pode-se criar uma array resultado, que nela e utilizada o metodo .filter(checkPeca) com o parametro check peca, assim, teremos uma array com a contagem de cada peca, que vale de 0 a 6, incluindo espacos em brancos.
	A partir dai, utiliza-se este numero para representar cada peca no modal, que e ativado apos o click do botao.
O 'a mais'(aqui utilizou-se if,else):
	Foi criado um canvas, contendo 64 rects, que representam os espacos possiveis em um tabuleiro de xadrez.
	Tais rects sao criados com cores alternadas e possuem o mesmo tamanho (50x50)
	Apos, criou-se uma div em cima deste canvas para mapear todos os rects criados, utilizando a div com uma grid 8x8 (grid-template-areas) gerando um identificador para cada quadrado do board (a0, a1, a2.....a63), e, apos um for loop, e adicionado o icone referente a peca ao quadrado em que ela encontra-se, preenchendo assim o tabuleiro de xadrez.
