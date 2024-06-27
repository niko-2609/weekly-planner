import Header from "@/components/auth/header"
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BsExclamationTriangle } from "react-icons/bs";

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops!"
            backButtonLabel="Back to login"
            backButtonHref="/sign-in"
            >
        <div className="w-full items-center text-destructive flex justify-around">
            <BsExclamationTriangle size="24" /> <p className="text-md">Something went wrong, please try again.</p>
        </div>

        </CardWrapper>
    )
}