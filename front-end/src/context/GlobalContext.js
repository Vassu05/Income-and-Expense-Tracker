import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

const URL = 'http://localhost:5000/api/transaction/';

const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [error,setError] = useState(null);

    const addIncome = async (income) => {
        const res = await axios.post(`${URL}add-income`,income)
        .catch((err) => {
            setError(err.response.data.message);
        });
        getIncomes();
    }

    const getIncomes = async () => {
        const response = await axios.get(`${URL}get-income`);
        setIncomes(response.data);
    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${URL}delete-income/${id}`);
        getIncomes();
    }

    const totalIncome = () => {
        let total = 0;
        incomes.forEach((income) => {
            total += income.amount;
        })
        return total;
    }

    const addExpense = async (income) => {
        const res = await axios.post(`${URL}add-expense`,income)
        .catch((err) => {
            setError(err.response.data.message);
        });
        getExpenses();
    }

    const getExpenses = async () => {
        const response = await axios.get(`${URL}get-expense`);
        setExpenses(response.data);
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${URL}delete-expense/${id}`);
        getExpenses();
    }

    const totalExpense = () => {
        let total = 0;
        expenses.forEach((income) => {
            total += income.amount;
        })
        return total;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpense();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history;
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}