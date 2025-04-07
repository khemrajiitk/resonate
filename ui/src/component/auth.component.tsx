import { useState } from "react";
import { z } from "zod";
import { AuthService } from "../service/auth.service";
import { SecurityManager } from "../util/security-manager";
import toast from "react-hot-toast";
import { User } from "../response/auth.response";

// Zod Schemas
const SignInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")

const SignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    dob: z
        .string()
        .regex(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            "DOB must be in dd/mm/yyyy format"
        ),
    password: passwordSchema,
    otp: z.string().length(4, "OTP must be 4 digits"),
});

type SignInType = z.infer<typeof SignInSchema>;
type SignUpType = z.infer<typeof SignUpSchema>;

interface AuthComponentProps {
    handleLogIn: (user: User) => void;
}

export const AuthComponent = ({ handleLogIn }: AuthComponentProps) => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [signInReq, setSignInReq] = useState<SignInType>({
        email: "",
        password: "",
    });

    const [signUpReq, setSignUpReq] = useState<SignUpType>({
        name: "",
        email: "",
        dob: "",
        password: "",
        otp: "",
    });

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = SignInSchema.safeParse(signInReq);
        if (!result.success) {
            const zodErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) zodErrors[err.path[0]] = err.message;
            });
            setErrors(zodErrors);
            toast.error("Please fix the form errors");
            return;
        }

        setErrors({});
        setLoading(true);
        const [data, err] = await AuthService.signIn(signInReq);
        setLoading(false);

        if (err) return toast.error("Sign in failed.");
        SecurityManager.setSignInResponse(data);
        toast.success("Signed in successfully!");

        handleLogIn(data.user);
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = SignUpSchema.safeParse(signUpReq);
        if (!result.success) {
            const zodErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) zodErrors[err.path[0]] = err.message;
            });
            setErrors(zodErrors);
            toast.error("Please fix the form errors");
            return;
        }

        setErrors({});
        setLoading(true);
        const [data, err] = await AuthService.signUp(signUpReq);
        setLoading(false);

        if (err) return toast.error("Sign up failed.");

        SecurityManager.setSignInResponse(data);
        toast.success("Account created!");

        handleLogIn(data.user);
    };

    return (
        <div style={
            {
                "boxShadow": "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);"
            }
        }
            className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
            <div className="bg-white p-2 w-full max-w-md">
                {/* Toggle Buttons */}
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-4 py-2 rounded-l-xl font-semibold transition ${isSignIn ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                        onClick={() => {
                            setIsSignIn(true);
                            setErrors({});
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-xl font-semibold transition ${!isSignIn ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                        onClick={() => {
                            setIsSignIn(false);
                            setErrors({});
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={isSignIn ? handleSignIn : handleSignUp}
                    className="space-y-4"
                >
                    {!isSignIn && (
                        <>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    value={signUpReq.name}
                                    onChange={(e) =>
                                        setSignUpReq({ ...signUpReq, name: e.target.value })
                                    }
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Date of Birth</label>
                                <input
                                    type="text"
                                    placeholder="DD/MM/YYYY"
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                    value={signUpReq.dob}
                                    onChange={(e) => setSignUpReq({ ...signUpReq, dob: e.target.value })}
                                />
                                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={isSignIn ? signInReq.email : signUpReq.email}
                            onChange={(e) =>
                                isSignIn
                                    ? setSignInReq({ ...signInReq, email: e.target.value })
                                    : setSignUpReq({ ...signUpReq, email: e.target.value })
                            }
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={isSignIn ? signInReq.password : signUpReq.password}
                            onChange={(e) =>
                                isSignIn
                                    ? setSignInReq({ ...signInReq, password: e.target.value })
                                    : setSignUpReq({ ...signUpReq, password: e.target.value })
                            }
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>

                    {!isSignIn && (
                        <div>
                            <label className="block mb-1 text-sm font-medium">OTP</label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                value={signUpReq.otp}
                                onChange={(e) =>
                                    setSignUpReq({ ...signUpReq, otp: e.target.value })
                                }
                            />
                            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 rounded-xl transition ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        {loading
                            ? "Loading..."
                            : isSignIn
                                ? "Sign In"
                                : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};
