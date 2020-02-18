import { get, uniqWith, isEqual } from 'lodash';

const PRESENT = Symbol('PRESENT');

const sum = d => d.day + d.month + d.year;
function isAfter(a, b) {
    return sum(a) > sum(b);
}

function parseCoverageDate(date) {
    return {
        day: parseInt(date.day, 10),
        month: parseInt(date.month, 10),
        year: parseInt(date.year, 10),
    };
}
function parseEmbargoValue(embargo) {
    switch ((embargo.unit || '').toLowerCase()) {
        case 'month':
            return embargo.value * 30;
        case 'year':
            return embargo.value * 365;
        default:
            return embargo.value;
    }
}

function parseCoverage(holding) {
    if (!holding.coverage) {
        return {
            end: {
                day: 1,
                month: 1,
                year: -9999,
            },
            start: {
                day: 31,
                month: 12,
                year: 9999,
            },
        };
    }

    const start = parseCoverageDate(get(holding, 'coverage.0.start'));
    const endValue = parseCoverageDate(get(holding, 'coverage.0.end'));
    const end = endValue.year === 9999 ? PRESENT : endValue;
    return {
        end,
        start,
        ...(end === PRESENT &&
            holding.embargo && { embargo: parseEmbargoValue(holding.embargo) }),
    };
}

export default function parseFullTextHoldings(fullTextHoldings = []) {
    let result = fullTextHoldings;

    // we first deduplicate the holdings
    result = uniqWith(result, (a, b) =>
        isEqual(parseCoverage(a), parseCoverage(b)),
    );

    // we keep the oldest end date when start dates match
    result = result.filter((holding, index, self) => {
        const coverage = parseCoverage(holding);

        const holdingsWithSameStartDate = self.filter(
            (d, i) =>
                isEqual(parseCoverage(d).start, coverage.start) && i !== index,
        );

        return !holdingsWithSameStartDate.find(d => {
            const matchingCoverage = parseCoverage(d);

            if (coverage.end === PRESENT) {
                if (matchingCoverage.end !== PRESENT) {
                    return false;
                }

                return matchingCoverage.embargo < coverage.embargo;
            }
            if (isAfter(matchingCoverage.end, coverage.end)) {
                return true;
            }

            return false;
        });
    });

    // we keep the oldest start date when end dates match
    result = result.filter((holding, index, self) => {
        const coverage = parseCoverage(holding);

        const holdingsWithSameEndDate = self.filter((d, i) => {
            const matchingCoverage = parseCoverage(d);
            return (
                isEqual(matchingCoverage.end, coverage.end) &&
                matchingCoverage.embargo === coverage.embargo &&
                i !== index
            );
        });

        return !holdingsWithSameEndDate.find(d => {
            const matchingCoverage = parseCoverage(d);

            if (isAfter(coverage.start, matchingCoverage.start)) {
                return true;
            }

            return false;
        });
    });

    return result;
}
