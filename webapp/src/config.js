export const API_URL = "http://localhost:8080"
//export const API_URL = process.env.REACT_APP_MODE !== "prod"
//? "https://api.arrakis.alastria.councilbox.com"
//: '{{API_URL}}';;
export const API_BLOCK_ENDPOINT = `${API_URL}/api/block?value=`;
export const API_BLOCKS_ENDPOINT = `${API_URL}/api/blocks`;
export const API_ACCOUNT_ENDPOINT = `${API_URL}/api/account?value=`;
export const API_CONTRACTS_ENDPOINT = `${API_URL}/api/contracts`;
export const API_TRANSACTION_ENDPOINT = `${API_URL}/api/transaction?value=`;
export const API_TRANSACTIONS_ENDPOINT = `${API_URL}/api/transactions`;
export const API_SEARCH_ENDPOINT = `${API_URL}/api/search?value=`;
export const API_STATUS_ENDPOINT = `${API_URL}/api/status`;
export const LIMIT = 25;
export const DATE_FORMAT = 'DD/MM/YYYY - HH:mm:ss';
