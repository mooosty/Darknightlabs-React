import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import './ContributionStatus.scss';
import { PRESALE_CONTRACT } from '../../../utils/contracts/contracts';


const ContributionStatus = ({
  walletAddress,
}) => {
  const [status, setStatus] = useState(null);
  const [userContribution, setUserContribution] = useState(BigInt(0));
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!walletAddress) return;

    try {
      setLoading(true)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        PRESALE_CONTRACT.address,
        PRESALE_CONTRACT.abi,
        provider
      );

      // Get presale status
      const presaleStatus = await contract.getPresaleStatus();
      setStatus({
        total: presaleStatus[0],
        remaining: presaleStatus[1],
        active: presaleStatus[2],
        closed: presaleStatus[3]
      });

      // Get user contribution
      const contribution = await contract.getContribution(walletAddress);
      
      setUserContribution(contribution);
    } catch (error) {
      console.error('Error fetching contribution status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchData();

    // Set up event listener for contributions
    const listenToContributions = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        PRESALE_CONTRACT.address,
        PRESALE_CONTRACT.abi,
        provider
      );

      contract.on("Contribution", (contributor, amount) => {
        console.log('Contribution event:', {
          contributor,
          amount: amount.toString(),
          walletAddress
        });

        if (contributor.toLowerCase() === walletAddress.toLowerCase()) {
          
          setUserContribution(prev => prev + amount);
        }
        // Update total contributions
        fetchData();
      });

      return () => {
        contract.removeAllListeners("Contribution");
      };
    };

    if (walletAddress) {
      listenToContributions();
    }

    return () => {
      // Cleanup
      const cleanup = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          PRESALE_CONTRACT.address,
          PRESALE_CONTRACT.abi,
          provider
        );
        contract.removeAllListeners("Contribution");
      };
      cleanup();
    };
  }, [walletAddress]);

  if (loading) {
    return (
      <div className="loading-card">
        <div className="loading-card-header">
          <h3 className="loading-card-title">Loading contribution status...</h3>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="loading-card">
        <div className="loading-card-header">
          <h3 className="loading-card-title">Contribution status not found</h3>
        </div>
      </div>
    );
  }



  const hardCap = status.total + status.remaining;
  const progressPercentage = Number(
    (status.total * BigInt(100)) / hardCap
  );

  const userPercentage = Number(
    (userContribution * BigInt(100)) / hardCap
  );

  // Calculate percentage of user's contribution compared to total raised
  const userSharePercentage = status.total > 0
    ? Number((userContribution * BigInt(100)) / status.total)
    : 0;

  return (
    <div className="contribution-card">
      <div className="contribution-card-header">
        <h3 className="contribution-card-title">Presale Status</h3>
        <p className="contribution-card-description">
          Track your contribution and overall progress
        </p>
      </div>
      <div className="contribution-card-content">
        <div className="status-section">
          <div className="status-row">
            <span>Total Raised</span>
            <span>{ethers.formatUnits(status.total, 6)} USDT</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="status-row muted">
            <span>0 USDT</span>
            <span>{ethers.formatUnits(hardCap, 6)} USDT</span>
          </div>
        </div>

        <div className="status-section">
          <div className="status-row">
            <span>Your Contribution</span>
            <span>{ethers.formatUnits(userContribution, 6)} USDT</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${userPercentage}%` }}
            />
          </div>
          <div className="status-row muted">
            <span>{userPercentage.toFixed(2)}% of hard cap</span>
            <span>{userSharePercentage.toFixed(2)}% of total raised</span>
          </div>
          <div className="status-row muted justify-end">
            <span>
              {status.active ? (
                status.remaining > 0 ? "Presale Active" : "Hard Cap Reached"
              ) : (
                status.closed ? "Presale Closed" : "Presale Paused"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

ContributionStatus.propTypes = {
  walletAddress: PropTypes.string,
  onMaxContributions: PropTypes.func,
};

export default ContributionStatus;