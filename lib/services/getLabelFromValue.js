export default function getLabelFromValue(value, mapping) {
    return mapping
    .filter((data) => data.value === value)
    .reduce((_, data) => data.label, '');
}
