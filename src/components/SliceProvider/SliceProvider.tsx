import { FC, ReactNode, createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Slice } from '@reduxjs/toolkit';
import { AppState } from '@/redux/store';

/**
 * Default value for the slice context
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof SliceProvider
 *
 * @constant
 * @type {Slice<Object>}
 */
const SliceContext = createContext<Slice>({} as Slice);

/**
 * Slice Provider Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef ISliceProviderProps
 * @prop {Slice} slice - context slice to provide down to child nodes
 * @prop {ReactNode} children - child nodes
 */
interface ISliceProviderProps {
  slice: Slice;
  children: ReactNode;
}

/**
 * Slice Provider
 *
 * Slice provider functional component wrapper for providing global state
 * managment functionality to child components
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @component
 * @param {ISliceProviderProps} props - component props
 * @returns {FC} - slice provider functional component
 */
const SliceProvider: FC<ISliceProviderProps> = (props) => {
  const { slice, children } = props;
  return (
    <SliceContext.Provider value={slice}>{children}</SliceContext.Provider>
  );
};

/**
 * Provider specific actions interface for passed slice
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof KanbanReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {CaseReducerActions<any, string>}
 */
export const useSliceActions = () => useContext<Slice>(SliceContext).actions;

/**
 * Provider specific selector interface for passed slice
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof KanbanReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {AppState}
 */
export const useSliceSelector = () => {
  const { name } = useContext<Slice>(SliceContext);
  return useSelector((state: AppState) => state[name as keyof AppState]);
};

export default SliceProvider;
