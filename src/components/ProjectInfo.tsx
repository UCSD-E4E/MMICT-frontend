export default function ProjectInfo() {
  return (
    <div>
      <div className="info-sections">
        <div className="info-section">
          <div>
            <h1>Background</h1>
            <p>
              The Mangrove Monitoring project is a collaboration between
              Engineers for Exploration at UC San Diego and the Aburto Lab at
              the Scripps Institute of Oceanography (SIO) at UC San Diego to
              better track, understand, and track these important types of
              trees.
              <br/><br/>
              Both labs focus on mangroves in Baja California, Sur, where
              we work with local leaders on the conservation of mangroves in
              these areas.
            </p>
          </div>
          <img
            alt="Mangrove"
            src={require("../assets/resources/about-page-1.jpg")}
            className="info-section-image hide-on-mobile"
          />
        </div>
        <div className="info-section">
          <img
            alt="Mangrove"
            src={require("../assets/resources/about-page-2.jpg")}
            className="info-section-image hide-on-mobile"
          />
          <div>
            <h1>Current Objectives</h1>
            <p>
              Objectives include the development of powerful machine learning
              algorithms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
