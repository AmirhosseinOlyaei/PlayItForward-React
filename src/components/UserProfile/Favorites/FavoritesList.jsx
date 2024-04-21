import { useFavorites } from "../../../contexts/FavoritesContext";
import styles from "./Favorites.module.css";

const FavoritesList = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1>My Favorites</h1>
      {favorites.map((toy) => (
        <div key={toy.id}>
          <h2>{toy.title}</h2>
          <div className={styles.detailsRow}>
            <div className={styles.detailsLabel}>Category</div>
            <div>{toyLising.category}</div>
          </div>
          <div className={styles.detailsRow}>
            <div className={styles.detailsLabel}>Condition</div>
            <div>{toyLising.condition}</div>
          </div>
          <div className={styles.detailsRow}>
            <div className={styles.detailsLabel}>Description</div>
            <div>{toyLising.description}</div>
          </div>
          <h2>Toy giver information</h2>
          <div className={styles.giverInformation}>
            <img
              src={toyGiver.profile_picture}
              alt="Toy giver profile picture"
              width="42px"
              height="42px"
            ></img>
            <p>{toyGiver.nickname}</p>
          </div>
          <div>Joined PlayItForward in {toyGiver.create_date}</div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
