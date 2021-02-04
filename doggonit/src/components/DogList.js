import React from "react";
import DogCard from "./DogCard";
import { Jumbotron, Button } from 'reactstrap';

const DogList = (props) => {

  const dogImageArray = props.dogImages.map((dogImageURL) => {
    return <DogCard url={dogImageURL} />
  })

  return (
      <div>
        <div className="dog-images-container">
          {dogImageArray}
        </div>
      </div>
  );
};

export default DogList;
