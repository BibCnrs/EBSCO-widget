import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import FullTextHoldings from './FullTextHoldings';
import DL from './DL';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import BookmarkButton from '../containers/BookmarkButton';
import parseFullTextHoldings from '../services/parseFullTextHoldings';
import addTooltip from '../higherOrderComponents/addTooltip';
const TooltipSpan = addTooltip('span');

const getIconType = (noticeShown, noticeLoaded) => {
    if (noticeShown && noticeLoaded) {
        return { name: 'chevron-down' };
    }

    if (noticeShown) {
        return { name: 'spinner', spin: true };
    }

    return { name: 'chevron-right' };
};

const showResource = id => {
    document.getElementById(`dropdownConsult${id}`).click();
};

class PublicationRecord extends Component {
    render() {
        const {
            record,
            noticeShown,
            notice,
            text,
            showNotice,
            currentGate,
            isLogged,
        } = this.props;
        const {
            id,
            title,
            type,
            isbnOnline,
            isbnPrint,
            issnOnline,
            issnPrint,
            fullTextHoldings,
        } = record;

        const titleType = type ? `[${type}]` : '';
        const reconciledFullTextHoldings = parseFullTextHoldings(
            fullTextHoldings,
        );
        return (
            <div className="record record-publication">
                <h4 className="title">
                    <BibButton
                        className="notice-opener"
                        icon={getIconType(noticeShown, !!notice)}
                        bsStyle="link"
                        onClick={() => showNotice(id)}
                    />
                    {reconciledFullTextHoldings.length === 1 ? (
                        isLogged === true ||
                        !reconciledFullTextHoldings[0].url.includes(
                            'bib.cnrs.fr',
                        ) ? (
                            <a
                                className="fetch-link"
                                href={reconciledFullTextHoldings[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {`${id}. ${title} ${titleType}`}
                                {!reconciledFullTextHoldings[0].url.includes(
                                    'bib.cnrs.fr',
                                ) ? (
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAMAAACX3symAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABvFBMVEUBAQEAAAAVDApCKCJHKyRIKyU1Ih4TEhIAAABDKCI6OjoAAABILCVDQ0MAAAAAAABIKyVXV1cFBQUAAAA2NzcICQk4KCVILCVKLCVMLSZJLCVKLCVMLSZHKyVEKSNDKCIVDQsVDQvni3b0knzzknz3lH6oZldbWlr0k33/moP/mYL/nIWoZFSFhITR0dH/nISnY1T////e3t7/m4S1bFtXVFSipKSkpaWLjIyiYVOJUkaKU0eLVEicaFz/moLzk330k3z5l4HZiHrShXjylH/9mILkjXz+mYLljHluWWMgNlIeNlJKSVvYiHr/m4Pei3s0P1Y4QVfijXz1k3yTZ2cSL0+ZbGy6enMmOFNjVGCkcW4oOVMkN1KqdHD3lH1YTVo3QFfylYD/nINvWWMtO1TskX5gUmBnVmFZUF5lVWFUS1o6Qlj0lYBzW2QsO1QpOlRXTl5NSlvdiHeIYmUVMU+1eHLWh3kxPVVbUF6tdXATME9JSFtGR1qsc21TTV0cNFEhN1IxPlbKgnd2XGVARFnxk3/pj31wWGDwk3+8e3Oyd3HUhnnVh3nShXnKgHPoi3b1k31EKSJJLCVDKCJts5qpAAAAInRSTlMAAM39/f3+vyz9zj/+4lYC/u1nBPB99v3+/v79/f39/M/Or/y3gAAAAAFiS0dEMdnbHXIAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkAwYMFigD/TJxAAAA+UlEQVQY02NgYmYBAlY2dg4GRkZGBk4lZRUVFVU1dS5uEJdHQ1NLS0tbR1ePl4+fkUFAGcjT0jfQNTQSFBKGco1NTM3MLUREoVwtFUsraxtbMSDXThOk21hfX99enEHAwdHJ2cVOy9XNzV2ZlUHCw9PL28fXzz8gMCiYlUEyJDQsPCLSLio6JjaOlUEqPiExKTklNS09I1MFyM3KzvHLzXPOLyjMK5JmkCwuKS0rr6isqq4JrZVhkCiqq29obGpuaW0LaJdmENDo6OwKcu/ucXft7ZMFOkPTz89OC+QUP3tWqI/AQBNoslz/BGUomNAvz6AwcRIcTFYEAJA4QQz/A1ALAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAzLTA2VDExOjIyOjQwKzAxOjAw3K2xLwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMy0wNlQxMToyMjo0MCswMTowMK3wCZMAAAAASUVORK5CYII="
                                        alt="Open access icon"
                                    />
                                ) : (
                                    ''
                                )}
                            </a>
                        ) : (
                            <b>
                                <TooltipSpan
                                    tooltipPlacement="bottom"
                                    tooltip={text.notConnected}
                                >
                                    {id}. {title} {titleType}
                                </TooltipSpan>
                            </b>
                        )
                    ) : (
                        <span
                            onClick={() => showResource(id)}
                            className="fetch-link"
                        >
                            <b>
                                {id}. {title} {titleType}. {isLogged}
                            </b>
                            <FullTextHoldings
                                name={title}
                                data={reconciledFullTextHoldings}
                                text={text}
                                index={id}
                            />
                        </span>
                    )}
                </h4>
                {reconciledFullTextHoldings.length === 1 ? (
                    <BookmarkButton
                        title={`${title} - ${reconciledFullTextHoldings[0].name}`}
                        url={reconciledFullTextHoldings[0].url}
                    />
                ) : (
                    ''
                )}
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    <div key={noticeShown && notice ? 'notice' : 'no-notice'}>
                        {noticeShown && notice ? (
                            <div className="notice">
                                <DL
                                    className="notice-list"
                                    data={{
                                        ...notice,
                                        fullTextLinks: fullTextHoldings,
                                    }}
                                    currentGate={currentGate}
                                    title={title}
                                    page="publication"
                                />
                            </div>
                        ) : (
                            <div>
                                <p>
                                    {[
                                        isbnOnline && isbnOnline.length
                                            ? `eISBN: ${isbnOnline.join(', ')}`
                                            : null,
                                        isbnPrint && isbnPrint.length
                                            ? `pISBN: ${isbnPrint.join(', ')}`
                                            : null,
                                        issnOnline && issnOnline.length
                                            ? `eISSN: ${issnOnline.join(', ')}`
                                            : null,
                                        issnPrint && issnPrint.length
                                            ? `pISSN: ${issnPrint.join(', ')}`
                                            : null,
                                    ]
                                        .filter(value => !!value)
                                        .join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                </CSSTransitionGroup>
            </div>
        );
    }
    static propTypes = {
        record: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        noticeShown: PropTypes.bool.isRequired,
        notice: PropTypes.object,
        text: PropTypes.object,
        showNotice: PropTypes.func.isRequired,
        currentGate: PropTypes.string.isRequired,
        isLogged: PropTypes.bool.isRequired,
    };
}

PublicationRecord.defaultProps = {
    text: {
        type: 'Type',
        access: 'Accès ressource',
        notConnected: 'Connectez-vous pour accèder à la ressource',
    },
};

export default translate(PublicationRecord, 'PublicationRecord');
