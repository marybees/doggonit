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
import Breed from './Breed';
import SubBreed from './SubBreed';

const App = () => {
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    axios
    .get('https://dog.ceo/api/breeds/image/random/20')
    .then(function (response) {
        console.log("Random dog image response:", response.data.message);
        setDogImages(response.data.message)
    })
    .catch(function (error) {
        console.log(error);
    });
    }, []);

    useEffect(() => {
      axios
      .get('https://dog.ceo/api/breed/{search}/images/random/20')
      .then(function (response) {
          console.log("Random dog image response:", response.data.message);
          setDogImages(response.data.message)
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
            <SubBreed />
          </Route>
          <Route path="/breed">
            <Breed />
          </Route>
          <Route path="/alphabet">
            <Alphabet />
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

