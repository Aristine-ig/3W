import React from 'react'

// claim button function

const ClaimButton = ({ onClaim, loading, disabled }) => {
  return (
    <div className="claim-button">
      <button
        onClick={onClaim}
        disabled={disabled || loading}
        className={loading ? 'loading' : ''}
      >
        {loading ? 'Claiming...' : 'Claim Points'}
      </button>
    </div>
  )
}

export default ClaimButton