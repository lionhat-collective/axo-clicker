import { Map } from "immutable"
import { MerchantItem } from "merchant.js"
import { cuddles } from "."

export const comfortBlankets = 'comfort_blankets'

export const ComfortBlanketItem: MerchantItem = {
    type: comfortBlankets,
    cost: () => {
        return Map({ [cuddles]: -1 })
    },
    effect: () => {
        return Map({ [cuddles]: 100 })
    }
}