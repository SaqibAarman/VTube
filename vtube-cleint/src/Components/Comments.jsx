import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ currentVideo }) => {

  const videoId = currentVideo._id;
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState('');

  const [fetchedData, setFetchedData] = useState('')


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);

      } catch (err) { }
    };
    fetchComments();
  }, [videoId, fetchedData]);

  async function fetchData() {
    const res = await axios.post(`/comments/`, { desc, videoId, userId: currentUser._id });

    setFetchedData(res.data)
  }

  const handleAddComment = async (e) => {
    e.preventDefault();

    fetchData()

    setDesc('')

  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <form onSubmit={handleAddComment}>
          <Input placeholder="Add A Comment..." value={desc} onChange={(e) => setDesc(e.target.value)} required />
        </form>
      </NewComment>

      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}

    </Container>
  );
};

export default Comments;
