/**
 * @file ProfilePage.jsx
 * @description This component renders the profile page for users. It displays user-specific details such as username, points, and level. The profile page adapts based on the user type (student or teacher), including sections for badges, avatar customization, and sharable codes. It handles fetching user and badge data, joining teachers for students, and displaying the relevant information.
 *
 * @module ProfilePage
 * @requires React
 * @requires useEffect
 * @requires useState
 * @requires BadgeContainer
 * @requires StudentDisplay
 * @requires @mui/material/Unstable_Grid2
 * @requires MenuBar
 * @requires DefaultButton
 * @requires CustomButton
 * @requires CopyCodeButton
 * @requires ../context/ApiProvider
 * @requires ../components/characterCustomization/Avatar
 * @requires ../assets/styles/App.css
 *
 * @component
 * @example
 * <ProfilePage />
 *
 * @returns {JSX.Element} The Profile Page component
 */

import React, { useEffect, useState } from "react";
import BadgeContainer from "../components/BadgeDisplay";
import StudentDisplay from "../components/StudentDisplay";
import Grid from "@mui/material/Unstable_Grid2";
import MenuBar from "../components/MenuBar";
import DefaultButton from "../components/DefaultButton";
import "../assets/styles/App.css";
import { useApi } from "../context/ApiProvider";
import Avatar from "../components/characterCustomization/Avatar";
import { Box } from "@mui/material";
import CustomButton from "../components/CustomButton"; // Import CustomButton
import CopyCodeButton from "../components/CopyCodeButton";

