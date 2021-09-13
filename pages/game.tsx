import { useEffect, useState } from "react"
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { add, } from 'merchant.js'

const useAxolittles = () => {
    const { user } = useMoralis()
    const {
        token: {
            getTokenMetadata,
        },
        account: {
            getNFTsForContract
        }
    } = useMoralisWeb3Api()
    const { data: axolittlesNFTData } = useMoralisWeb3ApiCall(getNFTsForContract, {
        address: user?.get('ethAddress'),
        token_address: '0xf36446105fF682999a442b003f2224BcB3D82067',
    })
    const [axolittles, setAxolittles] = useState<unknown[]>([])
    useEffect(() => {
        function getTokenMetadata(nft: string) {
            return JSON.parse(nft)
        }
        if (axolittlesNFTData?.result) {
            setAxolittles(axolittlesNFTData.result.map(nft => (
                {
                    id: nft.token_id,
                    uri: nft.token_uri,
                    metadata: nft.metadata ? getTokenMetadata(nft.metadata) : {}
                }
            )))
        }
    }, [axolittlesNFTData])

    return axolittles
}

const useClicker = () => {
    const [wallet, setWallet] = useState(new Map<string, number>())
    const [ledger, setLedger] = useState(new Map<string, number>())

    useEffect(() => {
        let gameLoop: ReturnType<typeof setInterval> | undefined

        if (!gameLoop) {
            gameLoop = setInterval(() => {
                setWallet(prevWallet => add(prevWallet, ledger))
            }, 200)
        }

        return () => {
            if (gameLoop) {
                clearInterval(gameLoop)
            }
        }
    }, [ledger])
}

function AxoClickerGame() {
    const { authenticate, isAuthenticated, user } = useMoralis()
    const axolittles = useAxolittles()
    
    if (!isAuthenticated || !user) {
        return (
            <div>
                <button onClick={() => authenticate()}>Login</button>
            </div>
        )
    }

    return (
        <div>
            <h1>Hello {user.get('ethAddress')}</h1>
            {axolittles?.map(axo => axo.metadata ? (
                <div key={axo.id}>
                    <img src={axo.metadata.image} width="128" height="128" />
                </div>
            ) : null)}
        </div>
    )
}

export default AxoClickerGame