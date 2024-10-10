import Logo from "../../logo-icon.png";


export const Header = () => {
    return (
        <>
            <div className="header">
        <img src={Logo} alt="" className="logo-icon" />

        <ul className="links-ul">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/sobre">About</a>
          </li>
          <li>
            <a href="/inventory">Inventory</a>
          </li>
          <li>
            <a href="/config">Config</a>
          </li>
        </ul>
      </div>
        </>
    );
}