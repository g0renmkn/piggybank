/**
 * definitions.ts
 * 
 * File with database model types definitions
 * 
 */

// Table: bank_accounts
export type BankAccount = {
    id: number;
    name: string;
    iban: string;
    closed: string;
    comments: string;
}

// Table: bank_movs
export type BankMovs = {
    id: number;
    acc_id: number;
    date: string;
    category: number;
    description: string;
    value: number;
    periodicity: number;
    notes: string;
}

// Table: bank_movs extended
export type BankMovsExt = {
    id: number;
    acc_id: number;
    date: string;
    category: number;
    description: string;
    value: number;
    periodicity: number;
    notes: string;
    acc_name: string;
    cat_name: string;
    period: string;
}

// Table: bank_stock_movs
export type BankStocks = {
    id: number;
    acc_id: number;
    date: string;
    asset: number;
    amount: number;
}

// Table: bank_fund_movs
export type BankFunds = {
    id: number;
    acc_id: number;
    date: string;
    asset: number;
    value: number;
}