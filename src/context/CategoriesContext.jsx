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

    return context

}