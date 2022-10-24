import React from "react";


export default class ErrorBoundary extends React.Component {
    state = { error: false };

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error) {
    // Log or store the error
        console.error(error);
    }

    render() {
        if (this.state.error) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}