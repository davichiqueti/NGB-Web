'use client';

import { useState } from 'react';


export default function CreatePostModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost(formData);
      alert('Post create successfully!');
      
      onClose();
    } catch (error) {
      console.error(error.message);
      alert('Error when creating post.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-700 p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl mb-4 text-white">Create new post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border p-2 text-black"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
