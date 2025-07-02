import React from 'react';

const EditProductForm = ({ editProduct, onChange, onSubmit, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Edit Product</h3>
                <form className="add-user-form" onSubmit={onSubmit}>
                    <input type="text" name="productName" placeholder="Product Name" value={editProduct.productName} onChange={onChange} required/>
                    <textarea name="productDescription" placeholder="Product Description" value={editProduct.productDescription} onChange={onChange} required/>
                    <input type="number" name="productPoints" placeholder="Product Points" value={editProduct.productPoints} onChange={onChange} required/>
                    <div className="form-group">
                        {editProduct.productImages && typeof editProduct.productImages[0] === 'string' && (
                            <p>Current Image: <strong>{editProduct.productImages[0]}</strong></p>
                        )}
                        <input
                            type="file" name="productImages" accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    onChange({ target: { name: 'productImages', value: [file] } });
                                }
                            }}
                        />
                    </div>
                    

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;
