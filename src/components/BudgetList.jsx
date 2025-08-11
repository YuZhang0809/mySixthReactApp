import React, { useMemo } from 'react'
import { useBudgets } from '../context/BudgetsContext'
import { useExpenses } from "../context/ExpensesContext";
import { BUDGETS_ACTIONS } from '../context/budgetsReducer'
import { useCategories } from '../context/CategoriesContext';

export default function BudgetList({filter}) {

    const {budgets, dispatch} = useBudgets()
    const {expenses} = useExpenses()
    const {categories} = useCategories()

    const handleDelete = (budgetCategory) => {
        dispatch({type:BUDGETS_ACTIONS.DELETE_BUDGET,payload:{category: budgetCategory, date: filter.date}})
    }

    // const handleClear = () => {
    //     dispatch({type:BUDGETS_ACTIONS.CLEAR_ALL_BUDGETS})
    // }

    // const handleReset = (categories) => {
    //     dispatch({type:BUDGETS_ACTIONS.RESET_BUDGETS, payload:categories})
    // }

    const budgetStates = useMemo(() => {
        const currentMonthData = budgets.find(monthData => monthData.date === filter.date)
        const monthBudgets = currentMonthData?.budgets || {}

        const getSpentByCategory = (category, date) => {
            const totalSpent = expenses.filter(exp => exp.category === category && exp.date.slice(0, 7) === date).reduce((sum, exp) => sum + exp.amount,0)

            return totalSpent
        }

        const stats = {}
        if (monthBudgets) {
            // 显示逻辑以“类别源”为准
            // const allCategories = new Set(
            //     [...expenses.map(exp => exp.category), ...Object.keys(monthBudgets)]
            // )
            const allCategories = new Set([...categories])
            allCategories.forEach(category => {
                const spent = getSpentByCategory(category, filter.date)
                const budget = monthBudgets[category] || 0 
                const hasSetBudget = monthBudgets[category] !== null && monthBudgets[category] !== undefined

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
                        message:-`已超预算${spent - budget}`,
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
        }

        return stats
    }
        ,[budgets, expenses, filter.date, categories])


  return (
    <>
        <div>月度预算清单</div>
        {/* <button onClick={() => handleReset(categories)}>重置所有预算</button> */}
        {/* <button onClick={handleClear}>删除所有预算</button> */}
        <ul>
            {budgetStates ? Object.entries(budgetStates).map((budgetState) => {
                const {spent, status, budget, message, remaining} = budgetState[1]
                return(
                    <li key={budgetState[0]}>
                        <span>{budgetState[0]}</span>
                        <span>{filter.date}预算为：{status === 'no-budget'?0:budget}</span>
                        <span>目前支出为：{spent}</span>
                        <span>{message}</span>
                        <span>{filter.date}剩余预算为{remaining}</span>
                        <button onClick={() => handleDelete(budgetState[0])}>删除</button>
                    </li>
                )
            }): <span>当前月份无预算！</span>}
        </ul>
    </>
  )
}
