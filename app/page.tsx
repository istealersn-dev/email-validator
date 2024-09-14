'use client'

import EmailForm from './components/EmailForm';
import ResultTable from './components/ResultTable';
import { useState } from 'react';

export default function Home() {
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleValidationResult = (result: any) => {
    setValidationResult(result);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Email Validator SaaS</h1>
      <EmailForm onValidationResult={handleValidationResult} />
      {validationResult && <ResultTable result={validationResult} />}
    </main>
  );
}