import { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import './ContributionForm.scss';
import { PRESALE_CONTRACT, USDT_CONTRACT } from '../../../utils/contracts/contracts';
// import { toast } from 'react-toastify';
import toast, { Toaster } from "react-hot-toast";

const ContributionForm = ({ walletAddress, whitelistSignature }) => {
  const [amount, setAmount] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isContributing, setIsContributing] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimals
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleApprove = async () => {
    if (!amount || !walletAddress) return;

    setIsApproving(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT.address,
        USDT_CONTRACT.abi,
        signer
      );

      const amountInWei = ethers.parseUnits(amount, 6);

      const tx = await usdtContract.approve(
        PRESALE_CONTRACT.address,
        amountInWei
      );

      await tx.wait();

      toast.success("USDT approved successfully");
    } catch (error) { 
      console.error('Error approving USDT:', error);
      toast.error("Failed to approve USDT");
    } finally {
      setIsApproving(false);
    }
  };

  const handleContribute = async () => {
    if (!amount || !walletAddress || !whitelistSignature) return;

    setIsContributing(true);
    try {
      
      
      
      

      // Create the same message hash as the bot and contract
      // const messageHash = ethers.solidityPackedKeccak256(
      //   ["address", "address"],
      //   [walletAddress, PRESALE_CONTRACT.address]
      // );
      

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        PRESALE_CONTRACT.address,
        PRESALE_CONTRACT.abi,
        signer
      );

      const amountInWei = ethers.parseUnits(amount, 6);
      const tx = await contract.contribute(amountInWei, whitelistSignature);
      await tx.wait();

      toast({
        title: "Success!",
        description: `Successfully contributed ${amount} USDT`,
      });

      setAmount('');
    } catch (error) {
      console.error('Error contributing:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to contribute",
      });
    } finally {
      setIsContributing(false);
    }
  };

  return (
    <div className="contribution-form-card">
      <div className="contribution-form-header">
        <h3 className="contribution-form-title">Contribute USDT</h3>
      </div>
      <div className="contribution-form-content">
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Amount (USDT)</label>
          <input
            id="amount"
            className="form-input"
            type="text"
            inputMode="decimal"
            pattern="[0-9]*[.]?[0-9]*"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            disabled={isApproving || isContributing}
          />
        </div>

        <div className="form-actions">
          <button
            className={`form-button outline ${(!amount || isApproving || isContributing) ? 'disabled' : ''}`}
            onClick={handleApprove}
            disabled={!amount || isApproving || isContributing}
          >
            {isApproving ? 'Approving...' : 'Approve USDT'}
          </button>

          <button
            className={`form-button primary ${(!amount || !whitelistSignature || isApproving || isContributing) ? 'disabled' : ''}`}
            onClick={handleContribute}
            disabled={!amount || !whitelistSignature || isApproving || isContributing}
          >
            {isContributing ? 'Contributing...' : 'Contribute'}
          </button>
        </div>
      </div>
    </div>
  );
}

ContributionForm.propTypes = {
  walletAddress: PropTypes.string,
  whitelistSignature: PropTypes.string,
};

export default ContributionForm;