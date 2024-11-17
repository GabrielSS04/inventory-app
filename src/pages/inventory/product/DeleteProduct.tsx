import React, { useState, useEffect } from 'react';

interface Product {
    id: number;
    nome: string;
}

function DeleteProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    // Função para buscar todos os produtos (para preencher o select)
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }

        fetchProducts();
    }, []);

    // Função para excluir o produto selecionado
    async function deleteProduct() {
        if (!selectedProductId) {
            alert('Por favor, selecione um produto para excluir.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/products/delete/${selectedProductId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Produto deletado com sucesso');
                setProducts(products.filter(product => product.id !== selectedProductId));
                setSelectedProductId(null); // Reseta o select após a exclusão
            } else {
                const data = await response.json();
                alert(data.message || 'Erro ao deletar produto');
            }
        } catch (error) {
            console.error('Erro na exclusão do produto:', error);
            alert('Erro ao deletar produto');
        }
    }

    return (
        <>
            <h2>Excluir Produto</h2>
            <select
                value={selectedProductId || ""}
                onChange={(e) => setSelectedProductId(Number(e.target.value))} // Converte para number
            >
                <option value="" disabled>Selecione um produto</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                        {product.nome}
                    </option>
                ))}
            </select>
            <button className='button-style' onClick={deleteProduct}>Excluir Produto</button>
        </>
    );
}

export default DeleteProduct;
