import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

import translate from '../higherOrderComponents/translate';

export const Etc = React.createClass({
    getInitialState: function () {
        return {
            showAll: false
        };
    },
    render: function () {
        const { list, limit, text } = this.props;
        const { showAll } = this.state;
        if (list.length <= limit) {
            return <span>{list.join('; ')}</span>;
        }
        const nbHidden = list.length - limit;

        return showAll ? (
            <span>
                {list.join('; ')}
                <Button bsStyle="link" onClick={() => this.setState({ ...this.state, showAll: false })}> &lt;&lt;</Button>
            </span>
        ) : (
            <span>
                {list.slice(0, limit).join('; ')}
                <Button bsStyle="link" onClick={() => this.setState({ ...this.state, showAll: true })}> {
                        nbHidden > 1 ? text.others.replace('<x>', nbHidden) : text.other
                }</Button>
            </span>
        );
    },
    propTypes: {
        list: PropTypes.array.isRequired,
        limit: PropTypes.number.isRequired,
        text: PropTypes.object
    }
});


Etc.defaultProps = {
    text: {
        other: 'et 1 autre',
        others: 'et <x> autres'
    }
};

export default translate(Etc, 'Etc');
