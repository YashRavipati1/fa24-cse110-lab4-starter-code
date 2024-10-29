import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";


const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);

  useEffect(() => {
    loadBudget();
  });

  const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateNewBudget = async () => {
    const inputtedValue = await updateBudget(newBudget);
    setBudget(inputtedValue);
  };


  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div>
      <input
        type="number"
        value={newBudget}
        onChange={(e) => setNewBudget(Number(e.target.value))}
        min="0"
        className="form-control me-2"
      />
      <button onClick={updateNewBudget} className="btn btn-primary">Update Budget</button>
    </div>
  );
};

export default Budget;