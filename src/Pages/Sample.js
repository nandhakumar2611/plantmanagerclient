import React, { useState } from 'react';
import Select from 'react-select';

const Sample = () => {

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (selectedOption) => {
        console.log("selected",selectedOption);
      setSelectedOption(selectedOption);
      console.log("selected 1",selectedOption);
    };

  
    const handleInputChange = () => {
        console.log("Input Value:", selectedOption);
      };

    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' },
      ];

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        onInputChange={handleInputChange}
        // onKeyDown={handleInputChange}
        // openMenuOnClick={handleInputChange}
        // onMenuClose={handleInputChange}
        // onInputChange={}
      />
    </div>
  )
}

export default Sample