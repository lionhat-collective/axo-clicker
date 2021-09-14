declare module 'merchant.js' {
    export type MerchantItem<S = unknown> = {
        type: string
        cost?: (state?: S) => Immutable.Map<string | symbol, number>
        effect?: (state?: S) => Immutable.Map<string | symbol, number>
    }

    export function sum(...ledgers: Immutable.Map<string | symbol, number>[]): Immutable.Map<string | symbol, number>

    export function scale(ledger: Immutable.Map<string | symbol, number>): Immutable.Map<string | symbol, number>

    export function inTheBlack(ledger: Immutable.Map<string | symbol, number>): Immutable.Map<string | symbol, number>

    export function currencies(ledgerOne: Immutable.Map<string | symbol, number>, ledgerTwo: Immutable.Map<string | symbol, number>): string[]
    export function currencies(ledgerOne: Immutable.Map<string | symbol, number>): (ledgerTwo: Immutable.Map<string | symbol, number>) => string[]
    export function currencies(ledgerOne: Immutable.Map<string | symbol, number>, ledgerTwo: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[]): string[]
    export function currencies(ledgerOne: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[]): (ledgerTwo: Immutable.Map<string | symbol, number>) => string[]
    export function currencies(ledgerOne: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[]): (ledgerTwo: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[] | Immutable.Map<string | symbol, number>) => string[]

    export function buy<S = unknown>(item: MerchantItem<S>, ledger: Immutable.Map<string | symbol, number>, state?: S): Immutable.Map<string | symbol, number>
    export function effects<S = unknown>(items: MerchantItem<S>[], ledger: Immutable.Map<string | symbol, number>, state?: S): Immutable.Map<string | symbol, number>
    export function add<S = unknown>(item: MerchantItem<S>, ledger: Immutable.Map<string | symbol, number>, amount?: number): Immutable.Map<string | symbol, number>
    export function allCosts<S = unknown>(items: MerchantItem<unknown>[] | Immutable.Map<string | symbol, number>, state?: S): Immutable.Map<string | symbol, number>
    export function cost<S = unknown>(item: MerchantItem<unknown>, state: S): Immutable.Map<string | symbol, number>
    
    export function totalOf(currency: string, ledgers: Immutable.Map<string | symbol, number>[]): number
    export function totalOf(currency: string, ledger: Immutable.Map<string | symbol, number>): number
    export function totalOf(currency: string, ledger: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[]): number
    export function totalOf(currency: string, ledger: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[]): (ledger: Immutable.Map<string | symbol, number>) => number
    export function totalOf(currency: string, ledger: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[]): (ledger: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[] | Immutable.Map<string | symbol, number>) => number
    export function totalOf(currency: string, ledger: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[]): (ledger: Immutable.Map<string | symbol, number>, ...ledgers: Immutable.Map<string | symbol, number>[] | Immutable.Map<string | symbol, number>) => number
    export function totalOf(currency: string, ledgers: Immutable.Map<string | symbol, number>[]): (ledger: Immutable.Map<string | symbol, number>) => number
}