import { queryByAttribute, render, screen } from "test-utils/index";
import Header from "../Header";

test.only("the header has initially loading indicatior", async () => {
  const { container } = render(<Header />);
  const loadingContainer = container.querySelector("loader__container");
  expect(loadingContainer).toBeInTheDocument();
});
