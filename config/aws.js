export default {

    /**
     * your AWS access key ID
     */

    accessKeyId: process.env.AWS_KEY || "AKIAYVUXWTPZRVFZLPSH",

    /**
     * your AWS secret access key
     */

    secretAccessKey: process.env.AWS_SECRET || "G5z1wfORXrr7uQB6sJWAW3mJXvmuO53RY9QVMFfu",

    /**
     * the region to send service requests to.
     */

    region: process.env.AWS_REGION || "eu-west-1"
}
