'use strict';

import React, { Component, PropTypes } from 'react';
import RcSlider from 'rc-slider';

export default class Limiters extends Component {

    render() {
        const { fullText, fromDate, toDate } = this.props;
        return (
            <div className="limiters">
                <h4>Limiter à</h4>
                <label>Texte Intégral</label>
                <input className="input" type='checkbox' checked={fullText} value={fullText} ref='fullText' onChange={e => this.handleChange(e)} />
                <label>Date de publication</label>
                <RcSlider
                    min={0}
                    max={2016}
                    step={1}
                    range={true}
                />
                <input className="input" type='checkbox' checked={fullText} value={fullText} ref='fullText' onChange={e => this.handleChange(e)} />
            </div>
        );
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }
}

Limiters.propTypes = {
};
