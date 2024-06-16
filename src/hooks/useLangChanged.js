import { useLayoutEffect, useRef } from 'react'
import { getUrlParts } from '../utils/urlUtils'
import usePrevious from './usePrevious'
import { useLocation } from 'react-router-dom'


const useLocationChange = () => {
  const location = useLocation()
  const prevLocation = usePrevious(location)

  const locationChangeRef = useRef({ url: false, lang: false })

  useLayoutEffect(() => {
    const urlParts = getUrlParts(location)
    locationChangeRef.current.lang =
      !!prevLocation &&
      urlParts.lang !== getUrlParts(prevLocation).lang
    locationChangeRef.current.url = location.pathname !== prevLocation?.pathname ||
      location.hash !== prevLocation?.hash
  }, [location])

  return locationChangeRef
}

export default useLocationChange