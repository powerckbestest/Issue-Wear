import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

export default function CartPage(): JSX.Element {
    const productsInCart = useAppSelector((state) => state.product)
  return (
    <div>CartPage</div>
  )
}
