import React from 'react'
import { useParams } from 'react-router-dom'

const profileRecord = () => {
  const { id } = useParams()
  console.log("idzzzzzzz",id)
  return (
    <div>profileRecord</div>
  )
}

export default profileRecord