import { Fornecedor } from "./fornecedorEntitie";


export class FornecedorUseCases {

    private listaFornecedores: Fornecedor[] = []

    createFornecedor(nome: string, cnpj: string, contato: string, endereco: string){
        const fornecedor = new Fornecedor(nome, cnpj, contato, endereco);
        this.listaFornecedores.push(fornecedor);
    }

    readAllFornecedor(){
        const fornecedores = this.listaFornecedores
        return fornecedores;
    }

    readOneFornecedor(id: number){
        const fornecedor = this.listaFornecedores.find(fr => fr.getId() === id);
        if(!fornecedor) throw new Error("not found");
        return fornecedor;
    }

    updateFornecedor(id: number, nome?: string, cpf_cnpj?: string, contato?: string, endereco?: string){
        const updatedFornecedores = this.listaFornecedores.map((fr) => {
            if(fr.getId() === id){
                const newNome = nome || fr.getNome();
                const newCnpj = cpf_cnpj || fr.getCnpj();
                const newContato = contato || fr.getContato();
                const newEndereco = endereco || fr.getEndereco();

                const newFornecedores = new Fornecedor(newNome, newCnpj, newContato, newEndereco);
                newFornecedores.setId(fr.getId());

                return newFornecedores;
            }
            return fr;
        });

        this.listaFornecedores = updatedFornecedores;
    }

    deleteFornecedor(id: number){
        this.listaFornecedores = this.listaFornecedores.filter(fr => fr.getId() !== id)
    }
}