import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { API_BASE_URL } from "../../constants/constants";
import { getBudget } from "../../utils/budget-utils";


const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);

  useEffect(() => {
    loadBudget();
  });

  const loadBudget = async () => {
    try {
      const budget = await getBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };


  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${budget}</div>
    </div>
  );
};

export default Budget;