export const fetchAppointments = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', bikeSerial: '1234AB', date: '2024-10-22', time: '10:00 AM', station: 'Soriana' },
                { id: '2', bikeSerial: '5678CD', date: '2024-10-22', time: '11:00 AM', station: 'Capdam' },
                { id: '3', bikeSerial: '7678HG', date: '2024-10-22', time: '12:00 PM', station: 'Brisas' },
                { id: '4', bikeSerial: '7678HG', date: '2024-10-21', time: '12:00 PM', station: 'Brisas' },
                { id: '5', bikeSerial: '7678HG', date: '2024-10-21', time: '12:00 PM', station: 'Brisas' },]);
        }, 2000);
    });
};