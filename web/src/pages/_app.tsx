import { useRouter } from 'next/router'
import { ToastProvider } from 'react-toast-notifications'
import { CompanyProvider } from '@/contexts'
import Header from '@/components/AppHeader'
import '@/global-styles.scss'

function App({ Component, pageProps }) {
  const { route } = useRouter()
  const hideSearchBox = ![
    '/companies',
  ].includes(route)

  return (
    <ToastProvider placement="bottom-right">
      <CompanyProvider>
        <Header searchBox={!hideSearchBox} />

        <main>
          <Component {...pageProps} />
        </main>
      </CompanyProvider>
    </ToastProvider>
  )
}

export default App
