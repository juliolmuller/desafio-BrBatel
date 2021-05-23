import Image from 'next/image'
import Link from 'next/link'
import SearchInput from './SearchInput'
import UserMenu from './UserMenu'
import styles from './styles.module.scss'

function AppHeader() {
  return (
    <header className={styles.headerWrapper}>
      <Link href="/"><a>
        <Image
          className={styles.logo}
          src="/img/logo-color.png"
          alt="logo BrBatel"
          objectFit="contain"
          height="192"
          width="617"
        />
      </a></Link>

      <SearchInput />
      <UserMenu />
    </header>
  )
}

export default AppHeader
