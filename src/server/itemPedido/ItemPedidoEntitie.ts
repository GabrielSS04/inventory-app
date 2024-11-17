

export class ItemPedido {
    id: number;
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    precoUnitario: number;

    constructor(pedidoId: number, produtoId: number, quantidade: number, precoUnitario: number){
        this.id = Math.floor(Math.random() * 10000);
        this.pedidoId = pedidoId;
        this.produtoId = produtoId;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    getId(){
        return this.id;
    }

    setId(id: number){
        this.id = id;
    }

    getPedidoId(){
        return this.pedidoId;
    }

    setPedidoId(pedidoId: number){
        this.pedidoId = pedidoId;
    }

    getProdutoId(){
        return this.produtoId;
    }

    setProdutoId(produtoId: number){
        this.produtoId = produtoId
    }

    getQuantidade(){
        return this.quantidade;
    }

    setQuantidade(quantidade: number){
        this.quantidade = quantidade;
    }

    getPrecoUnitario(){
        return this.precoUnitario;
    }

    setPrecoUnitario(precoUnitario: number){
        this.precoUnitario = precoUnitario;
    }
}