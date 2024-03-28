import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} to="/">
        Home
      </Link>
      <Link className={styles.link} to="/toys">
        Toys
      </Link>
      <Link className={styles.link} to="/toy-details">
        Toy Details
      </Link>
      <Link className={styles.link} to="/create">
        Create Listing
      </Link>
      <Link className={styles.link} to="/messages">
        Messages
      </Link>
      <Link className={styles.link} to="/profile">
        Profile
      </Link>
      <Link className={styles.link} to="/login">
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
