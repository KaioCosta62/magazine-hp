export function salvarNoLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify(informacao))
}

export function resgatarDoLocalStorage(chave){
   return JSON.parse(localStorage.getItem(chave))
}

export function removerDoLocalStorage(chave){
    localStorage.removeItem(chave)
}
