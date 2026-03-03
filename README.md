# DataManipulationandAlogirthmTask

## 📌 Description

This project contains a Node.js script that processes ice cream sales data from a CSV-formatted string.

The program performs:

- Total store sales calculation
- Month-wise sales aggregation
- Most popular item per month (based on quantity)
- Highest revenue item per month
- Data validation checks for inconsistencies

No external libraries are used. The solution is implemented using core JavaScript data structures (arrays and objects).

---

## 🛠 Requirements

- Node.js v14 or higher
## ▶️ How to Run

1. Clone the repository:
git clone https://github.com/aloshmuhammad/DataManipulationandAlogirthmTask.git

2. Navigate to the project folder:
cd DataManipulationandAlogirthmTask

3. Run the script:
node iceCreamParlour.js

## ⚙️ Implementation Details

- CSV parsing is handled manually using string operations.
- Data validation checks:
  - Unit Price × Quantity = Total Price
  - Quantity >= 1
  - Unit Price >= 0
  - Total Price >= 0
  - Valid date format
- Aggregation is done using JavaScript objects for efficient lookups.
- Time complexity: O(n)



## 📊 Output

The script prints:

- Total store sales
- Month-wise sales totals
- Most popular item per month
- Highest revenue item per month
- Invalid records (if any)
