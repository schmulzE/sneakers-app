import React from 'react'
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box
} from '@chakra-ui/react'
import Link from 'next/link';



const Footer = () => {
  return (
   <footer className="px-2 bg-neutral-900 text-white sticky">
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left' className='uppercase'>
                    <Link href="/">
                        <img src="/sneaker_logo_white.svg" alt="Sneakfit Logo" className='w-24'/>
                    </Link>
                    </Box>
                    {isExpanded ? (
                      <AiOutlineMinus fontSize='12px' />
                    ) : (
                      <AiOutlinePlus fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                 SNEAKFIT App for IOS and Android
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left' className='uppercase'>
                      Help
                    </Box>
                    {isExpanded ? (
                      <AiOutlineMinus fontSize='12px' />
                    ) : (
                      <AiOutlinePlus fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ul className='text-sm pt-2'>
                      <li>FAQs</li>
                      <li>Shipment</li>
                      <li>Changes and returns</li>
                      <li>Privacy and Policy</li>
                  </ul>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left' className='uppercase'>
                      Info
                    </Box>
                    {isExpanded ? (
                      <AiOutlineMinus fontSize='12px' />
                    ) : (
                      <AiOutlinePlus fontSize='12px' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ul className='text-sm pt-2'>
                      <li className='py-1'>About us</li>
                      <li className='py-1'>Stores</li>
                      <li className='py-1'>Contact Us</li>
                  </ul>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>

        <p className='text-sm p-2 mt-4'>
          &apos;SNEAKFIT&apos; and the &apos;SNEAKFIT&apos; logo are trade marks of SNEAKFIT NG Limited and are registered in numerous jurisdictions around the world.
         <br/> © Copyright 2022 SNEAKFIT NG Limited. All rights reserved.
        </p>
      </footer>
  )
}

export default Footer