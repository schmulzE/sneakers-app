import React from 'react';
import { render, act } from '@testing-library/react';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import CartProvider, { useWishlist } from './wishlistContext';

// Mock component to test the context
const TestComponent = () => {
  const {addToWishlist, removeFromWishlist, wishlists, resetWishlist} = useWishlist();
  return (
    <div>
      <span data-testid="items-length">{wishlists.length}</span>
      <button onClick={() => addToWishlist({ id: 1, brand: { id: 1, name: 'Test Sneaker' } })}>Add</button>
      <button onClick={() => removeFromWishlist(1)}>Remove</button>
      <button onClick={resetWishlist}>Reset</button>
    </div>
  );
};

describe('CartProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });

  it('initializes with an empty cart', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(getByTestId('items-length').textContent).toBe('0');
  });

  it('adds an item to the cart', async () => {
    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await act(async () => {
      getByText('Add').click();
    });

    expect(getByTestId('items-length').textContent).toBe('1');
  });

  it('removes an item from the cart', async () => {
    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await act(async () => {
      getByText('Add').click();
      getByText('Remove').click();
    });

    expect(getByTestId('items-length').textContent).toBe('0');
  });

  it('resets the cart', async () => {
    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await act(async () => {
      getByText('Add').click();
      getByText('Add').click();
      getByText('Reset').click();
    });

    expect(getByTestId('items-length').textContent).toBe('0');
  });

  it('loads items from localStorage on initial render', () => {
    localStorage.setItem('CART_ITEMS', JSON.stringify([{ id: 1, brand: {id: 1, name: 'Test Sneaker'} }]));
    
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(getByTestId('items-length').textContent).toBe('1');
  });

  it('saves items to localStorage when cart changes', async () => {
    const { getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    await act(async () => {
      getByText('Add').click();
    });

    const savedItems = JSON.parse(localStorage.getItem('CART_ITEMS'));
    expect(savedItems).toHaveLength(1);
    expect(savedItems[0]).toEqual({ id: 1, brand: { id: 1, name: 'Test Sneaker' } });
  });
});