import { RenderOptions, render } from "@testing-library/react";
import { ReactElement } from "react";
import ReduxProvider from "./provider/ReduxProvider";

const customRender = (element: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
    return render(element, { wrapper: ReduxProvider, ...options })
}

export * from "@testing-library/react"
export { customRender as renderWithRedux }