// Action 类型常量
export const INCOME_ACTIONS = {
    ADD_INCOME: 'ADD_INCOME',
    DELETE_INCOME: 'DELETE_INCOME',
    EDIT_INCOME: 'EDIT_INCOME'
  };
  
  // 初始状态
  export const initialState = [];
  
  // 生成唯一ID的辅助函数
  const _generateId = () => {
    // 简化的UUID生成（生产环境建议使用 crypto.randomUUID() 或 uuid 库）
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  
  // Reducer 函数
  export const incomesReducer = (state, action) => {
    switch (action.type) {
      case INCOME_ACTIONS.ADD_INCOME: {
        // TODO: 实现添加收入逻辑
        // 提示：需要生成 id、创建日期，并添加到状态数组
        // payload 为一个不包含id,创建日期和更新日期的expense对象
        const newID = _generateId()
        const now = new Date().toISOString();
        const newIncome = {id:newID, createdAt: now, updatedAt: now, ...action.payload}
        return [...state, newIncome];
      }
  
      case INCOME_ACTIONS.DELETE_INCOME: {
        // TODO: 实现删除收入逻辑  
        // 提示：根据 action.payload.id 过滤数组
        // payload为e只包含id的对象
        return state.filter(income => income.id !== action.payload.id);
      }
  
      case INCOME_ACTIONS.EDIT_INCOME: {
        // TODO: 实现编辑收入逻辑
        // 提示：需要更新指定 id 的记录，并自动更新最后修改日期
        // payload 为一个部分income对象
        const now = new Date().toISOString();
        return state.map(income => income.id === action.payload.id ? {...income, ...action.payload, updatedAt:now} : income );
      }
  
      default:
        return state;
    }
  };
  
  /* 
  数据结构参考：
  单条收入记录应包含以下字段：
  {
    id: string,           // 唯一标识符
    amount: number,       // 金额
    source: string,     // 来源
    note: string,         // 备注
    date: string,         // 收入发生日期 (YYYY-MM-DD格式，如 "2024-12-19")
    createdAt: string,    // 记录创建时间 (ISO字符串)
    updatedAt: string     // 最后修改日期 (ISO字符串)
  }
  
  Action 结构参考：
  ADD_INCOME: { type: 'ADD_INCOME', payload: { amount, source, note, date } }
  DELETE_INCOME: { type: 'DELETE_INCOME', payload: { id } }
  EDIT_INCOME: { type: 'EDIT_INCOME', payload: { id, ...updatedFields } }
  */ 