

// import React, { useState, useMemo } from 'react';
// import { Link } from 'react-router-dom';

// const initialProducts = [
//   { id: 1, name: 'Candy', class: 'Sweets', price: 2, quantity: 78 },
//   { id: 2, name: 'Gallon of Mineral Water', class: 'Necessity', price: 70, quantity: 30 },
//   { id: 3, name: 'Canned Goods', class: 'Food', price: 40, quantity: 29 },
//   { id: 4, name: 'Instant Noodles', class: 'Food', price: 15, quantity: 13 },
//   { id: 5, name: 'LPG Gas', class: 'Equipment', price: 800, quantity: 1 },
// ];

// export default function Transaction() {
//   const [products] = useState(initialProducts);
//   const [filter, setFilter] = useState('');
//   const [selected, setSelected] = useState(null);
//   const [qty, setQty] = useState(0);
//   const [sold, setSold] = useState([]);
//   const [payment, setPayment] = useState('');

//   const filteredProducts = useMemo(() =>
//     products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())),
//     [products, filter]
//   );

//   const totalPrice = sold.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const change = payment ? Math.max(Number(payment) - totalPrice, 0) : 0;

//   const addItem = () => {
//     if (!selected || qty <= 0) return;
//     setSold(prev => {
//       const existing = prev.find(i => i.id === selected.id);
//       if (existing) {
//         return prev.map(i =>
//           i.id === selected.id ? { ...i, quantity: i.quantity + qty } : i
//         );
//       }
//       return [...prev, { ...selected, quantity: qty }];
//     });
//     setQty(0);
//   };

//   const removeItem = () => {
//     if (!selected) return;
//     setSold(prev => prev.filter(i => i.id !== selected.id));
//     setSelected(null);
//     setQty(0);
//   };

//   const saveTransaction = () => {
//     if (sold.length === 0) {
//       alert('No products selected to save!');
//       return;
//     }
//     if (payment === '' || Number(payment) < totalPrice) {
//       alert('Payment amount is not enough!');
//       return;
//     }
//     alert('Transaction saved!');
//     console.log('Transaction saved:', sold);
//     setSold([]);
//     setPayment('');
//     setSelected(null);
//     setQty(0);
//   };

//   return (
//     <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-4 bg-[#FFFDD0]">
//       {/* LEFT COLUMN */}
//       <div className="flex-1 space-y-4 bg-[#FFFDD0] p-2 rounded-lg border border-[#003366]">
//         {/* Available Products */}
//         <div className="border border-[#003366] rounded-lg overflow-x-auto">
//           <h2 className="text-2xl font-bold text-center bg-pink-600 text-white py-2 rounded-t-lg">
//             Available Products
//           </h2>
//           <table className="w-full table-auto min-w-[600px] text-[#003366]">
//             <thead>
//               <tr className="bg-pink-600 text-white">
//                 <th className="py-1 px-2">Products</th>
//                 <th className="py-1 px-2">Class</th>
//                 <th className="py-1 px-2">Price</th>
//                 <th className="py-1 px-2">Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((p, idx) => (
//                 <tr
//                   key={p.id}
//                   className={`text-center cursor-pointer hover:bg-yellow-200 ${idx % 2 === 0 ? 'bg-[#FAFAD2]' : 'bg-[#F5F5DC]'}`}
//                   onClick={() => setSelected(p)}
//                 >
//                   <td className="py-1 px-2">{p.name}</td>
//                   <td className="py-1 px-2">{p.class}</td>
//                   <td className="py-1 px-2">₱{p.price}</td>
//                   <td className="py-1 px-2">{p.quantity}x</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Products to be Sold */}
//         <div className="border border-[#003366] rounded-lg overflow-x-auto">
//           <h2 className="text-2xl font-bold text-center bg-pink-600 text-white py-2 rounded-t-lg">
//             Products to be Sold
//           </h2>
//           <table className="w-full table-auto min-w-[600px] text-[#003366]">
//             <thead>
//               <tr className="bg-pink-600 text-white">
//                 <th className="py-1 px-2">Products</th>
//                 <th className="py-1 px-2">Class</th>
//                 <th className="py-1 px-2">Price</th>
//                 <th className="py-1 px-2">Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sold.length > 0 ? (
//                 sold.map((s) => (
//                   <tr key={s.id} className="text-center bg-[#FAFAD2]">
//                     <td className="py-1 px-2">{s.name}</td>
//                     <td className="py-1 px-2">{s.class}</td>
//                     <td className="py-1 px-2">₱{s.price}</td>
//                     <td className="py-1 px-2">{s.quantity}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} className="text-center py-2 text-[#003366]">
//                     No products added yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* RIGHT COLUMN */}
//       <div className="w-full lg:w-96 rounded-lg p-4 space-y-4 bg-[#003366] text-white border border-[#001F4D]">
//         {/* Go Back */}
//         <Link
//           to="/"
//           className="block bg-red-600 hover:bg-red-700 text-center rounded-full py-1 font-bold"
//         >
//           ← Go Back
//         </Link>

