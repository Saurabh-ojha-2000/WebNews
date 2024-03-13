import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroup, InputGroupText, Row, Col, NavbarBrand, Navbar, Container } from "reactstrap";
import Footer from './Footer';

function Login() {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/login", values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/')
                } else {
                    alert(res.data.Error || 'Something went wrong in login page');
                }
            })
            .catch(err => { console.log(err); });
    };

    return (
        <>

            <div className="main-content-login">
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

                <Col lg="7" md="8">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <center> <h1>Sign In</h1> </center><hr />
                            <Form role="form" onSubmit={handleSubmit}>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupText>
                                            <InputGroupText><i class="bi bi-envelope-check-fill"></i> </InputGroupText>
                                        </InputGroupText>
                                        <Input type="email" placeholder="Enter email" name="email" onChange={(e) => setValues({ ...values, email: e.target.value })} required />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupText>
                                            <InputGroupText> <i class="bi bi-key"></i> </InputGroupText>
                                        </InputGroupText>
                                        <Input type="password" placeholder="Enter Password" name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} required />
                                    </InputGroup>
                                </FormGroup>
                                <div className="custom-control custom-control-alternative custom-checkbox">
                                    <input className="custom-control-input" id=" customCheckLogin" type="checkbox" required />
                                    <label className="custom-control-label" htmlFor=" customCheckLogin" >
                                        <span className="text-muted">Remember me</span>
                                    </label>
                                </div>
                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="submit" >Login</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col >
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
};
export default Login;