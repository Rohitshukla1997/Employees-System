/* eslint-disable prettier/prettier */

import { api } from './api'

// GET: Fetch data from an endpoint
export const getData = async ({ queryKey }) => {
  const [endpoint] = queryKey
  const response = await api.get(endpoint)
  return response.data
}

// POST: Create new data
export const postData = async ({ endpoint, payload }) => {
  const response = await api.post(endpoint, payload)
  return response.data
}

// PUT: Replace data
export const putData = async ({ endpoint, payload }) => {
  const response = await api.put(endpoint, payload)
  return response.data
}

// PATCH: Update partial data
export const patchData = async ({ endpoint, payload }) => {
  const response = await api.patch(endpoint, payload)
  return response.data
}

// DELETE: Delete an item
export const deleteData = async ({ endpoint }) => {
  const response = await api.delete(endpoint)
  return response.data
}
