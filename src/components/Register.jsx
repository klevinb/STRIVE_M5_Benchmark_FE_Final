import React, { Component } from 'react';
import Navbar from './Navbar'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'

class Register extends Component {

    state = {
        showUser: false,
        show: false,
        person: {
            name: '',
            surname: '',
            email: '',
            password: '',
            birthDay: new Date(),
            streetAddress: '',
            city: '',
            postalCode: '',
        }
    }

    // componentDidUpdate = () => {
    //     if (
    //         this.state.show === false &&
    //         this.state.person.name.length > 2 &&
    //         this.state.person.surname.length > 3 &&
    //         this.state.person.email.includes("@") &&
    //         this.state.person.password.length >= 8 &&
    //         this.state.person.postalCode.length >= 5
    //     ) {
    //         this.setState({
    //             show: !this.state.show
    //         });
    //     }
    // }

    // You can do it in HTML5 using required + pattern => please do it!
    // You can add in react some fields that are displayed with conditional rendering when a field doesn'0t match the specified condition
    // Usually for this we use regex

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePass = (pass) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return re.test(String(pass))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.person.name.length < 3) {
            console.log("Name too short")
            return;
        }

        this.setState({
            showUser: !this.state.showUser
        });
    }

    getFullYear = (date) => {
        const year = new Date(date).getFullYear()

        if (year < 1911) {
            return false
        } else {
            return true
        }
    }

    updatePerson = (event) => {
        let person = this.state.person
        person[event.currentTarget.id] = event.currentTarget.value

        this.setState({
            person
        });
    }

    render() {
        return (
            <div>
                <Navbar props={this.props} register={true} />

                <Container>
                    <Row className="d-flex justfify-content-center">
                        <Col md={6} className="offset-3">
                            <h1 className="text-center">Register</h1>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="name"
                                                placeholder="Name"
                                                value={this.state.person.name}
                                                onChange={this.updatePerson}
                                                required
                                            />
                                            {this.state.person.name && this.state.person.name.length < 2 && <div className="errorMessage"> The name should have at least 2 chars</div>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Surname</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="surname"
                                                placeholder="Surname"
                                                value={this.state.person.surname}
                                                onChange={this.updatePerson}
                                                required
                                            />
                                            {this.state.person.surname && this.state.person.surname.length < 3 && <div className="errorMessage"> The surname should have at least 3 chars</div>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                id="email"
                                                placeholder="Email"
                                                value={this.state.person.email}
                                                onChange={this.updatePerson}
                                                required
                                            />
                                            {this.state.person.email && !this.validateEmail(this.state.person.email) && <div className="errorMessage">Email is not valid</div>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="password"
                                                placeholder="Password"
                                                value={this.state.person.password}
                                                onChange={this.updatePerson}
                                                required
                                            />
                                            {this.state.person.password && !this.validatePass(this.state.person.password) && <div className="errorMessage">Should contain at least 8 chars, 1 digit, 1 letter</div>}

                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <Form.Label>Birth Day</Form.Label>
                                    <Form.Control
                                        type="date"
                                        id="birthDay"
                                        value={this.state.person.birthDay}
                                        onChange={this.updatePerson}
                                        required
                                    />
                                    {this.state.person.birthDay && !this.getFullYear(this.state.person.birthDay) && <div className="errorMessage">Year should be greater than 1910</div>}
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Street Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="streetAddress"
                                                placeholder="Street Address"
                                                value={this.state.person.streetAddress}
                                                onChange={this.updatePerson}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="city"
                                                placeholder="City"
                                                value={this.state.person.city}
                                                onChange={this.updatePerson}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Postal Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="postalCode"
                                                placeholder="Postal Code"
                                                value={this.state.person.postalCode}
                                                onChange={this.updatePerson}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button className="offset-5" variant="primary" type="submit">
                                    Register
                                    </Button>

                            </Form>
                        </Col>
                    </Row>
                    {this.state.showUser ?
                        <>
                            <Row className="d-flex justfify-content-center mt-3">
                                <Col>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Surname</th>
                                                <th>Email</th>
                                                <th>Password</th>
                                                <th>Birthday</th>
                                                <th>Street Address</th>
                                                <th>City</th>
                                                <th>Postalcode</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.state.person.name}</td>
                                                <td>{this.state.person.surname}</td>
                                                <td>{this.state.person.email}</td>
                                                <td>{this.state.person.password}</td>
                                                <td>{this.state.person.birthDay}</td>
                                                <td>{this.state.person.streetAddress}</td>
                                                <td>{this.state.person.city}</td>
                                                <td>{this.state.person.postalCode}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </>
                        :
                        <Row className="d-flex justfify-content-center">
                            <Col className="text-center" >
                                <p>No users to display</p>
                            </Col>
                        </Row>
                    }
                </Container>
            </div >
        );
    }
}

export default Register;