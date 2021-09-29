function Header() {
  return (
    <header className='header'>
      <nav className='nav'>
        <image className='logo' src='./Assets/logo.png' alt='logo'></image>
        <ul className='navLinks'>
          <li>HOME</li>
          <li>SIGN UP</li>
          <li>LOGIN</li>
        </ul>
        <button type='button' className='contact'>
          Contact
        </button>
      </nav>
    </header>
  );
}

export default Header;
