import React, { Component, ReactNode, ErrorInfo } from "react";

type Props = {
   children: ReactNode;
};

type State = {
   hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props);

      this.state = {
         hasError: false,
      };
   }

   static getDerivedStateFromError(): State {
      return { hasError: true };
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error("Application Error:", error, errorInfo);
   }

   render() {
      if (this.state.hasError) {
         return (
            <div style={{ padding: "40px", textAlign: "center" }}>
               <h1>Something went wrong</h1>
               <p>Please refresh the page or try again later.</p>
               <button onClick={() => window.location.reload()}>
                  Reload Page
               </button>
            </div>
         );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
