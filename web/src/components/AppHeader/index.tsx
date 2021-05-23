import Link from 'next/link'
import Image from 'next/image'
import UserMenu from './UserMenu'
import SearchInput from './SearchInput'
import styles from './styles.module.scss'

interface AppHeaderProps {
  searchBox?: boolean
}

function AppHeader({ searchBox = true }: AppHeaderProps) {
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

      {searchBox && (
        <SearchInput />
      )}

      <UserMenu />
    </header>
  )
}

export default AppHeader
