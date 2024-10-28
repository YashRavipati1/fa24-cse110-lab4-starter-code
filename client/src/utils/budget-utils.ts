import { API_BASE_URL } from "../constants/constants";
import Budget from "../components/Budget/Budget";

export const getBudget = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/budget`);
        if (!response.ok) {
            throw new Error('Failed to fetch budget');
        }

        const jsonResponse = await response.json();

        if (jsonResponse.data && jsonResponse.data.length > 0) {
            const budgetValue = jsonResponse.data[0].budget;
            return budgetValue;
        } else {
            throw new Error('No budget data found');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};