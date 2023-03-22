import React from 'react'

const Profile = () => {

    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    console.log("PROFILE DATA",currentUser);
    return (
        <div className="container">
            <h3>
                <strong>{currentUser.username}</strong> Profile
            </h3>
            <p>
                <strong>Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    )
}

export default Profile