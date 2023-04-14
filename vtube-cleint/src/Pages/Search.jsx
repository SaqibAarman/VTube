import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../Components/Card';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

const Search = () => {

    const [videos, setVideos] = useState([])
    const query = useLocation().search

    //console.log(query, '****');

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/search${query}`);

            setVideos(res.data)
        }

        fetchVideos()
    }, [query])


    return (
        <Container>
            {videos.map((video) => (
                <Card key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Search