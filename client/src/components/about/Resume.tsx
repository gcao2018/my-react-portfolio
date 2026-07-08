import { Paper } from '@mui/material';
import './Resume.css'

export default function Resume() {
  return <Paper>
    <h3 className='experience'>Work Experience</h3>
    <span className='company'><b>Fidelity Investments</b>, Merrimack, NH</span>
    <div className='role'>
      <i className='job-title'>Front-End Developer/Software Engineer</i>
      <span className='date-range'>Jun 2020 - Dec 2025</span>
    </div>
    <ul className='responsibilities'>
      <li>Developed and debugged experience APIs in TypeScript, utilizing GraphQL and Node.js for new features for Fidelity Web, Mobile, and portable Activity and Orders (A&O) applications.</li>
      <li>Developed reusable front-end UI components for Fidelity Web A&O application, leveraging ag-grid, Angular and Node.js, and Fidelity Design System (FDS) following Fidelity enterprise standards.</li>
      <li>Led project to develop performance tests of GraphQL experience APIs utilizing RushHour to send requests. Configured performance testing environment utilizing WireMock and AWS Firefly. Optimized efficiency to overcome issues such as RushHour slowing down at high RPS. Validated and updated min and max Kubernetes pod configurations required for application to handle 3X peak production traffic. Utilized Splunk and DataDog for performance-analysis and error logging.</li>
      <li>Improved CI/CD processes by maintaining and optimizing Jenkins pipelines. Supported repository migration efforts from Bitbucket to GitHub and integrated CodeQL scans for enhanced security.</li>
      <li>Refactored functions and components in codebase to follow clean-code and object-oriented best practices such as encapsulation, single responsibility principle, and abstraction to improve reusability and maintainability.</li>
      <li>Provided critical on-call support, resolving production incidents and conducting thorough root cause analysis to prevent reoccurrence.</li>
      <li>Employed test-driven development, writing robust unit tests using Jest and component tests with Storybook, achieving max coverage greater than required for passing Sonar scans and ensuring application stability.</li>
    </ul>
    <div className='role'>
      <i className='job-title'>Associate Software Engineer</i>
      <span className='date-range'>Jun 2018 - Jun 2020</span>
    </div>
    <ul className='responsibilities'>
      <li>Maintained the Genesys platform, critical to intelligent call routing between Fidelity clients, advisors, and analysts. Updated software to route Fidelity clients to appropriate customer service groups.</li>
      <li>Drove code maintainability initiative by refactoring routing logic to increase code reusability and modularity.</li>
      <li>Convinced squad to use GitHub for version control to backup client routing metadata, securing data integrity and ensure a reliable historical record.</li>
    </ul>
    <div className='role'>
      <i className='job-title'>Leap Associate Software Engineer</i>
      <span className='date-range'>Apr 2018 - Jun 2018</span>
    </div>
    <ul className='responsibilities'>
      <li>Completed Fidelity Leap program training classes and collaborated with a cross-functional team to design and implement a metrics dashboard application.</li>
    </ul>
    <div className='role'>
      <span className='company'><b>State Street Global Advisors</b>, Boston, MA</span>
      <span className='date-range'>Jan 2017 - Jun 2017</span>
    </div>
    <div className='role'>
      <i className='job-title'>Junior Systems Analyst Co-op</i>
    </div>
    <ul className='responsibilities'>
      <li>Programmed Visual Basic macros to generate XML files and FIX protocol compliant strings from Excel data sets or user inputs.</li>
      <li>Performed data analysis and quality assurance.</li>
    </ul>
    <div className='role'>
      <span className='company'><b>Massachusetts Educational Financing Authority (MEFA)</b>, Boston, MA</span>
      <span className='date-range'>Jun 2014 - Aug 2014</span>
    </div>
    <div className='role'>
      <i className='job-title'>Intern</i></div>
    <ul className='responsibilities'>
      <li>Debugged promissory note and affidavit scanning system.</li>
    </ul>
    <h3 className='education'>Education</h3>
    <div className='role'>
      <span className='university'><b>Northeastern University</b>, Boston, MA</span>
      <span className='date-range'>Sept 2013 - May 2018</span>
    </div>
    <div className='role'>
      <span className='college'>College of Computer and Information Science</span>
      <span className='gpa'>GPA: 3.3</span>
    </div>
    <div className='role'>
      <i>Bachelor of Science in Computer Science and Business Concentration in Finance</i></div>
    <ul className='responsibilities'>
      <li><b>Related Courses</b>: Software Development, Algorithms and Data Structures, Object Oriented Design, Networks and Distributed Systems, Logic and Computation, Fundamentals of Computer Science I and II, Discrete Structures, Financial Risk Management, International Finance, Microeconomics, Macroeconomics</li>
      <li><b>Honors</b>: National Merit Scholarship</li>
      <li><b>Community Service</b>: Community Servings, Let’s Get Ready, Tutors for All</li>
    </ul>
    <h3 className='certifications'>Certifications</h3>
    <ul className='responsibilities'>
      <li>Apollo GraphQL Developer - Associate Certification</li>
      <li>Fidelity GraphQL Associate Certification</li>
    </ul>
    <h3 className='skills'>Technical Skills</h3>
    <ul className='responsibilities'>
      <li><b>Languages, Frameworks, Architectural Styles, Libraries, Tools</b>: GraphQL, Experience APIs, RESTful APIs, Performance Tuning / Testing, Angular, React, TypeScript, Jest, Storybook, JavaScript, HTML, CSS, Node.js, Express, OAuth, Ag Grid, LitElement, WireMock, RushHour, Datadog, Splunk, Docker, Jenkins, CI/CD, LaunchDarkly, Java, Python, Object-Oriented Design (OOD), Functional Programming, BeautifulSoup, GitHub, Postman, Dr. Racket, Visual Basic, XML, PostgREST, Spring Boot</li>
      <li><b>Databases</b>: PostgreSQL, Microsoft Access</li>
      <li><b>Systems</b>: Linux, Macintosh, Windows</li>
    </ul>
    <h3 className='projects'>Other Projects</h3>
    <div className='projects'>Yahoo Finance Web Crawler (Python), Arbitrage Calculator (Python), Othello (Python), Tetris (Java), Snake (Java), Snake-Racers (Java), Dijkstra’s Shortest Path’s Algorithm (Java)</div>
  </Paper>;
};