import { Heading, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../utils/axios"
import Page from "../components/page";
import { getAllData } from "../utils/axios"

function titleCase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

function BranchList() {
    const navigate = useNavigate()
    const [branches, setBranches] = useState([]);

    useEffect(() => {
      const storedKey = sessionStorage.getItem("key");
    
      const detectLogCallback = (res) => {
        if(res?.status === 200) {
        const allDataCallback = (res) => {
            if(res.status === 200) {
                setBranches(res.data)
            }
        }

        getAllData({ callback: allDataCallback })
        }

        else navigate("/")
      } 
      adminLogin({
        data: {code: storedKey},
        callback: detectLogCallback
      })
    }, [])

    return (
        <Page>
            Please select a branch to manage:
            {
                branches.map((cityObj, i) => (
                    <Link href={"/branch/" + cityObj.id} key={`branch-link-${i}`}>
                        {titleCase(cityObj?.city || "")} <ExternalLinkIcon mx="2px" />
                    </Link>
                ))
            }
            <Link href="/branch/new">...or create a new{" "}<ExternalLinkIcon mx="2px" /></Link>
        </Page>
    )
}

export default BranchList
