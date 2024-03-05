import { catalogoProdutos } from "./catalogoDeProdutos.js"

const idsProdutoCarrinhoComQuantidade = {}


const buttonsCarrinho = {
    btnAbrirCarrinho:  document.getElementById('abrir-carrinho'),
    btnFecharCarrinho: document.getElementById('fechar-carrinho')
}

const containerCarrinho = document.getElementById('carrinho')

function abrirCarrinho(){
    containerCarrinho.classList.remove('right-[-360px]')
    containerCarrinho.classList.add('right-[0]')
}

function fecharCarrinho(){
    containerCarrinho.classList.remove('right-[0]')
    containerCarrinho.classList.add('right-[-360px]')
}

function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]++
    atualizarPrecoCarrinho()
    atualizarQuantidadeDeProduto(idProduto)
}

function decrementarQuantidadeProduto(idProduto){

    if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
        removerProdutoDoCarrinho(idProduto)
        return
    }

    idsProdutoCarrinhoComQuantidade[idProduto]--
    atualizarQuantidadeDeProduto(idProduto)
    atualizarPrecoCarrinho()
}

function atualizarQuantidadeDeProduto(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto] 
}

function removerProdutoDoCarrinho(idProduto){
    delete idsProdutoCarrinhoComQuantidade[idProduto]
    atualizarPrecoCarrinho()
    renderizarProdutoNoCarrinho()
}

function atualizarPrecoCarrinho(){
    let valorTotal = 0
    let precoTotalCarrinho = document.getElementById('preco-total')

    precoTotalCarrinho.innerText = `Valor total: R$ ${valorTotal},00`

    for(const idProduto in idsProdutoCarrinhoComQuantidade){
        valorTotal += catalogoProdutos.find((produto) => produto.id === idProduto).preco * idsProdutoCarrinhoComQuantidade[idProduto]
    }

    precoTotalCarrinho.innerText = `Valor total: R$ ${valorTotal},00`

}


 function desenharProdutoNoCarrinho(idProduto){
    

    const produto = catalogoProdutos.find((produto) => produto.id === idProduto)
    
    const containerProdutoCarrinho = document.getElementById('produtos-carrinho')

    const article = document.createElement('article')

    const classesArticle = ['relative', 'flex', 'bg-slate-700', 'rounded-lg', 'p-1']

    for(const classe of classesArticle){
        article.classList.add(classe)
    }

    const htmlProdutoCarrinho = `
            <button id="remover-item-${produto.id}" class="absolute top-0 right-2">
                <i
                class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"
                ></i>
            </button>
            <img src="./assets/imgs/${produto.imagem}.jpg" alt="" class="h-24 rounded-lg"/>
          
            <div class="p-2 flex flex-col justify-between gap-2">
                <p class="text-slate-200 text-sm">${produto.nome}</p>
                <p class="text-slate-200 text-sm">Camisa Larga com Bolsos</p>
                <p class="text-lg text-green-700 font-bold">R$ ${produto.preco}</p>
            </div>
            <div class='absolute right-2 bottom-0 text-lg text-white flex gap-2'>
                <button id='incrementar-produto-${produto.id}'>
                    +
                </button>
                <p id='quantidade-${produto.id}'> ${idsProdutoCarrinhoComQuantidade[produto.id]} </p>
                <button id='decrementar-produto-${produto.id}'>
                   -
                </button>
            </div>
    `


    article.innerHTML = htmlProdutoCarrinho

    containerProdutoCarrinho.appendChild(article)

    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id))

    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id))

    document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerProdutoDoCarrinho(produto.id))

    atualizarPrecoCarrinho()
}

export function renderizarProdutoNoCarrinho(){
    const carrinhoContainer = document.getElementById('produtos-carrinho')
    carrinhoContainer.innerHTML = ''

    for(let idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCarrinho(idProduto)
    }
}

export function adicionarAoCarrinho(idProduto){

    if(idProduto in idsProdutoCarrinhoComQuantidade){
        incrementarQuantidadeProduto(idProduto)
        return
    }

   idsProdutoCarrinhoComQuantidade[idProduto] = 1
   desenharProdutoNoCarrinho(idProduto)
}

export function inicializarOCarrinho(){
    const {btnAbrirCarrinho, btnFecharCarrinho} = buttonsCarrinho
    btnAbrirCarrinho.addEventListener('click', abrirCarrinho)
    btnFecharCarrinho.addEventListener('click', fecharCarrinho)
}