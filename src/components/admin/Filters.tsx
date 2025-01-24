import Select from "react-select";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          options={[
            { value: "", label: "All Statuses" },
            { value: "pending", label: "Pending" },
            { value: "approved", label: "Approved" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          value={
            tempFilters.status
              ? { value: tempFilters.status, label: tempFilters.status }
              : null
          }
          onChange={(selectedOption) =>
            updateTempFilters("status", selectedOption?.value || "")
          }
          placeholder="Select Status"
          className="react-select-container text-black"
          classNamePrefix="react-select"
        />

        <input
          type="date"
          name="startDate"
          value={tempFilters.startDate}
          onChange={(e) => updateTempFilters("startDate", e.target.value)}
          className="p-2 border rounded-lg text-black"
        />

        <input
          type="date"
          name="endDate"
          value={tempFilters.endDate}
          onChange={(e) => updateTempFilters("endDate", e.target.value)}
          className="p-2 border rounded-lg text-black"
        />

        <Select
          options={hotels}
          value={
            tempFilters.hotelName
              ? { value: tempFilters.hotelName, label: tempFilters.hotelName }
              : null
          }
          onChange={(selectedOption) =>
            updateTempFilters("hotelName", selectedOption?.value || "")
          }
          placeholder="Select Hotel"
          className="react-select-container text-black"
          classNamePrefix="react-select"
        />

        <input
          type="text"
          name="userName"
          value={tempFilters.userName}
          onChange={(e) => updateTempFilters("userName", e.target.value)}
          placeholder="User Name"
          className="p-2 border rounded-lg text-black"
        />

        <button
          type="submit"
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all shadow-md"
        >
          Search
        </button>
        <button
          type="button"
          onClick={reset}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all shadow-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;