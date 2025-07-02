import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProductForm';


const ProductDashboard = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;
    const token = localStorage.getItem('authToken');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: '',
        productDescription: '',
        productImages: '',
        productPoints: ''
    });
    const [showEditForm, setShowEditForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);


    const fetchProduct = async () => {
        try {
            const response = await axios.post(
                'https://node-product-distribution-backend.agiletechnologies.in/admin/product/list',
                {
                    "limit": 50
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("Response Data:", response.data);
            const productList = response.data?.data?.adminProductList;
            if (Array.isArray(productList)) {
                setProduct(productList);
            } else {
                console.error("adminproductList is not an array:", productList);
                alert('Failed to parse product list');
            }

        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch Product');
        }
    };

    const addproductfild = () => {
        setShowAddForm(!showAddForm);
    };

    const handleInputChange = (e, isFile = false) => {
        const { name, value, files } = e.target;
        if (isFile) {
            const file = files[0];
            setNewProduct((prev) => ({ ...prev, [name]: file }));
        } else {
            setNewProduct((prev) => ({ ...prev, [name]: value }));
        }
    };

// *******************************************************************
    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            const imageFile = newProduct.productImages;
            const imageName = imageFile.name;

            const payload = {
                productName: newProduct.productName,
                productDescription: newProduct.productDescription,
                productPoints: parseInt(newProduct.productPoints),
                productImages: [imageName], 
            };

            console.log('Payload:', payload);

            const response = await axios.post(
                'https://node-product-distribution-backend.agiletechnologies.in/admin/product/create',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert('Product added successfully!');
            setNewProduct({ productName: '', productDescription: '', productImages: '', productPoints: '' });
            setShowAddForm(false);
            fetchProduct();
        } catch (error) {
            console.error('Add Product Error:', error.response?.data || error.message);
            alert('Failed to add Product: ' + (error.response?.data?.message?.join?.(', ') || ''));
        }
    };
    // *******************************************************
    const handleEdit = (product) => {
        console.log('Edit product:', product);
        setEditProduct({ ...product });
        setShowEditForm(true);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        try {
            const file = editProduct.productImages?.[0];

            const imageFilename = file instanceof File ? file.name : file;

            const payload = {
                _id: editProduct._id,
                productName: editProduct.productName?.trim(),
                productDescription: editProduct.productDescription?.trim(),
                productImages: [imageFilename],  
                removeImages: [],
                productPoints: parseInt(editProduct.productPoints),
                productStatus: editProduct.productStatus ?? true,
            };

            console.log('Update Payload:', payload);

            const response = await axios.post(
                'https://node-product-distribution-backend.agiletechnologies.in/admin/product/update',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert('Product updated successfully!');
            setShowEditForm(false);
            fetchProduct(); 
        } catch (error) {
            console.error('Update Error:', error.response?.data || error.message);
            alert(
                'Failed to update product: ' +
                (error.response?.data?.message?.join?.(', ') || 'Unknown error')
            );
        }
    };




    useEffect(() => {
        fetchProduct();
    }, []);

    const filteredproduct = product.filter(product =>
        product.productName.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredproduct.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const currentproduct = filteredproduct.slice(startIndex, endIndex);
    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2>Product List</h2>
                    <div>
                        <button className="add-user-btn" onClick={addproductfild}>+ Add product</button>
                    </div>
                </div>

                <input type="text" placeholder="Search by User Name..." className="search-input" value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                {showAddForm && (
                    <AddProductForm
                        newProduct={newProduct}
                        onChange={handleInputChange}
                        onSubmit={handleAddProduct}
                        onClose={() => setShowAddForm(false)}
                    />
                )}

                {showEditForm && (
                    <EditProductForm
                        editProduct={editProduct}
                        onChange={handleEditInputChange}
                        onSubmit={handleUpdateProduct}
                        onClose={() => setShowEditForm(false)}
                    />
                )}

                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Name</th>
                            <th>Points</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentproduct.length > 0 ? (
                            currentproduct.map((product, index) => (
                                <tr key={product._id || index}>
                                    <td>{product.productImages }</td>
                                    <td>{product.productName }</td>
                                    <td>{product.productPoints}</td>
                                    <td>
                                        <span className="action-link" onClick={() => handleEdit(product)}>Edit</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No product found.</td>
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


        </>
    )
};

export default ProductDashboard;