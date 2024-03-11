import SideNavigation from "@/components/ui/SideNavigation";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { colors } from "../../../../__mocks__/colors";



describe("SideNavigation", () => {
    it("should render side navigation", () => {
        render(
        <SideNavigation items={[]} colors={colors}>
            <>Test</>
        </SideNavigation>
        )
        const sideNav = screen.getByTestId("themeWrapper")
        expect(sideNav).toBeInTheDocument()
        expect(sideNav.innerHTML).toContain("Test")
    })
})