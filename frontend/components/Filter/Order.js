import { useRouter } from 'next/router'
import React from 'react'

const Order = () => {
  const router = useRouter();

  const handleChange = e => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ordering: e.target.value }
    })
  }
  return (
    <select onChange={handleChange} name="order" id="" className="form-select">
      <option value="default">Order by</option>
      <option value="price">Price (Low to High)</option>
      <option value="-price">Price (High to Low)</option>
      <option value="name">Name (A to Z)</option>
      <option value="-name">Name (Z to A)</option>
    </select>
  )
}

export default Order