import React, { PropTypes } from 'react';

const Etc = React.createClass({
    getInitialState: function () {
        return {
            showAll: false
        };
    },
    render: function () {
        const { list, limit } = this.props;
        const { showAll } = this.state;
        if (list.length <= limit) {
            return <span>{list.join('; ')}</span>;
        }

        return showAll ? (
            <span>
                {list.join('; ')}
                <a href="#" onClick={() => this.setState({ ...this.state, showAll: false })}> &lt;&lt;</a>
            </span>
        ) : (
            <span>
                {list.slice(0, limit).join('; ')}
                <a href="#" onClick={() => this.setState({ ...this.state, showAll: true })}> et {list.length - limit} autre{list.length - limit > 1 ? 's' : ''}</a>
            </span>
        );
    }
});

Etc.propTypes = {
    list: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired
};

export default Etc;
