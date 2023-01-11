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
            isDiamond,
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
                        aria-label={
                            noticeShown ? text.closeNotices : text.openNotices
                        }
                    />
                    {reconciledFullTextHoldings.length === 1 ? (
                        isLogged === true ||
                        !reconciledFullTextHoldings[0].url.includes(
                            'bib.cnrs.fr',
                        ) ? (
                            <React.Fragment>
                                <a
                                    className="fetch-link"
                                    href={reconciledFullTextHoldings[0].url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {`${id}. ${title} ${titleType}`}
                                </a>
                                {!reconciledFullTextHoldings[0].url.includes(
                                    'bib.cnrs.fr',
                                ) && (
                                    <TooltipSpan
                                        tooltipPlacement="bottom"
                                        tooltip={
                                            text.openAccessPublicationDescription
                                        }
                                        className="open-access"
                                    >
                                        <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAMAAACX3symAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABvFBMVEUBAQEAAAAVDApCKCJHKyRIKyU1Ih4TEhIAAABDKCI6OjoAAABILCVDQ0MAAAAAAABIKyVXV1cFBQUAAAA2NzcICQk4KCVILCVKLCVMLSZJLCVKLCVMLSZHKyVEKSNDKCIVDQsVDQvni3b0knzzknz3lH6oZldbWlr0k33/moP/mYL/nIWoZFSFhITR0dH/nISnY1T////e3t7/m4S1bFtXVFSipKSkpaWLjIyiYVOJUkaKU0eLVEicaFz/moLzk330k3z5l4HZiHrShXjylH/9mILkjXz+mYLljHluWWMgNlIeNlJKSVvYiHr/m4Pei3s0P1Y4QVfijXz1k3yTZ2cSL0+ZbGy6enMmOFNjVGCkcW4oOVMkN1KqdHD3lH1YTVo3QFfylYD/nINvWWMtO1TskX5gUmBnVmFZUF5lVWFUS1o6Qlj0lYBzW2QsO1QpOlRXTl5NSlvdiHeIYmUVMU+1eHLWh3kxPVVbUF6tdXATME9JSFtGR1qsc21TTV0cNFEhN1IxPlbKgnd2XGVARFnxk3/pj31wWGDwk3+8e3Oyd3HUhnnVh3nShXnKgHPoi3b1k31EKSJJLCVDKCJts5qpAAAAInRSTlMAAM39/f3+vyz9zj/+4lYC/u1nBPB99v3+/v79/f39/M/Or/y3gAAAAAFiS0dEMdnbHXIAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkAwYMFigD/TJxAAAA+UlEQVQY02NgYmYBAlY2dg4GRkZGBk4lZRUVFVU1dS5uEJdHQ1NLS0tbR1ePl4+fkUFAGcjT0jfQNTQSFBKGco1NTM3MLUREoVwtFUsraxtbMSDXThOk21hfX99enEHAwdHJ2cVOy9XNzV2ZlUHCw9PL28fXzz8gMCiYlUEyJDQsPCLSLio6JjaOlUEqPiExKTklNS09I1MFyM3KzvHLzXPOLyjMK5JmkCwuKS0rr6isqq4JrZVhkCiqq29obGpuaW0LaJdmENDo6OwKcu/ucXft7ZMFOkPTz89OC+QUP3tWqI/AQBNoslz/BGUomNAvz6AwcRIcTFYEAJA4QQz/A1ALAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAzLTA2VDExOjIyOjQwKzAxOjAw3K2xLwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMy0wNlQxMToyMjo0MCswMTowMK3wCZMAAAAASUVORK5CYII="
                                            alt="Open access icon"
                                        />
                                    </TooltipSpan>
                                )}
                            </React.Fragment>
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
                    ) : isLogged === true ? (
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
                    ) : (
                        <b>
                            <TooltipSpan
                                tooltipPlacement="bottom"
                                tooltip={text.notConnected}
                            >
                                {id}. {title} {titleType}
                            </TooltipSpan>
                        </b>
                    )}

                    {isDiamond && (
                        <TooltipSpan
                            tooltipPlacement="bottom"
                            tooltip={text.diamondDescription}
                            className="diamond"
                        >
                            <img
                                src="data:image/png;base64,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"
                                alt={text.diamond}
                            />
                        </TooltipSpan>
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
