import {render, screen} from "@testing-library/react";
import App from "./App";

describe("renders learn react link", () => {
    it('initial',() => {
        render(<App />);
        const linkElement = screen.getByText('Our assets');
        expect(linkElement).toBeDefined();
    })
});
