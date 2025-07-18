import React from 'react'

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