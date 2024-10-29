import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return total + item.cost;
  }, 0);

  const remaining = budget - totalExpenses;

  useEffect(() => {
    if (remaining < 0) {
      // Trigger alert when budget is exceeded
      window.alert("You have exceeded your budget!");
    }
  }, [remaining]); // Trigger the effect whenever `remaining` is updated

  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: ${remaining}</span>
    </div>
  );
};

export default Remaining;