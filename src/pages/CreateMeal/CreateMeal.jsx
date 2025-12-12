import React from "react";
import { useForm } from "react-hook-form";

const CreateMeal = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleCreateMeal = data =>{

    } 

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow px-6 py-6">
        <h2 className="text-2xl font-bold mb-1">Create Meal</h2>
        <p className="text-sm text-gray-500 mb-6">
          Add a new meal to the platform. All fields marked * are required.
        </p>

        <form onSubmit={handleSubmit(handleCreateMeal)}
        
        className="space-y-4">
          {/* Food Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Food Name *</label>
            <input
              type="text"
              name="foodName"
              className="w-full input input-bordered"
              placeholder="e.g. Grilled Chicken Salad"
            />
          </div>

          {/* Chef Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Chef Name *</label>
            <input
              type="text"
              name="chefName"
              className="w-full input input-bordered"
              placeholder="Chef name"
            />
          </div>

          {/* Food Image uploader */}
          <div>
            <label className="block text-sm font-medium mb-1">Food Image *</label>
            <input
              type="file"
              name="foodImage"
              accept="image/*"
              className="block w-full text-sm text-gray-600 file-input input-bordered"
            />
          </div>

          {/* Price & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (৳) *</label>
              <input
                type="number"
                name="price"
                step="0.01"
                className="w-full input input-bordered"
                placeholder="e.g. 250"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rating (0–5)</label>
              <input
                type="number"
                name="rating"
                step="0.1"
                className="w-full input input-bordered"
                placeholder="e.g. 4.5"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium mb-1">Ingredients *</label>
            <input
              type="text"
              name="ingredients"
              className="w-full input input-bordered"
              placeholder="Comma separated: Chicken, Rice, Onion, Garlic"
            />
            <p className="text-xs text-gray-400 mt-1">Enter ingredients separated by commas.</p>
          </div>

          {/* Estimated Delivery Time & Chef Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estimated Delivery Time *</label>
              <input
                type="text"
                name="estimatedDeliveryTime"
                className="w-full input input-bordered"
                placeholder="e.g. 30–45 minutes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Chef's Experience *</label>
              <input
                type="text"
                name="chefExperience"
                className="w-full input input-bordered"
                placeholder="e.g. 5 years in Continental cuisine"
              />
            </div>
          </div>

          {/* Chef ID (readonly) and User Email (readonly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Chef ID</label>
              <input
                type="text"
                name="chefId"
                readOnly
                className="w-full input input-bordered bg-gray-50"
                placeholder="Assigned after admin approval"
              />
              <p className="text-xs text-gray-400 mt-1">This ID will be assigned once admin approves you as a chef.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">User Email</label>
              <input
                type="email"
                name="userEmail"
                readOnly
                className="w-full input input-bordered bg-gray-50"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="btn bg-orange-500 hover:bg-orange-600 text-white w-full"
            >
              Create Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
