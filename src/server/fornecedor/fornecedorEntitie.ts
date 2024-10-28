export interface FornecedorData {
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
  }

export class Fornecedor {

    private id: number;
    private nome: string;
    private cnpj: string;
    private contato: string;
    private endereco: string;

    constructor(nome: string, cnpj: string, contato: string, endereco: string){
        this.id = Math.floor(Math.random() * 10000);
        this.nome = nome;
        this.cnpj = cnpj;
        this.contato = contato;
        this.endereco = endereco;
    }

    getId(){
        return this.id;
    }

    setId(id: number){
        this.id = id
    }

    getNome(){
        return this.nome;
    }

    setNome(nome: string){
        this.nome = nome;
    }

    getCnpj(){
        return this.cnpj;
    }

    setCnpj(cnpj: string){
        this.cnpj = cnpj;
    }

    getContato(){
        return this.contato;
    }

    setContato(contato: string){
        this.contato = contato;
    }

    getEndereco(){
        return this.endereco;
    }

    setEndereco(endereco: string){
        this.endereco = endereco;
    }

}