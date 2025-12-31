import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://paste-bin-lite-backend-7t5x.vercel.app/'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const pasteAPI = {
  // Create a new paste
  createPaste: async (content, ttl_seconds = null, max_views = null) => {
    try {
      const payload = { content }
      if (ttl_seconds) payload.ttl_seconds = parseInt(ttl_seconds)
      if (max_views) payload.max_views = parseInt(max_views)

      const response = await apiClient.post('/api/create-paste', payload)
      return {
        success: true,
        data: response.data.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create paste',
        status: error.response?.status,
      }
    }
  },

  // Get paste content (JSON)
  getPaste: async (id) => {
    try {
      const response = await apiClient.get(`/api/get-paste/${id}`)
      return {
        success: true,
        data: response.data.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch paste',
        status: error.response?.status,
      }
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/api/healthz')
      return response.data.ok === true
    } catch {
      return false
    }
  },
}

export default apiClient