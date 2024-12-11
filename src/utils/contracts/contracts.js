export const PRESALE_CONTRACT = {
    address: "0x4759102733e667dbF1aD0BFc8444f4893A546fBE",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes"
                }
            ],
            "name": "contribute",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "contributor",
                    "type": "address"
                }
            ],
            "name": "getContribution",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPresaleStatus",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "total",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "remaining",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "active",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "closed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
};

export const USDT_CONTRACT = {
    address: "0xB3F1717e0478893782B210baDC0ac0f2078A7098",
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}; 