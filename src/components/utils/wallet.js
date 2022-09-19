

export const requestAccount = async (setWalletAddress) => {
	if (window.ethereum) {
		try {
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			})
			
			setWalletAddress(accounts[0])
		} catch(e) {
			console.log('Error connecting: ' + e.message);
		}
		
	} else {
		console.log('Please, install MetaMask extension to use this application.');
	}
}

export const connectWallet = async (setWalletAddress) => {
	await requestAccount(setWalletAddress);
}