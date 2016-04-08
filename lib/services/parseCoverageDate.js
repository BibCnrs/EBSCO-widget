import templatizeLiteral from './templatizeLiteral';

const parseCoverageDate = function parseDate(template, rawDate) {
    const year = rawDate.substring(0, 4);
    if (year === '9999') {
        return template.now;
    }
    return templatizeLiteral(template.date, {
        month: rawDate.substring(4, 6), // month
        day: rawDate.substring(6, 8), // day
        year
    });
};

export default parseCoverageDate;
