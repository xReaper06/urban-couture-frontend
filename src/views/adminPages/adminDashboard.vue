<template>
    <div>
        <div class="text-center fs-3"><strong>Reports</strong></div>
        <div class="card">
          <div class="card-body">
            <div class="justify-content-center w-25">
                <div class="card">
                    <div class="card-body">
                        Total Sales (P{{ allSales.total }})
                    </div>
                </div>
            </div>
            <div class="row">
            <div class="col-md-6 mt-5">
                <div class="card">
                  <div class="card-header text-center">Product sales</div>
                    <div class="card-body">
                        <canvas id="lineBar" style=" width: 100px;"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mt-5">
                <div class="card">
                    <div class="card-header">
                        <div class="mb-2 text-center"><strong>Products in sale Individually</strong></div>
                        <select name="" id="" v-model="product" @input="newProducts" class="form-select">
                            <option value="" selected disabled>Select Product</option>
                            <option :value="names.productname" v-for="names in allProductNames" :key="names.id">{{ names.productname }}</option>
                        </select>
                    </div>
                    <div class="card-body">
                        <canvas id="lineBar2" style=" width: 100px;"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mt-5">
                <div class="card">
                  <div class="card-header text-center">monthly sales (2024)</div>
                    <div class="card-body">
                        <canvas id="line" style=" width: 100px;"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mt-5">
                <div class="card">
                  <div class="card-header text-center">monthly sales by product (2024)</div>
                    <div class="card-body">
                        <canvas id="lineMonth" style=" width: 100px;"></canvas>
                    </div>
                </div>
            </div>
        </div>
          </div>
        </div>
        
    </div>
</template>

<script setup>
import {ref,onMounted,watchEffect} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';
import Chart from 'chart.js/auto';

const allSales = ref([]);
const allProductNames = ref([])
const allProductValue = ref([])
const productName = ref([])
const productDataQuantity = ref([])
const product = ref('')
const productValue = ref([]);
const productQuantity = ref([])
const allsales = async()=>{
    try {
        const response = await AuthenticationService.allSales();
        if(response){
            allSales.value = response.data.allsales
            allProductNames.value = response.data.allProductName
            allProductValue.value = response.data.products
            allProductNames.value.forEach(data=>{
                productName.value.push(data.productname);
            })
            for (let i = 0; i < productName.value.length; i++) {
                let newQuantity = 0// Initialize newQuantity outside the inner loop
                allProductValue.value.forEach(mydata => {
                    if (productName.value[i] == mydata.productname) {
                        newQuantity += mydata.quantity; // Fix the syntax error here
                    }
                });
                productDataQuantity.value.push(newQuantity);
            }
            
        }
    } catch (error) {
        console.log(error);
    }
}
const newProducts = (event)=>{
    product.value = event.target.value
            let newTotal = 0
            let newQUant = 0
            allProductValue.value.forEach(mydata => {
                    if (product.value == mydata.productname) {
                        newTotal += parseInt(mydata.price); // Fix the syntax error here
                        newQUant += mydata.quantity;
                    }
                    productValue.value = newTotal;
                    productQuantity.value = newQUant;
                });

                const linebardata2 = {
  labels: [product.value],
  datasets: [
    {
      label: `Product Total Sales Price(P${productValue.value.toFixed(2)})`,
      data: [productValue.value],
      borderColor: 'blue',
      backgroundColor: 'blue',
      fill: false,
    },
    {
      label: `Product Total Sales Quantity(${productQuantity.value}pcs)`,
      data: [productQuantity.value],
      borderColor: 'red',
      backgroundColor: 'red',
      fill: false,
    },
  ],
};

const linebarViolationconfig2 = {
  type: 'bar',
  data: linebardata2,
  options: {},
};

  const linebarViolation2 = document.getElementById('lineBar2');

  if (linebarViolation2) {
  // Get the existing chart instance
  let existingChartViolation2 = Chart.getChart(linebarViolation2);

  // If the chart instance exists, destroy it
  if (existingChartViolation2) {
    existingChartViolation2.destroy();
  }

  // Create a new chart and assign it to the 'chart' property
  new Chart(linebarViolation2, linebarViolationconfig2);
 
} else {
  console.error("Canvas element with id 'lineChartViolation' not found.");
}

}
const monthValue = ref([]);
const monthQuantity = ref([]);

