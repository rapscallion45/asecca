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

  /* configure GET header options */
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  /* send request and catch any errors */
  return fetch(`/api/costs_config?${queryString}`, requestOptions).then(
    (res) => {
      if (res.status !== 200) throw new Error(res.statusText);
      return res.json();
    }
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

  /* configure POST header options */
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  /* send request and catch any errors */
  return fetch(`/api/costs_config`, requestOptions).then((res) => {
    if (res.status !== 200) throw new Error(res.statusText);
    return res.json();
  });
}

const costsConfigService = {
  getCostsConfig,
  setCostsConfig,
};

export default costsConfigService;
