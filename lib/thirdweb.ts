import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { ethers } from "ethers";

// Initialize ThirdWeb SDK
export const initializeSDK = () => {
  return new ThirdwebSDK("polygon", {
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
  });
};

// Server-side SDK with secret key
export const initializeServerSDK = () => {
  return ThirdwebSDK.fromPrivateKey(
    process.env.THIRDWEB_SECRET_KEY!,
    "polygon"
  );
};

// Create a new wallet - generates a UNIQUE wallet for each user
export const createWallet = async () => {
  try {
    console.log('Creating new unique wallet...');
    
    // Generate a completely new random wallet
    const newWallet = ethers.Wallet.createRandom();
    const address = newWallet.address;
    const privateKey = newWallet.privateKey;
    
    console.log(`New wallet created: ${address}`);
    // Note: Private key generated but not logged for security
    
    return {
      success: true,
      address,
      privateKey, // You might want to store this securely for the user
    };
  } catch (error) {
    console.error('Error creating wallet:', error);
    return {
      success: false,
      error: 'Failed to create wallet',
    };
  }
};

// Get token balance for ERC-1155 contract using ThirdWeb SDK v5
export const getTokenBalance = async (walletAddress: string, contractAddress: string) => {
  try {
    console.log(`Getting ERC-1155 balance for wallet: ${walletAddress}`);
    
    // Create ThirdWeb client
    const client = createThirdwebClient({
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
    });
    
    // Get contract instance
    const contract = getContract({
      client,
      chain: polygon,
      address: contractAddress as `0x${string}`,
    });
    
    // Call balanceOf function exactly like in your example
    const balance = await readContract({
      contract,
      method: "function balanceOf(address account, uint256 id) view returns (uint256)",
      params: [walletAddress as `0x${string}`, BigInt(0)], // Using BigInt(0) for token ID 0
    });
    
    console.log(`ERC-1155 balance found: ${balance.toString()}`);
    
    return {
      success: true,
      balance: balance.toString(),
      metadata: {
        name: 'SCARE Token',
        symbol: 'SCARE',
        description: 'Token de Patrimonio Médico SCARE',
      },
    };
    
  } catch (error) {
    console.error('Error getting token balance:', error);
    
    // Try with token ID 1 as fallback
    try {
      console.log('Trying with token ID 1...');
      
      const client = createThirdwebClient({
        clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
      });
      
      const contract = getContract({
        client,
        chain: polygon,
        address: contractAddress as `0x${string}`,
      });
      
      const balance = await readContract({
        contract,
        method: "function balanceOf(address account, uint256 id) view returns (uint256)",
        params: [walletAddress as `0x${string}`, BigInt(1)], // Token ID 1
      });
      
      console.log(`ERC-1155 balance found with ID 1: ${balance.toString()}`);
      
      return {
        success: true,
        balance: balance.toString(),
        metadata: {
          name: 'SCARE Token',
          symbol: 'SCARE',
          description: 'Token de Patrimonio Médico SCARE',
        },
      };
      
    } catch (secondError) {
      console.error('Error with token ID 1:', secondError);
      
      return {
        success: false,
        balance: "0",
        metadata: {
          name: 'SCARE Token',
          symbol: 'SCARE',
          description: 'Token de Patrimonio Médico SCARE',
        },
        error: 'No se pudo obtener el balance del contrato.',
      };
    }
  }
};

// Validate contract address format
export const isValidContractAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}; 