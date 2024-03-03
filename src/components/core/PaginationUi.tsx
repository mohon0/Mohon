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
  const isFirstPage = currentPage == 1;
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
        {[...Array(totalPages).keys()].map((page) => (
          <PaginationItem key={page}>
            {currentPage === page + 1 ? (
              <span className="cursor-not-allowed">
                <PaginationLink isActive>{page + 1}</PaginationLink>
              </span>
            ) : (
              <PaginationLink
                onClick={() => {
                  setCurrentPage(page + 1);
                  router.push(`/${link}/page/${page + 1}`);
                }}
                className="cursor-pointer"
              >
                {page + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
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
