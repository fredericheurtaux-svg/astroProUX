import React from 'react'

export function SkipLinks() {
  return (
    <>
      {/* Skip to main content link - hidden but keyboard accessible */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Accéder au contenu principal
      </a>
      
      {/* Skip to navigation link */}
      <a
        href="#main-nav"
        className="sr-only focus:not-sr-only focus:fixed focus:top-12 focus:left-2 focus:z-50 focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Accéder à la navigation principale
      </a>
    </>
  )
}

// CSS helper class for screen-reader only (sr-only)
export const srOnlyStyles = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .focus\\:not-sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
`
