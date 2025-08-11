import React from 'react'
import CategoriesManager from '../components/CategoriesManager'
import BudgetList from '../components/BudgetList'
import BudgetSettings from '../components/BudgetSettings'

export default function SettingsPage() {
  return (
    <>
      <div>Settings</div>
      <CategoriesManager></CategoriesManager>
      <BudgetSettings></BudgetSettings>
    </>

  )
}
