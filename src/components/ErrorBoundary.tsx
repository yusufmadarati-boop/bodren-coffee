// Production-grade React Error Boundary component

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log unexpected runtime exception for diagnostics
    console.error('ErrorBoundary caught an unhandled exception:', error, errorInfo);
  }

  private handleReset = (): void => {
    if (this.props.onReset !== undefined) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
  };

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-red-900/40 bg-[#1a1411] p-8 text-center shadow-xl">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-950/60 text-red-400">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-[#fefae0]">
            {this.props.fallbackTitle ?? 'Application Exception Encountered'}
          </h2>
          <p className="mt-2 max-w-md text-sm text-[#a6907d]">
            {this.state.error?.message ?? 'An unexpected runtime error occurred. Please try again.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#d4a373] px-5 py-2.5 text-sm font-semibold text-[#120f0d] transition-colors hover:bg-[#faedcd]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
