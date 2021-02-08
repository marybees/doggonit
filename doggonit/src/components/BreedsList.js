import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Alert, List, Jumbotron, Button } from "reactstrap";

const BreedsList = ( { dogBreeds } ) => {
    const [search, setSearch] = useState("");

    const dogBreedsArr = Object.keys(dogBreeds);

    const filteredBreeds = dogBreedsArr.filter(dogBreed => {
        return dogBreed.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <Jumbotron className="jumbotron">
                <h1 className="display-3">Dogs on Things by Breed</h1>
                <p className="lead">Search for your favorite dog breed.</p>
                <hr className="my-2" />
                <p>Select a dog breed below to see what they look like!</p>
                <Input type="text" placeholder="Search for a breed" onChange={ e => setSearch(e.target.value)}/>
                <p className="lead">
                </p>
            </Jumbotron>
            <div className="dog-list-container">
                {filteredBreeds.map((dogBreed) => {
                    return <Link><List style={{padding: "0"}}>{dogBreed}</List></Link>
                })}
                <Alert color="warning"><span style ={{ fontWeight: "bold" }}>Doggonit!</span> We can't find that dog breed.</Alert>
            </div>
        </div>
    )
};

export default BreedsList;

