import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";

function App() {
  const [language, setLanguage] = useState("swedish");
  const [activeSection, setActiveSection] = useState("");
  const currentYear = new Date().getFullYear();

  const sectionRefs = {
    aboutmepage: useRef(null),
    educationpage: useRef(null),
    examensarbetepage: useRef(null),
    contactmepage: useRef(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // 60% of the section should be visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionRefs]);

  return (
    <>
      <header>
        <div className="myname">
          <h3>Johannes Stenfeldt</h3>
        </div>
        <div className="navdiv">
          <nav>
            <Link
              to="aboutmepage"
              smooth={true}
              duration={500}
              className={activeSection === "aboutmepage" ? "active" : ""}
            >
              {language === "swedish" ? "Om Mig" : "About me"}
            </Link>
            <Link
              to="educationpage"
              smooth={true}
              duration={500}
              className={activeSection === "educationpage" ? "active" : ""}
            >
              {language === "swedish" ? "Utbildning" : "Education"}
            </Link>
            <Link
              to="examensarbetepage"
              smooth={true}
              duration={500}
              className={activeSection === "examensarbetepage" ? "active" : ""}
            >
              {language === "swedish" ? "Examensarbete" : "Final project"}
            </Link>
            <Link
              to="contactmepage"
              smooth={true}
              duration={500}
              className={activeSection === "contactmepage" ? "active" : ""}
            >
              {language === "swedish" ? "Kontakta mig" : "Contact me"}
            </Link>
          </nav>
        </div>
        <div className="selectlanguage">
          <select
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="swedish">Swedish</option>
            <option value="english">English</option>
          </select>
        </div>
      </header>
      <section
        id="aboutmepage"
        ref={sectionRefs.aboutmepage}
        className="article aboutmepage"
      >
        <div className="imagesection">
          <div className="imagecontainer">
            <img src="/images/aboutmeimage.JPG" alt="Bild på Johannes" />
          </div>
        </div>
        <div className="textcontainer">
          <h1>{language === "swedish" ? "Om Mig" : "About me"}</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            illum veniam est, temporibus facilis doloribus deleniti repellendus
            laboriosam facere placeat praesentium assumenda cum excepturi
            quisquam et recusandae ex sed! Repellat?
          </p>
        </div>
      </section>
      <section
        id="educationpage"
        ref={sectionRefs.educationpage}
        className="article educationpage"
      >
        <div className="textcontainer">
          <h1>{language === "swedish" ? "Utbildning" : "Education"}</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            illum veniam est, temporibus facilis doloribus deleniti repellendus
            laboriosam facere placeat praesentium assumenda cum excepturi
            quisquam et recusandae ex sed! Repellat?
          </p>
        </div>
        <div className="imagesection2">
          <div className="imagecontainer">
            <img
              src="/images/glimakrafolkhogskola.jpg"
              alt="Bild på Glimåkra folkhögskola"
            />
          </div>
        </div>
      </section>
      <section
        id="examensarbetepage"
        ref={sectionRefs.examensarbetepage}
        className="article examensarbetepage"
      >
        <div className="imagesection">
          <div className="imagecontainer">
            <img src="/images/examensarbete.png" alt="Bild på Johannes" />
          </div>
        </div>
        <div className="textcontainer">
          <h1>{language === "swedish" ? "Examensarbete" : "Final project"}</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            illum veniam est, temporibus facilis doloribus deleniti repellendus
            laboriosam facere placeat praesentium assumenda cum excepturi
            quisquam et recusandae ex sed! Repellat?
          </p>
        </div>
      </section>
      <section
        id="contactmepage"
        ref={sectionRefs.contactmepage}
        className="article contactmepage"
      >
        <div className="textcontainer">
          <h1>{language === "swedish" ? "Länkar" : "Links"}</h1>
        </div>
        <div className="linksdiv">
          <div className="link githubcontainer">
            <h3>Github</h3>
            <p>
              {language === "swedish"
                ? "Har är länk till mig Github!"
                : "Here is a link to my Github!"}
            </p>
          </div>
          <div className="link emailcontainer">
            <h3>Email</h3>
            <p>{language === "swedish" ? "Maila mig här!" : "Mail me here!"}</p>
          </div>
          <div className="link linkedincontainer">
            <h3>LinkedIn</h3>
            <p>
              {language === "swedish"
                ? "Kolla in mitt LinkedIn konto!"
                : "Check out my LinkedIn profile!"}
            </p>
          </div>
        </div>
        <footer>
          <p>&copy; Jeorge01 {currentYear}</p>
        </footer>
      </section>
    </>
  );
}

export default App;
