export default {

    /**
     * is a string, buffer, or object containing either the secret for HMAC algorithms
     * or the PEM encoded private key for RSA and ECDSA.
     * In case of a private key with passphrase an object { key, passphrase }
     * can be used (based on crypto documentation),
     * in this case be sure you pass the algorithm option
     */

    secret: "RRVOSS2T5BMI319+6puJAFGpj++rsi3ruA+hHzKUwr8FGR/cSIEBhD4INNCp2cG21+Rf5b3ze929sddLyXhnfgnk4qsOTioetavo07kLp+xVUGroutPfdrd/R/E04O4Q9kZL2OT4Qkq0w4C5Z2t7Bdr5/l2JzK3juNSe6rhfGhbpAx9nTkX1ad6LnL8x/InhpymS4820R7CEuIjPTPnNCaMYrc0bqyGx9hcp1cozlDXcBU/6Xkl4JEm48bqDIgjCEU+uZ+O3CCh0a2ACvdSjpjQofDFLixs/xJ4nhL6gSw4xJvhkLSb5+jThkydTrw4Tv48ZOAU+aCVpRtKeG+0F7A==",

    /**
     * expressed in seconds.
     * Eg: 600
     */

    expires: 604800
};
