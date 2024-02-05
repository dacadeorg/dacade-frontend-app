import { FormValues } from "@/pages/signup";
import {  FieldErrors } from "react-hook-form";


const MessageErrors = (error: FieldErrors<FormValues>) => {
    return error.username?.message || undefined
}

export default MessageErrors