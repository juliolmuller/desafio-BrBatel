import styles from './styles.module.scss'

function UserMenu() {
  return (
    <div className={styles.menuWrapper}>
      <img src="/img/dummy-avatar.png" alt="avatar do usuário" />

      <span>Julio L. Muller</span>
    </div>
  )
}

export default UserMenu
