// Action 类型常量
export const CATEGORIES_ACTIONS = {
    ADD_EXPENSE_CATEGORY: 'ADD_EXPENSE_CATEGORY',
    DELETE_EXPENSE_CATEGORY: 'DELETE_EXPENSE_CATEGORY',
    EDIT_EXPENSE_CATEGORY: 'EDIT_EXPENSE_CATEGORY'
  };
  
// 初始状态
export const initialState = {
    expense: ['餐饮', '交通', '购物', '娱乐', '医疗', '教育', '其他'],
    income_source: ['工资', '兼职', '投资', '理财收益', '其他']
  };

export const categoriesReducer = (state, action) => {

    const validInput = (category) => {
        return category && category.trim().length > 0
    }

    switch (action.type) {

        // payload 为一个字符串
        case CATEGORIES_ACTIONS.ADD_EXPENSE_CATEGORY: {
            const index = state.expense.findIndex(category => category === action.payload)
            if (index === -1 && validInput(action.payload)) {
                return {...state,
                        expense:[...state.expense, action.payload],
                    }
            }
            else{
                return state
            }
        }   
        
        // payload 为一个字符串
        case CATEGORIES_ACTIONS.DELETE_EXPENSE_CATEGORY: {
            const index = state.expense.findIndex(category => category === action.payload)
            if (index !== -1) {
                return {...state,
                        expense: state.expense.filter(category => category !== action.payload),
                }
            }else{
                return state
            }
        }
        
        // payload 为一个对象 {oldName:'XXX', newName:'AAA'}
        case CATEGORIES_ACTIONS.EDIT_EXPENSE_CATEGORY: {
            const { oldName, newName } = action.payload || {}
    
            // 输入验证
            if (!validInput(oldName) || !validInput(newName)) {
                return state
            }
            
            const oldIndex = state.expense.findIndex(category => category === oldName)
            const newIndex = state.expense.findIndex(category => category === newName)
            
            // 旧类别不存在 或 新名称已存在
            if (oldIndex === -1 || newIndex !== -1) {
                return state
            }
            
            // 执行修改
            const newExpenseCategories = [...state.expense]
            newExpenseCategories[oldIndex] = newName
            return { ...state, expense: newExpenseCategories}
        }           

        default:
            return state;
    }
}