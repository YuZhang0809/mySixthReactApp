import React, { useMemo } from 'react'
import { useBudgets } from '../context/BudgetsContext'
import { useExpenses } from "../context/ExpensesContext";
import { BUDGETS_ACTIONS } from '../context/budgetsReducer'

export default function BudgetList() {

    const {budgets, dispatch} = useBudgets()
    const {expenses} = useExpenses()

    const handleDelete = (budgetCategory) => {
        dispatch({type:BUDGETS_ACTIONS.DELETE_BUDGET,payload:budgetCategory})
    }

    const handleClear = () => {
        dispatch({type:BUDGETS_ACTIONS.CLEAR_ALL_BUDGETS})
    }

    const handleReset = () => {
        dispatch({type:BUDGETS_ACTIONS.RESET_BUDGETS})
    }

    const budgetStates = useMemo(() => {
        const allCategories = new Set(
            [...expenses.map(exp => exp.category), ...Object.keys(budgets)]
        )

        const getSpentByCategory = (category) => {
            const totalSpent = expenses.filter(exp => exp.category === category).reduce((sum, exp) => sum + exp.amount,0)

            return totalSpent
        }

        const stats = {}
        allCategories.forEach(category => {
            const spent = getSpentByCategory(category)
            const budget = budgets[category] || 0 
            const hasSetBudget = budgets[category] !== null && budgets[category] !== undefined

            stats[category] = {spent, budget}

            if (!hasSetBudget) {
                stats[category] = {...stats[category],
                    status:'no-budget',
                    overspent:0,
                    message:'未设置预算',
                    remaining: 0
                }
            }
            else if (spent > budget && hasSetBudget) {
                stats[category] = {...stats[category],
                    status:'over-budget',
                    overspent: spent - budget,
                    message:`已超预算${spent - budget}`,
                    remaining: 0
                }
            }
            else if (budget >= spent && hasSetBudget) {
                stats[category] = {...stats[category],
                    status:'normal',
                    overspent: 0,
                    message:`未超预算`,
                    remaining: budget - spent
                }            
            }
        })

        return stats
    }
        ,[budgets, expenses])


  return (
    <>
        <div>预算清单</div>
        <button onClick={handleReset}>重置所有预算</button>
        <button onClick={handleClear}>删除所有预算</button>
        <ul>
            {Object.entries(budgetStates).map((budgetState) => {
                const {spent, status, budget, message, remaining} = budgetState[1]
                return(
                    <li key={budgetState[0]}>
                        <span>{budgetState[0]}</span>
                        <span>预算为：{status === 'no-budget'?0:budget}</span>
                        <span>目前支出为：{spent}</span>
                        <span>{message}</span>
                        <span>剩余预算为{remaining}</span>
                        <button onClick={() => handleDelete(budgetState[0])}>删除</button>
                    </li>
                )
            })}
        </ul>
    </>
  )
}
