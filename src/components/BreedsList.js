import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Input, Alert, List, Jumbotron, Spinner, ListInlineItem } from "reactstrap";
import DogCard from "./DogCard";

const BreedsList = ( { dogBreeds } ) => {
    const [search, setSearch] = useState("");
    const [dogBreedImages, setDogBreedImages] = useState([]);
    const [dogBreedName, setDogBreedName] = useState("");

    const history = useHistory();
    const { breed } = useParams();

    const dogBreedsArr = Object.keys(dogBreeds);

    const filteredBreeds = dogBreedsArr.filter(dogBreed => {
        return dogBreed.toLowerCase().includes(search.toLowerCase());
    });

    let dogPicByBreed = dogBreedImages.map((dogPicURL) => {
        return <DogCard key={dogPicURL} url={dogPicURL} />
    })

    let alertBar;

    let handleOnClick = (e, dogBreed) => {
        e.preventDefault();
        setDogBreedName(dogBreed);
        history.push(`/breed/${dogBreed}`);
    }

    let dogBreedListItem = filteredBreeds.map((dogBreed) => {
        return <ListInlineItem key={dogBreed} style={{padding: "0"}}><Link onClick={(e)=> {handleOnClick(e, dogBreed)}}>{dogBreed}</Link></ListInlineItem>
    })

    let handleOnChange = (e, inputValue) => {
        e.preventDefault();
        setSearch(inputValue);
        setDogBreedName("");
        setDogBreedImages([]);
    }

    useEffect(() => {
        axios
        .get("https://dog.ceo/api/breed/" + dogBreedName + "/images/random/20")
        .then(function (response) {
            setDogBreedImages(response.data.message);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [dogBreedName, alertBar]);

    if(!filteredBreeds.length) {
        alertBar = (
            <Alert color="warning"><span style ={{ fontWeight: "bold" }}>Doggonit!</span> We can't find that dog breed.</Alert>
        )
    }

    if(!dogBreeds) {
        return(
            <Spinner color="primary" />
        );
    };

    return (
        <div>
            <Jumbotron className="jumbotron">
                <h1 className="display-3">Dogs on things <span>by breed</span></h1>
                <p className="lead">Search for your favorite dog breed.</p>
                <hr className="my-2" />
                <p>Select a dog breed below to see what they look like!</p>
                <Input type="text" placeholder="Search for a breed" onChange={(e) => {handleOnChange(e, e.target.value)}}/>
                <p className="lead">
                </p>
            </Jumbotron>
            <div className="dog-list-container">
            <List style={{ padding: "0" }}>{ dogBreedListItem }</List>
            { alertBar }
            </div>
            <div className="dog-images-container">
                {dogPicByBreed}
            </div>
        </div>
    )
};

export default BreedsList;

