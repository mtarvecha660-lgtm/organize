import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const getSections = async () => {
  const { data } = await axios.get(`${API_BASE}/sections`)
  return data
}

export const createSection = async (payload) => {
  const { data } = await axios.post(`${API_BASE}/sections`, payload)
  return data
}

export const getResources = async () => {
  const { data } = await axios.get(`${API_BASE}/resources`)
  return data
}

export const createResource = async (formData) => {
  const { data } = await axios.post(`${API_BASE}/resources`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const deleteResource = async (id) => {
  const { data } = await axios.delete(`${API_BASE}/resources/${id}`)
  return data
}
