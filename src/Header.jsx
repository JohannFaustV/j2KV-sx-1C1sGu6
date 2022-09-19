import React, { useContext, useEffect } from 'react';
import Logo from './components/UI/logo/Logo'
import Button from './components/UI/button/Button';
import Wallet from './components/Wallet';
import { GlobalStatsContext, UserStatsContext } from './context/context';
import { ethers } from 'ethers';
import { connectWallet } from './components/utils/wallet';
import HegicStrategyATM_CALL_ETH from "./deployments/arbitrum_ddl/HegicStrategyATM_CALL_ETH.json";
import HegicStrategyOTM_CALL_110_ETH from "./deployments/arbitrum_ddl/HegicStrategyOTM_CALL_110_ETH.json";
import HegicStrategyOTM_CALL_120_ETH from "./deployments/arbitrum_ddl/HegicStrategyOTM_CALL_120_ETH.json";
import HegicStrategyOTM_CALL_130_ETH from "./deployments/arbitrum_ddl/HegicStrategyOTM_CALL_130_ETH.json";
import HegicStrategyATM_CALL_BTC from "./deployments/arbitrum_ddl/HegicStrategyATM_CALL_BTC.json";
import HegicStrategyOTM_CALL_110_BTC from "./deployments/arbitrum_ddl/HegicStrategyOTM_CALL_110_BTC.json";
import HegicStrategyOTM_CALL_120_BTC from "./deployments/arbitrum_ddl/HegicStrategyOTM_CALL_120_BTC.json";
import HegicStrategyOTM_CALL_130_BTC from "./deployments/arbitrum_ddl/HegicStrategyOTM_CALL_130_BTC.json";
import HegicStrategyATM_PUT_ETH from "./deployments/arbitrum_ddl/HegicStrategyATM_PUT_ETH.json";
import HegicStrategyOTM_PUT_70_ETH from "./deployments/arbitrum_ddl/HegicStrategyOTM_PUT_70_ETH.json";
import HegicStrategyOTM_PUT_80_ETH from "./deployments/arbitrum_ddl/HegicStrategyOTM_PUT_80_ETH.json";
import HegicStrategyOTM_PUT_90_ETH from "./deployments/arbitrum_ddl/HegicStrategyOTM_PUT_90_ETH.json";
import HegicStrategyATM_PUT_BTC from "./deployments/arbitrum_ddl/HegicStrategyATM_PUT_BTC.json";
import HegicStrategyOTM_PUT_70_BTC from "./deployments/arbitrum_ddl/HegicStrategyOTM_PUT_70_BTC.json";
import HegicStrategyOTM_PUT_80_BTC from "./deployments/arbitrum_ddl/HegicStrategyOTM_PUT_80_BTC.json";
import HegicStrategyOTM_PUT_90_BTC from "./deployments/arbitrum_ddl/HegicStrategyOTM_PUT_90_BTC.json";
import OptionsManager from "./deployments/arbitrum_ddl/OptionsManager.json";
import HegicOperationalTreasury from "./deployments/arbitrum_ddl/HegicOperationalTreasury.json";
import {mmProvider} from './components/utils/providers.js'
import { DDL_POOL, OptManager, USDC } from './components/utils/contracts';
import { getGlobalStats, getUserStats, getOptionStats } from './components/utils/stats';


