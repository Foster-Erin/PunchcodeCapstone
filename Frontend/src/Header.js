function Header() {
  return (
    <header className='header'>
      <nav className='nav'>
        <img className='logo' src='./Assets/logomouse2.png' alt='logo' />
        <ul className='navLinks'>
          <li>HOME</li>
          <li>SIGN UP</li>
        </ul>
        <button type='button' className='contact'>
          LOGIN
        </button>
      </nav>
    </header>
  );
}

export default Header;
