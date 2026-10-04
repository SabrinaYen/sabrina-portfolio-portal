import { useState } from "react";
import { api, API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-provider";
function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isShwPwd, setIsShwPwd] = useState(false);
    const handleSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const req = await api.post(API_URL.Login, { username: username, password: password })
        if(req?.status === 200) {
            const {access_token} = req?.data || {};
            login(access_token);
            navigate("/dashboard",{ replace: true });
        }
    }
    const handleShowPwd = () => {
        setIsShwPwd(!isShwPwd);
    }
    return (
        <div className="min-h-screen flex">
            {/* Left panel */}
            <div className="hidden lg:flex w-1/2 bg-blue-950 text-white flex flex-col justify-between p-10">
                {/* portfolio logo */}
                <div className="flex flex-row items-center gap-2 pl-2">
                    <div className="w-12 h-12 text-slate-400 border border-2 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-orange-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <span className="text-xl font-semibold">Portfolio CMS</span>
                </div>
                {/* Content Quote */}
                <div className="space-y-2 text-3xl">
                    <p>Everything on your site</p>
                    <p>— work, words, résumé</p>
                    <p>— behind one door.</p>
                </div>
                {/* Link */}
                <p className="text-sm text-white/60 font-mono">sabrinayen.github.io</p>
            </div>
            {/* Right panel */}
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
                    <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
                    <p className="text-gray-500 mt-1 mb-8">Manage your portfolio content.</p>

                    <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label className="block text-xs font-semibold tracking-wide text-gray-600 mb-1">
                                EMAIL
                            </label>
                            <input
                                type="text"
                                placeholder="user1234"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold tracking-wide text-gray-600 mb-1">
                                PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type={isShwPwd ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium"
                                    onClick={handleShowPwd}
                                >
                                    Show
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-colors"
                        >
                            Sign in
                        </button>
                    </form>

                </div>
            </div>
        </div >
    );
}

export default Login;