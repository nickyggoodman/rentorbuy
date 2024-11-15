import './App.css'
import { useState } from 'react'

function App() {

  const [inputValues, setInputValues] = useState(
    {
      desiredLocation: "",
      homePrice: 500000,
      downPayment: 0.20,
      mortgageRate: 0.05,
      loanTerm: 30,
      homeInsurance: 0,
      closingCosts: 0,
      hoaCondoFees: 0,
      monthlyMaintenance: 0,
      propertyTax: 0,
      homePriceGrowth: 0,
      stayDuration: 0,
      desiredRent: 0,
      renterInsurance: 0,
      securityDeposit: 0,
      petDeposit: 0,
      utilIncluded: 0,
      appFee: 0,
      parkingFee: 0,
      maintenanceFee: 0,
      amenitiesFee: 0,
    }
  );

  /*
   * Will change the state of the inputValues json dependent. If it is a number
   * then want to read the value as a number so we don't have to convert later.
   */
  function handleInputChange(e) {
    e.target.type == "number"? setInputValues({
      ...inputValues,
      [e.target.id] : e.target.valueAsNumber
    }) : setInputValues({
      ...inputValues,
      [e.target.id] : e.target.value
    });
  }

  /*
   * see formula: https://en.wikipedia.org/wiki/Mortgage_calculator
   * calculates the monthly payment given the loan term, mortgage rate,
   * and principal after down payment.
   */
  function calcMonthlyPayment() {
    const r = inputValues.mortgageRate/12;
    const n = inputValues.loanTerm*12;
    const p = inputValues.homePrice * (1 - inputValues.downPayment);
    return ((p * r * (1 + r)**n)/(((1 + r)**n) - 1));
  } 
 
  /*
   * calculates the monthly cost of renting after rent, renter insurance, 
   * maintenance fees, utilities (included), etc. Does not include one time
   * payments such as pet deposit or security deposit.
   */
  function calcMonthlyRent() {
    return (inputValues.desiredRent + inputValues.renterInsurance 
      + inputValues.parkingFee + inputValues.maintenanceFee 
      + inputValues.amenitiesFee); 
  } 
  
  /*
   * Calculates the total cost of ownership after the monthly mortgage payment.
   * Additional costs such as recurrent home insurance costs and one-time
   * closing costs are accounted in the total cost of owning a home.
   */
  function calcOwnerCost() {
    const recurrent = ((calcMonthlyPayment() + inputValues.homeInsurance 
      + inputValues.hoaCondoFees + inputValues.monthlyMaintenance 
      + inputValues.propertyTax) * 12 * inputValues.loanTerm);
    const oneTime = (inputValues.downPayment * inputValues.homePrice) 
      + inputValues.closingCosts;
    return recurrent + oneTime;
  }

  /*
   * Calculates the total cost of renting including recurrent monthly payments
   * and one-time costs such as security deposit and pet deposit.
   */
  function calcRenterCost() {
    return ((calcMonthlyRent() * 12 * inputValues.loanTerm) 
    + (inputValues.securityDeposit + inputValues.appFee + inputValues.petDeposit));
  }

  return (
    <>
      <h1>rent-or-buy</h1>
    
      <h2>Location</h2>

      <div>
        <label htmlFor="desiredLocation">Desired location</label>
        <input  
          value={inputValues.desiredLocation}
          type="text"  
          name="desiredLocation" 
          id="desiredLocation"
          onChange={handleInputChange}/>
      </div>

      <h2>Owning</h2>

      <div>
        <label htmlFor="homePrice">Home price</label>
        <input 
          value={inputValues.homePrice} 
          type="number"  
          name="homePrice" 
          id="homePrice" 
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="downPayment">Down payment</label>
        <input 
          type="number" 
          value={inputValues.downPayment} 
          name="downPayment" 
          id="downPayment"
          onChange={handleInputChange} />
      </div>  

      <div>
        <label htmlFor="mortgageRate">Mortgage rate</label>
        <input 
          type="number" 
          value={inputValues.mortgageRate} 
          name="mortgageRate" 
          id="mortgageRate"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="loanTerm">Loan term</label>
        <select name="loanTerm" id="loanTerm" onChange={handleInputChange}>
          <option value={30}>30 year</option>
          <option value={20}>20 year</option>
          <option value={15}>15 year</option>
        </select>
      </div>
    
      <div>
        <label htmlFor="homeInsurance">Home insurance</label>
        <input 
          type="number" 
          value={inputValues.homeInsurance} 
          name="homeInsurance" 
          id="homeInsurance"
          onChange={handleInputChange}/>
      </div>

      <div>
        <label htmlFor="closingCosts">Closing cost</label>
        <input 
          type="number" 
          value={inputValues.closingCosts} 
          name="closingCosts" 
          id="closingCosts"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="hoaCondoFees">HOA/condo fees</label>
        <input 
          type="number" 
          value={inputValues.hoaCondoFees} 
          name="hoaCondoFees" 
          id="hoaCondoFees"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="monthlyMaintenance">Monthly maintenance</label>
        <input 
          type="number" 
          value={inputValues.monthlyMaintenance} 
          name="monthlyMaintenance" 
          id="monthlyMaintenance" 
          onChange={handleInputChange} />
      </div>
    
      <div>
        <label htmlFor="propertyTax">Property tax</label>
        <input 
          type="number" 
          value={inputValues.propertyTax} 
          name="propertyTax" 
          id="propertyTax"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="homePriceGrowth">Home price growth rate</label>
        <input 
          type="number" 
          value={inputValues.homePriceGrowth} 
          name="homePriceGrowth" 
          id="homePriceGrowth"
          onChange={handleInputChange} />
      </div>
    
      <div>
        <label htmlFor="stayDuration">Years planned to stay</label>
        <input 
          type="number" 
          value={inputValues.stayDuration} 
          name="stayDuration" 
          id="stayDuration"
          onChange={handleInputChange} />
      </div>
      
      <h2>Renting</h2>

      <div>
        <label htmlFor="desiredRent">Desired rent</label>
        <input 
          type="number" 
          value={inputValues.desiredRent} 
          name="desiredRent" 
          id="desiredRent" 
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="renterInsurance">Rent insurance</label>
        <input 
          type="number" 
          value={inputValues.renterInsurance} 
          name="renterInsurance" 
          id="renterInsurance"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="securityDeposit">Security deposit</label>
        <input 
          type="number" 
          value={inputValues.securityDeposit} 
          name="securityDeposit" 
          id="securityDeposit"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="petDeposit">Pet deposit</label>
        <input 
          type="number" 
          value={inputValues.petDeposit} 
          name="petDeposit" 
          id="petDeposit"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="utilIncluded">Utilities included</label>
        <input 
          type="number" 
          value={inputValues.utilIncluded} 
          name="utilIncluded" 
          id="utilIncluded"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="appFee">Application fee</label>
        <input 
          type="number" 
          value={inputValues.appFee} 
          name="appFee" 
          id="appFee"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="parkingFee">Parking fee</label>
        <input 
          type="number" 
          value={inputValues.parkingFee} 
          name="parkingFee" 
          id="parkingFee"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="maintenanceFee">Maintenance fee</label>
        <input 
          type="number" 
          value={inputValues.maintenanceFee} 
          name="maintenanceFee" 
          id="maintenanceFee"
          onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="amenitiesFee">Amenities fee</label>
        <input 
          type="number" 
          value={inputValues.amenitiesFee} 
          name="amenitiesFee" 
          id="amenitiesFee"
          onChange={handleInputChange} />
      </div>

      <h2>Total costs</h2>
      <h3>Renting cost:</h3>
      <p>{calcRenterCost()}</p>
      <h3>Owning costs</h3>
      <p>{calcOwnerCost()}</p>
     
    </>
  );
}

export default App

