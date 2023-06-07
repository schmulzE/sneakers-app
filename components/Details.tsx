import React from 'react'
import { UnorderedList, ListItem } from '@chakra-ui/react'

type Props = {
  image: string,
  name: string,
  shortDescription: string
}
const Details:React.FC<Props> = ({image, shortDescription, name}) => {
  return (
    <div>
      
       <div className="md:grid lg:grid xl:grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:mt-2 gap-16 xl:font-normal xl:text-lg">
       <div id="section-1" className="">
          <h3 className="text-gray-600 capitalize">new season</h3>
          <h2 className="lg:text-2xl xl:text-2xl text-lg text-gray-900 font-medium">{name}</h2>
          <p className="mt-1 mb-5 xl:text-lg lg:text-lg text-gray-900">{shortDescription}</p>
          <p className="whitespace-pre-line text-md my-2">
            Valentino Garavani&apos;s low-top sneakers feature two brand signatures. Notice the VLogo Signature motif at the sides and iconic Rockstuds tracing the heel.
          </p>

          <p className="mt-8 capitalize">made in italy</p>


          <h3 className="uppercase font-semibold text-xl mt-4 xl:capitalize xl:text-lg">Highlights</h3>
          <UnorderedList className='my-2'>
            <ListItem>khaki/black</ListItem>
            <ListItem>VLogo Signature</ListItem>
            <ListItem>signature Rockstud detailing</ListItem>
            <ListItem>panelled design</ListItem>
            <ListItem>logo patch at the tongue</ListItem>
            <ListItem>front lace-up fastening</ListItem>
            <ListItem>ridged rubber sole</ListItem>
            <ListItem>branded insole</ListItem>
          </UnorderedList>
       </div>
            
        <div id="section-2" className=' lg:block md:block'>
          <h3 className="font-semibold text-xl mt-4">Composition</h3>
          <UnorderedList className='my-2'>
            <ListItem>Outer: Fabric 100%, Calf Leather 100%</ListItem>
            <ListItem>Lining: Fabric 100%</ListItem>        
          </UnorderedList> 
          
          <div id="section-3" className='mt-6'>
          <h3 className="font-semibold text-xl ">Product IDs</h3>
          <UnorderedList className='my-2'>
            <ListItem>SNEAKFIT ID: 19263431</ListItem>  
            <ListItem>Brand style ID: YS0F28XKL</ListItem>
          </UnorderedList>
        </div>
        </div>  
        <div id="section-3" className='hidden xl:block justify-self-end'>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Details