import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import SelectWithImages from "./components/CustomDropdown";

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

  const options = [
    { label: "Swedish", image: "/icons/se.svg" },
    { label: "English", image: "/icons/gb.svg" },
  ];

  const myAge = (() => {
    const today = new Date();
    const birthdate = "2001-10-24";
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Check if the birthday has occurred this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  })();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    console.log("Selected language:", newLanguage); // Optional: for debugging purposes
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
          <h2>JS</h2>
        </div>
        <div className="navdiv">
          <nav>
            <Link
              to="aboutmepage"
              smooth={true}
              duration={500}
              className={activeSection === "aboutmepage" ? "active" : ""}
            >
              {language === "swedish" ? "Om mig" : "About me"}
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
          <SelectWithImages
            options={options}
            language={language}
            onChange={handleLanguageChange}
          />
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
          <h1>{language === "swedish" ? "Om mig" : "About me"}</h1>
          <p>
            {language === "swedish"
              ? `Mitt namn är Johannes. Jag är ${myAge} år gammal och har utbildat mig
            till webbutvecklare. Jag har ett stort och växande intresse för
            webbutveckling både inom backend och frontend och kodar även på egen
            tid. Andra saker som betyder mycket för mig är sport som Volleyboll,
            Fotboll, Padel och Tennis men även olika typer av datorspel och
            brädspel. `
              : `My name is Johannes. I am ${myAge} years old and I have studied to become a web developer. 
            I have a strong and growing interest in web development, both in backend and frontend, 
            and I also code in my spare time. Other things that mean a lot to me are sports like volleyball, 
            football, padel, and tennis, as well as various types of computer and board games.`}
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
            {language === "swedish"
              ? `Jag gick en tvåårig utbildning som tog plats på Glimåkra folkhögskola. 
            Terminerna var uppdelade i moduler där vi inriktade
            oss inom olika områden och de anvsluades med ett case där vår uppgift var att
            bygga ett projekt med de tekniker som vi lärt oss. Kursen bestod av tålv
            moduler.`
              : `I've studied for two years to become a web developer at Glimåkra Folkhögskola. 
            The course were divided into modules where we focused on different areas, 
            and at the end of each module we had a case where we had to build a project using the techniques we had learned. 
            The course consisted of twelve modules.`}
          </p>
          <div className="modules">
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>Javascript</li>
              <li>
                {language === "swedish"
                  ? "Javascript API:er"
                  : "Javascript APIs"}
              </li>
              <li>
                {language === "swedish"
                  ? "Hosting och wordpress"
                  : "Hosting and wordpress"}
              </li>
              <li>Node.js</li>
            </ul>
            <ul>
              <li>
                {language === "swedish"
                  ? "Backend PHP och SQL"
                  : "Backend PHP and SQL"}
              </li>
              <li>React</li>
              <li>Webbsockets</li>
              <li>Fullstack PHP</li>
              <li>
                {language === "swedish"
                  ? "Wordpress gruppprojekt"
                  : "Wordpress grouproject"}
              </li>
              <li>
                {language === "swedish" ? "Examensarbete" : "Final project"}
              </li>
            </ul>
          </div>
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
          <div className="imagecontainer2">
            <img
              src="/images/application-on-phone.png"
              alt="Bild på Johannes"
            />
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
            <a href="https://github.com/Jeorge01" target="_blank"></a>
            <img src="/icons/logo-github.svg" alt="" />
            <h3>Github</h3>
            <p>
              {language === "swedish"
                ? "Har är länk till mig Github!"
                : "Here is a link to my Github!"}
            </p>
          </div>
          <div className="link emailcontainer">
            <a href="mailto:johannesstenfeldt@gmail.com" target="_blank"></a>
            <img src="/icons/mail-outline.svg" alt="" />
            <h3>Email</h3>
            <p>johannesstenfeldt@gmail.com</p>
          </div>
          <div className="link linkedincontainer">
            {/* <a href="" target="_blank"></a> */}
            <img src="/icons/logo-linkedin.svg" alt="" />
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
