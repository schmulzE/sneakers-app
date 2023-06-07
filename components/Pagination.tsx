import React, {useState, useEffect, useContext} from 'react';
import Cart from "../components/Cart";
import { useRouter } from 'next/router'
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import WishlistContext from "../store/wishlist_context";
import { BsSuitHeart } from 'react-icons/bs'

type IProps = {
  data: any[],
  title: string,
  pageLimit: number,
  dataLimit: number
}

const Pagination: React.FC<IProps> = ({ data, title, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter()
  const wishlistCtx = useContext(WishlistContext)

  const wishlist = wishlistCtx.items


  const handleClick = (item: { id: number; }) => {
   const foundItem =  wishlistCtx.items.find((it: { id: number; }) => it.id === item.id )
   if(foundItem) {
    wishlistCtx.removeItem(item.id)
   }else {
    wishlistCtx.addItem(item)
   }
  }


  // useEffect(() => {
  //   const wishlistData = JSON.parse(localStorage.getItem("wishlist")!);
  //   if (wishlistData) {
  //     setWishlist(wishlistData);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (wishlist !== initialState) {
  //     localStorage.setItem("wishlist", JSON.stringify(wishlist));
  //   }
  // }, [initialState, wishlist]);


  function goToNextPage(): void {
    setCurrentPage((page: number) => page + 1)
    router.push(`?page=2`, undefined, { shallow: true })
  }
  
  function goToPreviousPage() {
    setCurrentPage((page: number) => page - 1)
    // router.push(`?page=1`, undefined, { shallow: true })
  }

  function changePage(event: React.ChangeEvent<HTMLInputElement>) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = (): number[] => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
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
      <div className="pagination text-center m-3">
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
          <span className='m-5'>{item}</span>
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
    </div>
  </div>
  );
}

export default Pagination