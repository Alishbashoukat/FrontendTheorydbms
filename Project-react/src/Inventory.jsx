import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InventoryPage = () => {
  const navigate = useNavigate();

  const initialInventory = [
    { product: 'Car Battery', class: 'Automotive', price: 4500, quantity: 12 },
    { product: 'Engine Oil 1L', class: 'Automotive', price: 350, quantity: 40 },
    { product: 'Brake Pads', class: 'Automotive', price: 1500, quantity: 18 },
    { product: 'Windshield Wiper', class: 'Accessories', price: 600, quantity: 25 },
    { product: 'Car Shampoo', class: 'Maintenance', price: 250, quantity: 35 }
  ];

  const [inventory, setInventory] = useState(initialInventory);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const [formData, setFormData] = useState({ product: '', class: '', price: '', quantity: '' });

  const totalCost = inventory.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQty = inventory.reduce((sum, item) => sum + item.quantity, 0);

  const handleRowClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const openForm = (mode) => {
    setFormMode(mode);
    if (mode === 'edit' && selectedIndex !== null) {
      setFormData(inventory[selectedIndex]);
    } else {
      setFormData({ product: '', class: '', price: '', quantity: '' });
    }
  };

  const handleConfirm = () => {
    if (formMode === 'add') {
      setInventory([
        ...inventory,
        { ...formData, price: Number(formData.price), quantity: Number(formData.quantity) },
      ]);
    } else if (formMode === 'edit' && selectedIndex !== null) {
      const updated = [...inventory];
      updated[selectedIndex] = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };
      setInventory(updated);
    } else if (formMode === 'delete' && selectedIndex !== null) {
      const updated = inventory.filter((_, i) => i !== selectedIndex);
      setInventory(updated);
      setSelectedIndex(null);
    }
    setFormMode(null);
  };

  const handleCancel = () => {
    setFormMode(null);
  };

  return (
    <div className="min-h-screen bg-[#EAEFEF] p-4 text-[#333446]">
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="w-full text-sm text-center">
          <thead className="bg-[#333446] text-[#EAEFEF]">
            <tr>
              <th className="p-3">Products</th>
              <th className="p-3">Class</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                className={`cursor-pointer transition-all ${
                  selectedIndex === index
                    ? 'bg-[#7F8CAA] text-white'
                    : 'hover:bg-[#B8CFCE]'
                }`}
              >
                <td className="p-2">{item.product}</td>
                <td className="p-2">{item.class}</td>
                <td className="p-2">Rs.{item.price}</td>
                <td className="p-2">{item.quantity}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm space-y-1">
        <div>Total Inventory Cost: <strong>Rs.{totalCost}</strong></div>
        <div>Total Quantity: <strong>{totalQty}x</strong></div>
        <div>Selected Item: <strong>{selectedIndex !== null ? inventory[selectedIndex].product : 'None'}</strong></div>
      </div>

      <div className="mt-6 flex flex-col gap-3 items-center">
        <button
          onClick={() => navigate('/')}
          className="w-3/4 bg-[#7F8CAA] text-white py-2 rounded-full font-semibold shadow hover:bg-[#6c7b99]"
        >
          ← Go Back
        </button>
        <button
          onClick={() => openForm('add')}
          className="w-3/4 bg-[#333446] text-[#EAEFEF] py-2 rounded-lg shadow-md font-bold hover:bg-[#2b2c3a]"
        >
          Add
        </button>
        <button
          onClick={() => selectedIndex !== null && openForm('edit')}
          className="w-3/4 bg-[#333446] text-[#EAEFEF] py-2 rounded-lg shadow-md font-bold hover:bg-[#2b2c3a]"
        >
          Edit
        </button>
        <button
          onClick={() => selectedIndex !== null && openForm('delete')}
          className="w-3/4 bg-[#7F8CAA] text-white py-2 rounded-lg shadow-md font-bold hover:bg-[#6c7b99]"
        >
          Delete
        </button>
      </div>

      {formMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[#333446]/30">
          <div className="bg-[#EAEFEF] rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
            {formMode === 'delete' ? (
              <>
                <h2 className="text-lg font-bold mb-4 text-[#333446]">
                  Remove <span className="text-[#7F8CAA]">{inventory[selectedIndex].product}</span> from the inventory?
                </h2>
                <div className="flex justify-end gap-3">
                  <button onClick={handleCancel} className="px-4 py-2 bg-[#B8CFCE] text-[#333446] rounded">Cancel</button>
                  <button onClick={handleConfirm} className="px-4 py-2 bg-[#7F8CAA] text-white rounded">Confirm</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4 text-[#333446]">
                  {formMode === 'add' ? 'Add New Item' : 'Edit Item'}
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full border border-[#7F8CAA] p-2 rounded bg-white text-[#333446]"
                  />
                  <input
                    type="text"
                    placeholder="Class"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full border border-[#7F8CAA] p-2 rounded bg-white text-[#333446]"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-[#7F8CAA] p-2 rounded bg-white text-[#333446]"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full border border-[#7F8CAA] p-2 rounded bg-white text-[#333446]"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={handleCancel} className="px-4 py-2 bg-[#B8CFCE] text-[#333446] rounded">Cancel</button>
                  <button onClick={handleConfirm} className="px-4 py-2 bg-[#7F8CAA] text-white rounded">Confirm</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
