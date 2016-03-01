import { createSelector } from 'reselect';

import articleSearchSelector from './articleSearchSelector';
import publicationSearchSelector from './publicationSearchSelector';

export const getFieldLabel = (field, availableFields) => {
    return availableFields
    .filter((data) => data.value === field)
    .reduce((_, data) => data.label, '');
};

export const fieldSelector = (search) => {
    const { field, availableFields } = search;

    return {
        field: getFieldLabel(field, availableFields),
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
