export const filterReservationsByDates = (
    reservations: any[],
    startDate: string | null,
    endDate: string | null
  ) => {
    if (!startDate && !endDate) return reservations;
  
    if (startDate && !endDate)
      return reservations.filter((reservation) => {
        const checkIn = new Date(reservation.checkIn);
        return checkIn >= new Date(startDate);
      });
  
    if (!startDate && endDate)
      return reservations.filter((reservation) => {
        const checkOut = new Date(reservation.checkOut);
        return checkOut <= new Date(endDate);
      });
  
    return reservations.filter((reservation) => {
      const checkIn = new Date(reservation.checkIn);
      const checkOut = new Date(reservation.checkOut);
  
      return checkIn >= new Date(startDate) && checkOut <= new Date(endDate);
    });
  };