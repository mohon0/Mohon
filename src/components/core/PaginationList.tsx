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
}

export default function PaginationList({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationUiProps) {
  const router = useRouter();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // const handlePreviousClick = () => {
  //   if (!isFirstPage) {
  //     if (currentPage === 2) {
  //       router.push(`/`);
  //     } else {
  //       setCurrentPage(currentPage - 1);
  //       router.push(`/blog/page/${currentPage - 1}`);
  //     }
  //   }
  // };

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
