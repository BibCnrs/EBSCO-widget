const selectObjectByLangAttribute = (objectArray, lang) => {
    return (
        objectArray.find(object => object.lang === lang) || objectArray[0] || {}
    );
};

export default selectObjectByLangAttribute;
