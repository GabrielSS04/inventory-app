

export class Client {

    private id: number;
    private nome: string;
    private cpf_cnpj: string;
    private contato: string;
    private endereco: string;

    constructor(nome: string, cpf_cnpj: string, contato: string, endereco: string){
        this.id = Math.floor(Math.random() * 10000)
        this.nome = nome;
        this.cpf_cnpj = cpf_cnpj;
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

    getCpfCnpj(){
        return this.cpf_cnpj;
    }

    setCpfCnpj(cpf_cnpj: string){
        this.cpf_cnpj = cpf_cnpj;
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