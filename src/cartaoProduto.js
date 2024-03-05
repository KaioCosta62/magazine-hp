import { catalogoProdutos } from "./catalogoDeProdutos";
import {adicionarAoCarrinho} from './menuCarrinho.js'


function criarCartaoProduto(produto){
    const htmlProdutos = `
        <div class = '${produto.feminino ? 'feminino' : 'masculino'} w-48 text-sm flex flex-col gap-2 p-2 border-solid justify-between shadow-xl shadow-slate-400 rounded-lg group'>
            <img src = '../assets/imgs/${produto.imagem}.jpg'}' class='group-hover:scale-110 duration-300 my-3 rounded-lg'/>
            <p class='font-mono font-semibold'>${produto.marca}</p>
            <p>${produto.nome}</p>
            <p class='font-bold text-lime-900'>R$ ${produto.preco},00</p>
            <button id = 'adicionar-produto-${produto.id}' class='bg-slate-800 hover:bg-slate-700 transition ease-in text-slate-200 p-1'>
                <i class="fa-solid fa-cart-shopping"></i>
            </button>
        </div>
    `
    return htmlProdutos
}



export function renderizarProdutosNaTela(){
    const container = document.getElementById('container-produtos')

    for(const produto of catalogoProdutos){
        container.innerHTML += criarCartaoProduto(produto)
    }

    for(const produto of catalogoProdutos){
        document.getElementById(`adicionar-produto-${produto.id}`).addEventListener('click', ()=> adicionarAoCarrinho(produto.id))
    }
}