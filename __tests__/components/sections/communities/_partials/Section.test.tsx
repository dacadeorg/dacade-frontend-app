import Section from "@/components/sections/communities/_partials/Section";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("section", () => {
    it("should render section", () => {
        render(<Section/>)
        const communitySection = screen.getByTestId("sectionId")
        expect(communitySection).toBeInTheDocument()
    })

    it("should render section with title and subtitle", () => {
        render(<Section title={"section title"} subtitle={"section subtitle"} hideSubtitleOnMobile={false} />)
        const communitySectionTitle = screen.getByText("section title")
        expect(communitySectionTitle).toBeInTheDocument()
        const communitySectionSubTitle = screen.getByText("section subtitle")
        expect(communitySectionSubTitle).toBeInTheDocument()
    })

    it("should render with children", () => {
        render(
        <Section>
            <div>community section child</div>
        </Section>)
        const communitySectionChildren = screen.getByText("community section child")
        expect(communitySectionChildren).toBeInTheDocument()
    })
})
