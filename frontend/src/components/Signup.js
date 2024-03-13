import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroup, InputGroupText } from "reactstrap";
import { NavbarBrand, Navbar, Container, Row, Col, } from "reactstrap";
import Footer from './Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Register() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    }); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/register", values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login')
                } else {
                    alert('Something went wrong');
                }
            })
            .catch(err => {
                console.log(err.response.data.Error);
            });
    };

    return (
        <>
            <div className="main-content-signup">
                <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
                    <Container className="px-4">
                        <NavbarBrand to="/" tag={Link}>
                            {/* <img alt="..." src={require("../../assets/img/brand/image.png")} height={"400px"} width={"100px"} style={{ height: "70px" }} /> */}
                        </NavbarBrand>
                        <button className="navbar-toggler" id="navbar-collapse-main">
                            <span className="navbar-toggler-icon" />
                        </button>
                    </Container>
                </Navbar>
                <div className="header bg-gradient-info py-7 py-lg-8">
                    <Container>
                        <div className="header-body text-center mb-7">
                            <Row className="justify-content-center">
                                <Col lg="5" md="6">
                                    <h1 className="text-white">Welcome!</h1>
                                    <p className="text-lead text-light">
                                    To The WebNews Get Daily Dose Of News For Free!.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="fill-default"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                </div>

                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <center> <h1>Registration Now</h1> </center><hr />
                            <Form role="form" onSubmit={handleSubmit}>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupText>
                                            <InputGroupText>
                                            <i class="bi bi-person-circle"></i>
                                            </InputGroupText>
                                        </InputGroupText>
                                        <Input placeholder="Enter Name" type="text" name="name" onChange={(e) => setValues({ ...values, name: e.target.value })} required />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupText>
                                            <InputGroupText>
                                            <i class="bi bi-envelope-check-fill"></i>                                            </InputGroupText>
                                        </InputGroupText>
                                        <Input type="email" placeholder="Enter email" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} required />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupText>
                                            <InputGroupText>
                                            <i class="bi bi-key"></i>
                                            </InputGroupText>
                                        </InputGroupText>
                                        <Input type="password" placeholder="Enter Password" name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} required />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <Button className="mt-4" color="primary" type="submit">Sign Up </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </div>
            <div className="news_letter_section">
                <Container>
                    <Row className='center_input'>
                        <Col className='col-xxl-7 col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12'>
                            <div className='Newsletter-title'>
                                <h2>Newsletter</h2>
                                <p>Get E-mail updates about our latest shop and special offers.</p>
                            </div>
                        </Col>
                        <Col className="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                            <Form className="news-form">
                                <input id="newsLetter" placeholder="Enter Your Email Address" type="email"  name="newsLetter" className='newsletter-field'></input>
                                <Button type="btn"> Subscribe </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}
export default Register;