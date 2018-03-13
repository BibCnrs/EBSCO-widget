import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import Icon from 'react-fa';

const DragButton = SortableHandle(() => (
    <div className="drag-button">
        <a>
            <Icon name="bars" size="2x" />
        </a>
    </div>
));

export default DragButton;
