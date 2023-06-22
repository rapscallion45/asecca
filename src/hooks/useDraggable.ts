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

import { MutableRefObject, useEffect, useRef } from 'react';
import useLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * Draggable Options
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 * @memberof Draggable
 *
 * @typedef TOptionsType - theme can either be 'light' or 'dark' mode
 * @prop {number} decayRate - decay rate of drag movement
 * @prop {number} safeDisplacement - displacement away from current scroll position
 * @prop {boolean} applyRubberBandEffect - apply rubber effect flag
 * @prop {string} activeMouseButton - mouse button to use for drag effect
 * @prop {boolean} isMounted - is draggable component mounted flag
 */
type TOptionsType = {
  decayRate?: number;
  safeDisplacement?: number;
  applyRubberBandEffect?: boolean;
  activeMouseButton?: 'Left' | 'Middle' | 'Right';
  isMounted?: boolean;
};

/**
 * Draggable Return type
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 * @memberof Draggable
 *
 * @typedef TReturnType
 */
type TReturnType = {
  events: {
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
  };
};

/**
 * Draggable hook for adding mouse drag capability to child components.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.9
 * @memberof Hooks
 *
 * @function
 */
function useDraggable(
  ref: MutableRefObject<HTMLElement>,
  {
    decayRate = 0.95,
    safeDisplacement = 10,
    applyRubberBandEffect = false,
    activeMouseButton = 'Left',
    isMounted = true,
  }: TOptionsType = {}
): TReturnType {
  const internalState = useRef({
    isMouseDown: false,
    isDraggingX: false,
    isDraggingY: false,
    initialMouseX: 0,
    initialMouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    scrollSpeedX: 0,
    scrollSpeedY: 0,
    lastScrollX: 0,
    lastScrollY: 0,
  });

  let isScrollableAlongX = false;
  let isScrollableAlongY = false;
  let maxHorizontalScroll = 0;
  let maxVerticalScroll = 0;
  let cursorStyleOfWrapperElement: string;
  let cursorStyleOfChildElements: string[];
  let transformStyleOfChildElements: string[];
  let transitionStyleOfChildElements: string[];

  const timing = (1 / 60) * 1000; // period of most monitors (60fps)

  /* eslint-disable react-hooks/exhaustive-deps */
  useLayoutEffect(() => {
    if (isMounted) {
      isScrollableAlongX =
        window.getComputedStyle(ref.current).overflowX === 'scroll';
      isScrollableAlongY =
        window.getComputedStyle(ref.current).overflowY === 'scroll';

      maxHorizontalScroll =
        (ref.current?.scrollWidth || 0) - (ref.current?.clientWidth || 0);
      maxVerticalScroll =
        (ref.current?.scrollHeight || 0) - (ref.current?.clientHeight || 0);

      cursorStyleOfWrapperElement = window.getComputedStyle(ref.current).cursor;

      cursorStyleOfChildElements = [];
      transformStyleOfChildElements = [];
      transitionStyleOfChildElements = [];

      (ref.current?.childNodes as NodeListOf<HTMLOptionElement>).forEach(
        (child: HTMLElement) => {
          cursorStyleOfChildElements.push(
            window.getComputedStyle(child).cursor
          );

          transformStyleOfChildElements.push(
            window.getComputedStyle(child).transform === 'none'
              ? ''
              : window.getComputedStyle(child).transform
          );

          transitionStyleOfChildElements.push(
            window.getComputedStyle(child).transition === 'none'
              ? ''
              : window.getComputedStyle(child).transition
          );
        }
      );
    }
  }, [isMounted]);

  /**
   * Run scroll effect
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   */
  const runScroll = () => {
    if (ref.current === null) return;

    const dx = internalState.current.scrollSpeedX * timing;
    const dy = internalState.current.scrollSpeedY * timing;
    const offsetX = ref.current.scrollLeft + dx;
    const offsetY = ref.current.scrollTop + dy;

    ref.current.scrollLeft = offsetX; // eslint-disable-line no-param-reassign
    ref.current.scrollTop = offsetY; // eslint-disable-line no-param-reassign
    internalState.current.lastScrollX = offsetX;
    internalState.current.lastScrollY = offsetY;
  };

  /**
   * Callback handler for applying rubber band effect
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   * @prop {MouseEvent} e - mouse event
   */
  const rubberBandCallback = (e: MouseEvent) => {
    const dx = e.clientX - internalState.current.initialMouseX;
    const dy = e.clientY - internalState.current.initialMouseY;

    const { clientWidth, clientHeight } = ref.current;

    let displacementX = 0;
    let displacementY = 0;

    if (isScrollableAlongX && isScrollableAlongY) {
      displacementX =
        0.3 *
        clientWidth *
        Math.sign(dx) *
        Math.log10(1.0 + (0.5 * Math.abs(dx)) / clientWidth);
      displacementY =
        0.3 *
        clientHeight *
        Math.sign(dy) *
        Math.log10(1.0 + (0.5 * Math.abs(dy)) / clientHeight);
    } else if (isScrollableAlongX) {
      displacementX =
        0.3 *
        clientWidth *
        Math.sign(dx) *
        Math.log10(1.0 + (0.5 * Math.abs(dx)) / clientWidth);
    } else if (isScrollableAlongY) {
      displacementY =
        0.3 *
        clientHeight *
        Math.sign(dy) *
        Math.log10(1.0 + (0.5 * Math.abs(dy)) / clientHeight);
    }

    (ref.current?.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement) => {
        child.style.transform = `translate3d(${displacementX}px, ${displacementY}px, 0px)`; // eslint-disable-line no-param-reassign
        child.style.transition = 'transform 0ms'; // eslint-disable-line no-param-reassign
      }
    );
  };

  /**
   * Callback handler for recovering child styles
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   */
  const recoverChildStyle = () => {
    (ref.current?.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement, i) => {
        child.style.transform = transformStyleOfChildElements[i]; // eslint-disable-line no-param-reassign
        child.style.transition = transitionStyleOfChildElements[i]; // eslint-disable-line no-param-reassign
      }
    );
  };

  let rubberBandAnimationTimer: NodeJS.Timeout;
  let keepMovingX: NodeJS.Timer;
  let keepMovingY: NodeJS.Timer;

  /**
   * Callback handler for momentum effect
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   */
  const callbackMomentum = () => {
    const minimumSpeedToTriggerMomentum = 0.05;

    keepMovingX = setInterval(() => {
      const lastScrollSpeedX = internalState.current.scrollSpeedX;
      const newScrollSpeedX = lastScrollSpeedX * decayRate;
      internalState.current.scrollSpeedX = newScrollSpeedX;

      const isAtLeft = ref.current?.scrollLeft <= 0;
      const isAtRight = ref.current?.scrollLeft >= maxHorizontalScroll;
      const hasReachedHorizontalEdges = isAtLeft || isAtRight;

      runScroll();

      if (
        Math.abs(newScrollSpeedX) < minimumSpeedToTriggerMomentum ||
        internalState.current.isMouseDown ||
        hasReachedHorizontalEdges
      ) {
        internalState.current.scrollSpeedX = 0;
        clearInterval(keepMovingX);
      }
    }, timing);

    keepMovingY = setInterval(() => {
      const lastScrollSpeedY = internalState.current.scrollSpeedY;
      const newScrollSpeedY = lastScrollSpeedY * decayRate;
      internalState.current.scrollSpeedY = newScrollSpeedY;

      const isAtTop = ref.current?.scrollTop <= 0;
      const isAtBottom = ref.current?.scrollTop >= maxVerticalScroll;
      const hasReachedVerticalEdges = isAtTop || isAtBottom;

      runScroll();

      if (
        Math.abs(newScrollSpeedY) < minimumSpeedToTriggerMomentum ||
        internalState.current.isMouseDown ||
        hasReachedVerticalEdges
      ) {
        internalState.current.scrollSpeedY = 0;
        clearInterval(keepMovingY);
      }
    }, timing);

    internalState.current.isDraggingX = false;
    internalState.current.isDraggingY = false;

    if (applyRubberBandEffect) {
      const transitionDurationInMilliseconds = 250;

      (ref.current?.childNodes as NodeListOf<HTMLOptionElement>).forEach(
        (child: HTMLElement) => {
          child.style.transform = `translate3d(0px, 0px, 0px)`; // eslint-disable-line no-param-reassign
          child.style.transition = `transform ${transitionDurationInMilliseconds}ms`; // eslint-disable-line no-param-reassign
        }
      );

      rubberBandAnimationTimer = setTimeout(
        recoverChildStyle,
        transitionDurationInMilliseconds
      );
    }
  };

  /**
   * Callback handler preventing default click behaviour
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   * @prop {Event} e - default event
   */
  const preventClick = (e: Event) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    // e.stopPropagation();
  };

  /**
   * Callback handler for determining mouse button click source
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   * @prop {number} buttonsCode - pressed mouse button code
   */
  const getIsMousePressActive = (buttonsCode: number) =>
    (activeMouseButton === 'Left' && buttonsCode === 1) ||
    (activeMouseButton === 'Middle' && buttonsCode === 4) ||
    (activeMouseButton === 'Right' && buttonsCode === 2);

  /**
   * Callback handler for mouse click and hold
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   * @prop {MouseEvent<HTMLElement>} e - mouse event
   */
  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const isMouseActive = getIsMousePressActive(e.buttons);
    if (!isMouseActive) {
      return;
    }

    internalState.current.isMouseDown = true;
    internalState.current.lastMouseX = e.clientX;
    internalState.current.lastMouseY = e.clientY;
    internalState.current.initialMouseX = e.clientX;
    internalState.current.initialMouseY = e.clientY;
  };

  /**
   * Callback handler for mouse click release
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   * @prop {MouseEvent} e - mouse event
   */
  const onMouseUp = (e: MouseEvent) => {
    const isDragging =
      internalState.current.isDraggingX || internalState.current.isDraggingY;

    const dx = internalState.current.initialMouseX - e.clientX;
    const dy = internalState.current.initialMouseY - e.clientY;

    const isMotionIntentional =
      Math.abs(dx) > safeDisplacement || Math.abs(dy) > safeDisplacement;

    const isDraggingConfirmed = isDragging && isMotionIntentional;

    if (isDraggingConfirmed) {
      ref.current?.childNodes.forEach((child) => {
        child.addEventListener('click', preventClick);
      });
    } else {
      ref.current?.childNodes.forEach((child) => {
        child.removeEventListener('click', preventClick);
      });
    }

    internalState.current.isMouseDown = false;
    internalState.current.lastMouseX = 0;
    internalState.current.lastMouseY = 0;

    ref.current.style.cursor = cursorStyleOfWrapperElement; // eslint-disable-line no-param-reassign
    (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement, i) => {
        child.style.cursor = cursorStyleOfChildElements[i]; // eslint-disable-line no-param-reassign
      }
    );

    if (isDraggingConfirmed) {
      callbackMomentum();
    }
  };

  /**
   * Callback handler for mouse click release
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   * @prop {MouseEvent} e - mouse event
   */
  const onMouseMove = (e: MouseEvent) => {
    if (!internalState.current.isMouseDown) {
      return;
    }

    e.preventDefault();

    const dx = internalState.current.lastMouseX - e.clientX;
    internalState.current.lastMouseX = e.clientX;

    internalState.current.scrollSpeedX = dx / timing;
    internalState.current.isDraggingX = true;

    const dy = internalState.current.lastMouseY - e.clientY;
    internalState.current.lastMouseY = e.clientY;

    internalState.current.scrollSpeedY = dy / timing;
    internalState.current.isDraggingY = true;

    ref.current.style.cursor = 'grabbing'; // eslint-disable-line no-param-reassign
    (ref.current?.childNodes as NodeListOf<HTMLOptionElement>).forEach(
      (child: HTMLElement) => {
        child.style.cursor = 'grabbing'; // eslint-disable-line no-param-reassign
      }
    );

    const isAtLeft = ref.current?.scrollLeft <= 0 && isScrollableAlongX;
    const isAtRight =
      ref.current?.scrollLeft >= maxHorizontalScroll && isScrollableAlongX;
    const isAtTop = ref.current?.scrollTop <= 0 && isScrollableAlongY;
    const isAtBottom =
      ref.current?.scrollTop >= maxVerticalScroll && isScrollableAlongY;
    const isAtAnEdge = isAtLeft || isAtRight || isAtTop || isAtBottom;

    if (isAtAnEdge && applyRubberBandEffect) {
      rubberBandCallback(e);
    }

    runScroll();
  };

  /**
   * Callback handler for window resize events
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.9
   *
   * @method
   */
  const handleResize = () => {
    maxHorizontalScroll =
      (ref.current?.scrollWidth || 0) - (ref.current?.clientWidth || 0);
    maxVerticalScroll =
      (ref.current?.scrollHeight || 0) - (ref.current?.clientHeight || 0);
  };

  useEffect(() => {
    if (isMounted) {
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);

      clearInterval(keepMovingX);
      clearInterval(keepMovingY);
      clearTimeout(rubberBandAnimationTimer);
    };
  }, [isMounted, handleResize, onMouseMove, onMouseUp]);

  return {
    events: {
      onMouseDown,
    },
  };
}

export default useDraggable;
