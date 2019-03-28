import { Client } from "@petfinder/petfinder-js";

const client = new Client({
  apiKey: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET
});

export default function getBreeds() {
  return function getBreedsThunk(dispatch, getState) {
    const { animal } = getState();
    console.log(animal);

    client.animalData.breeds(animal)
      .then(res => {

        // this.setState({
        //   breeds: res.data.breeds
        // })
        dispatch({ type: "SET_BREEDS", payload: res.data.breeds })
      })
      .catch((err) => {
        console.log(err);
      })
  }
}