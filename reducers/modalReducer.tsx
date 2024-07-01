
export interface ModalState {
  isOpen: boolean;
  overlay?: React.ReactNode
  content: React.ReactNode;
}

export type ModalAction =
  | { type: 'OPEN_MODAL';  overlay?: React.ReactNode; content: React.ReactNode }
  | { type: 'CLOSE_MODAL' };


// Define the initial state for the modal
export const initialState: ModalState = {
  isOpen: false,
  overlay: null,
  content: null,
};

// Define the reducer function
export function modalReducer(state: ModalState, action: ModalAction) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
        overlay: action.overlay,
        content: action.content,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
        overlay: null,
        content: null,
      };
    default:
      return state;
  }
}
