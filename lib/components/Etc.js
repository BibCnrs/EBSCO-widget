import React, { PropTypes } from 'react';

import translate from '../higherOrderComponents/translate';

export const Etc = React.createClass({
    getInitialState: function () {
        return {
            showAll: false
        };
    },
    render: function () {
        const { list, text, limit } = this.props;
        const { showAll } = this.state;
        if (list.length <= limit) {
            return <span>{list.join('; ')}</span>;
        }
        const nbHidden = list.length - limit;

        return showAll ? (
            <span>
                {list.join('; ')}
                <a href="#" onClick={() => this.setState({ ...this.state, showAll: false })}> &lt;&lt;</a>
            </span>
        ) : (
            <span>
                {list.slice(0, limit).join('; ')}
                <a href="#" onClick={() => this.setState({ ...this.state, showAll: true })}> {
                        nbHidden > 1 ? text.others.replace('<x>', nbHidden) : text.other
                }</a>
            </span>
        );
    }
});

Etc.propTypes = {
    list: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired
};

Etc.defaultProps = {
    text: {
        other: 'et 1 autre',
        others: 'et <x> autres'
    }
};

export default translate(Etc, 'Etc');
