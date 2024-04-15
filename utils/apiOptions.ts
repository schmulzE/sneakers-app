import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const baseOptions = {
  method: 'GET',
  headers: {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache, no-store, must-revalidate',
    pragma: 'no-cache',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    'x-newrelic-id': 'VQUCV1ZUGwcHU1lXBAYBXg==',
    'x-requested-with': 'XMLHttpRequest'
  }
};

const menSneakersOptions = {
  ...baseOptions,
  headers: {
    ...baseOptions.headers,
    authority: 'www.farfetch.com',
    referer: `https://www.farfetch.com/${publicRuntimeConfig.locale}/shopping/men/trainers-2/items.aspx?page=2&view=90&sort=3&scale=282`,
    cookie: publicRuntimeConfig.apiCookie
  }
};

const womenSneakersOptions = {
  ...baseOptions,
  headers: {
    ...baseOptions.headers,
    authority: 'www.farfetch.com',
    referer: `https://www.farfetch.com/${publicRuntimeConfig.locale}/shopping/women/trainers-2/items.aspx?page=2&view=90&sort=3&scale=274`,
    cookie: publicRuntimeConfig.apiCookie
  }
};

export { menSneakersOptions, womenSneakersOptions };