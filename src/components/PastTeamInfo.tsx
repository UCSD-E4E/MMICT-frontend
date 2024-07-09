import MemberProfile from "./MemberProfile";

export default function PastTeamInfo() {
  return (
    <div>
      <div className="past-members-div">
        <h1 className="members-title">Past Members</h1>
        <div className="profiles-div">
          <MemberProfile name='Edward Jin' role='Software Developer'/>
          <MemberProfile name='Dillon Hicks' role='Software Developer'/>
          <MemberProfile name='Leon Lin' role='Software Developer'/>
          <MemberProfile name='Devin Muzzy' role='Software Developer'/>
          <MemberProfile name='Jacob Lin' role='Software Developer'/>
          <MemberProfile name='Niklas Chang' role='Software Developer'/>
          <MemberProfile name='Avanti Bhandarkar' role='Machine Learning Engineer'/>
          <MemberProfile name='Jieqi Liu' role='Machine Learning Engineer'/>
          <MemberProfile name='Runyu Tian' role='Machine Learning Engineer'/>
          <MemberProfile name='Yutian Shi' role='Machine Learning Engineer' />
        </div>
      </div>
    </div>
  );
}
