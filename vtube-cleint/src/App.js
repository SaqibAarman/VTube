import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./Components/Menu";
import NavBar from "./Components/NavBar";
import { darkTheme, lightTheme } from "./Utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Video from "./Pages/Video";
import SignIn from "./Pages/SignIn";
import Search from "./Pages/Search";
import Register from "./Pages/Register";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        {/* MENU */}
        <BrowserRouter>
          <Menu />
          {/* MAIN */}
          <Main>
            <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Routes>
                <Route path="/" />
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="search" element={<Search />} />

                <Route path="signIn" element={<SignIn />} />
                <Route path="register" element={<Register />} />

                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
