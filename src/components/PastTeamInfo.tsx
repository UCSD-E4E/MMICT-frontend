import MemberProfile from "./MemberProfile";

export default function PastTeamInfo() {
  return (
    <div>
      <div className="past-members-div">
        <h1 className="members-title">Past Members</h1>
        <div className="profiles-div">
          <MemberProfile name='Past Team Member 1' role='Software Developer'/>
          <MemberProfile name='Past Team Member 2' role='Software Developer'/>
          <MemberProfile name='Past Team Member 3' role='Software Developer'/>
          <MemberProfile name='Past Team Member 4' role='Machine Learning Engineer'/>
          <MemberProfile name='Past Team Member 5' role='Machine Learning Engineer'/>
          <MemberProfile name='Past Team Member 6' role='Machine Learning Engineer' />
        </div>
      </div>
    </div>
  );
}
