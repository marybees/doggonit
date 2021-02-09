import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Spinner, Button, ButtonGroup, List, ListInlineItem, Jumbotron, Alert } from 'reactstrap';
import DogCard from "./DogCard";

const Alphabet = (props) => {
    const [activeLetter, setActiveLetter] = useState();
    const [dogBreedImages, setDogBreedImages] = useState([]);

    const history = useHistory();
    const { letter } = useParams();
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    let breeds = Object.keys(props.dogBreeds);
    let dogBreedName = "";

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    let handleOnClick = (e, letter) => {
        e.preventDefault();
        setActiveLetter(letter);
        setDogBreedImages([]);
        letter = letter.toLowerCase();
        history.push(`/alphabetized/${letter}`);
    }

    const linkedLetterList = alphabet.map((letter) =>
        <Button onClick={(e)=> {handleOnClick(e, letter)}}>{letter}</Button>
    );

    if (activeLetter) {
        breeds = breeds.filter(dogBreed => dogBreed[0].toUpperCase() === activeLetter);
        dogBreedName = breeds[getRandomInt(breeds.length - 1)]
    }

    useEffect(() => {
        axios
        .get("https://dog.ceo/api/breed/" + dogBreedName + "/images/random/5")
        .then(function (response) {
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
        return <DogCard key={dogPicURL} url={dogPicURL} />
    })

    let dogBreedArray = breeds.map((dogBreed) => {
        return <ListInlineItem key={dogBreed}>{dogBreed}</ListInlineItem>;
    });

    if(breeds.length === 0) {
        dogBreedArray = (
            <Alert color="warning"><span style ={{ fontWeight: "bold" }}>Doggonit!</span> There are no dog breeds that start with the letter {activeLetter}.</Alert>
        )
    }

    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Dog breeds on things <span>by letter</span></h1>
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
