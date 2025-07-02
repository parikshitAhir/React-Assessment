// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';
import '../App.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;
    const token = localStorage.getItem('authToken');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({
        userName: '',
        mobileNo: '',
        point: '',
        depot: 'Dewas'
    });


    const fetchUsers = async () => {
        try {
            const response = await axios.post(
                'https://node-product-distribution-backend.agiletechnologies.in/admin/user/list',
                {
                    "limit": 100
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("Response Data:", response.data);
            const userList = response.data?.data?.adminUserList;
            if (Array.isArray(userList)) {
                setUsers(userList);
            } else {
                console.error("adminUserList is not an array:", userList);
                alert('Failed to parse user list');
            }

        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch users');
        }
    };

    // const handleLogout = () => {
    //     localStorage.removeItem('authToken');
    //     navigate('/');
    // };
    const adduserfild = () => {
        setShowAddForm(!showAddForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...newUser,
                point: Number(newUser.point), 
            };

            const response = await axios.post(
                'https://node-product-distribution-backend.agiletechnologies.in/admin/user/create',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('User added successfully!');
            setNewUser({ userName: '', mobileNo: '', point: '', depot: 'Dewas' });
            setShowAddForm(false);
            fetchUsers();
        } catch (error) {
            console.error('Add User Error:', error.response?.data || error.message);
            alert('Failed to add user');
        }
    };



    const handleEdit = (user) => {
        console.log('Edit user:', user);
        setEditUser({ ...user });
        setShowEditForm(true);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const payload1 = {
                ...editUser,
                point: Number(editUser.point), 
            };

            const response = await axios.post(
                `https://node-product-distribution-backend.agiletechnologies.in/admin/user/update`, // Use correct ID key
                payload1,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('User updated successfully!');
            setShowEditForm(false);
            fetchUsers(); 
        } catch (error) {
            console.error('Update Error:', error);
            alert('Failed to update user');
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>User List</h2>
                <div>
                    <button className="add-user-btn" onClick={adduserfild}>+ Add User</button>
                    {/* <button className="logout-btn" onClick={handleLogout}>Logout</button> */}
                </div>
            </div>

            <input
                type="text"
                placeholder="Search by User Name..."
                className="search-input"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            {showAddForm && (
                <AddUserForm
                    newUser={newUser}
                    onChange={handleInputChange}
                    onSubmit={handleAddUser}
                    onClose={() => setShowAddForm(false)}
                />
            )}

            {showEditForm && (
                <EditUserForm
                    editUser={editUser}
                    onChange={handleEditInputChange}
                    onSubmit={handleUpdateUser}
                    onClose={() => setShowEditForm(false)}
                />
            )}

            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Mobile No</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                            <tr key={user._id || index}>
                                <td>{user.userName}</td>
                                <td>{user.mobileNo}</td>
                                <td>{user.point }</td>
                                <td>
                                    <span className="action-link" onClick={() => handleEdit(user)}>Edit</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>

                <span>Page {page} of {totalPages}</span>

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default Dashboard;
