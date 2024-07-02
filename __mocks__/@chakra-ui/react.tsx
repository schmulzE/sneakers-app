import { vi } from 'vitest';
import React from 'react';

const actual = vi.importActual('@chakra-ui/react');

export const useBreakpointValue = vi.fn();
export const Modal = vi.fn(({ children, isOpen, onClose }) => 
  isOpen ? (
    <div data-testid="modal">
      {children}
      <button data-testid="modal-close-button" onClick={onClose}>Close</button>
    </div>
  ) : null
);
export const ModalContent = vi.fn(({ children }) => <div data-testid="modal-content">{children}</div>);
export const ModalBody = vi.fn(({ children }) => <div data-testid="modal-body">{children}</div>);
export const ModalCloseButton = vi.fn(() => null); // We'll render the close button in the Modal component

export const Accordion = vi.fn(({ children, ...props }) => (
  <div data-testid="accordion" {...props}>{children}</div>
));

export const AccordionItem = vi.fn(({ children }) => (
  <div data-testid="accordion-item">{children}</div>
));

export const AccordionButton = vi.fn(({ children }) => (
  <button data-testid="accordion-button">{children}</button>
));

export const AccordionPanel = vi.fn(({ children, ...props }) => (
  <div data-testid="accordion-panel" {...props}>{children}</div>
));

export const AccordionIcon = vi.fn(() => <span data-testid="accordion-icon" />);

export const Box = vi.fn(({ children, ...props }) => (
  <div data-testid="box" {...props}>{children}</div>
));


export default {
  ...(actual as object),
  useBreakpointValue,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
};