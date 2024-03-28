import { configureStore } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  toys: [
    {
      id: 1,
      title: "Toy 1",
      location: "Location 1",
      image: "https://source.unsplash.com/random/200x200?toy",
      isFavorite: false,
    },
    {
      id: 2,
      title: "Toy 2",
      location: "Location 2",
      image: "https://source.unsplash.com/random/200x200?toy",
      isFavorite: false,
    },
    {
      id: 3,
      title: "Toy",
      location: "Alaska, USA",
      image: "https://source.unsplash.com/random/200x200?toy",
      isFavorite: false,
    },
  ],
};

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        toys: state.toys.map((toy) =>
          toy.id === action.payload
            ? { ...toy, isFavorite: !toy.isFavorite }
            : toy,
        ),
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = configureStore({
  reducer: reducer,
});

export default store;
