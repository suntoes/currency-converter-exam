import { Container, Divider, Heading, Input, Button } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Login from "./compositions/login"

function App() {
  
  return (
    <>
      <Container centerContent>
        <Header />
        <Divider/>
        <BrowserRouter>
          <AnimatePresence exitBeforeEnter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/branch" element={<>OLOL</>} />
              <Route path="/branch/:city" element={<></>} />
              <Route path="*" element={<Login />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
