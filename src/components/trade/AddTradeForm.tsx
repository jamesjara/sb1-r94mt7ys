import React from 'react';
import { useForm } from 'react-hook-form';
import type { Trade } from '../../types/trade';
import { calculateFees } from '../../lib/utils';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface AddTradeFormProps {
  onSubmit: (data: Omit<Trade, 'id'>) => void;
}

type FormInputs = Omit<Trade, 'id' | 'fees'> & {
  fixedFee: number;
  percentageFee: number;
};

export function AddTradeForm({ onSubmit }: AddTradeFormProps) {
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const onSubmitForm = (data: FormInputs) => {
    const totalFees = calculateFees(
      data.amount,
      data.boughtRate,
      data.fixedFee,
      data.percentageFee
    );

    const tradeData: Omit<Trade, 'id'> = {
      ...data,
      boughtDate: new Date(data.boughtDate),
      fees: {
        fixedFee: data.fixedFee,
        percentageFee: data.percentageFee,
        totalFees,
      },
    };

    onSubmit(tradeData);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Coin"
          {...register('coin')}
          placeholder="BTC"
        />
        <Input
          label="Name"
          {...register('name')}
          placeholder="Trade 1"
        />
        <Select
          label="Category"
          options={[
            { value: 'long', label: 'Long' },
            { value: 'short', label: 'Short' },
          ]}
          {...register('category')}
        />
        <Input
          type="datetime-local"
          label="Bought Date"
          {...register('boughtDate')}
          required
        />
        <Input
          type="number"
          step="0.000001"
          label="Amount"
          {...register('amount', { valueAsNumber: true })}
          placeholder="0.00"
        />
        <Input
          type="number"
          step="0.01"
          label="Bought Rate"
          {...register('boughtRate', { valueAsNumber: true })}
          placeholder="0.00"
        />
        <Input
          type="number"
          step="0.01"
          label="Sell Target"
          {...register('sellTarget', { valueAsNumber: true })}
          placeholder="0.00"
        />
        <Input
          type="number"
          step="0.01"
          label="Fixed Fee"
          {...register('fixedFee', { valueAsNumber: true })}
          placeholder="0.00"
        />
        <Input
          type="number"
          step="0.01"
          label="Percentage Fee (%)"
          {...register('percentageFee', { valueAsNumber: true })}
          placeholder="0.00"
        />
        <Input
          type="number"
          step="0.01"
          label="Stop Loss"
          {...register('stopLoss', { valueAsNumber: true })}
          placeholder="0.00"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit">
          Add Trade
        </Button>
      </div>
    </form>
  );
}