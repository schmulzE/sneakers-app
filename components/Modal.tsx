import React, { Dispatch, SetStateAction } from 'react'
import {
 useBreakpointValue, 
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

   const variant = useBreakpointValue(
      {
        base: 'full',
        md: 'full',
        lg: 'xs',
        xl: 'xs'
      },
      {
        // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
        // (Defaults to 'base')
        fallback: 'md',
      },
    )
    const variant2 = useBreakpointValue(
      {
        base: false,
        md: false,
        lg: true,
        xl: true
      },
    )

  const onCloseHandler = () => {
    setPopUp(false)
  }

  return (
    <>
      <Modal size={variant} isOpen={onOpen} onClose={onCloseHandler} blockScrollOnMount={variant2}>
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