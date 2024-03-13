import { Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer>
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright">
                © {new Date().getFullYear()}{" "}
                <a className="font-weight-bold ml-1" href="/" > <strong> Saurabh Ojha</strong> </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
export default Login;