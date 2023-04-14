import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
// import FaceIcon from '@mui/icons-material/Face';
// import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Upload from "./Upload";
import { logOut } from "../redux/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 25px;
  color: ${({ theme }) => theme.text};
  
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #999;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding-left: 5px;
  font-size: 16px;
  border: none;
  outline: none;
  margin-left: 5px;

  option {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bgLighter};
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const NavBar = ({ darkMode, setDarkMode }) => {

  const { currentUser } = useSelector(state => state.user);
  //const { name, img } = useSelector(state => state.user.currentUser);

  //console.log(name,'==',img);

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('')

  // const [selectOpt, setSelectOpt] = useState(`${currentUser.name}`);

  // console.log(selectOpt, 'slt')

  //const dispatch = useDispatch();

  const navigate = useNavigate();

  // const handleTypeChange = (e) => {
  //   setSelectOpt(e.target.value);

  //   localStorage.removeItem('user')
  //   //dispatch(logOut())
  //   navigate('/signIn');
  // }

  // console.log(selectOpt, '000')

  return (
    <>
      <Container>
        <Wrapper>
          <Item onClick={() => setDarkMode(!darkMode)}>
            <SettingsBrightnessOutlinedIcon />
            {darkMode ? "Light" : "Dark"} Mode
          </Item>
          <Search>
            <Input placeholder="Search..." onChange={(e) => setQ(e.target.value)} />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>

          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
              {currentUser.name}
              {/* <Select value={selectOpt} onChange={(e) => handleTypeChange(e)}>
                <option value={`${currentUser.name}`}>{currentUser.name}</option>
                <option value='logout' >Log Out</option>
              </Select> */}
            </User>
          ) : (
            <Link to="signIn" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default NavBar;
