import { render, screen, fireEvent } from '@testing-library/react';
import { mount, shallow } from 'enzyme'; 
import Post from "../pages/signup"
import Dashboard from "../pages/dashboard"
let wrapper;


describe("signup", () =>{
    it("renders signup screen without crash", () => {
        render(<Post/>)
    })

    it("types in name correctly", () => {
        render(<Post/>)
        const name = screen.getByLabelText("Name")
        fireEvent.change(name, { target: { value: 'Gurleen' } })
        expect(name.value).toBe('Gurleen')
    })

    it("types in age correctly", () => {
        render(<Post/>)
        const age = screen.getByLabelText("Age")
        fireEvent.change(age, { target: { value: '21' } })
        expect(age.value).toBe('21')
    })

    it("types in email correctly", () => {
        render(<Post/>)
        const email = screen.getByLabelText("Email")
        fireEvent.change(email, { target: { value: 'gurleen@gurleen.com' } })
        expect(email.value).toBe('gurleen@gurleen.com')
    })

    it("types in password correctly", () => {
        render(<Post/>)
        const password = screen.getByLabelText("Password")
        fireEvent.change(password, {target: { value: 'ginni1234' } })
        expect(password.value).toBe('ginni1234')
    })

    it("successfully signs up and routes to dashboard", () => {
        render(<Post/>)
        const signUpButton = screen.getByText("SIGN UP")
        const email = screen.getByLabelText("Email")
        fireEvent.change(email, { target: { value: 'gurleen@gurleen.com' } })
        const password = screen.getByLabelText("Password")
        fireEvent.change(password, {target: { value: 'ginni1234' } })
        fireEvent.click(signUpButton)
        expect(render(<Dashboard/>))
    })
})