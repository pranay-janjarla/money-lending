import React, { createContext, useState, useContext } from 'react';

export type Loan = {
  id: any;
  type: string;
  name: string;
  amount: number;
  interest: number;
  dueDate: string;
  status: string;
};

type LoanContextType = {
  loans: Loan[];
  addLoan: (loan: Loan) => void;
};

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: React.ReactNode }) => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const addLoan = (loan: Loan) => {
    setLoans((prev) => [...prev, loan]);
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoanContext must be used within a LoanProvider');
  }
  return context;
};
