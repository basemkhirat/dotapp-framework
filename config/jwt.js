export default {

    /**
     * is a string, buffer, or object containing either the secret for HMAC algorithms
     * or the PEM encoded private key for RSA and ECDSA.
     * In case of a private key with passphrase an object { key, passphrase }
     * can be used (based on crypto documentation),
     * in this case be sure you pass the algorithm option
     */

    secret: process.env.TOKEN_SECRET,

    /**
     * expressed in seconds.
     * Eg: 600
     */

    expires: process.env.TOKEN_EXPIRES || 604800
};
