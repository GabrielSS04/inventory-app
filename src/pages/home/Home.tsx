import "./style.css";
import bg from "../../bg.jpeg"

export default function Home() {
  return (
    <>
        <img src={bg} alt="" className="bg-image"/>
      

      <div className="container-home">
        <h1>Bem-vindo ao nosso Sistema de Inventário!</h1>
        <p className="content-home">
          Aqui você tem uma solução completa para gerenciar seus produtos e
          estoque de forma eficiente. O sistema permite o cadastro de produtos,
          com informações detalhadas como nome, categoria, código de barras,
          quantidades e preços. A gestão de estoque em tempo real oferece
          alertas automáticos quando o nível está baixo, além de registrar todas
          as entradas e saídas.
        </p>
        <p className="content-home">
          Também geramos relatórios detalhados sobre os produtos mais e menos
          vendidos, previsões de compras e movimentações, tudo exportável para
          PDF ou Excel. O sistema inclui gestão de fornecedores e controle de
          acessos para garantir que apenas os usuários autorizados modifiquem o
          inventário.
        </p>

        <p className="content-home">
          Se houver integração com o sistema de vendas, o estoque é atualizado
          automaticamente. A função de auditoria de estoque permite ajustar o
          inventário físico com o registrado no sistema. Para empresas com
          múltiplos depósitos, é possível gerenciar diferentes locais e o
          sistema ainda conta com um controle de validade para produtos
          perecíveis. Tudo isso em uma plataforma rápida e fácil de usar, com
          busca avançada para encontrar itens rapidamente.
        </p>
      </div>
    </>
  );
}
