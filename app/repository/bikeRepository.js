export const fetchBikes = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', serialNumber: '1234AB', model: "2022", status: "available", station: { name: "Soriana" } },
                { id: '2', serialNumber: '5678CD', model: "2023", status: "in use", station: { name: "Capdam" } },
                { id: '3', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
                { id: '4', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
                { id: '5', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
                { id: '6', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
                { id: '7', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
                { id: '8', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
                { id: '9', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
            ]);
        }, 2000);
    });
};