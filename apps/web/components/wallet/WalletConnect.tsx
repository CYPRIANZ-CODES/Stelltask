'use client';

import { useState, useEffect } from 'react';
import { Wallet, X, ExternalLink, Copy, Check } from 'lucide-react';

interface WalletConnectProps {
  onConnect?: (publicKey: string) => void;
  onDisconnect?: () => void;
}

export default function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [balance, setBalance] = useState('0');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    const storedKey = localStorage.getItem('stellar_public_key');
    if (storedKey) {
      setPublicKey(storedKey);
      setIsConnected(true);
      setBalance('1000.5'); // Mock balance
    }
  }, []);

  const handleConnect = async () => {
    try {
      // Check if Freighter wallet is available
      // @ts-ignore
      if (window.freighter && window.freighter.isConnected && await window.freighter.isConnected()) {
        // @ts-ignore
        const key = await window.freighter.getPublicKey();
        setPublicKey(key);
        setIsConnected(true);
        localStorage.setItem('stellar_public_key', key);
        setBalance('1000.5'); // Mock balance
        onConnect?.(key);
        setIsOpen(false);
      } else {
        // Fallback: manual key entry
        alert('Please install Freighter wallet or enter your public key manually');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = () => {
    setPublicKey('');
    setIsConnected(false);
    setBalance('0');
    localStorage.removeItem('stellar_public_key');
    onDisconnect?.();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateKey = (key: string) => {
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
        >
          <Wallet className="w-4 h-4" />
          <span className="font-medium">{truncateKey(publicKey)}</span>
        </button>

        {isOpen && (
          <div className="absolute top-12 right-0 w-72 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-2xl z-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-violet-400" />
                </div>
                <span className="font-medium">Wallet Connected</span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4 text-white/50 hover:text-white transition-colors" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="text-xs text-white/40 mb-1">Public Key</div>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-white/70 flex-1">{publicKey}</code>
                  <button onClick={handleCopy} className="p-1 hover:bg-white/10 rounded transition-colors">
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-white/50" />}
                  </button>
                </div>
              </div>

              <div>
                <div className="text-xs text-white/40 mb-1">Balance</div>
                <div className="text-lg font-medium text-violet-400">{balance} XLM</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={`https://stellar.expert/address/${publicKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View on Stellar Expert
              </a>

              <button
                onClick={handleDisconnect}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors text-sm"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors font-medium"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Connect Wallet</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-white/50 hover:text-white transition-colors" />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleConnect}
                className="w-full flex items-center gap-3 px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wallet className="w-5 h-5 text-violet-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Freighter Wallet</div>
                  <div className="text-sm text-white/50">Recommended for Stellar</div>
                </div>
              </button>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/40 mb-3">Don't have a wallet?</p>
                <a
                  href="https://www.freighter.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Install Freighter
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
