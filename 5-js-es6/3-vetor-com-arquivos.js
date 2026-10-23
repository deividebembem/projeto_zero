// Vetor de objetos (usuarios)
const usuarios = [
    {nome: 'Deivide', idade:23 },
    {nome:'Kaiky', idade:21},
    {nome: 'Felipe', idade:21},
    {nome:'Pedro', idade:20},
]

console.log('\nExibindo todos os usuários do vetor: ')
usuarios.forEach(u => console.log(`${u.nome} tem ${u.idade} anos`))

console.log('\nFiltrando usuários com idade acima de 20: ')
const maiorDeVinte = usuarios.filter (u => u.idade >20);
maiorDeVinte.forEach(u => console.log(`${u.nome} tem ${u.idade} anos.`))

console.log('\nExibindo apenas os nomes: ')
const nomes = usuarios.map(u => u.nome)
nomes.forEach(nome => console.log(`${nome}`))

console.log('\nEncontrando um usuário:')
const usuarioEncontrado = usuarios.find(u => u.nome === 'Deivide')
console.log(usuarioEncontrado)
console.log(`${usuarioEncontrado.nome} tem ${usuarioEncontrado.idade} anos.`)

console.log('\nMostra a soma de todas as idades: ')
const somaIdades = usuarios.reduce((total,u) => total + u.idade, 0)
console.log(`Total das idades: ${somaIdades}`)

