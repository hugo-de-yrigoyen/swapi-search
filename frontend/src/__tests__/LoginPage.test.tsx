import React from "react";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "../pages/LoginPage";
import "@testing-library/jest-dom";

jest.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({ login: jest.fn() }),
}));

jest.mock("../components/Starfield", () => ({
  Starfield: () => <div data-testid="starfield" />, 
}));

describe("LoginPage", () => {
  it("renders username, password, and login button", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /access the system/i })).toBeInTheDocument();
  });
});
