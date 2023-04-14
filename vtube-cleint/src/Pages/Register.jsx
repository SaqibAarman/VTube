import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerInStart, registerInSuccess, registerInFailure, logInStart, logInSuccess, logInFailure } from '../redux/userSlice.js';
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from 'firebase/auth'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 46px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 10px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')



  // const [values, setValues] = useState({
  //   username: "",
  //   Email: "",
  //   password: "",
  // });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // console.log(values, '===');

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerInStart())
    try {
      const res = await axios.post("/auth/signUp", { name, email, password });
      console.log(res.data, '===', res.status);
      if (res.status === 201) {

        dispatch(registerInSuccess(res.data))
        setName('')
        setEmail('')
        setPassword('')
        navigate('/signIn');
      } else {
        //console.log('1111');
        setMessage("Already Email Exists...")
      }

    } catch (error) {
      dispatch(registerInFailure())
    }
  }

  const signInWithGoogle = async () => {
    dispatch(logInStart())
    signInWithPopup(auth, provider).then((result) => {

      axios.post("auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
      }).then((res) => {
        dispatch(logInSuccess(res.data))
        navigate('/');
      })
    }).catch((err) => {

      dispatch(logInFailure())
    })


  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign Up</Title>
        <SubTitle>To Continue VTube</SubTitle>
        <Input placeholder="User Name..." onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
        {message && <span>Already Exists....</span>}
        <Input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleRegister} >Sign Up</Button>
        <Title>OR</Title>
        <span>Already Having Account! <a href="/signIn">Log In</a></span>
        <Title>OR</Title>
        <Button onClick={signInWithGoogle}><span style={{ marginRight: '15px', color: 'rgb(66, 133, 244)' }}><GoogleIcon /></span> SignIn With Google</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Register;
