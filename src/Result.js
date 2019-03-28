import React from "react";
import Pet from "./Pet";
import SearchParams from "./SearchParams";
import { connect } from "react-redux";
import getAnimalData from "./actionCreators/getAnimalData";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [], //state of the 'world'
    }
  }

  componentDidMount() {
    this.props.handleAnimalData();
  }

  render() {
    return (
      /* <pre>
        <code>{JSON.stringify(this.state, null, 4)}</code>
      </pre> */
      <div>
        <div className="search">
          <SearchParams searchEvent={this.props.handleAnimalData} />
          {
            this.props.pets.map(pet => {
              let breed;
              if (pet.breeds) {
                breed = pet.breeds.primary;
              }
              let photo
              if (pet.photos && pet.photos[0]) {
                photo = pet.photos[0].small
              } else {
                photo = "https://via.placeholder.com/150"
              }
              let city, state
              if (pet.contact) {
                city = pet.contact.address.city
                state = pet.contact.address.state
              }

              return < Pet
                key={pet.id + "i"}
                type={pet.type}
                name={pet.name}
                breed={breed}
                media={photo}
                location={`${city}, ${state}`}
                id={pet.id} />
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ pets, animal, breed, location }) => ({
  pets, animal, breed, location
});

const mapDispatchToProps = dispatch => ({
  handleAnimalData(event) {
    dispatch(getAnimalData());
  }
});

// export default Results;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);