import { getCostsConfigSourceQueryString } from '../utils';

async function getCostsConfig(
  source: string,
  dataId: string | (string | null)[]
) {
  /* detemine which cost source this is, and build query string */
  const queryString: string = getCostsConfigSourceQueryString(
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

async function setCostsConfig(
  source: string,
  dataId: string | (string | null)[],
  data: any
) {
  /* TODO: pack data into correct format for API */
  console.log(source);
  console.log(dataId);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(`/api/costs_config`, requestOptions).then((res) => res.json());
}

const costsConfigService = {
  getCostsConfig,
  setCostsConfig,
};

export default costsConfigService;
