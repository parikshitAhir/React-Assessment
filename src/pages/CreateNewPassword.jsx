import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const userId = user?._id;

    if (!userId) {
        setMessage("User ID not found. Please login again.");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await axios.post(
                "https://node-product-distribution-backend.agiletechnologies.in/admin/changePassword",
                {
                    _id: userId,
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Password changed successfully!");


            setTimeout(() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userInfo");
                navigate("/login", { replace: true });
                window.location.reload();
            }, 500);

        } catch (error) {
            console.error(error);
            setMessage(
                "Failed to change password. " +
                (error?.response?.data?.message || "Unknown error.")
            );
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Create New Password</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
