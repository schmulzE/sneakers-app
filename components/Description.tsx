import React from 'react'
import Size from './Size'
import Delivery from './Delivery'
import Details from './Details'

import { 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels,
  TabPanel,  
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  useBreakpointValue,
  AccordionIcon
} from '@chakra-ui/react'

type IProps = {
 product: any
}

const Description:React.FC<IProps> = ({ product }) => {
  const variant = useBreakpointValue(
    {
      base: 'md',
      md: 'md',
      lg: 'lg'
    },
  )

  console.log(product)

  return (
    <div>
      <div className="hidden lg:block xl:block">
        <Tabs colorScheme="black" className="xl:container xl:mx-auto " size={variant}>
          <TabList>
            <Tab className='uppercase text-lg'>the details</Tab>
            <Tab className='uppercase text-lg'>size & fit</Tab>
            <Tab className='uppercase text-lg'>delivery and returns</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Details name={product.brand?.name} shortDescription={product.shortDescription} image={product.images?.all[0]} />
            </TabPanel>
            <TabPanel>
              <Size image={product.images?.all[1]}/>
            </TabPanel>
            <TabPanel>
              <Delivery/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

       <div className="lg:hidden xl:hidden">
      <Accordion defaultIndex={[0]} allowMultiple className="lg:hidden xl:hidden mt-8" colorScheme="black" size={"300px"} p={0}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' className='uppercase text-lg'>
               the details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Details name={product.brand?.name} shortDescription={product.shortDescription} image={product.images?.all[0]} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' className='uppercase text-lg'>
                size & fit
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Size image={product.images?.all[1]}/>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' className='uppercase text-lg'>
                delivery and returns
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Delivery/>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      </div>
    </div>
  )
}

export default Description