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
})