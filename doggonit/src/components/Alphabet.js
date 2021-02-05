import React, { useState } from "react";
import { Spinner, Button, ButtonGroup, List, ListInlineItem, Jumbotron, Alert } from 'reactstrap';

const Alphabet = (props) => {
    const [activeLetter, setActiveLetter] = useState();
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

    const linkedLetterList = alphabet.map((letter) =>
        <Button onClick={()=>{setActiveLetter(letter)}}>{letter}</Button>
    );

    let breeds = Object.keys(props.dogBreeds);

    if(!props.dogBreeds) {
        return(
            <Spinner color="primary" />
        );
    };

    if (activeLetter) {
        breeds = breeds.filter(dogBreed => dogBreed[0].toUpperCase() === activeLetter);
    }

    let dogBreedArray = breeds.map((dogBreed) => {
        return <ListInlineItem>{dogBreed}</ListInlineItem>;
    });

    if(breeds.length === 0) {
        dogBreedArray = (
            <Alert color="warning">Doggonit! There are no dog breeds that start with {activeLetter}.</Alert>
        )
    }

    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Dog Breeds by Letter</h1>
                <p className="lead">View a list of dog breeds that begin with the selected letter.</p>
                <ButtonGroup>{linkedLetterList}</ButtonGroup>
            </Jumbotron>
            <List style={{ padding: "0 1rem" }}>{dogBreedArray}</List>
        </div>
    );
};
export default Alphabet;
