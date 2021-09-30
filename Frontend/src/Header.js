import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <h1>NEWBIE</h1>
        <ul className="navLinks">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        </ul>
        <button type="button" className="contact">
          LOGIN
        </button>
      </nav>
    </header>
  );
}

export default Header;
