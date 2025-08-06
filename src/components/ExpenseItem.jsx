import React, { memo } from 'react'

const ExpenseItem = memo(function ExpenseItem({expense, onEdit, onDelete}) {
  return (
    <>
    <div>
      <div>
        <span>🏷️ {expense.category}</span>
        <span>💰 ¥{expense.amount}</span>
        <span>📅 {expense.date}</span>
      </div>
      <div>📝 {expense.note || '无备注'}</div>
    </div>
    <div>
      <button onClick={() => onEdit(expense)}>编辑</button>
      <button onClick={() => onDelete(expense)}>删除</button>
    </div>
    </>
  )
})

export default ExpenseItem