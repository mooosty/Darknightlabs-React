import { BrowserProvider } from "ethers";
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "./WalletConnect.scss";

const WalletConnect = ({ onConnect, account }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        onConnect(address);

        toast.success(`Connected to ${address.slice(0, 6)}...${address.slice(-4)}`);
      } else {
        toast.error("Please install MetaMask!");
      }
    } catch (error) {
      toast.error("Failed to connect wallet. Please try again.");
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="wallet_section">
      {!account ? (
        <button
          className="wallet_btn"
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="disconnect_wrap">
          <button
            className="wallet_btn"
            onClick={() => onConnect("")}
          >
            Disconnect ({account.slice(0, 4)}...{account.slice(-2)})
          </button>
        </div>
      )}
    </div>
  );
}

WalletConnect.propTypes = {
  onConnect: PropTypes.func.isRequired,
  account: PropTypes.string,
};

export default WalletConnect;