//         <h2 className="text-3xl font-bold text-center mb-4">Transaction</h2>

//         <div className="space-y-3">
//           {/* Selected Item */}
//           <div className="grid grid-cols-3 items-center gap-2">
//             <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">
//               Selected Item
//             </label>
//             <div className="col-span-2 bg-[#F5F5DC] text-[#003366] py-1 px-2 rounded text-center">
//               {selected ? selected.name : 'None'}
//             </div>
//           </div>

//           {/* Filter */}
//           <div className="grid grid-cols-3 items-center gap-2">
//             <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">
//               Filter
//             </label>
//             <input
//               type="text"
//               className="col-span-2 py-1 px-2 rounded text-[#003366] border border-[#001F4D]"
//               placeholder="Search an Item"
//               value={filter}
//               onChange={e => setFilter(e.target.value)}
//             />
//           </div>

//           {/* Quantity */}
//           <div className="grid grid-cols-3 items-center gap-2">
//             <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">
//               Quantity
//             </label>
//             <input
//               type="number"
//               min="0"
//               className="col-span-2 py-1 px-2 rounded text-[#003366] border border-[#001F4D]"
//               value={qty}
//               onChange={e => setQty(Number(e.target.value))}
//             />
//           </div>

//           {/* Add Item */}
//           <button
//             className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
//             onClick={addItem}
//           >
//             Add Item
//           </button>

//           {/* Remove Item */}
//           <button
//             className="w-full bg-pink-700 hover:bg-pink-800 py-2 rounded font-semibold disabled:opacity-50"
//             onClick={removeItem}
//             disabled={!selected}
//           >
//             Remove Item
//           </button>

//           {/* Total Price */}
//           <div className="grid grid-cols-3 items-center gap-2">
//             <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">
//               Total Price
//             </label>
//             <div className="col-span-2 bg-[#F5F5DC] text-[#003366] py-1 px-2 rounded text-right">
//               ₱{totalPrice}
//             </div>
//           </div>

//           {/* Payment */}
//           <div className="grid grid-cols-3 items-center gap-2">
//             <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">
//               Payment
//             </label>
//             <input
//               type="number"
//               min="0"
//               className="col-span-2 py-1 px-2 rounded text-[#003366] border border-[#001F4D]"
//               placeholder="Enter payment amount"
//               value={payment}
//               onChange={e => setPayment(e.target.value)}
//             />
//           </div>

//           {/* Change */}
//           <div className="grid grid-cols-3 items-center gap-2">
//             <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">
//               Change
//             </label>
//             <div className="col-span-2 bg-[#F5F5DC] text-[#003366] py-1 px-2 rounded text-right">
//               ₱{change}
//             </div>
//           </div>

//           {/* Save Transaction */}
//           <button
//             className="w-full bg-blue-800 hover:bg-blue-900 py-2 rounded font-semibold"
//             onClick={saveTransaction}
//           >
//             Save Transaction
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const initialProducts = [
  { id: 1, name: 'Toyota Corolla', class: 'Sedan', price: 1200000, quantity: 5 },
  { id: 2, name: 'Honda Civic', class: 'Sedan', price: 1500000, quantity: 3 },
  { id: 3, name: 'Ford F-150', class: 'Truck', price: 2500000, quantity: 2 },
  { id: 4, name: 'Tesla Model 3', class: 'Electric', price: 3500000, quantity: 4 },
  { id: 5, name: 'Jeep Wrangler', class: 'SUV', price: 3000000, quantity: 1 },
];

