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