import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { adminLogin, getDataById, deleteDataById, postData, putData } from "../utils/axios"
import Page from "../components/page";
import { Box, Button, ButtonGroup, Divider, Input, InputGroup, InputLeftAddon, Stack, Text, Textarea, Spinner, Container, Link, Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel, useToast } from "@chakra-ui/react";
import { AddIcon, MinusIcon, ArrowBackIcon, RepeatIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons"
import {ConfirmModal, ConfirmKeyModal} from "../components/confirmModal";

function titleCase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const blankBranch = {
    city: "",
    gDriveMainPic: "",
    gDriveBranchPics: [],
    igLocationUrl: "",
    igLocationPics: [],
    address: "",
    gMapEmbedSrc: "",
    information: [],
    //[{title, description}]
    socials: [],
    //[{title, link}]}
    deleted: "false",
}

const blankDaModal = {
    open: false,
    key: false,
    title: "",
    body: "",
    action: "",
    callback: () => {},
}

function BranchEditor() {
    const toast = useToast()
    const params = useParams()
    const navigate = useNavigate()
    const [branch, setBranch] = useState(JSON.parse(JSON.stringify(blankBranch)))
    const [reserveBranch, setReserveBranch] = useState(JSON.parse(JSON.stringify(blankBranch)))
    const [loading, setLoading] = useState(true)
    const [daModal, setDaModal] = useState(blankDaModal)

    const resetDaModal = () => setDaModal(blankDaModal)

    const deleteModal = () => {
        const callback = (key) => {
            setLoading(true)
            deleteDataById({
                data: {...reserveBranch, key},
                callback: (res) => {
                    resetDaModal()
                    if(res.status === 200) {
                        toast({
                          title: 'Branch Deleted.',
                          status: 'success',
                          duration: 5000,
                          isClosable: true,
                        })
                        navigate("/branch")
                    } else {
                        setLoading(false)
                        toast({
                          title: 'Branch Failed to Delete.',
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        })
                    }
                }
            })
        }

        setDaModal({
            open: true,
            key: true,
            title: "Branch Deletion",
            body: "Please enter the key for confirmation",
            action: "Delete",
            callback
        })
    }

    const postModal = () => {
        const callback = (key) => {
            setLoading(true)
            postData({
                data: {...branch, key},
                callback: (res) => {
                    resetDaModal()
                    if(res.status === 200) {
                        toast({
                          title: 'Branch Created.',
                          status: 'success',
                          duration: 5000,
                          isClosable: true,
                        })
                        navigate("/branch/" + res.data.data.id)
                    } else {
                        setLoading(false)
                        toast({
                          title: 'Branch Failed to Create.',
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        })
                    }
                }
            })
        }

        setDaModal({
            open: true,
            key: true,
            title: "Create Branch",
            body: "Please enter the key for confirmation",
            action: "Create",
            callback
        })
    }

    const putModal = () => {
        const callback = (key) => {
            setLoading(true)
            putData({
                data: {...branch, key},
                callback: (res) => {
                    resetDaModal()
                    if(res.status === 200) {
                        toast({
                          title: 'Branch Updated.',
                          status: 'success',
                          duration: 5000,
                          isClosable: true,
                        })
                        navigate(0)
                    } else {
                        setLoading(false)
                        toast({
                          title: 'Branch Failed to Update.',
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        })
                    }
                }
            })
        }

        setDaModal({
            open: true,
            key: true,
            title: "Update Branch",
            body: "Please enter the key for confirmation",
            action: "Update",
            callback
        })
    }

    const undoModal = () => {
        setDaModal({
            open: true,
            key: false,
            title: "Undo Edited Branch",
            body: "Any progress will be lost",
            action: "Undo",
            callback: () => {
                resetDaModal()
                setBranch(reserveBranch)
            }
        })
    }

    const backModal = () => {
        setDaModal({
            open: true,
            key: false,
            title: "Back to home",
            body: "Any progress will be lost",
            action: "Back",
            callback: () => navigate("/branch")
        })
    }

    useEffect(() => {
      const storedKey = sessionStorage.getItem("key");
    
      const detectLogCallback = (res) => {
        if(res?.status === 200) {
        const dataCallback = (res) => {
            if(res.status === 200) {
                setBranch(res.data)
                setReserveBranch(res.data)
                setLoading(false)
            }
        }

        if(params.id !== "new") getDataById({
            data: {id: params.id},
            callback: dataCallback 
        }) 
        else setLoading(false)
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
            {
                loading ? <Spinner size="xl" /> : (
                    <Stack direction="column" w="full" spacing={10}>
                        <InputGroup>
                            <InputLeftAddon children="City" />
                            <Input 
                                value={branch.city || ""} 
                                onInput={e => {
                                    const copy = JSON.parse(JSON.stringify(branch))
                                    copy.city = e.target.value
                                    setBranch(copy)
                                }}
                                placeholder="City here"
                            />
                        </InputGroup>

                        <Divider/>

                        <Box>
                            <InputGroup>
                                <InputLeftAddon children="G-Drive Main Pic ID" />
                                <Input 
                                    value={branch.gDriveMainPic || ""} 
                                    onInput={e => {
                                        const copy = JSON.parse(JSON.stringify(branch))
                                        copy.gDriveMainPic = e.target.value
                                        setBranch(copy)
                                    }}
                                    placeholder="Id from G-Drive share link here"
                                />
                            </InputGroup>
                            <Accordion border="none" mt={3} mb={-7} allowToggle>
                                <AccordionItem border="none"  fontSize="0.8em">
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left' fontSize="0.8em">
                                        Show Tip
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel>
                                        This tip goes the same for G-Drive Branch Pics ID/s. Please upload the images at this{" "}
                                        <Link href="https://drive.google.com/drive/u/0/folders/12QM5s0OKwcC5GJh3SPjmZw8t3qwkOymY" target="_blank">
                                            google drive folder
                                        </Link>
                                        {" "}using the coffee dojo website google account and follow the existing file name format (to be organized).
                                        <br></br><br></br>
                                        To obtain the ID of uploaded images, simply get the share link with "anyone" access of it.
                                        And then for example:
                                        <br></br><br></br>
                                        At "https://drive.google.com/file/d/<Text as="mark">1k6QkPQ6wC0aC7DIGIt-lO2J8rXUhhRak</Text>/view?usp=sharing",
                                        the highlighted part is the ID you need.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>

                        <Divider/>

                        <Stack direction="column" w="full" spacing={5}>
                            <Text>G-Drive Branch Pics ID/s</Text>
                            {
                                branch?.gDriveBranchPics?.length === 0 && (
                                    <ButtonGroup isAttached>
                                        <Button bg="red.500" disabled><MinusIcon/></Button>
                                        <Button bg="green.500" onClick={() => {
                                            const copy = JSON.parse(JSON.stringify(branch));
                                            copy.gDriveBranchPics = [""]
                                            setBranch(copy)
                                        }}><AddIcon/></Button>
                                    </ButtonGroup>
                                )
                            }
                            {
                                branch?.gDriveBranchPics?.map((picId, i) => (
                                    <InputGroup key={`g-drive-branch-pic-${i}`}>
                                        <InputLeftAddon p={0}>
                                            <ButtonGroup isAttached>
                                                <Button bg="red.500" onClick={() => {
                                                    const copy = JSON.parse(JSON.stringify(branch))
                                                    copy.gDriveBranchPics = copy.gDriveBranchPics.filter((obj, _i) => i !== _i)
                                                    setBranch(copy)
                                                }}><MinusIcon/></Button>
                                                <Button bg="green.500" onClick={() => {
                                                    const copy = JSON.parse(JSON.stringify(branch))
                                                    copy.gDriveBranchPics = [...copy.gDriveBranchPics.splice(0, i+1), "", ...copy.gDriveBranchPics]
                                                    setBranch(copy)
                                                }}><AddIcon/></Button>
                                            </ButtonGroup>
                                        </InputLeftAddon>
                                        <Input 
                                            value={picId} 
                                            onInput={e => {
                                                const copy = JSON.parse(JSON.stringify(branch))
                                                copy.gDriveBranchPics[i] = e.target.value
                                                setBranch(copy)
                                            }}
                                            placeholder="Id from G-Drive share link here"
                                        />
                                    </InputGroup>
                                ))
                            }
                        </Stack>

                        <Divider/>
                        
                        <InputGroup>
                            <InputLeftAddon children="Address" />
                            <Input 
                                value={branch.address || ""} 
                                onInput={e => {
                                    const copy = JSON.parse(JSON.stringify(branch))
                                    copy.address = e.target.value
                                    setBranch(copy)
                                }}
                                placeholder="Address here"
                            />
                        </InputGroup>

                        <Divider/>

                        <Box>
                            <InputGroup>
                                <InputLeftAddon children="G-Map Embed Src" />
                                <Input 
                                    value={branch.gMapEmbedSrc || ""} 
                                    onInput={e => {
                                        const copy = JSON.parse(JSON.stringify(branch))
                                        copy.gMapEmbedSrc = e.target.value
                                        setBranch(copy)
                                    }}
                                    placeholder="Src from G-Map share embed html here"
                                />
                            </InputGroup>
                            <Accordion border="none" mt={3} mb={-7} allowToggle>
                                <AccordionItem border="none"  fontSize="0.8em">
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left' fontSize="0.8em">
                                        Show Tip
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel>
                                        There should be an existing landmark at google map first.
                                        <br></br><br></br>
                                        To obtain the embed src of the G-Map, visit the landmark at G-map, press the share button, click the 
                                        embed, copy the html and then find the Embed Src on it.
                                        <br></br><br></br>
                                        For example at "{`<iframe src="`}
                                        <Text as="mark">https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7719.144962342561!2d120.94513067284745!3d14.6801867419013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b5ac4842bfb1%3A0x593a83b31cc3b94e!2sCOFFEE%20DOJO!5e0!3m2!1sfil!2sph!4v1663965730129!5m2!1sfil!2sph</Text>
                                        {`" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}",
                                        the highlighted part is the Embed Src you need.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>

                        <Divider/>

                        <Box>
                            <InputGroup>
                                <InputLeftAddon children="IG Location URL " />
                                <Input 
                                    value={branch.igLocationUrl || ""} 
                                    onInput={e => {
                                        const copy = JSON.parse(JSON.stringify(branch))
                                        copy.igLocationUrl = e.target.value
                                        setBranch(copy)
                                    }}
                                    placeholder="Url from IG Location here"
                                />
                            </InputGroup>
                            <Accordion border="none" mt={3} mb={-7} allowToggle>
                                <AccordionItem border="none"  fontSize="0.8em">
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left' fontSize="0.8em">
                                        Show Tip
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel>
                                        You may only able to get this from browser, and not on the IG mobile app.
                                        It is also required to have an existing landmark at google map for this first.
                                        <br></br><br></br>
                                        Simply look-up the location at Instagram search bar and then upon clicking on it,
                                        copy the browser url of it on top.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>

                        <Divider/>

                        <Stack direction="column" w="full" spacing={5}>
                            <Text>Information</Text>
                            {
                                branch?.information?.length === 0 && (
                                    <ButtonGroup isAttached>
                                        <Button bg="red.500" disabled><MinusIcon/></Button>
                                        <Button bg="green.500" onClick={() => {
                                            const copy = JSON.parse(JSON.stringify(branch));
                                            copy.information = [{title: "", description: ""}]
                                            setBranch(copy)
                                        }}><AddIcon/></Button>
                                    </ButtonGroup>
                                )
                            }
                            {
                                branch?.information?.map((infoObj, i) => <>
                                    <InputGroup>
                                        <InputLeftAddon p={0}>
                                            <ButtonGroup isAttached>
                                                <Button bg="red.500" onClick={() => {
                                                    const copy = JSON.parse(JSON.stringify(branch))
                                                    copy.information = copy.information.filter((obj, _i) => i !== _i)
                                                    setBranch(copy)
                                                }}><MinusIcon/></Button>
                                                <Button bg="green.500" onClick={() => {
                                                    const copy = JSON.parse(JSON.stringify(branch))
                                                    copy.information = [...copy.information.splice(0, i+1), {title: "", description: ""}, ...copy.information]
                                                    setBranch(copy)
                                                }}><AddIcon/></Button>
                                            </ButtonGroup>
                                        </InputLeftAddon>
                                        <Input 
                                            value={infoObj.title} 
                                            onInput={e => {
                                                const copy = JSON.parse(JSON.stringify(branch))
                                                copy.information[i] = {
                                                    title: e.target.value,
                                                    description: infoObj.description
                                                }
                                                setBranch(copy)
                                            }}
                                            placeholder="Info title here"
                                        />
                                    </InputGroup>
                                    <Textarea 
                                        value={infoObj.description} 
                                        onInput={e => {
                                            const copy = JSON.parse(JSON.stringify(branch))
                                            copy.information[i] = {
                                                title: infoObj.title,
                                                description: e.target.value
                                            }
                                            setBranch(copy)
                                        }}
                                        placeholder="Info description here"
                                    />
                                </>)
                            }
                        </Stack>

                        <Divider/>
                        
                        <Stack direction="column" w="full" spacing={5}>
                            <Text>Socials</Text>
                            {
                                branch?.socials?.length === 0 && (
                                    <ButtonGroup isAttached>
                                        <Button bg="red.500" disabled><MinusIcon/></Button>
                                        <Button bg="green.500" onClick={() => {
                                            const copy = JSON.parse(JSON.stringify(branch));
                                            copy.socials = [{title: "", link: ""}]
                                            setBranch(copy)
                                        }}><AddIcon/></Button>
                                    </ButtonGroup>
                                )
                            }
                            {
                                branch?.socials?.map((socialObj, i) => <>
                                    <InputGroup>
                                        <InputLeftAddon p={0}>
                                            <ButtonGroup isAttached>
                                                <Button bg="red.500" onClick={() => {
                                                    const copy = JSON.parse(JSON.stringify(branch))
                                                    copy.socials = copy.socials.filter((obj, _i) => i !== _i)
                                                    setBranch(copy)
                                                }}><MinusIcon/></Button>
                                                <Button bg="green.500" onClick={() => {
                                                    const copy = JSON.parse(JSON.stringify(branch))
                                                    copy.socials = [...copy.socials.splice(0, i+1), {title: "", link: ""}, ...copy.socials]
                                                    setBranch(copy)
                                                }}><AddIcon/></Button>
                                            </ButtonGroup>
                                        </InputLeftAddon>
                                        <Input 
                                            value={socialObj.title} 
                                            onInput={e => {
                                                const copy = JSON.parse(JSON.stringify(branch))
                                                copy.socials[i] = {
                                                    title: e.target.value,
                                                    link: socialObj.link
                                                }
                                                setBranch(copy)
                                            }}
                                            placeholder="Social title here"
                                        />
                                    </InputGroup>
                                    <Input 
                                        value={socialObj.link} 
                                        onInput={e => {
                                            const copy = JSON.parse(JSON.stringify(branch))
                                            copy.socials[i] = {
                                                title: socialObj.title,
                                                link: e.target.value
                                            }
                                            setBranch(copy)
                                        }}
                                        placeholder="Social link here"
                                    />
                                </>)
                            }
                        </Stack>
                        
                        <Divider/>

                        <ButtonGroup justifyContent="space-between">
                            <Button onClick={backModal}>
                                <ArrowBackIcon/>
                            </Button>
                            <Button onClick={undoModal}>
                                <RepeatIcon/>
                            </Button>
                            <Button  onClick={deleteModal} bg="red.500" disabled={params?.id === "new"}>
                                <DeleteIcon/>
                            </Button>
                            <Button onClick={params?.id === "new" ? postModal : putModal} bg="green.500" disabled={JSON.stringify(reserveBranch) === JSON.stringify(branch)}>
                                <CheckIcon/>
                            </Button>
                        </ButtonGroup>
                    </Stack>
                )
            }

            <ConfirmModal isOpen={daModal.open && !daModal.key} onClose={resetDaModal} title={daModal.title} body={daModal.body} action={daModal.action} callback={daModal.callback} />

            <ConfirmKeyModal isOpen={daModal.open && daModal.key} onClose={resetDaModal} title={daModal.title} body={daModal.body} action={daModal.action} callback={daModal.callback} />
        </Page>
    )
}

export default BranchEditor
