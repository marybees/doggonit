import React, { useState } from "react";
import { Link } from "react-router-dom";

const Alphabet = (props) => {
    const [activeLetter, setActiveLetter] = useState();
    const [isLoading, setIsLoading] = useState()
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

    const linkedLetterList = alphabet.map((letter) =>
        <Link onClick={()=>{setActiveLetter(letter)}}>{letter}</Link>
    );

    let breeds = Object.keys(props.dogBreeds);

    if(!props.dogBreeds) {
        return(
            <div>...Loading</div>
        );
    };

    if (activeLetter) {
        breeds = breeds.filter(dogBreed => dogBreed[0].toUpperCase() === activeLetter);
    }

    let dogBreedArray = breeds.map((dogBreed) => {
        return <div>{dogBreed}</div>;
    });

    if(breeds.length === 0) {
        dogBreedArray = (
            <div>There are no dogs that start with {activeLetter}.</div>
        )
    }

    return (
        <div>
            <h2>Dog Breeds by Letter</h2>
            <h3>View a list of dog breeds that begin with the selected letter.</h3>
                {linkedLetterList}
                {dogBreedArray}
        </div>
    );
};
export default Alphabet;
