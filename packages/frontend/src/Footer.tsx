import {FaInstagram} from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div
        className="hover-button"
        onClick={navigateToInstagram}>Follow us on Instagram <FaInstagram/>
      </div>
      <p>© 2024 Slippys</p>
    </footer>
  );
}

const navigateToInstagram = () => {
  window.location.href = 'https://www.instagram.com/slippys_natural_skincare/';
}

export default Footer;
