/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions){
        const categoryTotals={};
        for(var transaction of transactions)
        {
          const{category,price} = transaction;
          if(!categoryTotals[category])
          {
            categoryTotals[category]=0;
          }
          categoryTotals[category]+=price;
        }

        return Object.keys(categoryTotals).map(x=>({
          category: x,
          totalSpent: categoryTotals[x]
        }))
}


// function calculateTotalSpentByCategory(transactions) {
//   const categoryTotals={};
//   for(var transaction of transactions)
//   {
// const {category, price} = transaction;

// if(!categoryTotals[category]){
//   categoryTotals[category]=0;
// }
// categoryTotals[category]+=price;

//   }
  
//   return Object.keys(categoryTotals).map(x=>({
//     category: x,
//     totalSpent: categoryTotals[x],
//   }));
// }

module.exports = calculateTotalSpentByCategory;

