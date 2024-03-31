import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

interface PaginationUiProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  link: string;
}

export default function PaginationUi({
  currentPage,
  totalPages,
  setCurrentPage,
  link,
}: PaginationUiProps) {
  const router = useRouter();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
    router.push(`/${link}/page/${currentPage - 1}`);
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
      router.push(`/${link}/page/${currentPage + 1}`);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const totalPagesToShow = 5;

    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= totalPagesToShow - 2) {
        for (let i = 1; i <= totalPagesToShow - 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - (totalPagesToShow - 3)) {
        pages.push(1);
        pages.push("...");
        for (
          let i = totalPages - (totalPagesToShow - 3);
          i <= totalPages;
          i++
        ) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => (
      <PaginationItem key={index}>
        {page === "..." ? (
          <span className="cursor-not-allowed">...</span>
        ) : (
          <PaginationLink
            isActive={currentPage === page}
            onClick={() => {
              setCurrentPage(typeof page === "number" ? page : currentPage);
              router.push(
                `/${link}/page/${typeof page === "number" ? page : currentPage}`,
              );
            }}
            className={`cursor-pointer`}
          >
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {isFirstPage ? (
            <span className="cursor-not-allowed">
              <PaginationPrevious />
            </span>
          ) : (
            <PaginationPrevious
              className="cursor-pointer"
              onClick={handlePreviousClick}
            />
          )}
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          {isLastPage ? (
            <span className="cursor-not-allowed">
              <PaginationNext />
            </span>
          ) : (
            <PaginationNext onClick={handleNextClick} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
