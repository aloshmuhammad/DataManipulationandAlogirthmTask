var rawData = `Date,SKU,Unit Price,Quantity,Total Price
2019-01-01,Death by Chocolate,180,5,900
2019-01-01,Cake Fudge,150,1,150
2019-01-01,Cake Fudge,150,1,150
2019-01-01,Cake Fudge,150,3,450
2019-01-01,Death by Chocolate,180,1,180
2019-01-01,Vanilla Double Scoop,80,3,240
2019-01-01,Butterscotch Single Scoop,60,5,300
2019-01-01,Vanilla Single Scoop,50,5,250
2019-01-01,Cake Fudge,150,5,750
2019-01-01,Hot Chocolate Fudge,120,3,360
2019-01-01,Butterscotch Single Scoop,60,5,300
2019-01-01,Chocolate Europa Double Scoop,100,1,100
2019-01-01,Hot Chocolate Fudge,120,2,240
2019-01-01,Caramel Crunch Single Scoop,70,4,280
2019-01-01,Hot Chocolate Fudge,120,2,240
2019-01-01,Hot Chocolate Fudge,120,4,480
2019-01-01,Hot Chocolate Fudge,120,2,240
2019-01-01,Cafe Caramel,160,5,800
2019-01-01,Vanilla Double Scoop,80,4,320
2019-01-01,Butterscotch Single Scoop,60,3,180
2019-02-01,Butterscotch Single Scoop,60,3,180
2019-02-01,Vanilla Single Scoop,50,2,100
2019-02-01,Butterscotch Single Scoop,60,3,180
2019-02-01,Vanilla Double Scoop,80,1,80

2019-02-01,Death by Chocolate,180,2,360
2019-02-01,Cafe Caramel,160,2,320
2019-02-01,Pista Single Scoop,60,3,180
2019-02-01,Hot Chocolate Fudge,120,2,240
2019-02-01,Vanilla Single Scoop,50,3,150
2019-02-01,Vanilla Single Scoop,50,5,250
2019-02-01,Cake Fudge,150,1,150
2019-02-01,Vanilla Single Scoop,50,4,200
2019-02-01,Vanilla Double Scoop,80,3,240
2019-02-01,Cake Fudge,150,1,150
2019-02-01,Vanilla Double Scoop,80,5,400
2019-02-01,Hot Chocolate Fudge,120,5,600
2019-02-01,Vanilla Double Scoop,80,2,160
2019-02-01,Vanilla Double Scoop,80,3,240
2019-02-01,Hot Chocolate Fudge,120,5,600
2019-02-01,Cake Fudge,150,5,750
2019-03-01,Vanilla Single Scoop,50,5,250
2019-03-01,Cake Fudge,150,5,750
2019-03-01,Pista Single Scoop,60,1,60
2019-03-01,Butterscotch Single Scoop,60,2,120
2019-03-01,Vanilla Double Scoop,80,1,80
2019-03-01,Cafe Caramel,160,1,160
2019-03-01,Cake Fudge,150,5,750
2019-03-01,Trilogy,160,5,800
2019-03-01,Butterscotch Single Scoop,60,3,180
2019-03-01,Death by Chocolate,180,2,360
2019-03-01,Butterscotch Single Scoop,60,1,60

2019-03-01,Hot Chocolate Fudge,120,3,360
2019-03-01,Cake Fudge,150,2,300
2019-03-01,Cake Fudge,150,2,300
2019-03-01,Vanilla Single Scoop,50,4,100
2019-03-01,Cafe Caramel,160,0,160
2019-03-01,Cake Fudge,150,5,750
2019-03-01,Cafe Caramel,160,5,800
2019-03-01,Almond Fudge,150,1,150
2019-03-01,Cake Fudge,150,1,150`;

//covert csv data
const convertCsv = (rawData) => {
  const lines = rawData.trim().split("\n");
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    const parts = line.split(",");

    if (parts.length !== 5) continue;

    const [date, sku, unitPrice, quantity, totalPrice] = parts;

    records.push({
      date,
      sku,
      unitPrice: Number(unitPrice),
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
    });
  }

  return records;
};

