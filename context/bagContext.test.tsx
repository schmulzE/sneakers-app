// BagProvider.test.jsx
import React from 'react';
import { render, act } from '@testing-library/react';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import BagProvider, { useBag } from './bagContext';

const mockSneaker = {
  id: 1,
  brand: { id: 1, name: 'Test Brand' },
  shortDescription: 'Sneaker A',
  priceInfo: { formattedFinalPrice: '$100' },
  images: { cutOut: 'imageA.png' },
  size: 42,
  quantity: 1,
};

// Mock component to test the context
const TestComponent = () => {
  const { bag, addToBag, removeFromBag, resetBag, totalBagItems } = useBag();
  return (
    <div>
      <span data-testid="bag-length">{bag.length}</span>
      <span data-testid="total-items">{totalBagItems}</span>
      <button onClick={() => addToBag(mockSneaker)}>Add</button>
      <button onClick={() => removeFromBag(1)}>Remove</button>
      <button onClick={resetBag}>Reset</button>
    </div>
  );
};

describe('BagProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });

  it('initializes with an empty bag', () => {
    const { getByTestId } = render(
      <BagProvider>
        <TestComponent />
      </BagProvider>
    );
    expect(getByTestId('bag-length').textContent).toBe('0');
    expect(getByTestId('total-items').textContent).toBe('0');
  });

  it('adds an item to the bag', async () => {
    const { getByTestId, getByText } = render(
      <BagProvider>
        <TestComponent />
      </BagProvider>
    );
    
    await act(async () => {
      getByText('Add').click();
    });

    expect(getByTestId('bag-length').textContent).toBe('1');
    expect(getByTestId('total-items').textContent).toBe('1');
  });

  it('removes an item from the bag', async () => {
    const { getByTestId, getByText } = render(
      <BagProvider>
        <TestComponent />
      </BagProvider>
    );
    
    await act(async () => {
      getByText('Add').click();
      getByText('Remove').click();
    });

    expect(getByTestId('bag-length').textContent).toBe('0');
    expect(getByTestId('total-items').textContent).toBe('0');
  });

  it('resets the bag', async () => {
    const { getByTestId, getByText } = render(
      <BagProvider>
        <TestComponent />
      </BagProvider>
    );
    
    await act(async () => {
      getByText('Add').click();
      getByText('Add').click();
      getByText('Reset').click();
    });

    expect(getByTestId('bag-length').textContent).toBe('0');
    expect(getByTestId('total-items').textContent).toBe('0');
  });

  it('loads items from localStorage on initial render', () => {
    localStorage.setItem('BAG_ITEMS', JSON.stringify([{ id: 1, brand: {id: 1, name: 'Test Brand' } }]));
    
    const { getByTestId } = render(
      <BagProvider>
        <TestComponent />
      </BagProvider>
    );

    expect(getByTestId('bag-length').textContent).toBe('1');
  });
});