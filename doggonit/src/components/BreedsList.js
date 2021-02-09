import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input, Alert, List, Jumbotron, Button } from "reactstrap";
import DogBreedCard from "./DogBreedCard";

const BreedsList = ( { dogBreeds } ) => {
    const [search, setSearch] = useState("");
    const [dogBreedImages, setDogBreedImages] = useState([]);

    const dogBreedsArr = Object.keys(dogBreeds);

    const filteredBreeds = dogBreedsArr.filter(dogBreed => {
        return dogBreed.toLowerCase().includes(search.toLowerCase());
    });

    let dogPicByBreed = dogBreedImages.map((dogPicURL) => {
        return <DogBreedCard url={dogPicURL} />
    })

    let dogBreedName = "";

    useEffect(() => {
        axios
        .get("https://dog.ceo/api/breed/" + dogBreedName + "/images/random/5")
        .then(function (response) {
            console.log("5 random dog pics by breed:", response.data.message);
            setDogBreedImages(response.data.message);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [dogBreedName]);

    return (
        <div>
            <Jumbotron className="jumbotron">
                <h1 className="display-3">Dogs on things <span>by breed</span></h1>
                <p className="lead">Search for your favorite dog breed.</p>
                <hr className="my-2" />
                <p>Select a dog breed below to see what they look like!</p>
                <Input type="text" placeholder="Search for a breed" onChange={ e => setSearch(e.target.value)}/>
                <p className="lead">
                </p>
            </Jumbotron>
            <div className="dog-list-container">
                {filteredBreeds.map((dogBreed) => {
                    return <Link onClick={(e) => e.preventDefault(), dogBreedName = dogBreed}><List style={{padding: "0"}}>{dogBreed}</List></Link>
                })}
                <Alert color="warning"><span style ={{ fontWeight: "bold" }}>Doggonit!</span> We can't find that dog breed.</Alert>
            </div>
            <div className="dog-images-container">
                {dogPicByBreed}
            </div>
        </div>
    )
};

export default BreedsList;

