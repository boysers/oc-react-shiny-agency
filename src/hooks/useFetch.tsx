import { useState, useEffect } from 'react'

export function useFetch<D = unknown>(url: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<D | null>(null)
  const [error, setIsError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    const getQuestions = async () => {
      try {
        const response = await fetch(url, {
          signal: controller.signal
        })

        if (!response.ok) {
          const { errorMessage } = await response.json()
          throw new Error(errorMessage)
        } else {
          const data = await response.json()
          setData(data)
        }
      } catch (err) {
        if (err instanceof Error) {
          setIsError(err.message)
          console.error('API ERROR:', err.message)
        } else {
          setIsError('API ERROR')
        }
      } finally {
        setIsLoading(false)
      }
    }

    getQuestions()

    return () => {
      controller.abort()
    }
  }, [url])

  return { isLoading, data, isError: error } as const
}
