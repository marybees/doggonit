import React from "react";
import { Jumbotron, Button } from "reactstrap";
import axios from "axios";
import DogCard from "./DogCard";

const DogList = (props) => {

  const dogImageArray = props.dogImages.map((dogImageURL) => {
    return <DogCard url={dogImageURL} />
  })

  let handleOnClick = (e) => {
    e.preventDefault();
    axios
    .get("https://dog.ceo/api/breeds/image/random/20")
    .then(function (response) {
        props.setDogImages(response.data.message);
    })
    .catch(function (error) {
        console.log(error);
    });
}

  return (
      <div>
        <Jumbotron className="jumbotron">
          <h1 className="display-3">Dogs on things</h1>
          <p className="lead">Get your daily fix of adorable dogs on things. Dogs on the carpet, dogs on the grass, even dogs on the table!</p>
          <hr className="my-2" />
          <p>Click the button below to see more.</p>
          <p className="lead">
            <Button color="primary" onClick={(e)=> {handleOnClick(e)}}>
              More dogs please!
            </Button>
          </p>
        </Jumbotron>
        <div className="dog-images-container">
          {dogImageArray}
        </div>
      </div>
  );
};

export default DogList;
