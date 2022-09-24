import {Heading} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import ThemeButton from "./theme-button"

function Header() {
  const [title, setTitle] = useState("")
  
  useEffect(() => {
    const hourNow = new Date().getHours()
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
    switch(true) 
    {
      case hourNow < 24 && hourNow >= 18:
        setTitle("Konbanwa " + emojis[randomEmojiIndex])
        break;
      case hourNow < 18 && hourNow >= 12:
        setTitle("Kon'nichiwa " + emojis[randomEmojiIndex])
        break;
      case hourNow < 12:
        setTitle("Ohayou gozaimasu " + emojis[randomEmojiIndex])
        break
      default:
        break;
    }
  }, [])
  
  return <>
    <Heading fontSize={24} my={10}>{title}</Heading>
    <ThemeButton/>
  </>
}

export default Header;
