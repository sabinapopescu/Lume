// Utility function to export data to CSV format
export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(","),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || "";
      }).join(",")
    )
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Fallback for older browsers
    window.open(`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
  }
};

// Helper function to format data for CSV export
export const formatAppointmentData = (appointments: any[]) => {
  return appointments.map(apt => ({
    "Date": apt.date,
    "Time": apt.time,
    "Customer Name": apt.customerName,
    "Customer Phone": apt.customerPhone,
    "Customer Email": apt.customerEmail,
    "Service": apt.service,
    "Employee": apt.employee,
    "Duration (minutes)": apt.duration,
    "Price": `$${apt.price}`,
    "Status": apt.status,
    "Notes": apt.notes || ""
  }));
};

// Helper function to format service data for CSV export
export const formatServiceData = (services: any[]) => {
  return services.map(service => ({
    "Service Name": service.name,
    "Category": service.category,
    "Duration (minutes)": service.duration,
    "Price": `$${service.price}`,
    "Description": service.description,
    "Status": service.isActive ? "Active" : "Inactive"
  }));
};

// Helper function to format employee data for CSV export
export const formatEmployeeData = (employees: any[]) => {
  return employees.map(employee => ({
    "Name": employee.name,
    "Role": employee.role,
    "Email": employee.email,
    "Phone": employee.phone,
    "Specialties": employee.specialties.join("; "),
    "Experience (years)": employee.experience,
    "Rating": employee.rating,
    "Schedule": employee.schedule.join(", "),
    "Status": employee.isActive ? "Active" : "Inactive"
  }));
};