import React from 'react';

const AddUserForm = ({ newUser, onChange, onSubmit, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Add New User</h3>
                <form className="add-user-form" onSubmit={onSubmit}>

                    <input type="text" name="userName" placeholder="User Name"  value={newUser.userName} onChange={onChange} required />
                    <input type="number" name="mobileNo" placeholder="Mobile No" value={newUser.mobileNo} onChange={onChange} required/>
                    <input type="number" name="point" placeholder="Points" value={newUser.point} onChange={onChange} required/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddUserForm;
