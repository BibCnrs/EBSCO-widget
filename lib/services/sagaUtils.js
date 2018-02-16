export const goTo = url => (window.location.href = url);
export const delay = ms =>
    new Promise(resolve => setTimeout(() => resolve(true), ms));
