import React from "react";
import "../styles/index.css"
import {
  Card, CardImg
} from 'reactstrap';

const DogBreedCard = (props) => {

    return (
        <div>
            <Card className="dog-image-card">
                <CardImg style={{ width: "200px", height: "200px" }} src={props.url} alt="dog by breed"/>
            </Card>
        </div>
    );
};

export default DogBreedCard;
