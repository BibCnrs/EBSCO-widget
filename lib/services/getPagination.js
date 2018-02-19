export default function getPagination(currentPage, max) {
    if (!currentPage || !max) {
        return [];
    }
    const offset = (currentPage % 5 === 0 ? 5 : currentPage % 5) - 1;

    const minPage = currentPage - offset;
    const maxPage = minPage + 5 <= max ? minPage + 5 : max + 1;

    return Array.from(new Array(maxPage - minPage), (_, i) => i + minPage);
}
