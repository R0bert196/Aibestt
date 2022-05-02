import React from "react";

function AutoCompleteBox({setInputValue, setIsCompanySelected, setIsSelectedField, companies}) {
  return (
    <div className='py-3 px-2 max-h-44 overflow-hidden'>
      <ul className='list-none search-box cursor-pointer'>
        {companies?.map((company, key) => {
          return (
            <li
              key={key}
              onClick={(e) => {
                console.log(e.target.innerHTML);
                console.log(e.parentElement);
                setInputValue(e.target.innerHTML);
                setIsCompanySelected(true);
                setIsSelectedField(false);
              }}
            >
              {company.deni}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AutoCompleteBox;
