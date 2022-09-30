import { Heading } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import ThemeButton from "./theme-button"

function Header() {
  const [randomEmoj, setRandomEmoj] = useState("")
  
  useEffect(() => {
    const emojis = [
      "(✿◠‿◠)",
      "(づ｡◕‿‿◕｡)づ",
      "(. ❛ ᴗ ❛.)",
      "~(˘▾˘~)",
      "ヽ(•‿•)ノ",
      "(ノ・∀・)ノ",
      "(ﾉ^_^)ﾉ",
      "＼(^o^)／"
    ]
    const randomEmojiIndex = Math.floor(Math.random() * ((emojis.length-1) - 0 + 1) + 0)

    setRandomEmoj(" " + emojis[randomEmojiIndex])
  }, [])
  
  return <>
    <Heading textAlign="center" fontSize={24} mt={10}>Modified API-based Currency Converter Exam</Heading>
    <Heading fontSize={24} mb={10}>{randomEmoj}</Heading>
    <ThemeButton/>
  </>
}

export default Header;
