import crypto from 'crypto';

export default function getSha1(input) {
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex');
}
