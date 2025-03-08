import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Aspiring Software Engineer", "Frontend Developer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home" >
      <div style={{ marginLeft: 200, marginTop: -180}}>
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={10}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>{`Hi! I'm Ishhita Dhiman`}</h1> 
                <h2><span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Aspiring Software Developer", "Frontend Developer"]'><span className="wrap">{text}</span></span>
                </h2>
                  <p style={{ textAlign: "justify" }}>Welcome to my Portfolio! I am a final-year undergraduate pursuing Bachelor's in Technology in Computer Science from JIIT, Noida. Having worked on a live project in my University and interning at LogiqueCode has given me an exposure to significance of teamwork and collaboration. I am a passionate problem solver and willing to learn something new everyday. During my graduation, I have honed my coding skills by meticulously practicing data structures and algorithms and building projects that solve real-world problems. I am also intrigued by the current trends in technology which has motivated me to dive into the field of automation and DevOps. I have always been a hardworking student, which is reflected in my academic grades and I have sharpened my ability to dive into new domains and hone my skills in them in short period of time. I am always open to new opportunities and conversations, so let's connect!</p>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      </div>
      
    </section>
  )
}
