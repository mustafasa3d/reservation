import CustomInput from "../CustomInput";
import React from "react";

interface FiltersProps {
  tempFilters: {
    status: string;
    startDate: string;
    endDate: string;
    hotelName: string;
    userName: string;
  };
  updateTempFilters: (name: string, value: string) => void;
  handleSearch: () => void;
  reset: () => void;
  hotels: { value: string; label: string }[];
}

const Filters: React.FC<FiltersProps> = ({
  tempFilters,
  updateTempFilters,
  handleSearch,
  reset,
  hotels,
}) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-0">
        {/* Status Select */}
        <CustomInput
          type="select"
          name="status"
          value={tempFilters.status}
          onChange={(e) => updateTempFilters("status", e.target.value)}
          options={[
            { value: "", label: "All Statuses" },
            { value: "pending", label: "Pending" },
            { value: "approved", label: "Approved" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          isReactSelect 
          placeholder="Select Status"
          className="text-black"
          label="Status"
        />

        {/* Start Date Input */}
        <CustomInput
          type="date"
          name="startDate"
          value={tempFilters.startDate}
          onChange={(e) => updateTempFilters("startDate", e.target.value)}
          placeholder="Start Date"
          className="text-black"
          label="Start Date"
        />

        {/* End Date Input */}
        <CustomInput
          type="date"
          name="endDate"
          value={tempFilters.endDate}
          onChange={(e) => updateTempFilters("endDate", e.target.value)}
          placeholder="End Date"
          className="text-black"
          label="End Date"
        />

        {/* Hotel Select */}
        <CustomInput
          type="select"
          name="hotelName"
          value={tempFilters.hotelName}
          onChange={(e) => updateTempFilters("hotelName", e.target.value)}
          options={hotels}
          isReactSelect
          placeholder="Select Hotel"
          className="text-black"
          label="Hotel"
        />

        {/* User Name Input */}
        <CustomInput
          type="text"
          name="userName"
          value={tempFilters.userName}
          onChange={(e) => updateTempFilters("userName", e.target.value)}
          placeholder="User Name"
          className="text-black"
          label="User Name"
        />

        {/* Search Button */}
        <button
          type="submit"
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all shadow-md h-[43px] my-auto mb-4"
        >
          Search
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={reset}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all shadow-md h-[43px] my-auto mb-4"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;