import { getCostsSourceQueryString } from '../utils';

async function getCostsConfig(
  source: string,
  dataId: string | (string | null)[]
) {
  /* detemine which cost source this is, and build query string */
  const queryString: string = getCostsSourceQueryString(
    source,
    dataId as string
  );

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/costs_config?${queryString}`, requestOptions).then((res) =>
    res.json()
  );
}

const costsConfigService = {
  getCostsConfig,
};

export default costsConfigService;
