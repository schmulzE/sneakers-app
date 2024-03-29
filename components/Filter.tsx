import React, { Dispatch, useState} from 'react';
import { BsChevronUp, BsChevronDown} from "react-icons/bs";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'
import RangeInput from './RangeInput';


type Props = {
  brandList: string[],
  onFilterChange: (e: any) => void,
  filterBrandHandler: (e: any) => void,
  fetchedData: any[],
  setFilteredData: Dispatch<any>
  categories: string[],
}

const Filter: React.FC<Props> = ({brandList, onFilterChange, fetchedData, filterBrandHandler, setFilteredData, categories}) => {
   const [isOpen, setIsOpen] = useState(false)

  return (
      <Menu isLazy onOpen={() => setIsOpen(!isOpen)} onClose={() => setIsOpen(!isOpen)}>
      <MenuButton  bg='#fff' _active={{ background: "white"}} _hover={{ background: "white"}} _highlighted={{ background: "white"}} as={Button} rightIcon={isOpen ? <BsChevronUp/> : <BsChevronDown/>}>
        <span className='text-lg font-medium block'>Filter by </span> 
      </MenuButton>
      <MenuList>
        <Accordion defaultIndex={[0]} allowMultiple w={300}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                Category
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {categories.map((item, index) => (       
                <ul className='mt-6' key={index}>
                <li className='my-6'>
                  <input className="mr-2" type='checkbox' id={item} value={item} onChange={onFilterChange} />
                  <label htmlFor={item}>{item}</label>
                </li>
              </ul>
            ))}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                Brand
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div className="overflow-auto h-[200px]">
              {brandList.sort((a, b) => a.localeCompare(b, 'en-US', {caseFirst: 'lower'})).filter(item => item !== undefined).map((item, index) => (        
                <ul className='mt-6' key={index}>
                  <li className='my-6'>
                  <input className="mr-2" type='checkbox' id={item} value={item} onChange={filterBrandHandler}/>
                  <label htmlFor={item}>{item}</label>
                  </li>
                </ul>
              ))}
              </div>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                Price
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <RangeInput
                initialMin={21}
                initialMax={42850}
                min={21}
                max={42850}
                step={100}
                priceCap={1000}
                fetchedData={fetchedData}
                setFiltered={setFilteredData}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </MenuList>
    </Menu>
  )
}

export default Filter