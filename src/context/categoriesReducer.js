// Action 类型常量
export const CATEGORIES_ACTIONS = {
    ADD_CATEGORY: 'ADD_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    EDIT_CATEGORY: 'EDIT_CATEGORY'
  };
  
// 初始状态
export const initialState = ['餐饮', '交通', '购物', '娱乐', '医疗', '教育', '其他'];

export const categoriesReducer = (state, action) => {

    const validInput = (category) => {
        return category && category.trim().length > 0
    }

    switch (action.type) {

        // payload 为一个字符串
        case CATEGORIES_ACTIONS.ADD_CATEGORY: {
            const index = state.findIndex(category => category === action.payload)
            if (index === -1 && validInput(action.payload)) {
                return [...state, action.payload]
            }
            else{
                return state
            }
        }   
        
        // payload 为一个字符串
        case CATEGORIES_ACTIONS.DELETE_CATEGORY: {
            const index = state.findIndex(category => category === action.payload)
            if (index !== -1) {
                return state.filter(category => category !== action.payload)   
            }else{
                return state
            }
        }
        
        // payload 为一个对象 {oldName:'XXX', newName:'AAA'}
        case CATEGORIES_ACTIONS.EDIT_CATEGORY: {
            const { oldName, newName } = action.payload || {}
    
            // 输入验证
            if (!validInput(oldName) || !validInput(newName)) {
                return state
            }
            
            const oldIndex = state.findIndex(category => category === oldName)
            const newIndex = state.findIndex(category => category === newName)
            
            // 旧类别不存在 或 新名称已存在
            if (oldIndex === -1 || newIndex !== -1) {
                return state
            }
            
            // 执行修改
            const newState = [...state]
            newState[oldIndex] = newName
            return newState
        }           

        default:
            return state;
    }
}