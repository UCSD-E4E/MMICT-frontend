interface MemberProfileProps {
  name: string;
  role: string;
}

export default function MemberProfile(props: MemberProfileProps) {
  return (
    <div className="profile">
      <h1>{props.name}</h1>
      <h2>{props.role}</h2>
      <div className="icons">
        <img
          alt="LinkedIn"
          src={require("../assets/resources/linkedin.png")}
          className="linkedin-icon"
        />
        <img
          alt="Email"
          src={require("../assets/resources/email.png")}
          className="email-icon"
        />
      </div>
    </div>
  );
}
