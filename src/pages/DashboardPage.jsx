import React, { useState } from 'react'
import { useExpenses} from "../context/ExpensesContext";
import { useMemo } from 'react';

export default function DashboardPage() {

  const getCurrentYearMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`  // "2024-01"
}

  const {expenses} = useExpenses()
  const [filter, setFilter] = useState({'currentDate':getCurrentYearMonth() })

  const expensesState = useMemo(() => {

    const isSameYearMonth = (expenseDate) => {
      return expenseDate.substring(0, 7) === filter.currentDate
    }
    
    const currentExpenses = expenses.filter((expense) => isSameYearMonth(expense.date))
    const result = currentExpenses.reduce((accumulator, currentItem) => {
      const {amount, category} = currentItem

      //       {
      //   totalAmount: 700,
      //   categories: {
      //     '餐饮': { amount: 500, percentage: 71.4 },
      //     '交通': { amount: 200, percentage: 28.6 }
      //   }
      // }

      if (!accumulator.categories[category]) {
        accumulator.categories[category] = { 
          amount: 0, 
          percentage: 0  // 预留百分比字段
        };
      }
      accumulator.categories[category].amount += amount;

      if (accumulator['totalAmount']) {
        accumulator['totalAmount'] += amount
      }
      else{
        accumulator['totalAmount'] = amount
      }
      return accumulator

    },{totalAmount:0,categories: {}})

    // 阶段2：计算百分比
    const totalAmount = result.totalAmount || 0;
    
    if (totalAmount > 0) {  // 避免除零
      Object.keys(result.categories).forEach(category => {
        const amount = result.categories[category].amount;
        result.categories[category].percentage = ((amount / totalAmount) * 100).toFixed(1);
      });
    }

    return result

  }, [expenses, filter.currentDate])

  return (
    <>
      <div>DashboardPage</div>
      <div>
        <ul>
          {Object.entries(expensesState.categories).map((expenseState) => {
            return <li key={expenseState[0]}>类别：{expenseState[0]}，金额：{expenseState[1].amount}百分比：{expenseState[1].percentage}%</li>
          })}
          <li><li key={'totalAmount'}>类别：{'合计'}，金额：{expensesState.totalAmount}</li></li>
        </ul>
      </div>
    </>
  )
}