export default function Transaction() {
  const [products] = useState(initialProducts);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(0);
  const [sold, setSold] = useState([]);
  const [payment, setPayment] = useState('');

  const filteredProducts = useMemo(
    () =>
      products.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [products, filter]
  );

  const totalPrice = sold.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const change = payment ? Math.max(Number(payment) - totalPrice, 0) : 0;

  const addItem = () => {
    if (!selected || qty <= 0) return;
    setSold(prev => {
      const existing = prev.find(i => i.id === selected.id);
      if (existing) {
        return prev.map(i =>
          i.id === selected.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...selected, quantity: qty }];
    });
    setQty(0);
  };

  const removeItem = () => {
    if (!selected) return;
    setSold(prev => prev.filter(i => i.id !== selected.id));
    setSelected(null);
    setQty(0);
  };

  const saveTransaction = () => {
    console.log('Transaction saved:', sold);
    setSold([]);
    setPayment('');
    setSelected(null);
    setQty(0);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col lg:flex-row gap-4 bg-[#FFFDD0]">
      {/* LEFT COLUMN */}
      <div className="flex-1 space-y-4 bg-[#FFFDD0] p-2 rounded-lg border border-[#003366]">
        {/* Available Products */}
        <div className="border border-[#003366] rounded-lg overflow-x-auto">
          <h2 className="text-2xl font-bold text-center bg-pink-600 text-white py-2 rounded-t-lg">
            Available Cars
          </h2>
          <table className="w-full table-auto min-w-[600px] text-[#003366]">
            <thead>
              <tr className="bg-pink-600 text-white">
                <th className="py-1 px-2">Car Model</th>
                <th className="py-1 px-2">Type</th>
                <th className="py-1 px-2">Price</th>
                <th className="py-1 px-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`text-center cursor-pointer hover:bg-yellow-200 ${
                    selected?.id === p.id
                      ? 'bg-[#003366] text-white'
                      : idx % 2
                      ? 'bg-[#F5F5DC]'
                      : 'bg-[#FAFAD2]'
                  }`}
                  onClick={() => setSelected(p)}
                >
                  <td className="py-1 px-2">{p.name}</td>
                  <td className="py-1 px-2">{p.class}</td>
                  <td className="py-1 px-2">Rs {p.price.toLocaleString()}</td>
                  <td className="py-1 px-2">{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Products to be Sold */}
        <div className="border border-[#003366] rounded-lg overflow-x-auto">
          <h2 className="text-2xl font-bold text-center bg-pink-600 text-white py-2 rounded-t-lg">
            Cars to be Sold
          </h2>
          <table className="w-full table-auto min-w-[600px] text-[#003366]">
            <thead>
              <tr className="bg-pink-600 text-white">
                <th className="py-1 px-2">Car Model</th>
                <th className="py-1 px-2">Type</th>
                <th className="py-1 px-2">Price</th>
                <th className="py-1 px-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {sold.map(s => (
                <tr key={s.id} className="text-center bg-[#FAFAD2]">
                  <td className="py-1 px-2">{s.name}</td>
                  <td className="py-1 px-2">{s.class}</td>
                  <td className="py-1 px-2">Rs {s.price.toLocaleString()}</td>
                  <td className="py-1 px-2">{s.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full lg:w-96 rounded-lg p-4 space-y-4 bg-white text-[#003366] border border-[#003366]">
        {/* Go Back */}
        <Link
          to="/"
          className="block bg-red-600 hover:bg-red-700 text-center rounded-full py-1 font-bold text-white"
        >
          ← Go Back
        </Link>

        <h2 className="text-3xl font-bold text-center">Transaction</h2>

        <div className="space-y-3">
          {/* Selected Item */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">
              Selected Car
            </label>
            <div className="col-span-2 bg-[#F5F5DC] text-[#003366] py-1 px-2 rounded text-center">
              {selected ? selected.name : 'None'}
            </div>
          </div>

          {/* Filter */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">Filter</label>
            <input
              type="text"
              className="col-span-2 py-1 px-2 rounded text-[#003366] border border-[#001F4D]"
              placeholder="Search a Car"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">Quantity</label>
            <input
              type="number"
              min="0"
              className="col-span-2 py-1 px-2 rounded text-[#003366] border border-[#001F4D]"
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
            />
          </div>

          {/* Add Item Button */}
          <button
            className={`w-full py-2 rounded font-semibold transition duration-200 border border-[#001F4D] ${
              selected && qty > 0
                ? 'bg-[#003366] hover:bg-[#004080] text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => {
              if (selected && qty > 0) addItem();
            }}
          >
            Add Item
          </button>

          {/* Remove Item */}
          <button
            className="w-full bg-pink-700 hover:bg-pink-800 py-2 rounded font-semibold text-white disabled:opacity-50"
            onClick={removeItem}
            disabled={!selected}
          >
            Remove Item
          </button>

          {/* Total Price */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">
              Total Price
            </label>
            <div className="col-span-2 bg-[#F5F5DC] text-[#003366] py-1 px-2 rounded text-right">
              Rs {totalPrice.toLocaleString()}
            </div>
          </div>

          {/* Payment */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">Payment</label>
            <input
              type="number"
              className="col-span-2 py-1 px-2 rounded text-[#003366] border border-[#001F4D]"
              value={payment}
              onChange={e => setPayment(e.target.value)}
            />
          </div>

          {/* Change */}
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="col-span-1 bg-[#001F4D] text-white py-1 px-2 rounded">Change</label>
            <div className="col-span-2 bg-[#F5F5DC] text-[#003366] py-1 px-2 rounded text-right">
              Rs {change.toLocaleString()}
            </div>
          </div>

          {/* Save Transaction */}
          <button
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-bold text-white"
            onClick={saveTransaction}
          >
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
