import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    if (body && typeof body.amount === 'number' && body.amount >= 0) {
        budget.amount = body.amount;

        res.status(200).json({ message: 'Budget updated', budget });
    } else {
        res.status(400).json({ message: 'Invalid budget amount provided' });
    }
}
