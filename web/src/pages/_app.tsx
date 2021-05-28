import { useRouter } from 'next/router'
import Header from '@/components/AppHeader'
import { CompanyProvider } from '@/contexts'
import '@/global-styles.scss'

function App({ Component, pageProps }) {
  const { route } = useRouter()
  const hideSearchBox = ![
    '/companies',
  ].includes(route)

  return (
    <CompanyProvider>
      <Header searchBox={!hideSearchBox} />

      <main>
        <Component {...pageProps} />
      </main>
    </CompanyProvider>
  )
}

export default App
