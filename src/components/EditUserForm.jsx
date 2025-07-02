import React from 'react';

const EditUserForm = ({ editUser, onChange, onSubmit, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Edit User</h3>
                <form className="add-user-form" onSubmit={onSubmit}>

                    <input type="text" name="userName" placeholder="User Name" value={editUser.userName} onChange={onChange} required/>
                    <input type="number" name="mobileNo" placeholder="Mobile No" value={editUser.mobileNo} onChange={onChange} required/>
                    <input type="number" name="point" placeholder="Points" value={editUser.point} onChange={onChange} required/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EditUserForm;
