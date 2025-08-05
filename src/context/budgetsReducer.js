//    1. 创建 `src/context/budgetsReducer.js` 文件，实现独立的预算 reducer 函数。
//    2. 支持 `'SET_BUDGET'`, `'DELETE_BUDGET'`, `'CLEAR_ALL_BUDGETS'` 三种 action 类型。
//    3. 创建 `src/context/BudgetsContext.jsx` 文件，提供预算状态的 Context Provider。
//    4. 预算数据结构采用对象格式：`[{ date: '2024-01', 
//                                  budgets: { '餐饮': 500，'交通': 100,}
//                                  }
//                                ]`。

export const BUDGETS_ACTIONS = {
    SET_BUDGET: 'SET_BUDGET',
    DELETE_BUDGET: 'DELETE_BUDGET',
    CLEAR_ALL_BUDGETS: 'CLEAR_ALL_BUDGETS',
    RESET_BUDGETS: 'RESET_BUDGETS'
}

// export const initialState = {
//     '餐饮': 100,
//     '交通': 100, 
//     '购物': 100, 
//     '娱乐': 100, 
//     '医疗': 100, 
//     '教育': 100, 
//     '其他': 100
// }

const getCurrentYearMonth = () => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export const initialState = [{date: getCurrentYearMonth(),
                            budgets:{
                                    '餐饮': 100,
                                    '交通': 100, 
                                    '购物': 100, 
                                    '娱乐': 100, 
                                    '医疗': 100, 
                                    '教育': 100, 
                                    '其他': 100
                            }
}]


export const budgetsReducer = (state, action) => {
    switch (action.type) {
        case BUDGETS_ACTIONS.SET_BUDGET:{
            const { category, amount, date } = action.payload
            const monthIndex = state.findIndex(monthBudgets => monthBudgets.date === date)
            if (monthIndex === -1) {
                return(
                    [...state,{date:date,
                        budgets:{
                            [category]:amount
                        }
                    }]
                )
            } else {
                const updatedState = [...state]
                updatedState[monthIndex] = {
                    ...state[monthIndex],
                    budgets : {
                        ...state[monthIndex].budgets,
                        [category]:amount
                    }
                }
                return updatedState
            }
        }
 
        case BUDGETS_ACTIONS.DELETE_BUDGET:{
            const {category, date} = action.payload
            const updatedState = [...state]
            const monthIndex = state.findIndex(monthBudgets => monthBudgets.date === date)

            if (monthIndex !== -1) {
                updatedState[monthIndex] = {
                    ...state[monthIndex],
                    budgets : {
                        ...state[monthIndex].budgets,
                        [category]: null
                    }
                }
                return updatedState
            } else {
                return state
            }
        }


        case BUDGETS_ACTIONS.CLEAR_ALL_BUDGETS:{
            return state.map(monthData => ({
                ...monthData,
                budgets :Object.fromEntries(Object.keys(monthData.budgets).map(category => [category, null]))
            }))
        }

        case BUDGETS_ACTIONS.RESET_BUDGETS:{
            return [...initialState]
        }

        default:
            return state

    }
}