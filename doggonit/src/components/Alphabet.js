import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Button, ButtonGroup, List, ListInlineItem, Jumbotron, Alert } from 'reactstrap';
import DogBreedCard from "./DogBreedCard";

const Alphabet = (props) => {
    const [activeLetter, setActiveLetter] = useState();
    const [dogBreedImages, setDogBreedImages] = useState([]);

    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    let breeds = Object.keys(props.dogBreeds);
    let dogBreedName = "";
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    const linkedLetterList = alphabet.map((letter) =>
        <Button onClick={()=>{setActiveLetter(letter); setDogBreedImages([])}}>{letter}</Button>
    );

    if (activeLetter) {
        breeds = breeds.filter(dogBreed => dogBreed[0].toUpperCase() === activeLetter);
        dogBreedName = breeds[getRandomInt(breeds.length - 1)];
        console.log("breed image url at index 0:", breeds[0]);
    }

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

    if(!props.dogBreeds) {
        return(
            <Spinner color="primary" />
        );
    };

    let dogPicByBreed = dogBreedImages.map((dogPicURL) => {
        return <DogBreedCard url={dogPicURL} />
    })

    let dogBreedArray = breeds.map((dogBreed) => {
        return <ListInlineItem>{dogBreed}</ListInlineItem>;
    });

    if(breeds.length === 0) {
        dogBreedArray = (
            <Alert color="warning"><span style ={{ fontWeight: "bold" }}>Doggonit!</span> There are no dog breeds that start with the letter {activeLetter}.</Alert>
        )
    }

    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Dog Breeds by Letter</h1>
                <p className="lead">View a list of dog breeds that begin with the selected letter.</p>
                <ButtonGroup>{linkedLetterList}</ButtonGroup>
            </Jumbotron>
            <List style={{ padding: "0 3rem" }}>{dogBreedArray}</List>
            <div className="dog-images-container">
                {dogPicByBreed}
            </div>
        </div>
    );
};
export default Alphabet;
