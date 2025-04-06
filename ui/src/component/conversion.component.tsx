import { useState } from "react";
import { AiMessageComponent } from "./ai-message.component"
import { UserMessageComponent } from "./user-message.component";
import { AuthComponent } from "./auth.component";

export const ConversionComponent = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div style={
            {
                "boxShadow": "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);"
            }
        }
            className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">

            <div className="flex flex-col space-y-1.5 pb-6">
                <h2 className="font-semibold text-lg tracking-tight flex items-center space-x-2">
                    <span>Soniya</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-green-500">
                        <circle cx="12" cy="12" r="10" stroke="none" fill="currentColor"></circle>
                    </svg>
                </h2>
                <p className="text-sm text-[#6b7280] leading-3">Hi, how can I help you today?</p>
            </div>

            {<div className="pr-4 h-[474px]" style={{ "minWidth": "100%; display: table;" }}>
                {loggedIn ? <>
                    <UserMessageComponent />
                    <AiMessageComponent />
                </> : <>
                    <AuthComponent />
                </>}
            </div>}

            <div className="flex items-center pt-0">
                <form className="flex items-center justify-center w-full space-x-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                        placeholder="Type your message" value="" />
                    <button
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
                        Send</button>
                </form>
            </div>

        </div>
    );
};