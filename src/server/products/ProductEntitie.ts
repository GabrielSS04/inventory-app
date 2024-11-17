
export class Product {
    private id: number;
    private nome: string;
    private descricao: string;
    private preco: number;
    private quantidade: number;
    private fornecedorId: number;
    private imagem: string;

    constructor(nome:string , descricao:string, preco:number, quantidade:number, fornecedorId: number, imagem:string){
        this.id = Math.floor(Math.random() * 10000)
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.fornecedorId = fornecedorId;
        this.imagem = imagem;
    }

    getId(){
        return this.id;
    }

    setId(id: number){
        this.id = id;
    }

    getNome(){
        return this.nome;
    }

    setNome(nome:string){
        this.nome = nome;
    }

    getDescricao(){
        return this.descricao;
    }

    setDescricao(descricao:string){
        this.descricao = descricao;
    }

    getPreco(){
        return this.preco;
    }

    setPreco(preco: number){
        this.preco = preco;
    }

    getQuantidade(){
        return this.quantidade;
    }

    setQuantidade(quantidade: number){
        this.quantidade = quantidade;
    }

    getFornecedorId(){
        return this.fornecedorId;
    }

    setFornecedorId(fornecedorId: number){
        this.fornecedorId = fornecedorId;
    }

    getImagem(){
        return this.imagem;
    }

    setImagem(imagem: string){
        this.imagem = imagem;
    }
}