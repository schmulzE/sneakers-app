import { describe, it, expect } from 'vitest';
import { modalReducer, initialState, ModalState, ModalAction } from './modalReducer'; // adjust the import path as needed

describe('modalReducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer({ "content": null, overlay: null, "isOpen": false }, {} as ModalAction)).toEqual(initialState);
  });

  it('should handle OPEN_MODAL', () => {
    const content = <div>Modal Content</div>;
    const overlay = <div>Overlay Content</div>;
    const action: ModalAction = { type: 'OPEN_MODAL', content, overlay };
    const expectedState: ModalState = {
      isOpen: true,
      overlay,
      content,
    };

    expect(modalReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle OPEN_MODAL without overlay', () => {
    const content = <div>Modal Content</div>;
    const action: ModalAction = { type: 'OPEN_MODAL', content };
    const expectedState: ModalState = {
      isOpen: true,
      overlay: undefined,
      content,
    };

    expect(modalReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CLOSE_MODAL', () => {
    const initialOpenState: ModalState = {
      isOpen: true,
      overlay: <div>Overlay Content</div>,
      content: <div>Modal Content</div>,
    };
    const action: ModalAction = { type: 'CLOSE_MODAL' };

    expect(modalReducer(initialOpenState, action)).toEqual(initialState);
  });

});