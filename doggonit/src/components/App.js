import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';
import Navigation from './Navigation';
import DogList from './DogList';
import Alphabet from './Alphabet';
import BreedsList from './BreedsList';
import SubBreedsList from './SubBreedsList';

const App = () => {
  const [dogImages, setDogImages] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
    axios
    .get("https://dog.ceo/api/breeds/image/random/20")
    .then(function (response) {
        console.log("20 random dog pics:", response.data.message);
        setDogImages(response.data.message);
    })
    .catch(function (error) {
        console.log(error);
    });
    }, []);

    useEffect(() => {
      axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then(function (response) {
          console.log("List of dog breeds:", response.data.message);
          setDogBreeds(response.data.message);
      })
      .catch(function (error) {
          console.log(error);
      });
      }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/subbreed">
            <SubBreedsList />
          </Route>
          <Route path="/breed">
            <BreedsList dogBreeds={dogBreeds} setDogBreeds={setDogBreeds}/>
          </Route>
          <Route path="/alphabet">
            <Alphabet dogBreeds={dogBreeds} setDogBreeds={setDogBreeds}/>
          </Route>
          <Route exact path="/">
            <DogList dogImages={dogImages} setDogImages={setDogImages}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