watchEffect(() => {
    const data = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    let newQuantity = 0; // Initialize newQuantity outside the inner loop
    let newValue = 0;

allProductValue.value.forEach(mydata => {
    const month = new Date(mydata.updated).getUTCMonth() + 1; // Adding 1 because getUTCMonth() returns a zero-based index
    const monthString = month < 10 ? `0${month}` : `${month}`; // Ensure that the month is formatted as 'MM'
    if (data.includes(monthString)) {
        newQuantity += mydata.quantity;
        newValue += parseInt(mydata.price);
    }
});

monthValue.value.push(newValue);
monthQuantity.value.push(newQuantity);



        const linedata = {
      labels: ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'November', 'December'],
      datasets: [
        {
          label: 'Products Sales',
          data: monthValue.value,
          borderColor: 'pink',
          backgroundColor: 'pink',
          fill: false,
        },
        {
          label: 'Products Sales Quantity',
          data: monthQuantity.value,
          borderColor: 'red',
          backgroundColor: 'red',
          fill: false,
        },
      ],
    };
    
    const lineconfig = {
      type: 'line',
      data: linedata,
      options: {},
    };
    
      const line = document.getElementById('line');
    
      if (line) {
      // Get the existing chart instance
      let existingChartViolation = Chart.getChart(line);
    
      // If the chart instance exists, destroy it
      if (existingChartViolation) {
        existingChartViolation.destroy();
      }
    
      // Create a new chart and assign it to the 'chart' property
      new Chart(line, lineconfig);
    } else {
      console.error("Canvas element with id 'lineChartViolation' not found.");
    }
    });




const newMonthQuantity = ref([]);
    watchEffect(()=>{
      const data = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

      let monthString;
      for (let i = 0; i < productName.value.length; i++) {
      let newQuantity = 0;
      allProductValue.value.forEach(mydata => {
        const month = new Date(mydata.updated).getUTCMonth() + 1; // Adding 1 because getUTCMonth() returns a zero-based index
        monthString = month < 10 ? `0${month}` : `${month}`;
        if (data.includes(monthString)) {
          if(productName.value[i] == mydata.productname){
                newQuantity += mydata.quantity;
            }
          }
        });
              newMonthQuantity.value.push({
                  name:productName.value[i],
                  month:monthString,
                  quantity:newQuantity
                });
      }

console.log(newMonthQuantity.value);
let newData = [];

  newMonthQuantity.value.forEach(element => {
    newData.push(
      {
            label: `${element.name}(${element.quantity}pcs)`,
            data: [element.quantity],
            borderColor: `#ff00f${element++}`,
            backgroundColor: `#ff00f${element++}`,
            fill: false,
      }
    )
  });
  

        const linedata = {
      labels: ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'November', 'December'],
      datasets: newData
    };
    
    const lineconfig = {
      type: 'line',
      data: linedata,
      options: {},
    };
    
      const line = document.getElementById('lineMonth');
    
      if (line) {
      // Get the existing chart instance
      let existingChartViolation = Chart.getChart(line);
    
      // If the chart instance exists, destroy it
      if (existingChartViolation) {
        existingChartViolation.destroy();
      }
    
      // Create a new chart and assign it to the 'chart' property
   new Chart(line, lineconfig);
   
    } else {
      console.error("Canvas element with id 'lineChartViolation' not found.");
    }
    })

onMounted(async()=>{
    await allsales();


    const linebardata = {
  labels: productName.value,
  datasets: [
    {
      label: 'Products Sales',
      data: productDataQuantity.value,
      borderColor: 'yellow',
      backgroundColor: 'yellow',
      fill: false,
    },
  ],
};

const linebarViolationconfig = {
  type: 'bar',
  data: linebardata,
  options: {},
};

  const linebarViolation = document.getElementById('lineBar');

  if (linebarViolation) {
  // Get the existing chart instance
  let existingChartViolation = Chart.getChart(linebarViolation);

  // If the chart instance exists, destroy it
  if (existingChartViolation) {
    existingChartViolation.destroy();
  }

  // Create a new chart and assign it to the 'chart' property
  new Chart(linebarViolation, linebarViolationconfig);
 
} else {
  console.error("Canvas element with id 'lineChartViolation' not found.");
}


})

</script>

<style scoped>

</style>