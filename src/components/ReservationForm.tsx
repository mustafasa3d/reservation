import { useState } from 'react';

const ReservationForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    hotel: '',
    username: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'Single',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-red-500 shadow-md rounded">
      <div className="mb-4">
        <label className="block font-bold">User Name</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Hotel</label>
        <input
          type="text"
          name="hotel"
          value={formData.hotel}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4 flex gap-5">
        <div className='w-full'>
          <label className="block font-bold">Check-In</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className='w-full'>
          <label className="block font-bold">Check-Out</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-bold">Number of Guests</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Room Type</label>
        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default ReservationForm;
