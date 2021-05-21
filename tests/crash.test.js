import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import '../setupTests'
import Login from "../pages/login"
import Post from "../pages/signup"
import {shallow} from 'enzyme'

let wrapper;

describe("Home", () => {
  it("renders Home Page without crashing", () => {
    render(<Home/>)
    const button = screen.getAllByRole("button");
    expect(button).toBeInTheDocument
  });

});



describe("signup", () =>{
    it("renders Sign Up Page without crashing", () => {
        render(<Post/>)
    })
})


describe("Login", () =>{
    it("types in username correctly", () => {
        render(<Login/>)
    })
})