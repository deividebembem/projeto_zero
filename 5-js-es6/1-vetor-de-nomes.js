// Criando um vetor.

const listaNomes = ['Marta', 'José', 'Maria']

console.log('\nExibindo todos os elementos do vetor: ')
console.log(listaNomes)

console.log('\nExibindo o primeiro elemento elemento do vetor: ')
console.log(listaNomes[0])

console.log('\nAdicionando um elemento no vetor: ')
listaNomes.push('Marilia')
console.log(listaNomes)

//  Sua vez, adicione seu nome no vetor.

console.log('\nAdicionando meu nome no vetor: ')
listaNomes.push('Deivide')
console.log(listaNomes)

console.log('\nRemovendo o primeiro elemento no vetor: ')
listaNomes.shift()
console.log(listaNomes)

console.log('\nRemovendo um elemento específicono vetor: ')
 // A partir do índice 2, remover apenas um elemento.
listaNomes.splice(2,1)
console.log(listaNomes)

console.log('\nRemovendo o último elemento no vetor: ')
listaNomes.pop()
console.log(listaNomes)