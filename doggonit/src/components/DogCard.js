import React from "react";
import "../styles/index.css"
import {
  Card, CardImg
} from 'reactstrap';
const DogCard = (props) => {

    return (
      <div>
        <Card className="dog-image-card">
          <CardImg style={{ width: "200px", height: "200px" }} src={props.url} alt="random dog"/>
        </Card>
      </div>
    );
};

export default DogCard;