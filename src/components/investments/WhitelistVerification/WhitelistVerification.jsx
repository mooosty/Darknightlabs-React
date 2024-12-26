import { useState } from "react";
import { ethers } from "ethers";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
// import { PRESALE_CONTRACT } from "../../../utils/contracts/contracts";
import "./WhitelistVerification.scss";

const WhitelistVerification = ({ walletAddress, onVerificationComplete }) => {
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyWhitelist = async () => {
    setIsVerifying(true);
    try {
      // TODO: Add actual verification logic
      // This is a placeholder for now
      if (message.length > 0) {
        onVerificationComplete(message);
        toast.success("Verification Successful");
      } else {
        toast.error("Please enter a valid whitelist message.");
      }
    } catch (error) {
      toast.error("Failed to verify whitelist status.");
    } finally {
      setIsVerifying(false);
    }
  };

  const fetchWhitelistMessage = async () => {
    if (!walletAddress) return;

    setIsVerifying(true);
    try {
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Sign a message to prove wallet ownership
      const message = `Requesting whitelist verification for ${walletAddress}`;
      const signature = await signer.signMessage(message);

      
      const response = await fetch(`/api/whitelist/${walletAddress}`, {
        headers: {
          'Authorization': `Bearer ${signature}`,
          'X-Signed-Message': message
        }
      });
      

      // Add this block to handle text responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") === -1) {
        // Handle non-JSON response
        const textError = await response.text();
        console.error('API Error (non-JSON):', textError);
        throw new Error(textError || 'API request failed');
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();
      

      if (data.whitelisted && data.signature) {
        // Verify the signature matches our expected format
        // const messageHash = ethers.solidityPackedKeccak256(
        //   ["address", "address"],
        //   [walletAddress, PRESALE_CONTRACT.address]
        // );
        

        onVerificationComplete(data.signature);
        toast({
          title: "Verification Successful",
          description: "Your address is whitelisted! You can now contribute.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Not Whitelisted",
          description: data.message || "Please register via our Telegram bot first.",
        });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to verify whitelist status",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="card">
      <div className="card_header">
        <h3>Whitelist Verification</h3>
        <span className="card_header_text">
          Enter your whitelist message or fetch it automatically
        </span>
      </div>
      <div className="card_body">
        <div className="card_body_input">
          <input
            placeholder="Enter whitelist message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="controls">
            <button
              onClick={fetchWhitelistMessage}
              disabled={!walletAddress || isVerifying}
              className="flex-1"
            >
              Fetch Message
            </button>
            <button
              onClick={verifyWhitelist}
              disabled={!message || isVerifying}
              className="flex-1"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

WhitelistVerification.propTypes = {
  walletAddress: PropTypes.string,
  onVerificationComplete: PropTypes.func,
};

export default WhitelistVerification;