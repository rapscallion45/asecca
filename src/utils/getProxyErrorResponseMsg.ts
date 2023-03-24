import { ProxyErrorPayload } from '@/api-types';

/*
 ** helper function for getting any error msgs from the proxy server
 */
const getProxyErrorResponseMsg = (err: ProxyErrorPayload) => err.message;

export default getProxyErrorResponseMsg;
