import React from 'react'
import BudgetList from '../components/BudgetList'
import BudgetForm from '../components/BudgetForm'
import { useState } from 'react'

export default function BudgetPage() {

  const getCurrentYearMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`  // "2024-01"
}

  const [selectedMonthFilter, setSelectedMonthFilter] = useState(getCurrentYearMonth());
  const [filter, setFilter] = useState({'date':getCurrentYearMonth() })

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilter(prev => ({...prev, 'date': selectedMonthFilter}))
  }

  const handleChange = (e) => {
    setSelectedMonthFilter(e.target.value)
  }

  return (
    <>
      <div>
        <h1>💰 月度预算管理</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input type='month' id='monthInput' value={selectedMonthFilter} onChange={handleChange}/>
        <button type='submit'>过滤</button>
      </form>

      <div>
        <BudgetForm filter={filter}></BudgetForm>
      </div>
      

      <div>
        <BudgetList filter={filter}></BudgetList>
      </div>
    </>
  )
}