const ProfilePage = () => {
  const { getData, postData } = useApi();
  const [badges, setBadges] = useState(undefined);
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);
  const [user, setUser] = useState({
    username: "",
    points: 0,
    level: 0,
    usertype: "",
    sharableCode: "",
  });
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [avatar, setAvatar] = useState({
    avatar: "_default.png",
    border: "_default.png",
    background: "_default.png",
  });
  const [students, setStudents] = useState([]);
  const [sharableCode, setSharableCode] = useState("");
  const [statusMessage, setStatusMessage] = useState({
    text: "",
    isError: false,
  });
  const [copyStatus, setCopyStatus] = useState("Copy Code");

  useEffect(() => {
    const fetchBadges = async (badgeArray) => {
      try {
        const fetchedBadges = await Promise.all(
          badgeArray.map(async (badge) => {
            const responseData = await getData(`api/badges/id/${badge.id}`);
            responseData["timeAchieved"] = badge.timeAchieved;
            return responseData;
          }),
        );
        setBadges(fetchedBadges);
        setIsBadgeLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await postData("api/auth/current", { token });
        const userData = await getData(`api/users/id/${res.decoded.id}`);
        console.log(userData);
        setUser({
          username: userData.username,
          points: userData.points || 0,
          level: userData.level || 0,
          usertype: userData.usertype || "",
          sharableCode: userData.sharableCode || "",
        });
        setAvatar({
          avatar: userData.avatar,
          border: userData.border,
          background: userData.background,
        });
        fetchBadges(userData.badges || []);
        if (userData.students.length !== 0) {
          const studentData = await postData("api/users/getStudents", {
            studentIds: userData.students,
          });
          setStudents(studentData);
        }
        setIsUserLoading(false);
      } catch (error) {
        console.log(error);
        setIsUserLoading(true);
      }
    };
    fetchUser();
  }, [getData, postData]);

  const handleJoin = async () => {
    console.log("Join teacher button clicked");
    try {
      console.log("Joining teacher with code:", sharableCode);
      const response = await postData("/api/users/student/join-teacher", {
        sharableCode,
      });
      console.log("Response received:", response);
      if (response && response.message === "Successfully joined the teacher") {
        setStatusMessage({
          text: "Successfully joined the teacher!",
          isError: false,
        });
      } else if (response.error === "Already part of this teacher") {
        setStatusMessage({
          text: "You are already part of this teacher's class.",
          isError: true,
        });
      } else if (response.error === "Invalid teacher code") {
        setStatusMessage({
          text: "Invalid teacher code. Please try again.",
          isError: true,
        });
      } else {
        setStatusMessage({
          text: "Failed to join. Please check the code and try again.",
          isError: true,
        });
      }
    } catch (error) {
      console.error("Error joining teacher:", error);
      setStatusMessage({
        text: "An error occurred. Please try again.",
        isError: true,
      });
    }
  };
  // const handleCopyCode = () => {
  //   navigator.clipboard.writeText(user.sharableCode);
  //   setCopyStatus("Copied!");
  //   setTimeout(() => setCopyStatus("Copy Code"), 2000);
  // };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.sharableCode).then(() => {
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy Code"), 2000);
    });
  };
  return (
    <div className="App-page" style={{ maxWidth: "100vw" }}>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <MenuBar />
      </Box>
      <Grid
        container
        spacing={2}
        style={{ padding: "0 30px 0 20px", width: "100%" }}
      >
        <Grid xs={10} style={{ padding: "0 0 10px 40px" }}>
          <h2
            style={{
              color: "white",
              font: "Roboto",
              fontWeight: "700",
              fontSize: "60px",
            }}
          >
            MY PROFILE
          </h2>
        </Grid>
        <Grid xs={2}></Grid>
        <Grid
          xs={4}
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              border: "1px solid black",
              padding: "20px",
              marginBottom: "20px",
              flexGrow: "1",
              width: "90%",
              textAlign: "center",
              borderRadius: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            }}
          >
            <Avatar
              avatar={avatar.avatar}
              background={avatar.background}
              border={avatar.border}
            />
            <h2 className="russo-one-regular text-4xl">@{user.username}</h2>
          </div>
          <div
            style={{
              border: "1px solid black",
              padding: "20px",
              marginBottom: "20px",
              flexGrow: "1",
              width: "90%",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderRadius: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            }}
          >
            {user.usertype === "student" && (
              <h2 className="russo-one-regular text-4xl">
                {isUserLoading ? "Loading..." : user.level} ⭐️
              </h2>
            )}
            <DefaultButton href="/leaderboard" text="View Leaderboard" />
          </div>

          {/* Student Section */}
          {user.usertype === "student" && (
            <>
              <div
                style={{
                  border: "1px solid black",
                  padding: "20px",
                  marginBottom: "40px",
                  flexGrow: "1",
                  width: "90%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                }}
              >
                <h2 className="russo-one-regular text-4xl">
                  {isUserLoading ? "Loading..." : user.points} 💰
                </h2>
                <DefaultButton href="/customize" text="Customise Avatar" />
              </div>
              <div
                style={{
                  border: "1px solid black",
                  padding: "20px",
                  marginBottom: "40px",
                  flexGrow: "1",
                  width: "90%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                }}
              >
                {/* Status message */}
                {statusMessage.text && (
                  <div
                    style={{
                      color: statusMessage.isError ? "red" : "green",
                      marginBottom: "10px",
                    }}
                  >
                    {statusMessage.text}
                  </div>
                )}
                <input
                  type="text"
                  value={sharableCode}
                  onChange={(e) => setSharableCode(e.target.value)}
                  placeholder="Enter Teacher's Code"
                  style={{
                    marginRight: "10px",
                    padding: "10px",
                    width: "80%",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                  }}
                />
                <CustomButton
                  onClick={handleJoin}
                  text="Join Teacher"
                  style={{ width: "80%" }}
                />
              </div>
            </>
          )}
          {/* Teacher Section */}
          {user.usertype === "teacher" && (
            <div
              style={{
                border: "1px solid black",
                padding: "20px",
                marginBottom: "40px",
                flexGrow: "1",
                width: "90%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
              }}
            >
              <h2 className="russo-one-regular text-3xl">Sharable Code</h2>
              <p
                className="russo-one-regular"
                style={{
                  padding: "5px",
                  width: "90%",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  margin: "10px",
                  textAlign: "center",
                  backgroundColor: "#FFC700",
                  fontSize: "40px",
                  color: "white",
                }}
              >
                {user.sharableCode}
              </p>
              <CopyCodeButton onClick={handleCopyCode} variant="contained">
                {copyStatus}
              </CopyCodeButton>
            </div>
          )}
        </Grid>

        {user.usertype === "student" && (
          <Grid
            xs={8}
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                padding: "20px",
                marginBottom: "40px",
                flexGrow: "1",
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
              }}
            >
              <h2
                style={{ font: "Roboto", fontWeight: "700", fontSize: "40px" }}
              >
                My Badges
              </h2>
              {isBadgeLoading ? (
                <p>Loading...</p>
              ) : (
                <BadgeContainer badges={badges} />
              )}
            </div>
          </Grid>
        )}

        {user.usertype === "teacher" && (
          <Grid
            xs={8}
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                padding: "20px",
                marginBottom: "40px",
                flexGrow: "1",
                width: "100%",
                maxHeight: "700px",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white",
              }}
            >
              <h2
                style={{ font: "Roboto", fontWeight: "700", fontSize: "40px" }}
              >
                My Students
              </h2>
              <StudentDisplay students={students} />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ProfilePage;
