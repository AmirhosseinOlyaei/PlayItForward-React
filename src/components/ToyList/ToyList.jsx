import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ToyCard from "./ToyCard";

function ToyList() {
  const [toys, setToys] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchToys = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setToys(data);
      } catch (error) {
        setError(
          `Error: ${error.response ? error.response.data.message : error.message}`
        );
      }
      setIsLoading(false);
    };

    fetchToys();
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount()

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {toys.map((toy) => (
        <Grid item xs={12} sm={6} md={4} key={toy._id}>
          <ToyCard
            title={toy.title}
            images={toy.pictures}
            location={toy.zip_code}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ToyList;
