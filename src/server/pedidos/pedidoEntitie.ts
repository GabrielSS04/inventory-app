

export class Pedido {
    private id: number;
    private data: Date;
    private clienteId: number;
    private status: string;
    private total: number;
    private itens: Array<{ produtoId: number, quantidade: number, precoUnitario: number }> = [];

    constructor(data: Date, clientId: number, status: string, total: number){
        this.id = Math.floor(Math.random() * 10000);
        this.data = data;
        this.clienteId = clientId;
        this.status = status;
        this.total = total;
    }

    adicionarItem(item: { produtoId: number, quantidade: number, precoUnitario: number }) {
        this.itens.push(item);
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

    getClientId(){
        return this.clienteId;
    }

    setClientId(clientId: number){
        this.clienteId = clientId
    }

    getStatus(){
        return this.status;
    }

    setStatus(status: string){
        this.status = status;
    }

    getTotal(){
        return this.total;
    }

    setTotal(total: number){
        this.total = total;
    }



}