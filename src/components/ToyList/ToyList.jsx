import { Grid } from "@mui/material";
import ToyCard from "./ToyCard";

function ToyList() {
  const toys = useSelector((state) => state.toys);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {toys.map((toy) => (
        <Grid item xs={12} sm={6} md={4} key={toy.id}>
          <ToyCard
            title={toy.title}
            image={toy.image}
            location={toy.location}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ToyList;
