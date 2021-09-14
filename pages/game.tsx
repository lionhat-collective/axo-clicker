import { useMoralis } from "react-moralis"
import styles from '../styles/Game.module.css'
import { cuddles } from "../pouch"
import { Avatar } from "../components/avatar"
import { useAxolittles } from '../hooks'
import { useClicker } from '../hooks/use-game'

function AxoClickerGame() {
    const { authenticate, isAuthenticated, user } = useMoralis()
    const axolittles = useAxolittles()
    const [{ wallet, ledger }, { cuddle, buyHelper }] = useClicker()
    
    if (!isAuthenticated || !user) {
        return (
            <div>
                <button onClick={() => authenticate()}>Login</button>
            </div>
        )
    }
    
    const activeAxo = axolittles.find(axo => typeof axo.image !== 'undefined')

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                {activeAxo && (
                    <Avatar
                        src={activeAxo.image}
                        size={64}
                    />
                )}
                <div>
                    <h2 className={styles.axoName}>{activeAxo?.name ?? ''}</h2>
                    <h1 className={styles.userAddress}>{user.get('ethAddress')}</h1>
                </div>
            </div>
            <button
                onClick={() => cuddle()}
                style={{
                    marginBottom: '1rem',
                    backgroundColor: 'blue',
                    borderRadius: '50%',
                    width: 64,
                    height: 64,
                    color: '#FFF',
                    display: 'block',
                }}
            >
                click me
            </button>
            {`${wallet.get(cuddles) ?? 0} Cuddles`}
            <button onClick={() => buyHelper()}>Buy Helper</button>
        </div>
    )
}

export default AxoClickerGame