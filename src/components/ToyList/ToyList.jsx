import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import ToyCard from "./ToyCard";

function ToyList() {
  const dispatch = useDispatch();
  const toys = useSelector((state) => state.toys);

  const handleFavoriteClick = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {toys.map((toy) => (
        <Grid item xs={12} sm={6} md={4} key={toy.id}>
          <ToyCard
            id={toy.id}
            title={toy.title}
            image={toy.image}
            location={toy.location}
            isFavorite={toy.isFavorite}
            handleFavoriteClick={handleFavoriteClick}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ToyList;
