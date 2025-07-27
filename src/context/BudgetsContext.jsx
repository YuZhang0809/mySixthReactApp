import { createContext, useContext, useReducer } from "react";
import { budgetsReducer, initialState } from "./budgetsReducer";

export const BudgetsContext = createContext(null)

export const BudgetsProvider = ({children}) => {

    const [state, dispatch] = useReducer(budgetsReducer, initialState)

    const valueToShare = {
        budgets: state,
        dispatch: dispatch
    }

    return(
        <BudgetsContext.Provider value={valueToShare}>
            {children}
        </BudgetsContext.Provider>
    )
}

export const useBudgets = () => {
    const context = useContext(BudgetsContext)

    if (context === null) {
        throw new Error('useBudgets must be used within a BudgetsProvider')
      }

    return context

}