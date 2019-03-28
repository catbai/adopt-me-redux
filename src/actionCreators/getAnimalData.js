import { Client } from "@petfinder/petfinder-js";

const client = new Client({
  apiKey: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET
});

export default function getAnimaData() {
  return function getBreedsThunk(dispatch, getState) {
    const { location, breed, type } = getState();

    client.animal
      .search({ output: "full", location, breed, type })
      .then(res => {
        let pets;
        if (res.data) {
          if (Array.isArray(res.data.animals)) {
            pets = res.data.animals
          } else {
            pets = [res.data.animals];
          }
        } else {
          pets = [];
        }

        // this.setState({
        //   pets,
        //   filteredPets: pets
        // })
        dispatch({ type: "SET_PETS", payload: pets });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}