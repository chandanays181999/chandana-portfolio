import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 1800) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let animId
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        animId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }
    animId = requestAnimationFrame(step)
    // Cleanup: cancel animation frame on unmount
    return () => cancelAnimationFrame(animId)
  }, [started, target, duration])

  return [ref, count]
}

export default useCountUp
