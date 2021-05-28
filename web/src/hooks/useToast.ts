import { useToasts } from 'react-toast-notifications'

import type { Options } from 'react-toast-notifications'

const defaultOptions: Options = {
  autoDismissTimeout: 8000,
  transitionDuration: 300,
  autoDismiss: true,
  appearance: 'info',
}

const useToast = (customOptions: Options = {}) => {
  const { addToast } = useToasts()
  const mergedOptions: Options = { ...defaultOptions, ...customOptions }

  return {
    success: (message) => addToast(message, { ...mergedOptions, appearance: 'success' }),
    warning: (message) => addToast(message, { ...mergedOptions, appearance: 'warning' }),
    error: (message) => addToast(message, { ...mergedOptions, appearance: 'error' }),
    info: (message) => addToast(message, { ...mergedOptions }),
  }
}

export default useToast
