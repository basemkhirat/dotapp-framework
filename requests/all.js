import merge from 'merge-deep';

/**
 * get all request parameters
 */
export default function () {
    let params = this.req.params || {};
    let body = this.req.body || {};
    let query = this.req.query || {};

    return merge(this.req.query, this.req.body);
};
