import React, { Dispatch, SetStateAction } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'


type Props = {
  onOpen: boolean;
  setPopUp: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode
}

const Modals: React.FC<Props> = ({onOpen, setPopUp, children}) => {

  const onCloseHandler = () => {
    setPopUp(false)
  }

  return (
    <>
      <Modal size={'full'} isOpen={onOpen} onClose={onCloseHandler} blockScrollOnMount={false}>
        <ModalContent className='pt-12'>
          <ModalCloseButton/>
          <ModalBody>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}


export default Modals;