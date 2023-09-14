import React, {useState, useEffect} from 'react';
import Cart from "../components/Cart";
import { useRouter } from 'next/router'
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import { BsSuitHeart } from 'react-icons/bs'
import { useCart } from '../context/CartContext';

type IProps = {
  data: Sneakers[],
  title: string,
  pageLimit: number,
  dataLimit: number
}

const Pagination: React.FC<IProps> = ({ data, title, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter()
  const {items, removeItem, addItem} = useCart()
  const wishlist = items


  const handleClick = (item: { id: number; }) => {
   const foundItem =  items.find((it: { id: number; }) => it.id === item.id )
   if(foundItem) {
    removeItem(item.id)
   }else {
    addItem(item)
   }
  }

  function goToNextPage(): void {
    setCurrentPage((page: number) => page + 1)
    router.push(`/men/sneakers/?page=2`, undefined, { shallow: true })
  }
  
  function goToPreviousPage() {
    setCurrentPage((page: number) => page - 1)
  }

  function changePage(event: React.ChangeEvent<HTMLInputElement>) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit + 1;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill(0).map((_, idx): number => start + idx + 1);
  };

  return (
    <div>
      <h1>{title}</h1>

      {/* show the posts, 30 posts at a time */}
        <Cart data={getPaginatedData()} handleClick={handleClick} wishlist={wishlist} icon={<BsSuitHeart/>}/>

      {/* show the pagination
          it consists of next and previous buttons
          along with page numbers, in our case, 2 page
          numbers at a time
      */}
      {getPaginatedData().length > 10  && ( <div className="pagination text-center mx-3 mt-8 ">
      {/* previous button */}
      <button
        onClick={goToPreviousPage}
        className={`prev ${currentPage === 1 ? 'hidden' : ''}`}
      >
        <FaChevronLeft/>
      </button>

      {/* show page numbers */}
      {getPaginationGroup().map((item: number, index: number) => (
        <button
          key={index}
          onClick ={(event: React.MouseEvent) => changePage}
          className={`paginationItem ${currentPage === item ? 'p-2 font-black' : null}`}
        >
          <span className='mx-5 border border-gray-400 p-4'>{item}</span>
          {/* <span>{index}</span> */}
        </button>
      ))}

      {/* next button */}
      <button
        onClick={goToNextPage}
        className={`next ${currentPage === pages ? 'hidden' : ''}`}
      >
        <FaChevronRight/>
      </button>
    </div>)}
  </div>
  );
}

export default Pagination