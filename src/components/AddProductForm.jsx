import React from 'react';

const AddProductForm = ({ newProduct, onChange, onSubmit, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Add New Product</h3>
                <form className="add-user-form" onSubmit={onSubmit}>
                    <input  type="text"  name="productName"  placeholder="Product Name"  value={newProduct.productName}  onChange={onChange}  required/>
                    <textarea name="productDescription" placeholder="product Description" value={newProduct.productDescription} onChange={onChange} required/>
                    <input type="number" name="productPoints" placeholder="product Points" value={newProduct.productPoints} onChange={onChange} required/>
                    <input type="file" name="productImages" onChange={(e) => onChange(e, true)} required />
                    <button type="submit">Add Product</button>
                </form>

            </div>
        </div>
    );
};

export default AddProductForm;
