import React from 'react';
import './StudentDisplay.css';
import Avatar from '../components/characterCustomization/Avatar';


const StudentCard = ({ student }) => {
    return (
      <div className="student-card" onClick={() => console.log(student.name)}>
        <div className="student-avatar" >
            <Avatar avatar={student.avatar} background={student.background} border={student.border}/>
        </div>
        
        <span className="student-name">{student.firstname}</span>
      </div>
    );
  };
  

const StudentDisplay = ({ students }) => {
    return (
        <div className="student-list">
            {students.map((student) => (
                <StudentCard key={student.id} student={student} />
            ))}
        </div>
    );
};

export default StudentDisplay;