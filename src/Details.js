import React from "react";
import { Client } from "@petfinder/petfinder-js";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Loadable from 'react-loadable';


const client = new Client({
  apiKey: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const loading = () => <h1>loading content ...</h1>

const LoadableContent = Loadable({
  loader: () => import('./AdoptModalContent'),
  loading
})

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showModal: false
    }
  }

  componentDidMount() {
    client.animal
      .show(this.props.match.params.id)
      .then(res => {
        console.log(res);
        const pet = res.data.animal;
        let breed;
        if (pet && pet.breeds && pet.breeds.secondary) {
          breed = pet.breeds.primary + ", " + pet.breeds.secondary
        } else {
          breed = pet.breeds.primary;
        }

        this.setState({
          name: pet.name,
          animal: pet.species,
          location: `${pet.contact.address.city}, ${pet.contact.address.state}`,
          description: pet.description,
          media: pet.photos,
          breed,
          loading: false
        })
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/");
      })
  }

  toggleModal = () => this.setState(({ showModal }) => ({ showModal: !showModal }))


  render() {
    if (this.state.loading) {
      return <h1> loading ...</h1>
    }

    const { name, animal, location, description, media, breed, showModal } = this.state;

    return (
      <div >
        <Link to="/"><h1>Adopt Me</h1></Link>
        <div className="details">
          <Carousel media={media} />
          <div>
            <h1>{name}</h1>
            <h2>{animal} - {breed} - {location}</h2>
            <button onClick={this.toggleModal}>Adopt {name}</button>
            <p dangerouslySetInnerHTML={{ __html: description }} />
            {
              showModal ? (
                <Modal>
                  <LoadableContent toggleModal={this.toggleModal} name={name} />
                </Modal>
              ) : null}
          </div>
        </div>
      </ div>
    )
  }
}

export default Details;
