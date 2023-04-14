import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchSuccess } from "../redux/videoSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {

  const [videos, setVideos] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      //console.log(res.data,'---s');
      setVideos(res.data)
      
      dispatch(fetchSuccess(res.data))
    }

    fetchVideos()
  }, [type])


  return (
    <Container>

      {videos.map((video) => (

        <Card key={video._id} video={video} />
      )

      )}

    </Container>
  );
};

export default Home;
