import MetaData from "@/components/ui/MetaData";
import { getMetadataDescription } from "@/utilities/Metadata";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const description = "Test description";
const expectedMetaTags = getMetadataDescription(description);

describe("MetaData", () => {
  it("should render metaData tags", () => {
    render(<MetaData description={description} />);
    const metaTags = screen.getAllByTestId("meta-id");
    expect(metaTags).toHaveLength(expectedMetaTags.length);
  });

  it("should render the title when applicable", () => {
    render(<MetaData description={description} title="Any title" />);
    const metatitle = screen.getByTestId("page-title");
    expect(metatitle).toHaveTextContent("Any title");
  })

  it("should render the correct content in the meta tags", () => {
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
