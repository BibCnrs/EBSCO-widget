import { createSelector } from 'reselect';

import articleSearchSelector from './articleSearchSelector';
import publicationSearchSelector from './publicationSearchSelector';

export const fieldSelector = (search) => {
    const { field, availableFields } = search;

    return {
        field: availableFields
        .filter((data) => data.value === field)
        .reduce((_, data) => data.label, ''),
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
