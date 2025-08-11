import React, { useState, useCallback, useMemo } from 'react'
import { useExpenses } from '../context/ExpensesContext'
import ExpenseForm from '../components/ExpenseForm'
import { EXPENSE_ACTIONS } from '../context/expensesReducer'
import ExpenseItem from '../components/ExpenseItem'

export default function ExpensesPage() {

  const {expenses, dispatch} = useExpenses()
  const [expensesToEdit, setExpensesToEdit] = useState([])
  const [selectedFilter, setSelectedFilter] = useState({date: '', category: []})
  const [filter, setFilter] = useState({})

  const handleCancel = useCallback(expense => {
    const newExpensesToEdit = expensesToEdit.filter((e) => e.id !== expense.id)
    setExpensesToEdit(newExpensesToEdit)  
  },[expensesToEdit])


  const handleEditSubmit = useCallback(expense => {
    const newExpensesToEdit = expensesToEdit.filter((e) => e.id !== expense.id)
    setExpensesToEdit(newExpensesToEdit)    
  },[expensesToEdit])

  const handleEdit = useCallback(expense => {
    setExpensesToEdit(prev => [...prev, expense])
  },[])

  const handleDelete = useCallback(expense => {
    dispatch({payload: expense, type: EXPENSE_ACTIONS.DELETE_EXPENSE})
  },[dispatch])

  const handleFilterChange = (e) => {
    const {name, value} = e.target
    setSelectedFilter(prev => ({...prev, [name]:value}))
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    setFilter({...selectedFilter})
  }

  const filteredExpenses = useMemo(() => {
    if (filter.date) {
       const dateFilteredExpenses = expenses.filter(expense => expense.date.substring(0, 7) === filter.date)
       return dateFilteredExpenses 
    }
    else{
      return expenses
    }
  }, [expenses, filter])

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

      <form onSubmit={handleFilterSubmit}>
        <label htmlFor='dateFilter'>日期：</label>
        <input id='date' type='month' value={selectedFilter.date} name='date' onChange={handleFilterChange} />
        <button type='submit' >过滤</button>
      </form>
      
      <div>
        <h2>支出列表({filteredExpenses.length}条记录)</h2>
        {filteredExpenses.length === 0 ? (
          <div>🎉 还没有支出记录，开始记录你的第一笔支出吧！</div>
        ) : (
          <>
            {filteredExpenses.map(expense => {
              const isEditing = expensesToEdit.filter(exp => exp.id === expense.id).length > 0
              
              return (
                <div key={expense.id}>
                  {isEditing ? (
                    <ExpenseForm expenseToEdit={expense} onCancel={handleCancel} onEditSubmit={handleEditSubmit}/>
                  ) : (
                    <>
                      <div>
                        <ExpenseItem onEdit={handleEdit} onDelete={handleDelete} expense={expense}></ExpenseItem>
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
