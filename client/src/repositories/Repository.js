import axios from "axios";

import { baseEndpointUrl } from './../../env';

const baseURL = `${baseEndpointUrl}`;

export default axios.create({
    baseURL
});
