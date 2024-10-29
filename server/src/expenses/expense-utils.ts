import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send({ error: "ID not found." });
    }

    const deletedExpense = expenses.find(expense => expense.id === id);
    if (!deletedExpense) {
        return res.status(404).send({ error: "Expense not found" });
    }

    expenses = expenses.filter(expense => expense.id !== id);

    res.status(200).send(deletedExpense);
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}