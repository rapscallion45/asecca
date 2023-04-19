import createCache from '@emotion/cache';

/**
 * Create emotion style cache, and set 'prepend' true to allow
 * MUI style overrides
 *
 * @see See [Emotion 'createCache; docs](https://emotion.sh/docs/@emotion/cache)
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
const createEmotionCache = () => createCache({ key: 'css', prepend: true });

export default createEmotionCache;
