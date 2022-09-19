import { ethers } from 'ethers';
import _DDL_ETH from '../../deployments/arbitrum_ddl/DDL_ETH.json'
import _DDL_BTC from '../../deployments/arbitrum_ddl/DDL_BTC.json'
import _DDL_POOL from '../../deployments/arbitrum_ddl/DDL_POOL.json'
import _OptManager from "../../deployments/arbitrum_ddl/OptionsManager.json";
import _USDC from "../../deployments/arbitrum_ddl/USDC.json";
import {netProvider, mmProvider, signer} from './providers.js'

export const DDL_ETH = new ethers.Contract(_DDL_ETH.address, _DDL_ETH.abi, mmProvider ?? netProvider);
export const DDL_ETH_signed = DDL_ETH.connect(signer);

export const DDL_BTC = new ethers.Contract(_DDL_BTC.address, _DDL_BTC.abi, mmProvider ?? netProvider);
export const DDL_BTC_signed = DDL_BTC.connect(signer)

export const DDL_POOL = new ethers.Contract(_DDL_POOL.address, _DDL_POOL.abi, mmProvider ?? netProvider);
export const DDL_POOL_signed = DDL_POOL.connect(signer)


export const OptManager = new ethers.Contract(_OptManager.address, _OptManager.abi, signer)

export const USDC = new ethers.Contract(_USDC.address, _USDC.abi, mmProvider ?? netProvider)
export const USDC_signed = USDC.connect(signer)