import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from "@material-tailwind/react";

function ProductById() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the product details by ID
                const productResponse = await axios.post(`${process.env.REACT_APP_API_URL}/products/getProductById`, { productById: productId });
                console.log(productResponse)
                setProduct(productResponse.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [productId]);

    return (
        <div className="container mx-auto mt-8 px-4">
            {product ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white shadow-md rounded-md w-full">
                        <img src={product.data.product_img} alt='product' className='w-full h-auto object-cover rounded-t-md' />
                    </div>

                    <div className="bg-white shadow-md rounded-md p-6 w-1/2">
                        <img src={product.data.product_img} alt='product' className='w-28 h-auto object-cover rounded-t-md' />
                    </div>

                    <div className="p-6 flex flex-col justify-center  bg-white shadow-md rounded-md w-full">
                        <h2 className="text-2xl font-semibold mb-2">{product.data.product_name}</h2>
                        <p className="text-lg text-gray-600  font-semibold mb-4">Price: ${product.data.price}</p>
                        <p className="text-lg text-gray-600 font-semibold mb-4">Discount: {product.discount}</p>
                        <p className="text-lg text-gray-600 font-semibold mb-4">Brand: {product.data.brand}</p>
                        <p className="text-lg text-gray-600 font-semibold font-semibold mb-4">Warranty: 2 years</p>
                        <p className="text-lg text-gray-600 font-semibold mb-4">Description: {product.data.product_description}</p>
                        <div className='flex flex-row justify-items-center items-center'>
                            <Link to={`/OrderProduct`}>
                                <button className='block w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:bg-green-700'>
                                    Buy Now
                                </button>
                            </Link>
                            <Link to={`/addToCart`}>
                                <button className='block w-full py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:bg-green-700'>
                                    Add Cart
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>

            ) : (
                <div className="flex justify-center items-center h-screen">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <p className="text-lg text-gray-600">No reviews yet</p>
            </div>

            <div className="bg-white shadow-md rounded-md p-10">
                <h2 className="text-2xl font-semibold mb-4">Similliar Product</h2>
                {
                    product&&product.relatedData.map((product) => {
                        return (
                            <div key={product._id} className='flex flex-col bg-white shadow-md rounded-lg overflow-hidden'>
                                <img src={product.product_img !== null ? product.product_img : '/noimage.png'} alt='product' className='h-48 w-48 object-cover' />
                                <div className='p-4'>
                                    <h3 className='text-xl font-semibold'>{product.product_name}</h3>
                                    <p className='text-lg text-gray-700'>Price: ${product.price}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ProductById;
