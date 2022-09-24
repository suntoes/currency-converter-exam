import { motion } from 'framer-motion'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
const ThemeButton = () => {
  const { toggleColorMode } = useColorMode()


  return (
    <motion.div
      style={{position: 'fixed'}}
      key={useColorModeValue('light', 'dark')}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.2}}
    >
      <IconButton
        aria-label="toggle theme"
        transform={{base: "translateX(180px)", md: "translateX(210px)"}}
        bg={useColorModeValue('#0c3455', '#e9e29f')}
        borderRadius={0}
        color={useColorModeValue('white', '#1c1c1f')}
        icon={useColorModeValue(<MoonIcon />, <SunIcon size={23}/>)}
        onClick={()=>{
          setTimeout(()=>{
            toggleColorMode()
          }, 100);
        }}
      ></IconButton>
    </motion.div>
  )
}

export default ThemeButton