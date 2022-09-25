import { Input, Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { adminLogin } from "../utils/axios"
import Page from "../components/page"

function Login() {
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const [inputIsInvalid, setInputIsInvalid] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedKey = sessionStorage.getItem("key");

    const detectLogCallback = (res) => {
      if(res?.status === 200) {
        navigate("/branch")
        console.log("detected login")
      }
    } 
    adminLogin({
      data: {code: storedKey},
      callback: detectLogCallback
    })
  }, [])

  const handleInput = (e) => {
    setInputIsInvalid(false)
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    setLoading(true)

    const adminLogCallback = (res) => {
      setLoading(false)
      if(res?.status === 200) {
        sessionStorage.setItem("key", input)
        navigate("/branch")
      } else setInputIsInvalid(true)
    }

    adminLogin({
      data: {code: input},
      callback: adminLogCallback 
    })
  }
  
  return (
    <Page>
        <Input 
        value={input}
		type={"password"}
        onInput={handleInput} 
        mb={5} 
        placeholder="Enter Code" 
        disabled={loading} 
        isInvalid={inputIsInvalid}
        />
        <Button 
            onClick={handleSubmit} 
            w={"full"} 
            isDisabled={inputIsInvalid} 
            isLoading={loading}
        >
            Enter
        </Button>
    </Page>
  );
}

export default Login;
