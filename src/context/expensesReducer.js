// Action 类型常量
export const EXPENSE_ACTIONS = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE'
};

// 初始状态
export const initialState = [];

// 生成唯一ID的辅助函数
const _generateId = () => {
  // 简化的UUID生成（生产环境建议使用 crypto.randomUUID() 或 uuid 库）
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Reducer 函数
export const expensesReducer = (state, action) => {
  switch (action.type) {
    case EXPENSE_ACTIONS.ADD_EXPENSE: {
      // TODO: 实现添加支出逻辑
      // 提示：需要生成 id、创建日期，并添加到状态数组
      // payload 为一个不包含id,创建日期和更新日期的expense对象
      const newID = _generateId()
      const now = new Date().toISOString();
      const newExpense = {id:newID, createdAt: now, updatedAt: now, ...action.payload}
      return [...state, newExpense];
    }

    case EXPENSE_ACTIONS.DELETE_EXPENSE: {
      // TODO: 实现删除支出逻辑  
      // 提示：根据 action.payload.id 过滤数组
      // payload为e只包含id的对象
      return state.filter(expense => expense.id !== action.payload.id);
    }

    case EXPENSE_ACTIONS.EDIT_EXPENSE: {
      // TODO: 实现编辑支出逻辑
      // 提示：需要更新指定 id 的记录，并自动更新最后修改日期
      // payload 为一个部分expense对象
      const now = new Date().toISOString();
      return state.map(expense => expense.id === action.payload.id ? {...expense, ...action.payload, updatedAt:now} : expense );
    }

    default:
      return state;
  }
};

/* 
数据结构参考：
单条支出记录应包含以下字段：
{
  id: string,           // 唯一标识符
  amount: number,       // 金额
  category: string,     // 类别
  note: string,         // 备注
  createdAt: string,    // 创建日期 (ISO字符串)
  updatedAt: string     // 最后修改日期 (ISO字符串)
}

Action 结构参考：
ADD_EXPENSE: { type: 'ADD_EXPENSE', payload: { amount, category, note } }
DELETE_EXPENSE: { type: 'DELETE_EXPENSE', payload: { id } }
EDIT_EXPENSE: { type: 'EDIT_EXPENSE', payload: { id, ...updatedFields } }
*/ 