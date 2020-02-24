import { get, isEqual, chain, isNil, omit } from 'lodash';

const PRESENT = Symbol('PRESENT');
const CALENDAR = Symbol('CALENDAR');

const isAfter = (a, b) => {
    if (a.year > b.year) {
        return true;
    } else if (a.year < b.year) {
        return false;
    }

    if (a.month > b.month) {
        return true;
    } else if (a.month < b.month) {
        return false;
    }

    if (a.day > b.day) {
        return true;
    }

    return false;
};
const isBefore = (a, b) => !isAfter(a, b);

function parseCoverageDate(date) {
    return {
        day: parseInt(date.day, 10),
        month: parseInt(date.month, 10),
        year: parseInt(date.year, 10),
    };
}
function parseEmbargoValue(embargo) {
    const value = embargo.value || 0;

    switch ((embargo.unit || '').toLowerCase()) {
        case 'month':
            return value * 30;
        case 'year':
            return value * 365;
        default:
            return value;
    }
}

function computeCalendarData(holding) {
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

function shouldKeepAOverBWhenPresent(a, b) {
    const aCalendar = a[CALENDAR];
    const bCalendar = b[CALENDAR];

    if (bCalendar.end !== PRESENT && aCalendar.end === PRESENT) {
        // we found an holding with the same start date but present as end date
        // and our current holding doesn't have present as end date
        // the found holding is kept, the current holding is discarded
        return true;
    }

    if (bCalendar.end === PRESENT && aCalendar.end !== PRESENT) {
        // our current holding  has present as end date
        // we found an holding with the same start date but without present as end date
        // the current holding is kept, the found holding is discarded
        return false;
    }

    if (bCalendar.end === PRESENT && aCalendar.end === PRESENT) {
        // our current holding has present as end date
        // we found an holding with the same start date and present as end date
        // the one with no embargo or with the lowest embargo is kept
        if (bCalendar.embargo && isNil(aCalendar.embargo)) {
            return true;
        }

        if (isNil(bCalendar.embargo) && aCalendar.embargo) {
            return false;
        }

        if (isNil(bCalendar.embargo) && isNil(aCalendar.embargo)) {
            return false;
        }

        return aCalendar.embargo < bCalendar.embargo;
    }

    return false;
}

export default function parseFullTextHoldings(fullTextHoldings = []) {
    return (
        chain(fullTextHoldings)
            .map(d => ({
                ...d,
                [CALENDAR]: computeCalendarData(d),
            }))
            // we first deduplicate the holdings
            .uniqWith((a, b) => isEqual(a[CALENDAR], b[CALENDAR]))
            // we keep the oldest end date when start dates match
            .filter((holding, index, self) => {
                const holdingsWithSameStartDate = self.filter(
                    (d, i) =>
                        isEqual(d[CALENDAR].start, holding[CALENDAR].start) &&
                        i !== index,
                );
                return !holdingsWithSameStartDate.find(d => {
                    if (shouldKeepAOverBWhenPresent(d, holding)) {
                        return true;
                    }

                    // we found an holding with the same start date
                    // if its end date is after our current holding, we keep it
                    if (isAfter(d[CALENDAR].end, holding[CALENDAR].end)) {
                        return true;
                    }

                    // we found an holding with the same start date
                    // but it is not relevant, we discard it
                    return false;
                });
            })
            // we keep the oldest start date when end dates match
            .filter((holding, index, self) => {
                const holdingsWithSameEndDate = self.filter((d, i) => {
                    return (
                        isEqual(d[CALENDAR].end, holding[CALENDAR].end) &&
                        i !== index
                    );
                });

                return !holdingsWithSameEndDate.find(d => {
                    if (shouldKeepAOverBWhenPresent(d, holding)) {
                        return true;
                    }

                    if (isBefore(d[CALENDAR].start, holding[CALENDAR].start)) {
                        return true;
                    }

                    return false;
                });
            })
            // we keep the max range between overlapping dates
            .filter((holding, index, self) => {
                const isWrappedByOtherHoldingDateRange = self.find((d, i) => {
                    const isOlder =
                        isAfter(d[CALENDAR].end, holding[CALENDAR].end) ||
                        (d[CALENDAR].end === PRESENT &&
                            holding[CALENDAR].end !== PRESENT);

                    return (
                        isBefore(d[CALENDAR].start, holding[CALENDAR].start) &&
                        isOlder &&
                        i !== index
                    );
                });

                return !isWrappedByOtherHoldingDateRange;
            })
            .map(d => omit(d, CALENDAR))
            .value()
    );
}
