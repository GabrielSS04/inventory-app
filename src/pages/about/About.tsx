import Github from "../../github-icon.png"
import Pessoa from "../../pessoa.jpg"

import "./style.css"

export default function About() {
  return (
    <>
        <img src={Pessoa} alt="pessoa-icon" className="pessoa-icon"/>
      

      <div className="container-about">
        <h1>Sobre os criadores do projeto!</h1>

        <p className="content-about">
          O sistema de inventário foi criado por mim, Gabriel Stainhaus, junto
          com minha equipe, composta por Luis e Rafael. Nós somos dedicados a
          desenvolver soluções eficientes e práticas para gestão de estoque,
          sempre focando em otimizar o tempo e facilitar a vida de quem precisa
          manter o controle preciso dos seus produtos. Cada funcionalidade do
          sistema foi pensada e desenvolvida com cuidado, buscando oferecer uma
          plataforma fácil de usar, mas poderosa o suficiente para atender a
          todas as necessidades de gestão. Nós trabalhamos juntos para garantir
          que o sistema seja intuitivo, seguro e eficaz, com foco em performance
          e inovação.
        </p>
        
        <div className="contactme">
            <h2><strong>Entre em contato conosco a partir dos canais abaixo</strong></h2>
            <div className="redes">
                <div className="card">
                    <img src={Github} alt="" />
                    <p>Github</p>
                </div>
                <div className="card">
                    <img src={Github} alt="" />
                    <p>Github</p>
                </div>
                <div className="card">
                    <img src={Github} alt="" />
                    <p>Github</p>
                </div>
            </div>
        </div>

      </div>
    </>
  );
}
