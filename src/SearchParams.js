import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import getBreeds from "./actionCreators/getBreeds";
import changeLocation from "./actionCreators/changeLocation";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";


class SearchParams extends React.Component {


  handleSubmit = () => {

    if (this.props.breed) {
      this.props.searchEvent(this.props.location, this.props.breed, '')
    } else if (this.props.animal) {
      this.props.searchEvent(this.props.location, '', this.props.animal)
    } else {
      this.props.searchEvent(this.props.location, '', '')
    }


  }

  render() {
    return (
      <>
        <Link to="/"><h1>Adopt Me</h1></Link>
        <div className="search-params">
          <label htmlFor="location">
            Location
          <input
              onChange={this.props.handleLocationChange}
              id="location"
              value={this.props.location}
              placeholder="Location"
            />
          </label>
          <label htmlFor="animal">
            animal
            <select
              id="animal"
              value={this.props.animal}
              onChange={this.props.handleAnimalChange}
              onBlur={this.props.handleAnimalChange}
            >
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
              <option>Bird</option>
              <option>Small & Furry</option>
              <option>Horse</option>
              <option>Barnyard</option>
              <option>Scales, Fins & Other</option>

            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              id="breed"
              value={this.props.breed}
              onChange={this.props.handleBreedChange}
              onBlur={this.props.handleBreedChange}
              disabled={this.props.breeds.length === 0}
            >
              <option />
              {this.props.breeds.map((breed, index) => (
                <option key={index} value={breed.name}>
                  {breed.name}
                </option>
              ))}
            </select>
          </label>

          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ breed, breeds, animal, location }) => ({
  breed,
  breeds,
  location,
  animal
});

const mapDispatchToProps = dispatch => ({
  handleAnimalChange(event) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleBreedChange(event) {
    dispatch(changeBreed(event.target.value));
  },
  handleLocationChange(event) {
    dispatch(changeLocation(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchParams);