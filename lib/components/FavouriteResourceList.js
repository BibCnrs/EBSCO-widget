import { ListGroup } from 'react-bootstrap';
import classnames from 'classnames';
import Icon from 'react-fa';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import FavouriteResourceItem from './FavouriteResourceItem';
import ResultsPerPageSelector from './ResultsPerPageSelector';
import BibButton from './BibButton';
import addTooltip from '../higherOrderComponents/addTooltip';
const TooltipButton = addTooltip(BibButton);

const FavouriteResourceList = ({ favouriteResources, remove, text }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const totalPages = Math.ceil(favouriteResources.length / pageSize);

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
                    {text.favouriteResourcesTab}
                    <TooltipButton
                        className="more"
                        icon={{
                            name: 'question',
                        }}
                        tooltipPlacement="bottom"
                        tooltip={text.favouriteResourcesTooltip}
                    />
                </h4>
                <ResultsPerPageSelector
                    resultsPerPage={pageSize}
                    changeResultsPerPage={value => {
                        setPageSize(value);
                        setCurrentPage(0);
                    }}
                />
            </div>
            <ListGroup className="favourite-resource__list">
                {favouriteResources
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map(resource => (
                        <FavouriteResourceItem
                            key={resource.index}
                            index={resource.index}
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

FavouriteResourceList.propTypes = {
    favouriteResources: PropTypes.arrayOf(FavouriteResourceItem),
    remove: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
};

export default FavouriteResourceList;
