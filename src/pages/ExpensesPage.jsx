import React, { useState, useCallback, useMemo } from 'react'
import { useExpenses } from '../context/ExpensesContext'
import ExpenseForm from '../components/ExpenseForm'
import { EXPENSE_ACTIONS } from '../context/expensesReducer'
import ExpenseItem from '../components/ExpenseItem'
import ExpenseFilter from '../components/ExpenseFilter'

export default function ExpensesPage() {

  const {expenses, dispatch} = useExpenses()
  const [expensesToEdit, setExpensesToEdit] = useState([])
  const [filter, setFilter] = useState({
    categories: [], 
    dateRange:{start: '', end: ''},
    amountRange: {min: null, max: null}
  })

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

  const filteredExpenses = useMemo(() => {
    // 1. 日期范围过滤
    let dateFilteredExpenses
    if (filter.dateRange.start || filter.dateRange.end) {
      dateFilteredExpenses = expenses.filter(expense => {
        const expenseDate = expense.date.split('T')[0]  // 处理可能的时间戳格式
        return (!filter.dateRange.start || expenseDate >= filter.dateRange.start) &&
               (!filter.dateRange.end || expenseDate <= filter.dateRange.end)
      })
    } else {
      dateFilteredExpenses = [...expenses]
    }

    // 2. 类别过滤
    let categoriesFilteredExpenses
    if (filter.categories.length > 0) {
      categoriesFilteredExpenses = expenses.filter(expense => filter.categories.includes(expense.category))
    } else {
      categoriesFilteredExpenses = [...expenses]
    }

    // 3. 金额范围过滤
    let amountFilteredExpenses
    if ((filter.amountRange.min !== null || filter.amountRange.max !== null)) {
      amountFilteredExpenses = expenses.filter(expense => {
        return (filter.amountRange.min === null || expense.amount >= filter.amountRange.min) &&
               (filter.amountRange.max === null || expense.amount <= filter.amountRange.max)
      })
    } else {
      amountFilteredExpenses = [...expenses]
    }

    // 5. 组合所有过滤结果 - 取交集
    const filterArrays = [dateFilteredExpenses, categoriesFilteredExpenses, amountFilteredExpenses]
    
    const result = expenses.filter(expense => 
      filterArrays.every(filterArray => 
        filterArray.some(filteredItem => filteredItem.id === expense.id)
      )
    )

    return result
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

      <div>
        <h2>过滤支出！</h2>
        <ExpenseFilter setFilter={setFilter} />
      </div>
      
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
