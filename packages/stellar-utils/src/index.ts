import { Keypair, TransactionBuilder, Networks, Asset, Operation } from '@stellar/stellar-sdk';

export class StellarHelpers {
  static isValidPublicKey(publicKey: string): boolean {
    try {
      Keypair.fromPublicKey(publicKey);
      return true;
    } catch {
      return false;
    }
  }

  // Add more shared Stellar logic here
}
