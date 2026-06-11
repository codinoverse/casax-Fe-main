const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const { headers, ...restOptions } = options
  const config = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.message || data.error || 'Something went wrong')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export function get(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'GET' })
}

export function post(endpoint, body, options = {}) {
  return request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) })
}

export function put(endpoint, body, options = {}) {
  return request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) })
}

export function del(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'DELETE' })
}

export default { get, post, put, del }
