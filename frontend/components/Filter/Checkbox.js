import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Checkbox = ({ items, name }) => {
  const [checked, setChecked] = useState([]);

  const router = useRouter();

  const handleCheckbox = (e) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList.push(e.target.value);
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
  }

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [name]: checked }
    })
  }, [checked])


  return (
    <>
      {items?.length && items?.map(item => (
        <div key={item.id}>
          <input
            type="checkbox"
            name={item.name}
            value={item.value}
            onChange={handleCheckbox}
          /> {item.label}
        </div>
      ))}
    </>
  )
}

export default Checkbox