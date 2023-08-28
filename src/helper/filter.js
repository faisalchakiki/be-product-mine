function filterPages(data, page, limit) {
  const pageNumber = parseInt(page) || 1
  const pageSize = parseInt(limit) || 15
  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);
  const result = {
    pagesNumber : pageNumber,
    totalPage : Math.ceil(data.length / pageSize),
    data : paginatedData
  }
  return result;
}

function filterCategorys(data, filterCategory) {
  const filteredData = data.filter(item => item.categoryName === filterCategory);
   return filteredData;
}

function filterSearch(data, keyword) {
  const filteredData = data.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
  return filteredData;
}

module.exports = {filterCategorys, filterPages, filterSearch};