import MemberProfile from "./MemberProfile";

export default function TeamInfo() {
  return (
    <div>
      <div className="team-title-div">
        <h1 className="team-title">Meet The Team!</h1>
      </div>
      <div className="members-div">
        <h1 className="members-title">Current Members</h1>
        <div className="profiles-div">
          <MemberProfile name='Team Member 1' role='Team Lead'/>
          <MemberProfile name='Team Member 2' role='Team Lead'/>
          <MemberProfile name='Team Member 3' role='Software Developer'/>
          <MemberProfile name='Team Member 4' role='Software Developer'/>
          <MemberProfile name='Team Member 5' role='Software Developer'/>
          <MemberProfile name='Team Member 6' role='Software Developer'/>
          <MemberProfile name='Team Member 7' role='Software Developer'/>
          <MemberProfile name='Team Member 8' role='Software Developer'/>
          <MemberProfile name='Team Member 9' role='Software Developer'/>
          <MemberProfile name='Team Member 10' role='Machine Learning Engineer'/>
          <MemberProfile name='Team Member 11' role='Machine Learning Engineer'/>
          <MemberProfile name='Team Member 12' role='Machine Learning Engineer'/>
        </div>
      </div>
    </div>
  );
}
