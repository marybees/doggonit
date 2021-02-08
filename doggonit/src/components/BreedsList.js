import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";

const BreedsList = ( { dogBreeds } ) => {
    const [search, setSearch] = useState("");

    const dogBreedsArr = Object.keys(dogBreeds);

    const filteredBreeds = dogBreedsArr.filter(dogBreed => {
        return dogBreed.toLowerCase().includes(search.toLowerCase());
    });

    console.log("filteredBreeds", filteredBreeds)

    return (
        <div>
            <input type="text" placeholder="Search for a breed" onChange={ e => setSearch(e.target.value)}/>
            {filteredBreeds.map((dogBreed) => {
                return <Link><ul>{dogBreed}</ul></Link>
            })}
        </div>
    )

};

export default BreedsList;

