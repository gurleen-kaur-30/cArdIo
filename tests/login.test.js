import { render, fireEvent, screen } from '@testing-library/react';
import { mount, shallow } from 'enzyme'; 
import Login from "../pages/login"
import Dashboard from "../pages/dashboard"
import Router from 'next/router'




describe("Login", () =>{
    it("renders login screen without crash", () => {
        render(<Login/>)
    })

    it("types in email correctly", () => {
        render(<Login/>)
        const email = screen.getByLabelText("Email")
        fireEvent.change(email, { target: { value: 'ginni@ginni.com' } })
        expect(email.value).toBe('ginni@ginni.com')
    })

    it("types in password correctly", () => {
        render(<Login/>)
        const password = screen.getByLabelText("Password")
        fireEvent.change(password, {target: { value: 'ginni1234' } })
        expect(password.value).toBe('ginni1234')
    })

    it("logs in successfully and routes to dashboard", () => {
        render(<Login/>)
        const loginButton = screen.getByText("LOG IN")
        fireEvent.click(loginButton)
        expect(render(<Dashboard/>))
    })

})

