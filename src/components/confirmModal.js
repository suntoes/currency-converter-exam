import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react"
import { useState } from "react"

export function ConfirmModal({isOpen, onClose, title, body, action, callback}) {
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {body}
            </ModalBody>
            <ModalFooter>
                <Button mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button onClick={callback} variant='ghost'>{action}</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export function ConfirmKeyModal({isOpen, onClose, title, body, action, callback}) {
    const [input, setInput] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {body}
                <InputGroup mt={5}>
                    <InputLeftAddon children="Key" />
                    <Input 
                        value={input}
			type={"password"}
                        onInput={e => setInput(e.target.value)}
                        placeholder="Key here"
                    />
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button onClick={() => callback(input)} variant='ghost'>{action}</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
