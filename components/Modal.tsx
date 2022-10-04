import React from 'react'
import { IconContext } from "react-icons";
import { BsFilter } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'



const Modals: React.FC = () => {
  const { onOpen,isOpen, onClose } = useDisclosure()
  return (
    <>
    <IconContext.Provider value={{ className: "global-class-name h-8 w-8", }}>
      <button onClick={onOpen} className='capitalize flex justify-center align-center bg-st my-4 py-1 outline-none border border-slate-800 rounded block w-full'>
        <BsFilter/>
        <span className='text-xl font-medium'>Filter</span>
      </button> 
    </IconContext.Provider>

      <Modal size={'full'} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Hi there!
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}
export default Modals