import { createContext, useContext, useReducer } from "react";
import { expensesReducer, initialState } from './expensesReducer';

// 1. 创建 Context
export const ExpensesContext = createContext(null)

// 2. Provider 组件
export const ExpensesProvider = ({ children }) => {
    // 使用 useReducer 管理状态
    const [state, dispatch] = useReducer(expensesReducer, initialState)
    
    // 构建要共享的值
    const valueToShare = {
        expenses: state,
        dispatch: dispatch
    }
    
    return (
        <ExpensesContext.Provider value={valueToShare}>
            {children}
        </ExpensesContext.Provider>
    )
}

// 3. 自定义 Hook
export const useExpenses = () => {
    const context = useContext(ExpensesContext)
    if (context === null) {
      throw new Error('useExpenses must be used within an ExpensesProvider')
    }
    return context
  }