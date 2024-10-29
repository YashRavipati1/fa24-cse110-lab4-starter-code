import { API_BASE_URL } from "../constants/constants";
import Budget from "../components/Budget/Budget";

export const fetchBudget = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/budget`);
        if (!response.ok) {
            throw new Error('Failed to fetch budget');
        }

        let budgetValue = response.json().then((jsonResponse) => {
            console.log("data in fetchBudget", jsonResponse);
            return jsonResponse.data;
        });

        console.log("response in fetchBudget", budgetValue);
        return budgetValue;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateBudget = async (budget: number) => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: budget }),
    });

    if (!response.ok) {
        throw new Error(`Error updating budget: ${response.statusText}`);
    }

    const data = await response.json();
    return data.budget.amount;
};