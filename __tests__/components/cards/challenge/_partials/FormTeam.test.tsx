import FormTeamCard, { FormTeamCardProps } from "@/components/cards/challenge/_partials/FormTeam";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen } from '@testing-library/react';

const formTeamCardProps: FormTeamCardProps = {
  title: "FormTeamCardProps",
  description: "this is FormTeamCardProps description",
  index: 1,
};

function RenderFormTeamCard(props: FormTeamCardProps = formTeamCardProps) {
    renderWithRedux(
        <FormTeamCard
            title={props.title}
            description={props.description}
            index={props.index}
        />
    );
}

describe("FormTeamCard", () => {
    it('should render the FormTeamCard', () => {
        RenderFormTeamCard();
        expect(screen.getByText(formTeamCardProps.title)).toBeInTheDocument();
        expect(screen.getByText(formTeamCardProps.description)).toBeInTheDocument();
        expect(screen.getByText(`${formTeamCardProps.index}.`)).toBeInTheDocument();
    });

    it('should have a link to the correct URL', () => {
        RenderFormTeamCard();
        const linkElement = screen.getByRole('link', { name: 'Start now' });
        expect(linkElement).toHaveAttribute('href', 'https://t.me/+0oJye8IwAuxkMDY0');
        expect(linkElement).toHaveAttribute('target', '_blank');
    });
});
