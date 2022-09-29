import React, {useState} from 'react';
import Cart from "../components/Cart";
import { useRouter } from 'next/router'
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"


type IProps = {
  data: any[],
  title: string,
  pageLimit: number,
  dataLimit: number
}


const Pagination: React.FC<IProps> = ({ data, title, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [wishlist, setWishlist] =  useState<any[]>([])

  const handleClick = (item: any) => {
    if(!wishlist.includes(item)) {
      setWishlist([
        ...wishlist,
        item
      ])
    }else{
      setWishlist((wl) => wl.filter((it) => it.id != item.id))
    }
    console.log(wishlist)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter()
  
  function goToNextPage() {
    setCurrentPage((page) => page + 1)
    router.push(`?page=2`, undefined, { shallow: true })
  }
  
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1)
    router.push(`?page=1`, undefined, { shallow: true })
  }

  function changePage(event: React.ChangeEvent<HTMLInputElement>) {
    const pageNumber = Number( event.target.textContent);
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
        <Cart data={getPaginatedData()} handleClick={handleClick} wishlist={wishlist}/>

      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 2 page
          numbers at a time
      */}
      <div className="pagination text-center m-3">
      {/* previous button */}
      <button
        onClick={goToPreviousPage}
        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
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
        className={`next ${currentPage === pages ? 'disabled' : ''}`}
      >
        <FaChevronRight/>
      </button>
    </div>
  </div>
  );
}

export default Pagination