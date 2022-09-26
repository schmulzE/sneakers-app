import React, {useState} from 'react';
import Cart from "../components/Cart";


type IProps = {
  data: any[],
  title: string,
  pageLimit: number,
  dataLimit: number
}


const Pagination: React.FC<IProps> = ({ data, title, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
     // not yet implemented
     setCurrentPage((page) => page + 1)
  }

  function goToPreviousPage() {
     // not yet implemented
    setCurrentPage((page) => page - 1)

  }

  function changePage(event: React.ChangeEvent<HTMLInputElement>) {
     // not yet implemented
    const pageNumber = Number( event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = (): number[] => {
     // not yet implemented
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
     // not yet implemented
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill(0).map((_, idx): number => start + idx + 1);

  };

  return (
    <div>
      <h1>{title}</h1>

      {/* show the posts, 10 posts at a time */}
      {/* <div className="dataContainer"> */}
        <Cart data={getPaginatedData()}/>
      {/* </div> */}

      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 5 page
          numbers at a time
      */}
      <div className="pagination text-center m-3">
      {/* previous button */}
      <button
        onClick={goToPreviousPage}
        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
      >
        prev
      </button>

      {/* show page numbers */}
      {getPaginationGroup().map((item: number, index: number) => (
        <button
          key={index}
          onClick ={(event: React.MouseEvent) => changePage}
          className={`paginationItem ${currentPage === item ? 'active' : null}`}
        >
          <span>{item}</span>
        </button>
      ))}

      {/* next button */}
      <button
        onClick={goToNextPage}
        className={`next ${currentPage === pages ? 'disabled' : ''}`}
      >
        next
      </button>
    </div>
  </div>
  );
}

export default Pagination