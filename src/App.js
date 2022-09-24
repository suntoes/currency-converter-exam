import { Container, Divider } from "@chakra-ui/react"
import React from "react"
import { BrowserRouter  } from "react-router-dom";
import Header from "./components/header";
import AnimatedRoutes from "./AnimatedRoutes"

function App() {
  
  return (
    <>
      <Container centerContent>
        <Header />
        <Divider/>
        <BrowserRouter>
          <AnimatedRoutes/>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
