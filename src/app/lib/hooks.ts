

import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch,  RootState } from "./store";


//use throughout your app instead of plain `useDispatch` 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
//export const useAppStore = useStore.withTypes<AppStore>()