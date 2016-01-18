export default function getPagination(currentPage) {
    const offset = (currentPage % 5 === 0 ? 5 : currentPage % 5) - 1;

    const minPage =  currentPage - offset;
    const maxPage = minPage + 5;

    return Array.from(new Array(maxPage - minPage), (_, i) => i + minPage);
}
