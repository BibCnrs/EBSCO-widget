export const DOMAIN_CHANGE = 'A2Z_DOMAIN_CHANGE';

const changeDomain = (domain) => ({
    type: DOMAIN_CHANGE,
    domain
});

export default {
    changeDomain
};
