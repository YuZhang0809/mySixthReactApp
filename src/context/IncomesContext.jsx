import { createContext, useContext, useReducer } from "react";
import { incomesReducer, initialState } from './incomesReducer';

// 1. 创建 Context
export const IncomesContext = createContext(null)

// 2. Provider 组件
export const IncomesProvider = ({ children }) => {
    // 使用 useReducer 管理状态
    const [state, dispatch] = useReducer(incomesReducer, initialState)
    
    // 构建要共享的值
    const valueToShare = {
        incomes: state,
        dispatch: dispatch
    }
    
    return (
        <IncomesContext.Provider value={valueToShare}>
            {children}
        </IncomesContext.Provider>
    )
}

// 3. 自定义 Hook
export const useIncomes = () => {
    const context = useContext(IncomesContext)
    if (context === null) {
      throw new Error('useIncomes must be used within an IncomesProvider')
    }
    return context
  }