import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (

    <div>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/expenses">支出</NavLink>
        <NavLink to="/budget">预算</NavLink>
        <NavLink to="/incomes">收入</NavLink>
        <NavLink to="/settings">设置</NavLink>
    </div>
  )
}
