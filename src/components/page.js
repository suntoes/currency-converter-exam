import { Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Page = (props) => (
      <motion.div
        style={{ width: '100%' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Container {...props} maxW="container.lg" centerContent />
      </motion.div>
)

export default Page