import { Chat } from "../response/chat.response";
import ReactMarkdown from "react-markdown"

interface UserMessageComponentProps {
    chat: Chat;
}

export const UserMessageComponent = ({ chat }: UserMessageComponentProps) => {
    if (!chat.message?.content) return null
    return (
        <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1"><span
            className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <div className="rounded-full bg-gray-100 border p-1"><svg stroke="none" fill="black" stroke-width="0"
                viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z">
                </path>
            </svg></div>
        </span>
            <div className="flex-1 prose prose-sm max-w-none">
                <ReactMarkdown>
                    {chat.message.content}
                </ReactMarkdown>
            </div>
        </div>
    );
};