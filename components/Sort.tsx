import React, { Dispatch, useState } from 'react'
import { BsChevronUp, BsChevronDown} from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'

type Props = {
  sortLowHandler: Dispatch<any>
  sortHighHandler: Dispatch<any>,
}

const Sort: React.FC<Props> = ({sortHighHandler, sortLowHandler,}) => {


  const [isOpen, setIsOpen] = useState(false)
  return (
   <Menu isLazy onOpen={() => setIsOpen(!isOpen)} onClose={() => setIsOpen(!isOpen)}>
      <MenuButton  bg='#fff' _active={{ background: "white"}}  _hover={{ background: "white"}}  as={Button} rightIcon={isOpen ? <BsChevronUp/> : <BsChevronDown/>}>
        <span className='text-lg font-medium block'>Sort by </span> 
      </MenuButton>
      <MenuList>
        <MenuItem onClick={sortLowHandler}>Price: low to high</MenuItem>
        <MenuItem onClick={sortHighHandler}>Price: high to low</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default Sort