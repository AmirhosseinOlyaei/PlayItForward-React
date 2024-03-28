import styles from "./ListingDetail.module.css";
import { Button, ButtonGroup } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
//import {toyPicture} from "../images/LEGOCars.jpg";



const ListingDetail = () => {
  const toyLising = {
    user_id: 1,
    given_to_user_id: 2,
    title: "Little Lego cars",
    description: "5 items, multiple colors, size about 2 inches  each, lego original",
    condition: "Like new",
    delivery_method: "Pickup",
    pictures: "https://geekculture.co/wp-content/uploads/2020/05/tigermiyaw-8-1200x817.jpg",
    category: "Cars",
    zip_code: 94040,
   
    created_by_id: 1,
    create_date: "2024-11-03", 
    modified_date: "2024-11-03",
    modified_by_id: 1,
  };
  const toyGiver = {
    email: "jH0H0@example.com",
    first_name: "Jen",
    last_name: "Hill",
    profile_picture: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    nickname: "Jennickname",
    zipcode: 94040,
    created_by_id: 1,
    create_date: "March 2022",
    modified_date: "March 2022",
    modified_by_id: 1,

  };
  return (
    <Grid container spacing={2}>
      <Grid xs={8}>
        <img src={toyLising.pictures} alt="Toy image" width="100%" />
      </Grid>
      <Grid xs={4}>
        <h1>{toyLising.title}</h1>
        <p>
        Listed {new Date - toyLising.create_date} ago in {toyLising.zip_code} {/* possibly need to identify town or district according the zip code*/}
        </p>
        <p><span>Delivery method 1</span><span>Delivery method 2</span></p>
        <div>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button>Message</Button>
          <Button>Favorites</Button>
          <Button>Share</Button>
        </ButtonGroup>
        </div>
        <h2>Details</h2>
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
          <img src={toyGiver.profile_picture} alt="Toy giver profile picture" width="42px" height="42px"></img>
          <p>{toyGiver.nickname}</p>
        </div>
        <div>Joined PlayItForward in {toyGiver.create_date}</div>
        <h2>Send a message</h2>
        <TextField id="outlined-basic" label="Is this still available?" variant="outlined" />
        <br/><br/>
        <Button variant="contained">Send</Button>
      </Grid>
    </Grid>
  );
};

export default ListingDetail;
