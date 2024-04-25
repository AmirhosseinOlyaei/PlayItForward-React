// src/components/ToyList/ToyList.jsx
import React from "react";
import { Grid } from "@mui/material";
import ToyCard from "./ToyCard";

function ToyList({ toys, error, onCardClick }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container spacing={1.5} m={0} ml={.5} mr={2}>
      {toys.map((toy) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={toy._id}>
          <ToyCard
            toyId={toy._id}
            title={toy.title}
            imageUrl={toy.imageUrl}
            location={toy.zip_code}
            onCardClick={onCardClick}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ToyList;