//Validation

const validateRecords = (record) => {
  const errors = [];

  if (record.unitPrice * record.quantity !== record.totalPrice) {
    errors.push("Mismatch between Unit Price * Quantity and Total Price");
  }

  if (record.quantity < 1) {
    errors.push("Quantity less than 1");
  }

  if (record.unitPrice < 0) {
    errors.push("Unit Price less than 0");
  }

  if (record.totalPrice < 0) {
    errors.push("Total Price less than 0");
  }

  if (isNaN(new Date(record.date).getTime())) {
    errors.push("Malformed Date");
  }

  return errors;
};

const generateValidReports = (records) => {
  let totalSales = 0;
  const monthWiseSales = {};
  const quantityByMonth = {};
  const revenueByMonth = {};

  for (const record of records) {
    totalSales += record.totalPrice;
    const month = record.date.slice(0, 7);

    // Month total
    monthWiseSales[month] = (monthWiseSales[month] || 0) + record.totalPrice;

    // Quantity aggregation
    if (!quantityByMonth[month]) quantityByMonth[month] = {};
    quantityByMonth[month][record.sku] =
      (quantityByMonth[month][record.sku] || 0) + record.quantity;

    // Revenue aggregation
    if (!revenueByMonth[month]) revenueByMonth[month] = {};
    revenueByMonth[month][record.sku] =
      (revenueByMonth[month][record.sku] || 0) + record.totalPrice;
  }

  console.log("TOTAL STORE SALES");
  console.log(totalSales);

  console.log("MONTH-WISE SALES");
  console.log(monthWiseSales);

  console.log(" MOST POPULAR ITEM PER MONTH");
  for (const month in quantityByMonth) {
    let maxItem = null;
    let maxQty = 0;

    for (const item in quantityByMonth[month]) {
      if (quantityByMonth[month][item] > maxQty) {
        maxQty = quantityByMonth[month][item];
        maxItem = item;
      }
    }

    console.log(`${month} -> ${maxItem} (Quantity: ${maxQty})`);
  }

  console.log("\n=== HIGHEST REVENUE ITEM PER MONTH ===");
  for (const month in revenueByMonth) {
    let maxItem = null;
    let maxRevenue = 0;

    for (const item in revenueByMonth[month]) {
      if (revenueByMonth[month][item] > maxRevenue) {
        maxRevenue = revenueByMonth[month][item];
        maxItem = item;
      }
    }

    console.log(`${month} -> ${maxItem} (Revenue: ${maxRevenue})`);
  }
};


//execution


const records = parseCSV(rawData);


const finalRecord = [];

for (const record of records) {
  const errors = validateRecords(record);

  if (errors.length === 0) {
    finalRecord.push(record);
  } else {
    console.log("Invalid Record Found:", record, errors);
  }
}

console.log(generateValidReports(finalRecord));



// 1) What was the most complex part of the assignment for you personally and why?

// For me, the most complex part was the generateReports function. 
// In that part, we had to manipulate multiple nested objects like month-wise sales,
// quantity per item per month, and revenue per item per month. 
// Handling object creation dynamically and updating values correctly 
// without making logical mistakes felt a little confusing at first. 
// Especially tracking month and SKU inside nested objects required careful thinking.
// I solved it by checking the output multiple times and verifying each step 
// to ensure the calculations were correct.


// 2) Describe a bug you expect to hit while implementing this and how you would debug it.

// One bug I expected was issues caused by blank lines or malformed rows in the CSV data. 
// Initially, empty lines caused undefined values and incorrect number conversions. 
// To debug this, I printed intermediate outputs like converte records 
// and added checks to skip empty or invalid lines. 
// I also verified calculations manually for some sample records 
// to make sure the aggregation logic was working correctly.

// 3) Does your solution handle larger data sets without any performance implications?

// Yes, my solution processes each record only once, so the time complexity is O(n). 
// I used plain objects for aggregation, which provide constant-time lookups. 
// There are no nested loops over the full dataset, only per-month item checks, 
// which are limited to the number of unique SKUs. 
// So overall, the solution should scale well for larger datasets 
// without major performance issues.