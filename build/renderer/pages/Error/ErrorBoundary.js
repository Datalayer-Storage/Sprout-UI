import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (!hasError) {
            return children;
        }
        return (_jsx("div", { style: {
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }, children: _jsx("h1", { children: "ERROR BOUNDARY" }) }));
    }
}
export { ErrorBoundary };
