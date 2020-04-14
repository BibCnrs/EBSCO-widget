import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import _ from 'lodash';

import BookmarkButton from '../containers/BookmarkButton';

const getImageStyle = _.memoize(image => ({
    backgroundImage: `url(${image})`,
}));

const DatabaseItem = ({ url, name, oa, image, title }) => (
    <OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id={name.replace(' ', '_')}>
                {title.split('\n').map(t => (
                    <div key={t}>{t}</div>
                ))}
            </Tooltip>
        }
    >
        <div className="db" style={getImageStyle(image)}>
            <span className="title">{name}</span>
            {oa === true ? (
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAMAAACX3symAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABvFBMVEUBAQEAAAAVDApCKCJHKyRIKyU1Ih4TEhIAAABDKCI6OjoAAABILCVDQ0MAAAAAAABIKyVXV1cFBQUAAAA2NzcICQk4KCVILCVKLCVMLSZJLCVKLCVMLSZHKyVEKSNDKCIVDQsVDQvni3b0knzzknz3lH6oZldbWlr0k33/moP/mYL/nIWoZFSFhITR0dH/nISnY1T////e3t7/m4S1bFtXVFSipKSkpaWLjIyiYVOJUkaKU0eLVEicaFz/moLzk330k3z5l4HZiHrShXjylH/9mILkjXz+mYLljHluWWMgNlIeNlJKSVvYiHr/m4Pei3s0P1Y4QVfijXz1k3yTZ2cSL0+ZbGy6enMmOFNjVGCkcW4oOVMkN1KqdHD3lH1YTVo3QFfylYD/nINvWWMtO1TskX5gUmBnVmFZUF5lVWFUS1o6Qlj0lYBzW2QsO1QpOlRXTl5NSlvdiHeIYmUVMU+1eHLWh3kxPVVbUF6tdXATME9JSFtGR1qsc21TTV0cNFEhN1IxPlbKgnd2XGVARFnxk3/pj31wWGDwk3+8e3Oyd3HUhnnVh3nShXnKgHPoi3b1k31EKSJJLCVDKCJts5qpAAAAInRSTlMAAM39/f3+vyz9zj/+4lYC/u1nBPB99v3+/v79/f39/M/Or/y3gAAAAAFiS0dEMdnbHXIAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkAwYMFigD/TJxAAAA+UlEQVQY02NgYmYBAlY2dg4GRkZGBk4lZRUVFVU1dS5uEJdHQ1NLS0tbR1ePl4+fkUFAGcjT0jfQNTQSFBKGco1NTM3MLUREoVwtFUsraxtbMSDXThOk21hfX99enEHAwdHJ2cVOy9XNzV2ZlUHCw9PL28fXzz8gMCiYlUEyJDQsPCLSLio6JjaOlUEqPiExKTklNS09I1MFyM3KzvHLzXPOLyjMK5JmkCwuKS0rr6isqq4JrZVhkCiqq29obGpuaW0LaJdmENDo6OwKcu/ucXft7ZMFOkPTz89OC+QUP3tWqI/AQBNoslz/BGUomNAvz6AwcRIcTFYEAJA4QQz/A1ALAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAzLTA2VDExOjIyOjQwKzAxOjAw3K2xLwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMy0wNlQxMToyMjo0MCswMTowMK3wCZMAAAAASUVORK5CYII="
                    alt="Open access icon"
                    className="oa-img"
                />
            ) : (
                ''
            )}
            <BookmarkButton block title={name} url={url} />
        </div>
    </OverlayTrigger>
);

DatabaseItem.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    oa: PropTypes.bool.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
};

DatabaseItem.defaultProps = {};

export default DatabaseItem;
