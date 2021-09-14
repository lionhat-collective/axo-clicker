import { Map } from "immutable"
import { add, buy, effects, inTheBlack, sum } from "merchant.js"
import { useCallback, useMemo, useState } from "react"
import { useInterval } from ".."
import { cuddles, CuddleItem, ComfortBlanketItem, } from "../../pouch"

export const pouch = {
    CuddleItem,
    ComfortBlanketItem,
}

type GameReturnType = [
    { wallet: Map<string, number>, ledger: Map<string, number> },
    {
        cuddle: () => void
        buyHelper: () => void
    }
]

export const useClicker = (): GameReturnType => {
    const [wallet, setWallet] = useState(Map<string, number>({
        [cuddles]: 0
    }))
    const [ledger, setLedger] = useState(Map<string, number>({
        [cuddles]: 0
    }))

    const cuddle = useCallback(() => {
        setWallet(add(CuddleItem, wallet))
    }, [wallet])

    const buyHelper = useCallback(() => {
        const walletWithCostsApplied = buy(ComfortBlanketItem, wallet);
        const hasEnough = inTheBlack(walletWithCostsApplied);
        console.log(hasEnough);
        if (!hasEnough) return
    
        const newWallet = add(ComfortBlanketItem, walletWithCostsApplied);
        const ledger = effects(Object.values(pouch), newWallet);
        setWallet(newWallet)
        setLedger(ledger)
    }, [wallet])

    useInterval(() => {
        setWallet(sum(wallet, ledger))
    }, 200)

    return useMemo(() => [
        { wallet, ledger },
        { cuddle, buyHelper }
    ], [wallet, ledger, cuddle, buyHelper])
}