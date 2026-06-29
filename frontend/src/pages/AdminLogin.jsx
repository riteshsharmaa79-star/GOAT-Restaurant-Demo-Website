import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { login } from "@/lib/auth";
import { ASSETS } from "@/lib/brand";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin";

    const onSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        // Tiny delay for UX feedback
        setTimeout(() => {
            const ok = login(username.trim(), password);
            setLoading(false);
            if (ok) navigate(from, { replace: true });
            else setError("Invalid credentials. Please try again.");
        }, 250);
    };

    return (
        <main
            data-testid="page-admin-login"
            className="min-h-screen w-full bg-[#0D0A07] text-[#F0E6D3] flex items-center justify-center px-6 py-20 relative overflow-hidden"
        >
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 20%, rgba(201,169,110,0.18), transparent 50%), radial-gradient(circle at 80% 80%, rgba(122,76,53,0.22), transparent 55%)",
                }}
                aria-hidden="true"
            />
            <Link
                to="/"
                data-testid="admin-login-back"
                className="absolute top-6 left-6 inline-flex items-center gap-2 text-[#F0E6D3]/60 hover:text-[#C9A96E] transition-colors text-xs uppercase tracking-[0.24em]"
            >
                <ArrowLeft size={14} /> Back to Site
            </Link>

            <div className="relative w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="h-16 w-16 overflow-hidden border border-[#C9A96E]/40 mx-auto mb-6">
                        <img src={ASSETS.logo} alt="G.O.A.T." className="w-full h-full object-cover" />
                    </div>
                    <div className="font-accent text-[10px] tracking-[0.34em] text-[#C9A96E] uppercase">
                        Staff Access
                    </div>
                    <h1 className="font-display italic text-4xl md:text-5xl mt-3">
                        Admin <span className="text-[#C9A96E]">Console</span>
                    </h1>
                    <p className="font-body text-sm text-[#F0E6D3]/65 mt-3">
                        Sign in to manage hero, menu and about content.
                    </p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="bg-[#1A1410] border border-[#C9A96E]/20 p-8 md:p-10"
                    data-testid="admin-login-form"
                >
                    <label className="block mb-6">
                        <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E] uppercase mb-3">
                            Username
                        </div>
                        <div className="flex items-center gap-3 border border-[#C9A96E]/25 focus-within:border-[#C9A96E] transition-colors px-4 py-3">
                            <User size={16} className="text-[#C9A96E]/60" />
                            <input
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                data-testid="admin-login-username"
                                className="bg-transparent flex-1 outline-none text-[#F0E6D3] placeholder:text-[#F0E6D3]/30 font-body text-base"
                                placeholder="admin"
                            />
                        </div>
                    </label>

                    <label className="block mb-3">
                        <div className="font-accent text-[10px] tracking-[0.32em] text-[#C9A96E] uppercase mb-3">
                            Password
                        </div>
                        <div className="flex items-center gap-3 border border-[#C9A96E]/25 focus-within:border-[#C9A96E] transition-colors px-4 py-3">
                            <Lock size={16} className="text-[#C9A96E]/60" />
                            <input
                                type={showPw ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                data-testid="admin-login-password"
                                className="bg-transparent flex-1 outline-none text-[#F0E6D3] placeholder:text-[#F0E6D3]/30 font-body text-base"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                className="text-[#C9A96E]/70 hover:text-[#C9A96E]"
                                aria-label="Toggle password visibility"
                                data-testid="admin-login-toggle-pw"
                            >
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </label>

                    {error && (
                        <div
                            data-testid="admin-login-error"
                            className="mt-4 text-sm text-red-400 font-body tracking-wide"
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        data-testid="admin-login-submit"
                        className="mt-8 w-full py-3.5 bg-[#C9A96E] text-[#0D0A07] font-body text-xs uppercase tracking-[0.28em] hover:bg-[#F0E6D3] transition-colors disabled:opacity-60"
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </button>

                    <div className="mt-8 pt-6 border-t border-[#C9A96E]/10 text-center">
                        <div className="font-accent text-[10px] tracking-[0.32em] text-[#F0E6D3]/40 uppercase">
                            Demo Credentials
                        </div>
                        <div className="font-body text-sm text-[#F0E6D3]/65 mt-2">
                            <span className="text-[#C9A96E]">admin</span> /{" "}
                            <span className="text-[#C9A96E]">goat123</span>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
