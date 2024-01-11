import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state as any;
    const { children } = this.props as any;
    
    if (!hasError) {
      return children;
    }

    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>
          ERROR BOUNDARY
        </h1>
      </div>
    );
  }
}

export { ErrorBoundary };