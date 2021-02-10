
import React from 'react';
import {gql, useLazyQuery, useQuery} from "@apollo/client";

const GET_BOOKS = gql`
    {
        books{
            name
            genre
        }
    }
`;


const BookList = () => {

    const { loading, error, data , refetch } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return <div>
        <ul>
            {data.books.map(item => <li>{item.name}</li>)}
        </ul>
        <button onClick={() => refetch()}>Refetch</button>
    </div>
}

export default BookList
