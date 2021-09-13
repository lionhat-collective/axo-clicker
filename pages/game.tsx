import { useCallback, useEffect, useMemo, useState } from "react"
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"
import { Map } from 'immutable'
import { add, buy, inTheBlack, pouchEffectsLedger, addItem, } from 'merchant.js'

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

// Currencies
const food = "food";

// Items
const pouch = {
  axomini: {
    type: "axomini",
    cost: () => {
      return Map({ [food]: -1 });
    },
    effect: () => {
      return Map({ [food]: 100 });
    }
  }
};

const useClicker = (): [{ wallet: Map<string, number>, ledger: Map<string, number> }, {
    cuddle: () => void
    buyHelper: () => void
}] => {
    const [wallet, setWallet] = useState(Map<string, number>())
    console.log(wallet.get('food'))
    const [ledger, setLedger] = useState(Map<string, number>())
    const loopCallback = useCallback(() => {
        console.log(wallet.get('food'), `loop`, add(wallet, ledger).get('food'))
        setWallet(add(wallet, ledger))
    }, [wallet, ledger])

    useEffect(() => {
        let gameLoop: ReturnType<typeof setInterval> | undefined

        if (!gameLoop) {
            gameLoop = setInterval(loopCallback, 5000)
        }

        return () => {
            if (gameLoop) {
                clearInterval(gameLoop)
            }
        }
    })

    const cuddle = useCallback(() => {
        setLedger(add(ledger, Map<string, number>({ [food]: 1 })))
    }, [ledger])

    const buyHelper = useCallback(() => {
        const walletWithCostsApplied = buy(pouch.axomini, wallet);
        if (!inTheBlack(walletWithCostsApplied)) {
          return;
        }
    
        const newWallet = addItem(pouch.axomini, walletWithCostsApplied);
        const ledger = pouchEffectsLedger(Object.values(pouch), newWallet);
        setWallet(newWallet)
        setLedger(ledger)
    }, [wallet])

    return useMemo(() => [{ wallet, ledger }, { cuddle, buyHelper }], [wallet, ledger, cuddle, buyHelper])
}

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

    console.log(wallet.get('food'))
    
    const activeAxo = axolittles.find(axo => typeof axo.metadata !== 'undefined')

    return (
        <div>
            <h1>Hello {user.get('ethAddress')}</h1>
            {`${wallet.get(food) ?? 0} Biscuits`}
            {
                activeAxo && (
                    <img
                        onClick={() => cuddle()}
                        src={activeAxo.metadata.image}
                        width={128}
                        height={128}
                    />
                )
            }
            {/* {axolittles?.map(axo => axo.metadata ? (
                <div key={axo.id}>
                    <img src={axo.metadata.image} width="128" height="128" />
                </div>
            ) : null)} */}
        </div>
    )
}

export default AxoClickerGame