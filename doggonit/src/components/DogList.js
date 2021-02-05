import React from "react";
import { Jumbotron, Button } from "reactstrap";
import DogCard from "./DogCard";

const DogList = (props) => {

  const dogImageArray = props.dogImages.map((dogImageURL) => {
    return <DogCard url={dogImageURL} />
  })

  return (
      <div>
        <Jumbotron className="jumbotron">
          <h1 className="display-3">Dogs on things</h1>
          <p className="lead">Get your daily fix of adorable dogs on things. Dogs on the carpet, dogs on the grass, even dogs on the table!</p>
          <hr className="my-2" />
          <p>Click the button below to see more to see more.</p>
          <p className="lead">
            <Button color="primary">
              More Dogs Please!
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
