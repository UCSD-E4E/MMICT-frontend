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
          <MemberProfile name='Zach Lawrence' role='Team Lead'/>
          <MemberProfile name='Jason Yang' role='Team Lead'/>
          <MemberProfile name='Hou Wai Wan' role='Software Developer'/>
          <MemberProfile name='Kane Li' role='Software Developer'/>
          <MemberProfile name='Aditya Kakarla' role='Software Developer'/>
          <MemberProfile name='Ryan Lee' role='Software Developer'/>
          <MemberProfile name='Haesol Jung' role='Software Developer'/>
          <MemberProfile name='Arjun Varshney' role='Machine Learning Engineer'/>
          <MemberProfile name='Ridhi Srikanth' role='Machine Learning Engineer'/>
          <MemberProfile name='Lucas Chen' role='Machine Learning Engineer'/>
          <MemberProfile name='Nathan Hui' role='Advisor'/>
          <MemberProfile name='Curt Schurgers' role='Advisor'/>
          <MemberProfile name='Ryan Kastner' role='Advisor'/>
        </div>
      </div>
    </div>
  );
}
