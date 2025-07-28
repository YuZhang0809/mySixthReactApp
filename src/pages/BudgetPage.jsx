import React from 'react'
import { useBudgets } from '../context/BudgetsContext'
import BudgetList from '../components/BudgetList'
import BudgetForm from '../components/BudgetForm'

export default function BudgetPage() {

  return (
    <>
      <div>
        <h1>💰 预算管理</h1>
      </div>

      <div>
        <BudgetForm></BudgetForm>
      </div>
      

      <div>
        <BudgetList></BudgetList>
      </div>

    
    
    
    
    
    
    </>
  )
}
