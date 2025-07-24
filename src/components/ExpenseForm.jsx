// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useExpenses } from '../context/ExpensesContext'

// 预定义支出类别
const EXPENSE_CATEGORIES = [
  '餐饮', '交通', '购物', '娱乐', '医疗', '教育', '其他'
]

// eslint-disable-next-line no-unused-vars
export default function ExpenseForm({ expenseToEdit, onCancel }) {
  // eslint-disable-next-line no-unused-vars
  const { dispatch } = useExpenses()

  // TODO: 定义表单状态
  // 提示：需要 amount, category, date, note 字段
  const [expense, setExpense] = useState(
        {
        amount : '',
        category : '',
        date : new Date().toISOString().split('T')[0],
        note : ''
        }
    )

  // TODO: 定义验证错误状态
  const [errors, setErrors] = useState(
        {
        amount : '',
        category : '',
        date : '',
        note : ''
        }
    )

  // TODO: 处理编辑模式的数据初始化
  // 提示：当 expenseToEdit 改变时，如何更新表单？
  useEffect(() => {
    if (expenseToEdit) {
        setExpense({
            amount: expenseToEdit.amount,
            category: expenseToEdit.category,
            date: expenseToEdit.date.split('T')[0],
            note: expenseToEdit.note
            })
    } else {
        setExpense(
            {
            amount : '',
            category : '',
            date : new Date().toISOString().split('T')[0],
            note : ''
            }
        )
    }
  }
  ,[expenseToEdit]  
  )


  // TODO: 实现输入变化处理函数
  // 提示：handleInputChange(e) - 更新状态 + 实时验证
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setExpense({...expense,[name]: value})
    validateField(name, value)
  }

  // TODO: 实现字段验证函数
  // 提示：validateField(name, value) - 验证单个字段
  const validateField = (name, value) => {
    const newErrors = { ...errors }
    switch (name) {
        case 'amount':
            if (!value || parseInt(value) <= 0) {
                newErrors[name] = '请输入有效金额'
            }
            else{
                delete newErrors[name]
            }
            break

        case 'category':
            if (!value) {
                newErrors[name] = '请选择类别'
            }
            else{
                delete newErrors[name]
            }
            break
        case 'date':

            break
        case 'note':

            break
        default:
            break;
    }
    setErrors(newErrors)
  }

  // TODO: 实现表单提交处理
  // 提示：handleSubmit(e) - 验证 + dispatch action + 重置
  const handleSubmit = (e) => {
    e.preventDefault() 
    // 直接检查值，不依赖 errors 状态
    const amountValid = expense.amount && parseInt(expense.amount) > 0
    const categoryValid = expense.category !== ''

    if (amountValid && categoryValid) {
        if (expenseToEdit) {
            dispatch({payload:{id:expenseToEdit.id,...expense, amount: parseInt(expense.amount, 10) || 0},type: 'EDIT_EXPENSE'})
        } else {
            dispatch({payload:{...expense, amount: parseInt(expense.amount, 10) || 0},type: 'ADD_EXPENSE'})
        }
    }
  }

  // TODO: 实现取消处理
  // 提示：handleCancel() - 重置表单 + 调用回调
  const handleCancel = () => {
    if (expenseToEdit) {
        setExpense({
            amount: expenseToEdit.amount,
            category: expenseToEdit.category,
            date: expenseToEdit.date.split('T')[0] ,
            note: expenseToEdit.note
            })
    } else {
        setExpense(
            {
            amount : '',
            category : '',
            date : new Date().toISOString().split('T')[0],
            note : ''
            }
        )
    }
    if (onCancel){
        onCancel()
    }
  }

  return (
    <div>
      <h3>{expenseToEdit ? '编辑支出' : '添加支出'}</h3>
      
      {/* TODO: 实现表单结构 */}
      {/* 提示：需要 form, 4个输入字段, 2个按钮 */}
      {/* 字段：金额(number), 类别(select), 日期(date), 备注(textarea) */}
      
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='amountInput'>金额：</label>
            <input type='number' id='amountInput' value={expense.amount} name='amount' onChange={handleInputChange}/>
            {errors.amount && <span style={{color: 'red'}}>{errors.amount}</span>}
        </div>
        <div>
            <label htmlFor='categorySelect'>类别：</label>
            <select id='categorySelect' value={expense.category} onChange={handleInputChange} name='category'>
            <option value="" disabled>-- 请选择 --</option>
            {EXPENSE_CATEGORIES.map((option) => {
                return (
                    <option key={option} value={option}>{option}</option>
                )
            })}
            </select>
            {errors.category && <span style={{color: 'red'}}>{errors.category}</span>}
        </div>
        <div>
            <label htmlFor='dateInput'>日期：</label>
            <input type='date' id='dateInput' value={expense.date} name='date' onChange={handleInputChange}/>
            {errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
        </div>
        <div>
            <label htmlFor='noteInput'>备注：</label>
            <textarea 
                id='noteInput' 
                name='note' 
                value={expense.note} 
                onChange={handleInputChange}
                placeholder="请输入备注（可选）"
                rows="3"
            />
        </div>
        <button type="button" onClick={handleCancel}>取消</button>
        <button type="submit">提交</button>
      </form>
    </div>
  )
}
