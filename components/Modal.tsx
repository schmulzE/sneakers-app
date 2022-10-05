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
    fetchedData: any[];
    setFetchedData: Dispatch<SetStateAction<any[]>>
  }

  const Modals: React.FC<Props> = ({onOpen, setPopUp, fetchedData, setFetchedData}) => {

    // console.log(fetchedData)

  const onCloseHandler = () => {
    setPopUp(false)
  }

  const sortHighHandler = () => {
    const sortedLowToHigh =  fetchedData.sort((x, y) => y.priceInfo?.finalPrice - x.priceInfo?.finalPrice)
    setFetchedData((current) => [ ...current, sortedLowToHigh])
  }

  const sortLowHandler = () => {
    const sortedLowToHigh =  fetchedData.sort((x, y) => x.priceInfo?.finalPrice - y.priceInfo?.finalPrice)
    setFetchedData((current) => [ ...current, sortedLowToHigh])
    // console.log('clicked')
    // console.log(fetchedData)

  }

  return (
    <>

      <Modal size={'full'} isOpen={onOpen} onClose={onCloseHandler}>
        <ModalContent className='pt-12'>
          <ModalCloseButton/>
          <ModalBody>
             <h2 className='text-2xl border-bottom border-b-4 border-black w-20 font-semibold pb-2'>Sort by</h2>
            <hr/>
            <ul className="my-6">
              <li className='mb-6'>
                <input className="mr-2" type="radio" id='low' value='low' name='price' onClick={sortLowHandler}/>
                <label className=' mr-3' htmlFor='low'>Price: low to high</label>       
              </li>
              <li>
                <input className="mr-2" type="radio" id='high' value='high' name='price' onClick={sortHighHandler}/>
                <label className=' mr-3' htmlFor='high'>Price: high to low</label>       
                </li>
            </ul>
            <h2 className='text-2xl border-bottom border-b-4 border-black w-20 font-semibold pb-2 mt-8 tracking-wider'>Filters</h2>
            <hr/>
            <ul className='font-bold my-6'>
              <li className='mb-6'>Color</li>
              <li className='mb-6'>Price</li>
              <li className='mb-6'>Brand</li>
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}


export default Modals;