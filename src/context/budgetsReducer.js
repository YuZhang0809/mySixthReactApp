//    1. 创建 `src/context/budgetsReducer.js` 文件，实现独立的预算 reducer 函数。
//    2. 支持 `'SET_BUDGET'`, `'DELETE_BUDGET'`, `'CLEAR_ALL_BUDGETS'` 三种 action 类型。
//    3. 创建 `src/context/BudgetsContext.jsx` 文件，提供预算状态的 Context Provider。
//    4. 预算数据结构采用对象格式：`{ '餐饮': 500, '交通': 200, ... }`。

export const BUDGETS_ACTIONS = {
    SET_BUDGET: 'SET_BUDGET',
    DELETE_BUDGET: 'DELETE_BUDGET',
    CLEAR_ALL_BUDGETS: 'CLEAR_ALL_BUDGETS',
    RESET_BUDGETS: 'RESET_BUDGETS'
}

export const initialState = {
    '餐饮': 100,
    '交通': 100, 
    '购物': 100, 
    '娱乐': 100, 
    '医疗': 100, 
    '教育': 100, 
    '其他': 100
}

export const budgetsReducer = (state, action) => {
    switch (action.type) {
        case BUDGETS_ACTIONS.SET_BUDGET:{
            const { category, amount } = action.payload
            return {...state, [category]:amount}
        }
 
        case BUDGETS_ACTIONS.DELETE_BUDGET:{
            const category = action.payload
            const newState = {...state}
            delete newState[category] 
            return newState
        }


        case BUDGETS_ACTIONS.CLEAR_ALL_BUDGETS:{
            return {}
        }

        case BUDGETS_ACTIONS.RESET_BUDGETS:{
            return {...initialState}
        }

        default:
            return state

    }
}