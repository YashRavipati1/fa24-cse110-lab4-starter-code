import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe("Create Expense", () => {
  test("Renders AddExpenseForm", () => {
    render(<App />);

    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    expect(nameInput).toBeInTheDocument();
    expect(costInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test("Creates new expense", () => {
    render(<App />);

    const nameInput = screen.getByLabelText("Name");
    const costInput = screen.getByLabelText("Cost");
    const saveButton = screen.getByText("Save");
    fireEvent.change(nameInput, { target: { value: "New Expense" } });
    fireEvent.change(costInput, { target: { value: "10" } });
    fireEvent.click(saveButton);

    const newExpense = screen.getByText("New Expense");
    const newCost = screen.getByText("$10");
    expect(newCost).toBeInTheDocument();
    expect(newExpense).toBeInTheDocument();
  })
});

describe("Delete an Expense Tests", () => {
  test("Confirm that an expense is successfully removed from the list", () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/Name/i);
    const costInput = screen.getByLabelText(/Cost/i);
    const submitButton = screen.getByText(/Save/i);

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "100" } });
    fireEvent.click(submitButton);

    const expenseItem = screen.getByText(/Groceries/i);
    expect(expenseItem).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Groceries/i)).not.toBeInTheDocument();
  });

  test("Ensure the total spent and remaining budget update after deleting an expense", () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/Name/i);
    const costInput = screen.getByLabelText(/Cost/i);
    const submitButton = screen.getByText(/Save/i);

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "100" } });
    fireEvent.click(submitButton);

    fireEvent.change(nameInput, { target: { value: "Rent" } });
    fireEvent.change(costInput, { target: { value: "400" } });
    fireEvent.click(submitButton);

    const totalSpent = screen.getByText(/Spent so far: \$500/i);
    const remainingBudget = screen.getByText(/Remaining: \$500/i);
    expect(totalSpent).toBeInTheDocument();
    expect(remainingBudget).toBeInTheDocument();

    const deleteButton = screen.getAllByRole("button", { name: /x/i })[0];
    fireEvent.click(deleteButton);

    const updatedTotalSpent = screen.getByText(/Spent so far: \$400/i);
    const updatedRemainingBudget = screen.getByText(/Remaining: \$600/i);
    expect(updatedTotalSpent).toBeInTheDocument();
    expect(updatedRemainingBudget).toBeInTheDocument();
  });
});

describe("Budget Balance Verification", () => {
  test("Validate that Budget = Remaining Balance + Total Expenditure after adding expenses", () => {
    render(<App />);

    const initialBudget = 1000;

    const nameInput = screen.getByLabelText(/Name/i);
    const costInput = screen.getByLabelText(/Cost/i);
    const submitButton = screen.getByText(/Save/i);

    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "200" } });
    fireEvent.click(submitButton);

    fireEvent.change(nameInput, { target: { value: "Rent" } });
    fireEvent.change(costInput, { target: { value: "300" } });
    fireEvent.click(submitButton);

    const totalSpent = screen.getByText(/Spent so far: \$500/i);
    const remainingBudget = screen.getByText(/Remaining: \$500/i);

    expect(totalSpent).toBeInTheDocument();
    expect(remainingBudget).toBeInTheDocument();
    expect(initialBudget).toBe(500 + 500);
  });

  test("Validate that Budget = Remaining Balance + Total Expenditure after deleting an expense", () => {
    render(<App />);

    const initialBudget = 1000;

    const nameInput = screen.getByLabelText(/Name/i);
    const costInput = screen.getByLabelText(/Cost/i);
    const submitButton = screen.getByText(/Save/i);


    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "200" } });
    fireEvent.click(submitButton);

    fireEvent.change(nameInput, { target: { value: "Rent" } });
    fireEvent.change(costInput, { target: { value: "300" } });
    fireEvent.click(submitButton);

    let totalSpent = screen.getByText(/Spent so far: \$500/i);
    let remainingBudget = screen.getByText(/Remaining: \$500/i);

    const deleteButton = screen.getAllByRole("button", { name: /x/i })[0]; // Target the first delete button
    fireEvent.click(deleteButton);

    totalSpent = screen.getByText(/Spent so far: \$300/i);
    remainingBudget = screen.getByText(/Remaining: \$700/i);

    expect(totalSpent).toBeInTheDocument();
    expect(remainingBudget).toBeInTheDocument();
    expect(initialBudget).toBe(700 + 300);
  });
});
