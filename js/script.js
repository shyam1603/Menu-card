function exportToExcel() {
    try {
        const customerName = document.getElementById('customerName').value;
        const tableNumber = document.getElementById('tableNumber').value;

        if (!customerName || !tableNumber) {
            alert('Please enter your name and table number!');
            return;
        }

        const data = [];
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            const quantity = input.value;
            if (quantity > 0) {
                const item = input.getAttribute('data-item');
                const price = parseFloat(input.getAttribute('data-price'));
                const total = quantity * price;
                data.push({ Name: customerName, Table: tableNumber, Item: item, Quantity: quantity, Price: price.toFixed(2), Total: total.toFixed(2) });
            }
        });

        if (data.length === 0) {
            alert('No items ordered!');
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        XLSX.writeFile(workbook, 'Orders.xlsx');
    } catch (error) {
        console.error("Error exporting to Excel:", error);
        alert("There was an error exporting the data to Excel.");
    }
}

async function exportToPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const customerName = document.getElementById('customerName').value;
        const tableNumber = document.getElementById('tableNumber').value;

        if (!customerName || !tableNumber) {
            alert('Please enter your name and table number!');
            return;
        }

        const data = [];
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            const quantity = input.value;
            if (quantity > 0) {
                const item = input.getAttribute('data-item');
                const price = parseFloat(input.getAttribute('data-price'));
                const total = quantity * price;
                data.push({ Item: item, Quantity: quantity, Price: `₹${price.toFixed(2)}`, Total: `₹${total.toFixed(2)}` });
            }
        });

        if (data.length === 0) {
            alert('No items ordered!');
            return;
        }

        doc.setFontSize(12);
        doc.text(`Customer Name: ${customerName}`, 10, 10);
        doc.text(`Table Number: ${tableNumber}`, 10, 20);
        doc.text('Order Details:', 10, 30);

        let y = 40;
        data.forEach(item => {
            doc.text(`${item.Item} - Qty: ${item.Quantity}, Price: ${item.Price}, Total: ${item.Total}`, 10, y);
            y += 10;
        });

        doc.save('OrderDetails.pdf');
    } catch (error) {
        console.error("Error exporting to PDF:", error);
        alert("There was an error exporting the data to PDF.");
    }
}


// Helper function to load images asynchronously
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}
