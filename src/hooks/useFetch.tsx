import { useState, useEffect } from 'react'

export function useFetch<D = unknown>(url: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<D | null>(null)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    const getQuestions = async () => {
      try {
        const response = await fetch(url, {
          signal: controller.signal
        })

        const data = await response.json()

        setData(data)
      } catch (err) {
        setIsError(true)

        if (err instanceof Error) console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getQuestions()

    return () => {
      controller.abort()
    }
  }, [url])

  return { isLoading, data, isError } as const
}
