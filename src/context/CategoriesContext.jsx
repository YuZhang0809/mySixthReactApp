import { createContext, useContext, useReducer } from "react";
import { categoriesReducer, initialState } from "./categoriesReducer";

export const CategoriesContext = createContext(null)

export const CategoriesProvider = ({children}) => {

    const [state, dispatch] = useReducer(categoriesReducer, initialState)

    const valueToShare = {
        categories: state,
        dispatch: dispatch
    }

    return(
        <CategoriesContext.Provider value={valueToShare}>
            {children}
        </CategoriesContext.Provider>
    )
}

export const useCategories = () => {
    const context = useContext(CategoriesContext)

    if (context === null) {
        throw new Error('useCategories must be used within a CategoriesProvider')
      }

    return {
        categories: context.categories.expense,  // 只返回支出类别
        dispatch: context.dispatch
    }

}

export const useSources = () => {
    const context = useContext(CategoriesContext)

    if (context === null) {
        throw new Error('useCategories must be used within a CategoriesProvider')
      }

    return {
        categories: context.categories.income_source,  // 只返回收入类别
        dispatch: context.dispatch
    }

}