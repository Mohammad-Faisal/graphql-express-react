import React ,{useState,useEffect} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";

const ADD_BOOK = gql`
    mutation AddBook($name: String! , $genre:String!) {
        addBook(name: $name , genre: $genre) {
            id
            name 
        }
    }
`


const AddBook = () => {

    const [addBook, { data }] = useMutation(ADD_BOOK);


    const [name , setName] = useState('')
    const [genre , setGenre] = useState('')


    const onsubmit = () => {
        addBook({variables: { name , genre}})
    }

    return <div style={{margin:"30px"}}>
       <div>
           <input type={"text"} onChange={e => setName(e.target.value)}/>
           <input type={"text"} onChange={e => setGenre(e.target.value)}/>
            <button  onClick={onsubmit}> Submit</button>
       </div>
    </div>
}

export default AddBook
