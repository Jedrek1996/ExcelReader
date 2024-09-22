import { render, screen } from "@testing-library/react";
import Header from "../../components/misc/Header";

describe("Header Component", () => {
  it("renders the heading with the correct text", () => {
    render(<Header />);
    const headingElement = screen.getByRole("heading", { name: /CSV Reader/i });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass(
      "text-5xl font-bold bg-gradient-to-r from-red-500 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent text-center"
    );
  });

  it("renders the GitHub link with the correct href", () => {
    render(<Header />);
    const linkElement = screen.getByRole("link", { name: /Github URL/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/Jedrek1996/ExcelReader"
    );
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveClass(
      "underline hover:text-indigo-200 transition duration-200"
    );
  });

  it("displays the developer's name", () => {
    render(<Header />);
    const developerText = screen.getByText(/Developed by: Jedrek/i);
    expect(developerText).toBeInTheDocument();
  });
});
