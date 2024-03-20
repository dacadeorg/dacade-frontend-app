import MetaData from "@/components/ui/MetaData";
import { getMetadataDescription } from "@/utilities/Metadata";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";


describe("MetaData", () => {

  const description = "Test description";

  it("should render metaData", () => {
    render(<MetaData description={description} />);
    const metadata = screen.queryByTestId("meta-id");
    expect(metadata).toBeInTheDocument();
  });

  it("should render meta tags", () => {
    render(<MetaData description={description} />);
    const mockMetas = getMetadataDescription(description);
    mockMetas.forEach((meta, index) => {
      const metaElements = screen.queryAllByTestId(`meta-${index}`);
      metaElements.forEach((metaElement) => {
        expect(metaElement).toBeInTheDocument();
        expect(metaElement).toHaveAttribute("name", meta.name);
        expect(metaElement).toHaveAttribute("content", meta.content);
      });
    });
  });
});
