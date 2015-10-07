import React, { Component, PropTypes } from 'react';

export default class Result extends Component {
    // const { FullText } = this.props;
    render() {
        return (
            <li>
                <div>
                    <h3><a href={this.props.result.PLink}>{decodeURIComponent(this.props.result.Items[0].Data)}</a></h3>
                    <p>Par: {this.props.result.Header.DbLabel}</p>
                    <p>Base de données: {this.props.result.Header.DbLabel}</p>
                    <p>{this.props.result.Header.PubType}</p>
                </div>
            </li>
        );
    }
}
                    // {this.props.result.FullText.CustomLinks ? <a href={this.props.result.FullText.CustomLinks[0].Url}><img src="http://imageserver.ebscohost.com/branding/images/FTF.gif"></img></a> : null}

Result.propTypes = {
    result: PropTypes.object.isRequired
};
