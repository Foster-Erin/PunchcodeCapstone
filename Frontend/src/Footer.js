import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <nav className="navFooter">
        <image
          className="footerLogo"
          src="./Assets/logo.png"
          alt="logo"
        ></image>
        <ul className="footerLinks">
          <li>Company</li>
          <li>Contact</li>
          <li>Terms</li>
          <li>Privacy Policy</li>
        </ul>
        {/* <button type='button' className='contact'>
            LOGIN
          </button> */}
      </nav>
    </footer>
  );
}

export default Footer;
