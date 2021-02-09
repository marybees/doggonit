import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input, Alert, List, Jumbotron } from "reactstrap";
import DogBreedCard from "./DogBreedCard";

const SubBreedsList = ( { dogBreeds } ) => {
    const [search, setSearch] = useState("");
    const [dogBreedImages, setDogBreedImages] = useState([]);
    const [dogBreedName, setDogBreedName] = useState("");
    const [dogSubBreedName, setDogSubBreedName] = useState("");

    const dogBreedsArr = Object.keys(dogBreeds);
    const dogSubBreedsArr = Object.values(dogBreeds);

    const filteredDogSubBreedsArr = dogSubBreedsArr.filter((subBreedArr) => {
        if(subBreedArr.length > 0) {
            return subBreedArr;
        }
    });
    console.log("filteredDogSubBreedsArr:", filteredDogSubBreedsArr);


    const filteredSubBreeds = filteredDogSubBreedsArr.filter(dogSubBreed => {
        return dogSubBreed.includes(search.toLowerCase());
    });

    let dogPicByBreed = dogBreedImages.map((dogPicURL) => {
        return <DogBreedCard url={dogPicURL} />
    })

    let alertBar;

    let handleOnClick = (e, dogBreed) => {
        e.preventDefault();
        setDogSubBreedName(dogBreed);
    }

    let handleOnChange = (e, inputValue) => {
        e.preventDefault();
        setSearch(inputValue);
        setDogSubBreedName("");
        setDogBreedImages([]);
    }

    useEffect(() => {
        axios
        .get("https://dog.ceo/api/breed/" + dogBreedName + dogSubBreedName + "/images/random/5")
        .then(function (response) {
            console.log("5 random dog pics by breed:", response.data.message);
            setDogBreedImages(response.data.message);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [dogBreedName, dogSubBreedName, alertBar]);

    if(!filteredSubBreeds.length) {
        alertBar = (
            <Alert color="warning"><span style ={{ fontWeight: "bold" }}>Doggonit!</span> We can't find that dog breed.</Alert>
        )
    }

    return (
        <div>
            <Jumbotron className="jumbotron">
                <h1 className="display-3">Dogs on things <span>by sub-breed</span></h1>
                <p className="lead">Search for your favorite dog sub-breed.</p>
                <hr className="my-2" />
                <p>Select a dog sub-breed below to see what they look like!</p>
                <Input type="text" placeholder="Search for a sub-breed" onChange={(e) => {handleOnChange(e, e.target.value)}}/>
                <p className="lead">
                </p>
            </Jumbotron>
            <div className="dog-list-container">
                {filteredSubBreeds.map((dogSubBreed) => {
                    return <Link onClick={(e)=> {handleOnClick(e, dogSubBreed)}}><List style={{padding: "0"}}>{dogSubBreed}</List></Link>
                })}
            { alertBar }
            </div>
            <div className="dog-images-container">
                {dogPicByBreed}
            </div>
        </div>
    )
};

export default SubBreedsList;

