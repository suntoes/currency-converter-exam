import { AnimatePresence } from "framer-motion"
import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Login from "./compositions/login"
import BranchList from "./compositions/branchList"
import BranchEditor from "./compositions/branchEditor"

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/branch" element={<BranchList />} />
        <Route path="/branch/:id" element={<BranchEditor />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
