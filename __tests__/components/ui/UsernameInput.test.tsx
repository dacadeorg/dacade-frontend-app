import React from "react";
import { render, screen } from "@testing-library/react";
import UsernameInput from "@/components/ui/UsernameInput";
import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import { FormValues } from "@/pages/signup";

describe("UsernameInput", () => {
    it("should render the username input", ()=> {
      const { register } = useForm<FormValues>()
    render(<UsernameInput register={register} errors={{}} usernameValue=""/>)
    })
    const usernameValue = screen.getByTestId("usernameInput")

    expect(usernameValue).toBeInTheDocument()
})
