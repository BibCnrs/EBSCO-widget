import { ListGroup } from 'react-bootstrap';
import classnames from 'classnames';
import Icon from 'react-fa';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import FormFavouriteResource from '../containers/FormFavouriteResource';
import PersonalResourceItem from './PersonalResourceItem';
import ResultsPerPageSelector from './ResultsPerPageSelector';
import BibButton from './BibButton';
import addTooltip from '../higherOrderComponents/addTooltip';
const TooltipButton = addTooltip(BibButton);

const PersonalResourceList = ({ personalResources, remove, text }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [openPersonalResource, setOpenPersonalResource] = useState(false);

    const totalPages = Math.ceil(personalResources.length / pageSize);

    const pageDots = [];
    for (let i = 0; i <= totalPages - 1; i++) {
        pageDots.push(
            <Icon
                name={i === currentPage ? 'circle' : 'circle-o'}
                key={i}
                onClick={() => setCurrentPage(i)}
            />,
        );
    }

    return (
        <div className="favourite-resource">
            <div className="favourite-resource__header">
                <h4>
                    {text.personalResourceTab}
                    <TooltipButton
                        className="more"
                        icon={{
                            name: 'question',
                        }}
                        tooltipPlacement="bottom"
                        tooltip={text.personalResourceTooltip}
                    />
                    <BibButton
                        id="addFormPersonalResource"
                        className="more"
                        bsStyle="default"
                        onClick={() =>
                            setOpenPersonalResource(!openPersonalResource)
                        }
                        icon={{
                            name: openPersonalResource ? 'minus' : 'plus',
                        }}
                    />
                </h4>
                <ResultsPerPageSelector
                    resultsPerPage={pageSize}
                    changeResultsPerPage={setPageSize}
                />
            </div>
            {openPersonalResource === true ? <FormFavouriteResource /> : ''}
            <ListGroup className="favourite-resource__list">
                {personalResources
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((resource, index) => (
                        <PersonalResourceItem
                            key={resource.title}
                            index={index}
                            {...resource}
                            remove={remove}
                        />
                    ))}
            </ListGroup>
            {totalPages > 1 ? (
                <div className="favourite-resource__pagination">
                    <Icon
                        name="angle-left"
                        className={classnames('arrow', {
                            disabled: currentPage === 0,
                        })}
                        {...(currentPage > 0 && {
                            onClick: () => setCurrentPage(currentPage - 1),
                        })}
                    />
                    {pageDots}
                    <Icon
                        name="angle-right"
                        className={classnames('arrow', {
                            disabled: currentPage === totalPages - 1,
                        })}
                        {...(currentPage < totalPages - 1 && {
                            onClick: () => setCurrentPage(currentPage + 1),
                        })}
                    />
                </div>
            ) : (
                <span />
            )}
        </div>
    );
};

PersonalResourceList.propTypes = {
    personalResources: PropTypes.arrayOf(PersonalResourceItem),
    remove: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
};

export default PersonalResourceList;
