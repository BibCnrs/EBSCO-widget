import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

import BibButton from './BibButton';

const DragButton = SortableHandle(() => (
    <BibButton
        className="drag-button"
        bsStyle="link"
        icon={{ name: 'bars', size: '2x' }}
    />
));

export default DragButton;
