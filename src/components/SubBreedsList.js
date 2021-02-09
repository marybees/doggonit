import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Input, Alert, List, Jumbotron } from "reactstrap";
import DogCard from "./DogCard";

const SubBreedsList = ( { dogBreeds } ) => {
    const [search, setSearch] = useState("");
    const [dogBreedImages, setDogBreedImages] = useState([]);
    const [dogBreedName, setDogBreedName] = useState({});

    const history = useHistory();
    const { subbreed } = useParams();

    const dogBreedsArr = Object.keys(dogBreeds);

    const newBreedList = [];

    dogBreedsArr.forEach((dogBreed) => {
        let subBreeds = dogBreeds[dogBreed];
        subBreeds.forEach((subBreed) => {
            newBreedList.push({
                breed:dogBreed,
                subBreed:subBreed
            })
        });
    });

    const filteredBreeds = newBreedList.filter(dogBreedObj => {
        let fullBreedName = dogBreedObj.breed + " " + dogBreedObj.subBreed
        return fullBreedName.toLowerCase().includes(search.toLowerCase());
    });

    let dogPicByBreed = dogBreedImages.map((dogPicURL) => {
        return <DogCard key={dogPicURL} url={dogPicURL} />
    })

    let alertBar;

    let handleOnClick = (e, dogBreedObj) => {
        e.preventDefault();
        setDogBreedName(dogBreedObj);
        history.push(`/subbreed/${dogBreedObj.subBreed}/${dogBreedObj.breed}`);
    }

    let handleOnChange = (e, inputValue) => {
        e.preventDefault();
        setSearch(inputValue);
        setDogBreedName({});
        setDogBreedImages([]);
    }

    useEffect(() => {
        axios
        .get("https://dog.ceo/api/breed/" + dogBreedName.breed + "/" + dogBreedName.subBreed + "/images/random/5")
        .then(function (response) {
            setDogBreedImages(response.data.message);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [dogBreedName, alertBar]);

    if(!filteredBreeds.length) {
        alertBar = (
            <Alert color="warning"><span style ={{ fontWeight: "bold" }}>Doggonit!</span> We can't find that dog sub-breed.</Alert>
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
                {filteredBreeds.map((dogBreedObj) => {
                    return <Link key={dogBreedObj} onClick={(e)=> {handleOnClick(e, dogBreedObj)}}><List style={{padding: "0"}}>{dogBreedObj.subBreed} {dogBreedObj.breed}</List></Link>
                })}
            { alertBar }
            </div>
            <div className="dog-images-container">
                { dogPicByBreed }
            </div>
        </div>
    )
};

export default SubBreedsList;

