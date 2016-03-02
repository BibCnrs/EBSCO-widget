import { createSelector } from 'reselect';

import articleSearchSelector from './articleSearchSelector';
import publicationSearchSelector from './publicationSearchSelector';

export const getFieldLabel = (field, availableFields) => {
    return availableFields
    .filter((data) => data.value === field)
    .reduce((_, data) => data.label, '');
};

export const fieldSelector = (search, { index } = { index }) => {
    const { queries, availableFields } = search;

    return {
        index,
        field: getFieldLabel(queries[index || 0].field, availableFields),
        availableFields
    };
};

export const articleFieldSelector = createSelector(
    articleSearchSelector,
    fieldSelector
);

export const publicationFieldSelector = createSelector(
    publicationSearchSelector,
    fieldSelector
);
