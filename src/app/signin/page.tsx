"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBackToHome = () => {
    // Set flag to skip loading screen
    if (typeof window !== "undefined") {
      sessionStorage.setItem("skipLoading", "true");
    }
    router.push("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Sign in:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
      {/* Back Button */}
      <button
        onClick={handleBackToHome}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 flex items-center gap-2 text-[#d4c5a9] hover:text-[#c9a227] transition-colors duration-300 group"
        aria-label="Back to home"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm font-medium tracking-wide hidden sm:inline">Back</span>
      </button>

      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-[rgba(201,162,39,0.08)] via-transparent to-transparent blur-3xl" />
      </div>

      {/* Sign In Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="signin-card bg-gradient-to-b from-[rgba(13,19,33,0.9)] to-[rgba(5,5,8,0.95)] backdrop-blur-xl border border-[rgba(201,162,39,0.2)] rounded-lg p-8 sm:p-10 shadow-[0_0_40px_rgba(201,162,39,0.1)]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#d4c5a9] mb-2 tracking-wide">
              Welcome to <span className="gold-glow font-decorative">UDHAYAM</span>
            </h1>
            <p className="text-[#8b8b7a] text-sm sm:text-base">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[#d4c5a9] text-sm mb-2 tracking-wide">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7355]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 6.66667L10 11.6667L17.5 6.66667M3.33333 15H16.6667C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6667 5H3.33333C2.41286 5 1.66667 5.74619 1.66667 6.66667V13.3333C1.66667 14.2538 2.41286 15 3.33333 15Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-[rgba(10,10,15,0.6)] border border-[rgba(201,162,39,0.2)] rounded-lg text-[#d4c5a9] placeholder-[#8b7355] focus:outline-none focus:border-[rgba(201,162,39,0.5)] focus:ring-2 focus:ring-[rgba(201,162,39,0.1)] transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[#d4c5a9] text-sm mb-2 tracking-wide">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7355]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8333 9.16667H15V6.66667C15 3.825 12.675 1.5 9.83333 1.5C6.99167 1.5 4.66667 3.825 4.66667 6.66667V9.16667H3.75C3.05964 9.16667 2.5 9.72631 2.5 10.4167V16.25C2.5 16.9404 3.05964 17.5 3.75 17.5H15.8333C16.5237 17.5 17.0833 16.9404 17.0833 16.25V10.4167C17.0833 9.72631 16.5237 9.16667 15.8333 9.16667ZM10.8333 13.75C10.8333 14.1625 10.4958 14.5 10.0833 14.5H9.58333C9.17083 14.5 8.83333 14.1625 8.83333 13.75V12.9167C8.83333 12.5042 9.17083 12.1667 9.58333 12.1667H10.0833C10.4958 12.1667 10.8333 12.5042 10.8333 12.9167V13.75ZM13.3333 9.16667H6.33333V6.66667C6.33333 4.74583 7.9125 3.16667 9.83333 3.16667C11.7542 3.16667 13.3333 4.74583 13.3333 6.66667V9.16667Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-20 py-3 bg-[rgba(10,10,15,0.6)] border border-[rgba(201,162,39,0.2)] rounded-lg text-[#d4c5a9] placeholder-[#8b7355] focus:outline-none focus:border-[rgba(201,162,39,0.5)] focus:ring-2 focus:ring-[rgba(201,162,39,0.1)] transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d4c5a9] hover:text-[#c9a227] transition-colors duration-300 text-sm tracking-wide"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full btn-magical-primary py-3 text-base font-semibold tracking-wider"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(201,162,39,0.2)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-b from-[rgba(13,19,33,0.9)] to-[rgba(5,5,8,0.95)] text-[#8b7355] tracking-widest uppercase">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,162,39,0.2)] rounded-lg text-[#d4c5a9] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(201,162,39,0.3)] transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.1712 8.36792H17.5V8.33334H10V11.6667H14.7512C14.1812 13.6083 12.4071 15 10.4167 15C7.89958 15 5.83333 12.9338 5.83333 10.4167C5.83333 7.89959 7.89958 5.83334 10.4167 5.83334C11.7071 5.83334 12.8658 6.34167 13.7283 7.17417L15.8917 5.01084C14.4408 3.62417 12.5458 2.91667 10.4167 2.91667C5.89958 2.91667 2.29167 6.52459 2.29167 11.0417C2.29167 15.5588 5.89958 19.1667 10.4167 19.1667C14.9338 19.1667 18.5417 15.5588 18.5417 11.0417C18.5417 10.2742 18.4417 9.53334 18.1712 8.36792Z"
                fill="#4285F4"
              />
              <path
                d="M3.00708 6.77417L5.54458 8.52084C6.29042 6.73334 8.17417 5.41667 10.4167 5.41667C11.7071 5.41667 12.8658 5.925 13.7283 6.7575L15.8917 4.59417C14.4408 3.2075 12.5458 2.5 10.4167 2.5C7.29917 2.5 4.60708 4.34167 3.00708 6.77417Z"
                fill="#EA4335"
              />
              <path
                d="M10.4167 19.1667C12.5458 19.1667 14.4408 18.45 15.8917 17.0625L13.3992 15.0125C12.5658 15.6958 11.5071 16.0833 10.4167 16.0833C8.39917 16.0833 6.60708 14.6667 6.04583 12.6958L3.48208 14.5208C5.06583 17.0083 7.59917 19.1667 10.4167 19.1667Z"
                fill="#34A853"
              />
              <path
                d="M18.1712 8.36792H17.5V8.33334H10V11.6667H14.7512C14.4321 12.595 13.8571 13.4042 13.3992 14.0125L15.8917 16.0625C15.7821 16.1917 18.5417 13.75 18.5417 11.0417C18.5417 10.2742 18.4417 9.53334 18.1712 8.36792Z"
                fill="#FBBC05"
              />
            </svg>
            <span className="text-sm font-medium tracking-wide">Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-[#d4c5a9] text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#c9a227] hover:text-[#d4af37] hover:underline transition-colors duration-300 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-6 text-center">
            <p className="text-[#8b7355] text-xs leading-relaxed">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-[#c9a227] hover:text-[#d4af37] hover:underline transition-colors duration-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#c9a227] hover:text-[#d4af37] hover:underline transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

