'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * App-level error boundary. Catches render errors so a single broken view
 * doesn't blank the whole app. `componentDidCatch` is the hook for wiring a
 * telemetry/logging service later.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Aarya ErrorBoundary caught:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 gap-3">
            <p className="font-serif text-xl font-bold text-primary">Something went wrong</p>
            <p className="font-sans text-sm text-on-surface/60 max-w-sm">
              We hit an unexpected error rendering this view. Please refresh the page.
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/30 pb-0.5 hover:border-primary"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
