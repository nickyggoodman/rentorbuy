import './App.css'

function App() {

  return (
    <>
      <h1>rent-or-buy</h1>
    
      <h2>Location</h2>
      <div>
        <label htmlFor="desiredLocation">Desired location</label>
        <input type="text" name="desiredLocation" id="desiredLocation"/>
      </div>
      <h2>Owning</h2>
      <div>
        <label htmlFor="downPayment">Down payment</label>
        <input type="text" name="downPayment" id="downPayment" />
      </div>  

      <div>
        <label htmlFor="mortgageRate">Mortgage rate</label>
        <input type="text" name="mortgageRate" id="mortgageRate" />
      </div>

      <div>
        <label htmlFor="loanTerm">Loan term</label>
        <select name="loanTerm" id="loanTerm">
          <option value="30year">30 year</option>
          <option value="15year">15 year</option>
        </select>
      </div>
    
      <div>
        <label htmlFor="homeInsurance">Home insurance</label>
        <input type="text" name="homeInsurance" id="homeInsurance" />
      </div>

      <div>
        <label htmlFor="closingCosts">Desired location</label>
        <input type="text" name="closingCosts" id="closingCosts" />
      </div>

      <div>
        <label htmlFor="HOA/condo fees">HOA/condo fees</label>
        <input type="text" name="HOA/condo fees" id="HOA/condo fees" />
      </div>

      <div>
        <label htmlFor="monthlyMaintenance">Monthly maintenance</label>
        <input type="text" name="monthlyMaintenance" id="monthlyMaintenance" />
      </div>
    
      <div>
        <label htmlFor="propertyTax">Property tax</label>
        <input type="text" name="propertyTax" id="propertyTax"/>
      </div>

      <div>
        <label htmlFor="homePriceGrowth">Home price growth rate</label>
        <input type="text" name="homePriceGrowth" id="homePriceGrowth"/>
      </div>
    
      <div>
        <label htmlFor="stayDuration">Years planned to stay</label>
        <input type="text" name="stayDuration" id="stayDuration"/>
      </div>
      
      <h2>Renting</h2>

      <div>
        <label htmlFor="desiredRent">Desired rent</label>
        <input type="text" name="desiredRent" id="desiredRent"/>
      </div>

      <div>
        <label htmlFor="renterInsurance">Rent insurance</label>
        <input type="text" name="renterInsurance" id="renterInsurance"/>
      </div>

      <div>
        <label htmlFor="securityDeposit">Security deposit</label>
        <input type="text" name="securityDeposit" id="securityDeposit"/>
      </div>

      <div>
        <label htmlFor="petDeposit">Pet deposit</label>
        <input type="text" name="petDeposit" id="petDeposit"/>
      </div>

      <div>
        <label htmlFor="utilIncluded">Utilities included</label>
        <input type="text" name="utilIncluded" id="utilIncluded"/>
      </div>

      <div>
        <label htmlFor="appFee">Application fee</label>
        <input type="text" name="appFee" id="appFee"/>
      </div>

      <div>
        <label htmlFor="parkingFee">Parking fee</label>
        <input type="text" name="parkingFee" id="parkingFee"/>
      </div>

      <div>
        <label htmlFor="maintenanceFee">Maintenance fee</label>
        <input type="text" name="maintenanceFee" id="maintenanceFee"/>
      </div>

      <div>
        <label htmlFor="amenitiesFee">Amenities fee</label>
        <input type="text" name="amenitiesFee" id="amenitiesFee"/>
      </div>

      <h2>Total costs</h2>
      <h3>Renting cost:</h3>
      <h3>Owning costs</h3>
    </>
  )
}

export default App

