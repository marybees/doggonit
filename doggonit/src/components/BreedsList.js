import React, { useState } from "react";
import { Alert } from "reactstrap";

const BreedsList = ( { dogBreeds } ) => {
    let [activeOption, setActiveOption] = useState(0);
    let [filteredOptions, setFilteredOptions] = useState([]);
    let [showOptions, setShowOptions] = useState([]);
    let [userInput, setUserInput] = useState("");

    const dogBreedsArr = Object.keys(dogBreeds);
    console.log("dog breeds array in BreedsList:", dogBreedsArr);

    let optionList = [];

    const onChange = (e) => {
        setUserInput(e.target.value);
        filteredOptions = dogBreedsArr.filter(
            (dogBreed) =>
            dogBreed.indexOf(userInput.toLowerCase()) > -1
        );
    };

    const onClick = (e) => {
        setActiveOption(0);
        setFilteredOptions([]);
        setShowOptions(false);
        setUserInput("");
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setActiveOption(0);
            setShowOptions(false);
            userInput = filteredOptions[activeOption];
        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            setActiveOption = activeOption - 1
        } else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                return;
            }
            setActiveOption(activeOption + 1);
        }
    };

    if (showOptions && userInput) {
        if (filteredOptions.length) {
            optionList = (
                <ul>
                    {filteredOptions.map((dogBreedName, index) => {
                        return (
                            <li key={index} onClick={onClick}>
                                {dogBreedName}
                            </li>
                        );
                    })}
                </ul>
            )
        } else {
            optionList = (
                <div>
                    <Alert color="warning"><span style ={{ fontWeight: "bold" }}>Doggonit!</span> We can't find a dog breed with that name.</Alert>
                </div>
            )
        }
    };

    return (
        <div>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
            />
            <input type="submit" />
            {optionList}
        </div>
    );
};

export default BreedsList;

