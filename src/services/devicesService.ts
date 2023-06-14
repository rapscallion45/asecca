/**
 * API services for Devices
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.6
 */

/**
 * GET request to /api/devices
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.6
 * @memberof Services
 *
 * @returns {Promise<any>} - resulting Promise of the fetch request
 */
async function getDevices() {
  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(`/api/devices`, requestOptions);
}

const devicesService = {
  getDevices,
};

export default devicesService;
