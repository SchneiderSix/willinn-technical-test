import { useState, useEffect } from "react";

interface PaginationProps {
  pages: number,
  page: number,
  currentPage: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({pages, page, currentPage}) => {

  const [current, setCurrent] = useState<number>(page)

  useEffect(() => {
    setCurrent(page);
  }, [page]);

  return (
    <>
    <div className="p-2 my-5 space-x-2 flex flex-row font-inter font-medium text-[15px] text-[#F72793]">
      <button 
      type="button"
      onClick={() => {
        if (current > 1) {
          setCurrent(current-1);
          currentPage(current-1);
        }
      }}
      >
      &lt; Anterior
      </button>
      {Array.from({ length: pages }, (_, index) => (
        <button
          key={index + 1}
          type="button"
          className={`py-2 px-4 rounded-lg ${current === index + 1 ? 'bg-[#F72793] text-white' : ''}`}
          onClick={() => {
            setCurrent(index+1);
            currentPage(index+1);
          }}
        >
          {index + 1}
        </button>
      ))}
      <button 
      type="button"
      onClick={() => {
        if (current < pages) {
          setCurrent(current+1);
          currentPage(current+1);
        }
      }}
      >
        Siguiente &gt;
      </button>
    </div>
    </>
  )
}

export default Pagination;
