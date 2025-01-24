export const initializeFilters = (
    searchParams: URLSearchParams,
    setTempFilters: (filters: any) => void
  ) => {
    const initialFilters = {
      status: searchParams.get("status") || "",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      hotelName: searchParams.get("hotelName") || "",
      userName: searchParams.get("userName") || "",
    };
    setTempFilters(initialFilters);
  };