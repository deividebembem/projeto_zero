// função que irá executar quando clicar no botão

function gerarTabuada() {
    // pega o valor do campo input no html
    const numeroInput = document.getElementById('numero-input')
    // converte o texto que v eio do html para numero inteiro
    let numero = parseInt(numeroInput.value)


// pega o elemento onde a tabuada será exibida no html
const resultadoDiv = document.getElementById('resultado-aqui')

// limpa o conteúdo anterior no campo onde o resultado será exibido
resultadoDiv.innerHTML = ''

// Adiciona o título a tabuada com tag h2
resultadoDiv.innerHTML += `<h2>Tabuada do número ${numero}<h2>`

// Laço de repetição para gerar tabuada de 1 até 10
for (let i=1; i <=10; i++) {
    let resultado = numero *i
    resultadoDiv.innerHTML += `<p>${numero} * ${i} = ${resultado}<p>`
}
}

// pega o elemento onde a tabuada será exibida no html e associa a uma constante
const btnGerar = document.getElementById('btn-gerar')
// faz a função gerarTabuada() ser executada quando clicar
btnGerar.addEventListener('click', gerarTabuada)

const numeroInput = document.getElementById('numero-input')
numeroInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        gerarTabuada()
    }
})