/**
 * This is a modified version of the npm library "react-use-draggable-scroll"
 * The original author is:
 * @author Renato Fuzaro Miotto {@link https://github.com/rfmiotto GitHub}
 *
 * This file has been modified by:
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 *
 * @see See [the original npm library here](https://www.npmjs.com/package/react-use-draggable-scroll)
 * @see See [the original GitHub repo here](https://github.com/rfmiotto/react-use-draggable-scroll)
 */

import { useLayoutEffect, useEffect } from 'react';

/**
 * Isomorphic Layout Effect hook for allowing SSR useEffect
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 * @memberof Hooks
 *
 * @function
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
