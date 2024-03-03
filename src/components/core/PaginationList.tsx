import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationUiProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function PaginationList({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationUiProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {isFirstPage ? (
            <span className="cursor-not-allowed">
              <PaginationPrevious />
            </span>
          ) : (
            <PaginationPrevious />
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
                }}
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
            <PaginationNext />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
