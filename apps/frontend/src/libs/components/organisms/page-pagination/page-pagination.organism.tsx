import { IconButton } from "~/libs/components/molecules/molecules.js";
import { FIRST_PAGE, PAGE_INCREMENT } from "~/libs/constants/constants.js";
import { useCallback, useMemo } from "~/libs/hooks/hooks.js";
import { calculateTotalPages } from "~/libs/hooks/use-pagination/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
  onPageChange: (page: number) => void;
  page: number;
  pageSize: number;
  totalItemsCount: number;
};

const PagePagination = ({
  onPageChange,
  page,
  pageSize,
  totalItemsCount,
}: Properties): JSX.Element => {
  const totalPages = useMemo(
    () => calculateTotalPages(pageSize, totalItemsCount),
    [totalItemsCount, pageSize],
  );

  const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
  const hasPreviousPage = useMemo(() => page > FIRST_PAGE, [page]);

  const handleFirstPageClick = useCallback(() => {
    onPageChange(FIRST_PAGE);
  }, [onPageChange]);

  const handlePreviousPageClick = useCallback(() => {
    onPageChange(page - PAGE_INCREMENT);
  }, [onPageChange, page]);

  const handleNextPageClick = useCallback(() => {
    onPageChange(page + PAGE_INCREMENT);
  }, [onPageChange, page]);

  const handleLastPageClick = useCallback(() => {
    onPageChange(totalPages);
  }, [onPageChange, totalPages]);

  return (
    <div className={styles["main-container"]}>
      <p className={styles["text"]}>{totalItemsCount} items total</p>
      <p className={styles["text"]}>
        Page {page} of {totalPages}
      </p>
      <div className={styles["change-page-buttons-container"]}>
        <IconButton
          iconName="leftDoubleArrow"
          isDisabled={!hasPreviousPage}
          label="Open first page"
          onClick={handleFirstPageClick}
        />
        <IconButton
          iconName="leftArrow"
          isDisabled={!hasPreviousPage}
          label="Open previous page"
          onClick={handlePreviousPageClick}
        />
        <IconButton
          iconName="rightArrow"
          isDisabled={!hasNextPage}
          label="Open next page"
          onClick={handleNextPageClick}
        />
        <IconButton
          iconName="rightDoubleArrow"
          isDisabled={!hasNextPage}
          label="Open last page"
          onClick={handleLastPageClick}
        />
      </div>
    </div>
  );
};

export { PagePagination };
