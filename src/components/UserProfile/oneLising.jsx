import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "./UserProfile.module.css";
import { ButtonGroup, Divider } from '@mui/material';

export default function ImgMediaCard() {
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
  return (
    <Card sx={{ maxWidth: 845, padding: "20px", margin: "20px" }}>
      <div className={styles.detailsRow}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ width: "auto", height: "140px" }}
        image={toyLising.pictures}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {toyLising.title}
        </Typography>
        
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
        
      </CardContent>
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button size="small">Mark as Gone</Button>
            <Button size="small">Mark as Reserved</Button>
            <Button size="small">Share</Button>
            <Button size="small">Edit</Button>
            <Button size="small">Messages</Button>
        </ButtonGroup> 
    </Card>
    
    
  );
}