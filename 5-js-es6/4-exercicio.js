const lista = [
    { nome: 'Ana', nota: 5.0},
    { nome: 'Bruno', nota: 10.0},
    { nome: 'Maria', nota: 2.0},
    { nome: 'Marta', nota: 7.0},
    { nome: 'Celília', nota: 6.0}
]

console.log('\nMostre todos os alunos, seus nomes e suas notas:')
console.log(lista)

console.log('\nMostre a média geral da turma: ')
const media = lista.reduce((total,u) => total + u.nota /5,  0)
console.log(`A média da turma é: ${media}`)

console.log('\nMostre apenas o nome e a nota dos alunos com nota abaixo de 7.0; ')
const notaBaixa = lista.filter (u => u.nota < 7.0);
notaBaixa.forEach(u =>console.log(`Os alunos com nota abaixo da média são: ${u.nome} e com a nota ${u.nota}`))

console.log('\nMostre apenas o nome e a nota dos alunos com nota maior ou igual a 7.0:')
const notaAlta = lista.filter (u => u.nota >= 7.0);
notaAlta.forEach(u=> console.log(`Os alunos com nota acima ou igual a média são: ${u.nome} e com a nota ${u.nota}`))

console.log('\nMostre o nome e a nota do aluno Bruno: ')
const alunoEncontrado = lista.find(u => u.nome === 'Bruno')
console.log(`${alunoEncontrado.nome} tem nota ${alunoEncontrado.nota} .`)

console.log('\n Some todas as notas:')
const soma = lista.reduce((total,u) => total + u.nota,  0)
console.log(`A soma da nota de toda a turma é: ${soma}`)

console.log('\nListe todos os nome dos alunos, sem mostrar suas notas:')
const nome = lista.map(u => u.nome)
nome.forEach(nome => console.log(`Esses são os nomes de todos os alunos na sala:${nome}`))