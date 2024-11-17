

export class Transacao {
    private id: number;
    private data: Date;
    private tipo: string;
    private valor: number;
    private pedidoId: number;
    private produtoId: number;

    constructor(data: Date, tipo: string, valor: number, pedidoId: number, produtoId: number){
        this.id = Math.floor(Math.random() * 10000);
        this.data = data;
        this.tipo = tipo;
        this.valor = valor;
        this.pedidoId = pedidoId;
        this.produtoId = produtoId;
    }

    getId(){
        return this.id;
    }

    setId(id: number){
        this.id = id;
    }

    getData(){
        return this.data;
    }

    setData(data: Date){
        this.data = data;
    }

    getTipo(){
        return this.tipo;
    }

    setTipo(tipo: string){
        this.tipo = tipo
    }

    getValor(){
        return this.valor;
    }

    setValor(valor: number){
        this.valor = valor;
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
}