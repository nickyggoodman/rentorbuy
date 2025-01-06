import { useState } from 'react'

function CalcForm() {

  const [displayValues, setDisplayValues] = useState(
    {
      desiredLocation: "",
      homePrice: "$",
      downPayment: "%",
      mortgageRate: "%",
      loanTerm: "",
      inflationRate: "%",
      homeValGrowth: "%",
      homeInsurance: "$",
      closingCosts: "$",
      hoaCondoFees: "$",
      monthlyMaintenance: "$",
      propertyTax: "$",
      stayDuration: "",
      desiredRent: "$",
      renterInsurance: "$",
      securityDeposit: "$",
      petDeposit: "$",
      utilIncluded: "$",
      appFee: "$",
      parkingFee: "$",
      maintenanceFee: "$",
      amenitiesFee: "$",
    }
  );

  function handleInputChange(e) {
   
    const formatter = new Intl.NumberFormat();
    const regex = /\d*/g;
    const arr = e.target.value.split(".");
    const integer = arr[0].match(regex).join("");
    const decimal = arr.length > 1 ? arr[1].match(regex).join("") : "";
    const display = (integer ? formatter.format(integer) : "") + (e.target.value[arr[0].length] == "." ? "." :  "") + decimal; 
    const value = Number(integer + "." +  decimal);

    if (e.target.className == "monetaryInput") {
    

      setDisplayValues({
        ...displayValues,
        [e.target.id] : "$" + display
      });
      setInputValues({
        ...inputValues,
        [e.target.id] : value || 0
      });
      
    } else if (e.target.className == "percentageInput"){  

      setDisplayValues({
        ...displayValues,
        [e.target.id] : display + "%"
      });
      setInputValues({
        ...inputValues,
        [e.target.id] : value/100 || 0
      });
      
    } else {
      
      setDisplayValues({
        ...displayValues,
        [e.target.id] : display
      });
      setInputValues({
        ...inputValues,
        [e.target.id] : value || 0
      });

    }
  }


  function handleBlur(e) {

    if (inputValues[e.target.id] == 0 && e.target.className=="monetaryInput") {
     setDisplayValues({
        ...displayValues,
        [e.target.id] : "$0"
      });
    }

  }

  function onFocus(e) {
    return;
  }

  return (
    <>
      <h1>Rent or Buy?</h1>
    
      <h2>Location</h2>

      <div className="inputField">
        <label htmlFor="desiredLocation">Desired location</label>
        <input  
          value={displayValues.desiredLocation}
          type="text"
          name="desiredLocation" 
          id="desiredLocation"
          onChange={handleInputChange}/>
      </div>

      <h2>Owning</h2>

      <div className="inputField">
        <label htmlFor="homePrice">Home price</label>
        <input 
          value={displayValues.homePrice} 
          type="text"  
          name="homePrice" 
          id="homePrice" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>


      <div className="inputField">
        <label htmlFor="downPayment">Down payment</label>
        <input 
          type="text" 
          value={displayValues.downPayment} 
          name="downPayment" 
          id="downPayment" className="percentageInput"
          onChange={handleInputChange} 
          onFocus={(e)=> e.target.setSelectionRange(e.target.value.length-1,e.target.value.length-1)}
          onBlur={handleBlur} />
      </div>  

      <div className="inputField">
        <label htmlFor="mortgageRate">Mortgage rate</label>
        <input 
          type="text" 
          value={displayValues.mortgageRate} 
          name="mortgageRate" 
          id="mortgageRate" className="percentageInput"
          onFocus={(e)=> e.target.setSelectionRange(e.target.value.length-1,e.target.value.length-1)}
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="loanTerm">Loan term</label>
        <select name="loanTerm" id="loanTerm" onChange={handleInputChange}>
          <option value={30}>30 year</option>
          <option value={20}>20 year</option>
          <option value={15}>15 year</option>
        </select>
      </div>

      <div className="inputField">
        <label htmlFor="stayDuration">Years planned to stay</label>
        <input 
          type="text" 
          value={displayValues.stayDuration} 
          name="stayDuration" 
          id="stayDuration" className="genericInput"
          onChange={handleInputChange} 
          onBlur={handleBlur}/>
      </div>

    
      <div className="inputField">
        <label htmlFor="homeInsurance">Home insurance</label>
        <input 
          type="text" 
          value={displayValues.homeInsurance} 
          name="homeInsurance" 
          id="homeInsurance" className="monetaryInput" 
          onChange={handleInputChange}
          onBlur={handleBlur}/>
      </div>

      <div className="inputField">
        <label htmlFor="closingCosts">Closing cost</label>
        <input 
          type="text" 
          value={displayValues.closingCosts} 
          name="closingCosts" 
          id="closingCosts" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="hoaCondoFees">HOA/condo fees</label>
        <input 
          type="text" 
          value={displayValues.hoaCondoFees} 
          name="hoaCondoFees" 
          id="hoaCondoFees" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="monthlyMaintenance">Monthly maintenance</label>
        <input 
          type="text" 
          value={displayValues.monthlyMaintenance} 
          name="monthlyMaintenance" 
          id="monthlyMaintenance" className="monetaryInput"  
          onChange={handleInputChange} 
          onBlur={handleBlur}/>
      </div>
    
      <div className="inputField">
        <label htmlFor="propertyTax">Property tax</label>
        <input 
          type="text" 
          value={displayValues.propertyTax} 
          name="propertyTax" 
          id="propertyTax" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur}/>
      </div>

      
      <div className="inputField">
        <label htmlFor="inflationRate">Inflation rate</label>
        <input 
          value={displayValues.inflationRate} 
          type="text"  
          name="inflationRate" 
          id="inflationRate" className="percentageInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="homeValGrowth">Home value growth rate</label>
        <input 
          value={displayValues.homeValGrowth} 
          type="text"  
          name="homeValGrowth" 
          id="homeValGrowth" className="percentageInput"
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>
      
    {
      /*
       * section II for everything that consists of the cost of renting a 
       * place. These will be multiplied by 12 months by the years of staying
       * in a location
       */
    }
      <h2>Renting</h2>

      <div className="inputField">
        <label htmlFor="desiredRent">Desired rent</label>
        <input 
          type="text" 
          value={displayValues.desiredRent} 
          name="desiredRent" 
          id="desiredRent" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="renterInsurance">Rent insurance</label>
        <input 
          type="text" 
          value={displayValues.renterInsurance} 
          name="renterInsurance" 
          id="renterInsurance" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="securityDeposit">Security deposit</label>
        <input 
          type="text" 
          value={displayValues.securityDeposit} 
          name="securityDeposit" 
          id="securityDeposit" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="petDeposit">Pet deposit</label>
        <input 
          type="text" 
          value={displayValues.petDeposit} 
          name="petDeposit" 
          id="petDeposit" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="utilIncluded">Utilities included</label>
        <input 
          type="text" 
          value={displayValues.utilIncluded} 
          name="utilIncluded" 
          id="utilIncluded" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="appFee">Application fee</label>
        <input 
          type="text" 
          value={displayValues.appFee} 
          name="appFee" 
          id="appFee" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="parkingFee">Parking fee</label>
        <input 
          type="text" 
          value={displayValues.parkingFee} 
          name="parkingFee" 
          id="parkingFee" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="maintenanceFee">Maintenance fee</label>
        <input 
          type="text" 
          value={displayValues.maintenanceFee} 
          name="maintenanceFee" 
          id="maintenanceFee" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>

      <div className="inputField">
        <label htmlFor="amenitiesFee">Amenities fee</label>
        <input 
          type="text" 
          value={displayValues.amenitiesFee} 
          name="amenitiesFee" 
          id="amenitiesFee" className="monetaryInput" 
          onChange={handleInputChange} 
          onBlur={handleBlur} />
      </div>
    </>
  );

}