const Header = ({ walletAddress, setWalletAddress }) => {
	
	const { setGlobalStats } = useContext(GlobalStatsContext)
	const { setUserStats } = useContext(UserStatsContext)
	
	async function getOptionByUser(userAddress) {
		let hot = OptManager;

		let hegicOperationalTreasury = new ethers.Contract(HegicOperationalTreasury.address, HegicOperationalTreasury.abi, mmProvider)
		const iface = new ethers.utils.Interface(OptionsManager.abi)
	
		const strategyMap = new Map([
			[HegicStrategyATM_CALL_ETH.address, { "name": "ETH-ATM-CALL", "inf": HegicStrategyATM_CALL_ETH }],
			[HegicStrategyOTM_CALL_110_ETH.address, { "name": "ETH-OTM-CALL-10%", "inf": HegicStrategyOTM_CALL_110_ETH }],
			[HegicStrategyOTM_CALL_120_ETH.address, { "name": "ETH-OTM-CALL-20%", "inf": HegicStrategyOTM_CALL_120_ETH }],
			[HegicStrategyOTM_CALL_130_ETH.address, { "name": "ETH-OTM-CALL-30%", "inf": HegicStrategyOTM_CALL_130_ETH }],
			[HegicStrategyATM_CALL_BTC.address, { "name": "BTC-ATM-CALL", "inf": HegicStrategyATM_CALL_BTC }],
			[HegicStrategyOTM_CALL_110_BTC.address, { "name": "BTC-OTM-CALL-10%", "inf": HegicStrategyOTM_CALL_110_BTC }],
			[HegicStrategyOTM_CALL_120_BTC.address, { "name": "BTC-OTM-CALL-20%", "inf": HegicStrategyOTM_CALL_120_BTC }],
			[HegicStrategyOTM_CALL_130_BTC.address, { "name": "BTC-OTM-CALL-30%", "inf": HegicStrategyOTM_CALL_130_BTC }],
			[HegicStrategyATM_PUT_ETH.address, { "name": "ETH-ATM-PUT", "inf": HegicStrategyATM_PUT_ETH }],
			[HegicStrategyOTM_PUT_70_ETH.address, { "name": "ETH-OTM-PUT-30%", "inf": HegicStrategyOTM_PUT_70_ETH }],
			[HegicStrategyOTM_PUT_80_ETH.address, { "name": "ETH-OTM-PUT-20%", "inf": HegicStrategyOTM_PUT_80_ETH }],
			[HegicStrategyOTM_PUT_90_ETH.address, { "name": "ETH-OTM-PUT-10%", "inf": HegicStrategyOTM_PUT_90_ETH }],
			[HegicStrategyATM_PUT_BTC.address, { "name": "BTC-ATM-PUT", "inf": HegicStrategyATM_PUT_BTC }],
			[HegicStrategyOTM_PUT_70_BTC.address, { "name": "BTC-OTM-PUT-30%", "inf": HegicStrategyOTM_PUT_70_BTC }],
			[HegicStrategyOTM_PUT_80_BTC.address, { "name": "BTC-OTM-PUT-20%", "inf": HegicStrategyOTM_PUT_80_BTC }],
			[HegicStrategyOTM_PUT_90_BTC.address, { "name": "BTC-OTM-PUT-10%", "inf": HegicStrategyOTM_PUT_90_BTC }],
		])
	
		let transferTopics = iface.encodeFilterTopics("Transfer", [
			null,
			userAddress
			])
		let transferLogs = await mmProvider.getLogs({
			"address":hot.address,
			"fromBlock": 6661745 , 
			"topics": transferTopics
		})
	
		let arrObj = []
		let ids = []
		
		for (let event of transferLogs) {
			
			let decodeData = iface.decodeEventLog("Transfer", event.data, event.topics)

			
			let lockL = await hegicOperationalTreasury.lockedLiquidity(decodeData.tokenId)
			
			if (Number(lockL.state) != Number(0)) {
				const id = decodeData.tokenId.toNumber()

				if (ids.includes(id)) {
					continue;
				}
				
				ids.push(id)
				
				
				let strategyInf = strategyMap.get(lockL.strategy);
				
				const HegicStrategy = new ethers.Contract(lockL.strategy, strategyInf.inf.abi, mmProvider)
				
				let strategyData = await HegicStrategy.strategyData(id)
				let isETH = strategyInf.name?.includes("ETH")
				let amount = Number(ethers.utils.formatUnits(strategyData.amount.toString(),isETH ? 18 :8))
				let strike = Number(ethers.utils.formatUnits(strategyData.strike.toString(),8))
				
				const res = await getOptionStats(id, isETH)
				
				arrObj.push({
					id,
					name: strategyInf.name,
					amount: Math.floor(amount * 100)/100,
					strike: Math.floor(strike * 100)/100,
					expiration: Math.abs(Date.now() - lockL.expiration * 1000),
					// strategy: lockL.strategy,
					intrinsicValue: res.intrinsicValue,
					borrowLimit: res.borrowLimit,
					borrowLimitUsed: res.borrowLimitUsed,
					liqPrice: res.liqPrice ?? '',
					realVals: res.realVals ?? {},
					contracts: res.contracts
				})
			}
		}
		

		if (!arrObj.length) {
			arrObj.push('No options available')
		}
		return arrObj;
	};

	useEffect(() => {
		connectWallet(setWalletAddress)

		getGlobalStats()
			.then(stats => {
				setGlobalStats(stats)
			})
	}, [])

	useEffect(() => {
		if (walletAddress) {
			getUserStats(walletAddress)
				.then(stats => {
					setUserStats(stats)

					getOptionByUser(walletAddress)
						.then(options => {
							setUserStats({
								...stats,
								options
							})
						})
				})
		}
	}, [walletAddress])
	
	return (
		<header className='header'>
			<div className="header__content _container">
				<Logo></Logo>

				{walletAddress ?
					<Wallet address={walletAddress} /> :
					<Button isMain={true} onClick={(e) => {
						connectWallet(setWalletAddress)
					}}>Connect wallet</Button>}
			</div>
		</header>
	);
};

export default Header;