/**
 * @file StudentDisplay Component
 *
 * @description Displays a list of student cards. Each card shows the student's avatar and first name.
 * Clicking on a student card logs the student's name to the console.
 *
 * @module StudentDisplay
 * @requires react
 * @requires ../components/characterCustomization/Avatar
 * @requires ./StudentDisplay.css
 *
 * @param {Object[]} students - Array of student objects.
 * @param {string} students[].id - Unique identifier for the student.
 * @param {string} students[].firstname - First name of the student.
 * @param {string} students[].avatar - Avatar image URL or identifier for the student.
 * @param {string} students[].background - Background color or image for the avatar.
 * @param {string} students[].border - Border style for the avatar.
 *
 * @returns {JSX.Element} The rendered StudentDisplay component
 */

import React from "react";
import "./StudentDisplay.css";
import Avatar from "../components/characterCustomization/Avatar";

const StudentCard = ({ student }) => {
  return (
    <div className="student-card" onClick={() => console.log(student.name)}>
      <div className="student-avatar">
        <Avatar
          avatar={student.avatar}
          background={student.background}
          border={student.border}
        />
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
