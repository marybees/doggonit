import React, { useState } from "react";
// import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Alphabet() {
    const [activeLetter, setActiveLetter] = useState();
    // const params = useParams();
    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

    let linkedLetterList = alphabet.map((letter) =>
        <Link onClick={setActiveLetter}>{letter}</Link>
    );

    return (
        <div>
            {linkedLetterList}
        </div>
    )
}
