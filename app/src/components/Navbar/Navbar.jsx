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
          <Link to="">How to Play</Link>
        </li>
        <li>
          <Link to="">Credits</Link>
        </li>
        <li>
          <Link to="">Feedback</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
