import { useRouter } from 'next/router'
import Header from '@/components/AppHeader'
import '@/global-styles.scss'

function App({ Component, pageProps }) {
  const { route } = useRouter()
  const hideSearchBox = [
    '/companies/[id]',
  ].includes(route)

  return <>
    <Header searchBox={!hideSearchBox} />

    <main>
      <Component {...pageProps} />
    </main>
  </>
}

export default App
