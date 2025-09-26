/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/common/ScrollToTop";
import ErrorBoundary from "@/ui/ErrorBoundary";
import { SearchProvider } from "@/contexts/SearchContext";

const Wrapper = ({ children }: any) => {

    return (
        <ErrorBoundary>
            <SearchProvider>
                {children}
                <ScrollToTop />
                <ToastContainer position="top-center" />
            </SearchProvider>
        </ErrorBoundary>
    )
}

export default Wrapper
