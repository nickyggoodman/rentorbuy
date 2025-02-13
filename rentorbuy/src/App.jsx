import './App.css'
import CalcForm from './CalcForm.jsx'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function App() {

  const [inputValues, setInputValues] = useState(
    {
      desiredLocation: "",
      homePrice: 500000,
      downPayment: 0.20,
      mortgageRate: 0.06,
      loanTerm: 30,
      inflationRate: 0.02,
      homeValGrowth: 0.04,
      investmentRate: 0.06,
      homeInsurance: 0,
      closingCosts: 0,
      hoaCondoFees: 0,
      monthlyMaintenance: 0,
      propertyTax: 0,
      stayDuration: 30,
      desiredRent: 2160,
      renterInsurance: 0,
      securityDeposit: 2160,
      petDeposit: 0,
      utilIncluded: 0,
      appFee: 0,
      parkingFee: 0,
      maintenanceFee: 0,
      amenitiesFee: 0,
      differentialIncluded: false,
    }
  );

  /*
   * see formula: https://en.wikipedia.org/wiki/Mortgage_calculator
   * calculates the monthly payment given the loan term, mortgage rate,
   * and principal after down payment.
   */
  function calcMortgagePayment() {
    const r = inputValues.mortgageRate/12;
    const n = inputValues.loanTerm*12;
    const p = inputValues.homePrice * (1 - inputValues.downPayment);
    
    if (r == 0) {
      return p/n
    } else {
      return ((p * r * (1 + r)**n)/(((1 + r)**n) - 1));
    }

  } 

  function genOwnerCostArr() {
    let costArr = [];
    
    let propertyTax = inputValues.propertyTax;
    let homeInsurance = inputValues.homeInsurance;
    let maintenanceCost = inputValues.monthlyMaintenance;
    let hoaFee = inputValues.hoaCondoFees;
    let closingCosts = inputValues.closingCosts;
    let mortgagePayment = calcMortgagePayment();
    const r = inputValues.inflationRate;

    // add all initial, upfront, costs   
    costArr.push(
      mortgagePayment 
      + inputValues.homePrice*inputValues.downPayment
    );

    // add reurring costs
    costArr[0] = mortgagePayment + homeInsurance + maintenanceCost + hoaFee + propertyTax; 
    for (let i = 1; i < inputValues.stayDuration * 12; i++) {
      costArr.push(homeInsurance + maintenanceCost + hoaFee + propertyTax);
      costArr[i] += (i < inputValues.loanTerm*12 ? mortgagePayment : 0);
      homeInsurance = homeInsurance * (1 + r/12);
      maintenanceCost = maintenanceCost * (1 + r/12);
      hoaFee = hoaFee * (1 + r/12)
      propertyTax = propertyTax * (1 + inputValues.homeValGrowth/12);
    }

    // add closing costs
    costArr[costArr.length - 1] += closingCosts;
    return costArr; 
  }

  function genRenterCostArr() {
    let costArr = [];

    let growingCosts = inputValues.desiredRent + inputValues.renterInsurance 
      + inputValues.parkingFee 
      + inputValues.maintenanceFee + inputValues.amenitiesFee;
    const r = inputValues.inflationRate;

    //negate one-times for the sake of representation. These are calculated 
    //in the total calculation in calcRenterCost()
    //costArr.push(inputValues.securityDeposit + inputValues.petDeposit + inputValues.appFee + growingCosts);

    costArr[0] = growingCosts;
    for (let i = 1; i < inputValues.stayDuration * 12; i++) {
      growingCosts = growingCosts * (1 + r/12);
      costArr.push(growingCosts);
    }

    return costArr; 
  }

  /*
   *
   */
  function calcOwnerCost() {
    let totalCost = 0;
    // changes according to fair market value growth rate
    let propertyTax = inputValues.propertyTax;
    // changes according to overall inflation rate
    let homeInsurance = inputValues.homeInsurance;
    let maintenanceCost = inputValues.monthlyMaintenance;
    let hoaFee = inputValues.hoaCondoFees;
    // assuming will not change (realistically would but we predict the avg.)
    const r = inputValues.inflationRate;

    // independent to inflation. constant mortgage payment and one time down.
    totalCost += (calcMortgagePayment() * inputValues.loanTerm * 12) 
      + inputValues.homePrice*inputValues.downPayment
      + inputValues.closingCosts;
   
    // property tax depends on the growth rate of the house since it is 
    // determined by fair market value.
    for (let i = 0; i < inputValues.stayDuration * 12; i++) {
      // add monthly property tax adjusting for home growth rate
      totalCost += propertyTax;
      propertyTax = propertyTax * (1 + inputValues.homeValGrowth/12);
    }

    // home insurance depends on the cost to replace (rebulid) your home
    for (let i = 0; i < inputValues.stayDuration * 12; i++) {
      // add monthly expenditures adjusting for overall inflation rate
      totalCost = totalCost + homeInsurance + maintenanceCost + hoaFee;
      homeInsurance = homeInsurance * (1 + r/12);
      maintenanceCost = maintenanceCost * (1 + r/12);
      hoaFee = hoaFee * (1 + r/12)
    }


    if (inputValues.differentialIncluded) {
      ownerRenterCostDifferences().forEach(number => {
       if (number < 0) {
         totalCost += -number;
       }
      });
    }

    return totalCost.toFixed(2);
  } 

  function calcRenterCost() {
    let totalCost = 0;
    // variable costs
    let growingCosts = inputValues.desiredRent + inputValues.renterInsurance 
      + inputValues.parkingFee 
      + inputValues.maintenanceFee + inputValues.amenitiesFee;
    const r = inputValues.inflationRate;

    // fixed, one-time costs. 
    totalCost += inputValues.securityDeposit + inputValues.petDeposit + inputValues.appFee;

    // totaling with inflation
    for (let i = 0; i < inputValues.stayDuration * 12; i++) {
      totalCost += growingCosts;
      growingCosts = growingCosts * (1 + r/12);
    }

    if (inputValues.differentialIncluded) {
      ownerRenterCostDifferences().forEach(number => {
       if (number > 0) {
         totalCost += number;
       }
      });
    }

    return totalCost.toFixed(2);
  }

  function breakEvenMonths() {
    let ownerData = genOwnerCostArr();
    let renterData = genRenterCostArr();

    let i = 0;
    let intersections = [];
    while (i < inputValues.stayDuration * 12 ) {
      if ((ownerData[i] < renterData[i] && ownerData[i + 1] > renterData[i + 1]) ||
      (ownerData[i] > renterData[i] && ownerData[i + 1] < renterData[i + 1])) {
        intersections.push(i+1);
      }
      i++;
    }
    return intersections;
  }

  /*
   * Calculate the sum of the compounded investments from every month's difference
   * between the owner monthly cost and the renter monthly cost
   */
  function calcOwnerOppCost() {
    const ownerCosts = genOwnerCostArr();
    const renterCosts = genRenterCostArr();
    const r = inputValues.investmentRate;
    
    let sum = 0;
    if (inputValues.differentialIncluded){
      for (let i=0; i < inputValues.stayDuration * 12; i++) {
        if (ownerCosts[i] > renterCosts[i]) {
          sum += ownerCosts[i] - renterCosts[i];
        }
        sum *= 1 + r/12;
      }  
    }

    return sum;
  }

  /*
   * Calculate the sum of the compounded investments from every month's difference
   * between the renter monthly cost and the owner monthly cost. 
   */
  function calcRenterOppCost() {
    const ownerCosts = genOwnerCostArr();
    const renterCosts = genRenterCostArr();
    const r = inputValues.investmentRate;

    let sum = 0;
    if (inputValues.differentialIncluded) {
      for (let i=0; i < inputValues.stayDuration * 12; i++) {
        if (renterCosts[i] > ownerCosts[i]){
          sum += renterCosts[i] - ownerCosts[i];
        }
        sum *= 1 + r/12;
      }
    }
    return sum;
  }

  function calcFinalHomeValue(){
    const p = inputValues.homePrice;
    const r = inputValues.homeValGrowth;
    const n = 12;
    const t = inputValues.stayDuration;
    
    return p * (1 + r/n)**(t*n);
  }

  /*
   * returns an array of relative differences of the owner cost from the
   * renter cost line. e.g., if the renter cost for the month is 1000 and the 
   * owner cost is 1100, then 100 would be pushed to the array. Similarly, 
   * if the owner cost is 1100 for the month and the renter cost is 1200, then
   * -100 would be pushed to the array.
   */
  function ownerRenterCostDifferences() {
    let res = [];
    const ownerCosts = genOwnerCostArr();
    const renterCosts = genRenterCostArr();
    
    for (let i = 0; i < inputValues.stayDuration * 12; i++){
      if (renterCosts[i] > ownerCosts[i]) {
        res.push(ownerCosts[i] - renterCosts[i]);
      } else {
        res.push((renterCosts[i] - ownerCosts[i]) * -1);
      }
    }

    return res;
  }


  const lineAtBreakEven = {
    id: 'lineAtBreakEven',
    
    afterDatasetDraw(chart, args, options) {
      const { ctx, chartArea: {top, bottom}, scales: {x} } = chart;
      if (options.intersections.length > 0) {
        for (let i=0, n=options.intersections.length; i < n; i++){    
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.setLineDash([10, 5]);
          ctx.moveTo(x.getPixelForValue(options.intersections[i]), top);
          ctx.lineTo(x.getPixelForValue(options.intersections[i]), bottom);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }
  
  } 

  const verticalHoverLine = {
    id: 'verticalHoverLine',
    beforeDatasetsDraw(chart, args, plugins) {
      const { ctx, tooltip, chartArea: {top, bottom, left, right, width, height},
        scales: {x, y} } = chart;

      if (tooltip._active.length > 0) {
        const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex+1);
        let yCoor;
        
        if (y.getPixelForValue(tooltip.dataPoints[0].parsed.y) > y.getPixelForValue(tooltip.dataPoints[1].parsed.y)) {
          yCoor = y.getPixelForValue(tooltip.dataPoints[1].parsed.y);
        } else {
          yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y);
        }

        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.moveTo(xCoor, yCoor);
        ctx.lineTo(xCoor, bottom);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    }
  }

  return (
    <>
      <CalcForm 
        updateInputValue = {(k, v)=>{
          setInputValues({
            ...inputValues,
            [k] : v
          })
        }}
        inputValues = {{...inputValues}}
      />

      <Line 
        options = {{
          interaction: {
            mode: 'index',
            axis: 'x'
          },
          plugins: {
            tooltip: {
              mode: 'index',
              callbacks: {
                beforeTitle: function() {
                  return "Month"
                },
                label: function(context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": " 
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }
                  return label;
                } 
              }
            },
            filler: {
            },
            lineAtBreakEven: {
              intersections: breakEvenMonths() 
            },
          },
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Years'
              },
              offset: false,
              type: 'linear',
              ticks: {
                autoSkip: false,
                stepSize: 1,
                callback: function(val, index) {
                  return (index + 1) % 12 === 0 ? this.getLabelForValue(val)/12 : ''; 
                },
              },
              grid: {
                display: false
              }
            },
            y: {
              title: {
                display: true,
                text: 'Monthly Cost',
              },
            }
          },
          elements: {
            point: {
              radius: 0,
              hoverRadius: 4,
              hoverBorderWidth: 2,
              hitRadius: 4,
            }
          }
        }} 
        plugins = {[lineAtBreakEven, verticalHoverLine]}
        data ={{
          labels: Array(inputValues.stayDuration*12).fill().map((_, i) => (i+1)),
          datasets: [
            {
              label: 'Monthly Owner Costs', 
              data: genOwnerCostArr(),
              borderColor: 'red',
              backgroundColor: 'red',
              fill: {
                target: '+1',
                below: 'rgba(0, 0, 255, 0.05)',
                above: 'rgba(0, 0, 0, 0.0)',
              }
            },
            {
              label: 'Monthly Renter Costs',
              data: genRenterCostArr(),
              borderColor: 'blue',
              backgroundColor: 'blue',
              fill: {
                target: '-1',
                below: 'rgba(255, 0, 0, 0.05)',
                above: 'rgba(0, 0, 0, 0.0)',
              }
            }
          ]
        }} 
      />   

      <h2>Totals</h2>
    
      <div id='totals'>
      <h3>Costs</h3> 
        <div>
          <h4>Owning:</h4>
          <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calcOwnerCost())}</p>
        </div>

        <div>
          <h4>Renting:</h4>
          <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calcRenterCost())}</p>
        </div>

        <div id='opportunityCosts'>
          <h3>Returns</h3> 
          <div>
            <h4>Renting:</h4> 
            <p>
              The renter's differences are comprised in the area below the renter's monthly cost
              curve to above the buyers monthly cost curve. The opportunity cost
              is the total of the accumulation of the renter's cost differences compounded
              from the month they were invested to the end of the stay duration. The individual is
              assumed to be able to afford the max between the monthly renter cost and
              the monthly owner cost. Therefore, any difference between the two costs could have
              been used to invest in other uses, such as the stock market.
              
              <h4>Return on Investments:</h4>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calcOwnerOppCost())}
            </p> 
          </div>
          <div>
            <h4>Owning:</h4>
            <p>
              The owner's difference is the area below the buyers's monthly cost
              curve to above the renters's monthly cost curve. The opportunity cost
              includes the accumulation of the buyer's difference compounded
              from the month it was invested to the end of the stay duration. In
              simpler terms, it is the amount one could have earned if they had
              rented a home and invested the saved cost while renting is cheaper.
              This would typically occur before renting costs inflate beyond
              owning costs. Additionally, the owner's opportunity costs includes
              what the owner could have earned had they invested the down payment
              on their home into something else.
              <h4>Return on Investments:</h4> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calcFinalHomeValue() + calcRenterOppCost())}
            </p>
          </div>
        </div>
        <div>
          <h3>Net</h3>
          <div>
            <h4>Owning</h4>
            <p>Total spent: </p>
          </div>
        </div>
      </div>   
    </>
  );
}

export default App
