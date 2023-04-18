import createCache from '@emotion/cache';

/**
 * Create emotion style cache, and set 'prepend' true to allow
 * MUI style overrides
 *
 * @see See [Emotion 'createCache; docs](https://emotion.sh/docs/@emotion/cache)
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
const createEmotionCache = () => createCache({ key: 'css', prepend: true });

export default createEmotionCache;
