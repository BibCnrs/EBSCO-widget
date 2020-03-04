import { ListGroup } from 'react-bootstrap';
import classnames from 'classnames';
import Icon from 'react-fa';
import PropTypes from 'prop-types';
import React from 'react';

import FavouriteResourceItem from './FavouriteResourceItem';

export class FavouriteResourceList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentPage: 0,
            pageSize: 5,
        };
    }

    render() {
        const { favouriteResources, remove } = this.props;
        const { currentPage, pageSize } = this.state;

        const totalPages =
            favouriteResources.length / pageSize +
            (favouriteResources.length % pageSize ? 1 : 0);

        const pageDots = [];
        for (let i = 0; i <= totalPages - 1; i++) {
            pageDots.push(
                <Icon
                    name={i === currentPage ? 'circle' : 'circle-o'}
                    key={i}
                    onClick={this.goTo(i)}
                />,
            );
        }

        return (
            <div>
                <ListGroup className="favourite-resource-list">
                    {favouriteResources
                        .slice(
                            currentPage * pageSize,
                            (currentPage + 1) * pageSize,
                        )
                        .map((resource, index) => (
                            <FavouriteResourceItem
                                key={resource.title}
                                index={index}
                                {...resource}
                                remove={remove}
                            />
                        ))}
                </ListGroup>
                {totalPages > 1 ? (
                    <div className="favourite-resource-pagination">
                        <Icon
                            name="angle-left"
                            className={classnames('arrow', {
                                disabled: currentPage === 0,
                            })}
                            {...(currentPage > 0 && {
                                onClick: this.goTo(currentPage - 1),
                            })}
                        />
                        {pageDots}
                        <Icon
                            name="angle-right"
                            className={classnames('arrow', {
                                disabled: currentPage === totalPages - 1,
                            })}
                            {...(currentPage < totalPages - 1 && {
                                onClick: this.goTo(currentPage + 1),
                            })}
                        />
                    </div>
                ) : (
                    <span />
                )}
            </div>
        );
    }

    goTo = page => () => this.setState({ currentPage: page });
}

FavouriteResourceList.propTypes = {
    favouriteResources: PropTypes.arrayOf(FavouriteResourceItem),
    remove: PropTypes.func.isRequired,
    text: PropTypes.any,
};

export default FavouriteResourceList;
