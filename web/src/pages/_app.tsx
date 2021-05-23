import Header from '@/components/AppHeader'
import '@/global-styles.scss'

function App({ Component, pageProps }) {
  return <>
    <Header />

    <main>
      <Component {...pageProps} />
    </main>
  </>
}

export default App
