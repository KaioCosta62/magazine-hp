const containerProdutos = document.getElementById('container-produtos')

function exibirTodos(){
    const todosOsProdutos = Array.from(containerProdutos.getElementsByClassName('hidden'))
    for(const produto of todosOsProdutos){
        produto.classList.remove('hidden')
    }
}

function produtosMasculinos(){
    exibirTodos()
    const produtosFemininos = document.querySelectorAll('.feminino')

    for(let produto of produtosFemininos){
        produto.classList.add('hidden')
    }
}

function produtosFemininos(){
    exibirTodos()
    const produtosMasculinos = document.querySelectorAll('.masculino')
    for(let produto of produtosMasculinos){
        produto.classList.add('hidden')
    }
}

export function inicializarFiltroPesquisa(){
    document.getElementById('todos').addEventListener('click', exibirTodos)
    document.getElementById('produtos-masculinos').addEventListener('click', produtosMasculinos)
    document.getElementById('produtos-femininos').addEventListener('click', produtosFemininos)

}