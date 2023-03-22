import createCache from '@emotion/cache';

/* create emotion style cache, and set 'prepend' true to allow MUI style overrides */

const createEmotionCache = () => createCache({ key: 'css', prepend: true });

export default createEmotionCache;
