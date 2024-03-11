import SubLink from "@/components/ui/SideNavigation/_partials/SubLink";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("SubLink", () => {
    const item = {
        link: "/example",
        exact: true,
        subitems: [],
        label: "Example label",
        title: "Example title",
        hideTitle: true,
  items: [{
    link: "",
    exact: true,
    subitems: [],
    label: ""
  }]
    }
    const subitem = {
        link: "/example2",
            label: "example label 2",
            exact: true
    }
    it("should render sublink", () => {
        render(<SubLink activeLinkStyle={{}} item={item} subitem={subitem}/>)
        const sublink = screen.getByTestId("subLinkId")
        expect(sublink).toBeInTheDocument()
    })

    it("should render sublink label", () => {
        render(<SubLink item={item} activeLinkStyle={{}} subitem={subitem}/>)
        const link = screen.getByTestId("linkId")
        expect(link).toBeInTheDocument()
        expect(link.firstChild?.textContent).toBe(subitem.label)
    })
})