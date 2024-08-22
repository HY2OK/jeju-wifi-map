function getPageNumbers(totalPages: number, currentPage: number) {
  let pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage < 3) {
    pages = [1, 2, 3, "...", totalPages];
  } else if (currentPage > totalPages - 2) {
    pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
  } else {
    pages = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return pages;
}

export default getPageNumbers;
