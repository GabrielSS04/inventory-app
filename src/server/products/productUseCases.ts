import { Product } from "./ProductEntitie";


export class ProductUseCases {

    private listaProdutos: Product[] = [];

    createProduct(nome: string, descricao:string, preco: number, quantidade: number, imagem: string){
        const produto = new Product(nome, descricao, preco, quantidade, imagem);
        this.listaProdutos.push(produto);
    }

    readAllProducts(){
        const produtos = this.listaProdutos;
        return produtos;
    }

    readTransaction(id: number){
        const produto = this.listaProdutos.find(pr => pr.getId() === id);
        if(!produto) throw new Error("not found");
        return produto;
    }

    updateProduct(id: number, nome?: string, descricao?: string, preco?: number, quantidade?: number, image?: string){
        const updatedProducts = this.listaProdutos.map((pr) => {
            if(pr.getId() === id){
                const newNome = nome || pr.getNome();
                const newDescricao = descricao || pr.getDescricao();
                const newPreco = preco || pr.getPreco();
                const newQuantidade = quantidade || pr.getQuantidade();
                const newImagem = image || pr.getImagem();

                const newProduct = new Product(newNome, newDescricao, newPreco, newQuantidade, newImagem);
                newProduct.setId(pr.getId());

                return newProduct;
            }
            return pr;
        });

        this.listaProdutos = updatedProducts;
    }

    deleteProduct(id: number){
        this.listaProdutos = this.listaProdutos.filter(pr => pr.getId() !== id)
    }

}