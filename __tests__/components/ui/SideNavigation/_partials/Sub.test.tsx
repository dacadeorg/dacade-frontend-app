import SubLink from "@/components/ui/SideNavigation/_partials/Sub";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Sub link", () => {
    const item = {
        link: "/example",
        exact: true,
        subitems: [],
        label: "Example label"
    }
    const subitem = {
        link: "/example2",
            label: "example label 2",
            exact: true
    }
    it("should render sub link", () => {
        render(<SubLink item={item} activeLinkStyle={{}} subitem={subitem}/>)
        const sublink = screen.getByTestId("sublinkId")
        expect(sublink).toBeInTheDocument()
    })

    it("should render sub link label", () => {
        render(<SubLink item={item} activeLinkStyle={{}} subitem={subitem}/>)
        const link = screen.getByTestId("linkId")
        expect(link).toBeInTheDocument()
        expect(link.firstChild?.textContent).toBe(subitem.label)
    })
})