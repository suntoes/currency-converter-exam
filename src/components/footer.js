import { Box, Container, Link } from "@chakra-ui/react"

const Footer = () =>
    <Box my={100} textAlign="center">
        This website is built by{" "}
        <Link href="https://suntoes.codes" target="_blank">
            Mar Santos
        </Link>
        {" "}for MACROLOGIC DIVERSIFIED TECHNOLOGIES INC.
        <br></br>
        <br></br>
        The open-source code can be found at{" "}
        <Link href="https://github.com/suntoes/currency-converter-exam" target="_blank">
            github.com/suntoes/currency-converter-exam
        </Link>
    </Box>

export default Footer
