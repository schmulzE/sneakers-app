// Card.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Card from './card';

describe('Card', () => {
  const mockProps = {
    icon: <svg data-testid="mock-icon"></svg>,
    header: 'Test Header',
    text: 'Test text content',
  };

  it('renders the icon', () => {
    render(<Card {...mockProps} />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders the header', () => {
    render(<Card {...mockProps} />);
    const header = screen.getByText('Test Header');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('H3');
  });

  it('renders the text', () => {
    render(<Card {...mockProps} />);
    const text = screen.getByText('Test text content');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('P');
  });

  it('applies correct classes to the main div', () => {
    render(<Card {...mockProps} />);
    const mainDiv = screen.getByText('Test Header').closest('div');
    expect(mainDiv).toHaveClass('w-full', 'px-2', 'border-black', 'border', 'my-3', 'p-4');
  });

  it('applies correct classes to the icon div', () => {
    render(<Card {...mockProps} />);
    const iconDiv = screen.getByTestId('mock-icon').parentElement;
    expect(iconDiv).toHaveClass('py-2');
  });

  it('applies correct classes to the header', () => {
    render(<Card {...mockProps} />);
    const header = screen.getByText('Test Header');
    expect(header).toHaveClass('py-3');
  });

  it('applies correct classes to the text', () => {
    render(<Card {...mockProps} />);
    const text = screen.getByText('Test text content');
    expect(text).toHaveClass('capitalize', 'text-sm', 'my-1');
  });
});