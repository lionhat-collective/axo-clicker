import { useEffect, useState } from "react"
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"

export type AxolittleAttribute = {
    trait_type: string
    value: string
}

export type Axolittle = {
    id: string
    title: string
    name: string
    description: string
    image: string
    attributes: AxolittleAttribute[]
    version: number
}

export const useAxolittles = (): Axolittle[] => {
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
    const [axolittles, setAxolittles] = useState<Axolittle[]>([])
    useEffect(() => {
        function getTokenMetadata(nft: string) {
            return JSON.parse(nft)
        }
        if (axolittlesNFTData?.result) {
            setAxolittles(axolittlesNFTData.result.map(nft => (
                {
                    id: nft.token_id,
                    ...(nft.metadata ? getTokenMetadata(nft.metadata) : {})
                }
            )))
        }
    }, [axolittlesNFTData])

    return axolittles
}