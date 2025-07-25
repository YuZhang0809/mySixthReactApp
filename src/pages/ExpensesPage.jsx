import React, { useState } from 'react'
import { useExpenses } from '../context/ExpensesContext'
import ExpenseForm from '../components/ExpenseForm'
import { EXPENSE_ACTIONS } from '../context/expensesReducer'

export default function ExpensesPage() {

  const {expenses, dispatch} = useExpenses()
  const [expensesToEdit, setExpensesToEdit] = useState([])

  function handleCancel(expense){
    const newExpensesToEdit = expensesToEdit.filter((e) => e.id !== expense.id)
    setExpensesToEdit(newExpensesToEdit)
  }

  function handleEditSubmit(expense){
    const newExpensesToEdit = expensesToEdit.filter((e) => e.id !== expense.id)
    setExpensesToEdit(newExpensesToEdit)
  }

  function handleEdit(expense){
    setExpensesToEdit(prev => [...prev, expense])
  }

  function handleDelete(expense){
    dispatch({payload: expense, type: EXPENSE_ACTIONS.DELETE_EXPENSE})
  }

  return (
    <>
      <div>
        <h1>💰 支出管理</h1>
        <p>记录和管理你的日常支出</p>
      </div>
      
      <div>
        <h2>➕ 添加新支出</h2>
        <ExpenseForm onCancel={handleCancel} />
      </div>
      
      <div>
        <h2>支出列表({expenses.length}条记录)</h2>
        {expenses.length === 0 ? (
          <div>🎉 还没有支出记录，开始记录你的第一笔支出吧！</div>
        ) : (
          <>
            {expenses.map(expense => {
              const isEditing = expensesToEdit.filter(exp => exp.id === expense.id).length > 0
              
              return (
                <div key={expense.id}>
                  {isEditing ? (
                    <ExpenseForm expenseToEdit={expense} onCancel={handleCancel} onEditSubmit={handleEditSubmit}/>
                  ) : (
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
                        <button onClick={() => handleEdit(expense)}>编辑</button>
                        <button onClick={() => handleDelete(expense)}>删除</button>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}
