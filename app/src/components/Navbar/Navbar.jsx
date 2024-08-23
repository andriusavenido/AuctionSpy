import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logoImage from "../../assets/AuctionSpyLogo.png";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}> 
        <img src={logoImage} alt="app logo" className={styles.logoImage} /> 
        <Link to="/" className={styles.logoText}>
          Auction Spy
        </Link>
      </div>
      <ul className={styles.links}>
        <li>
          <Link to="/guide">How to Play</Link>
        </li>
        <li>
          <Link to="/credits">About</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
