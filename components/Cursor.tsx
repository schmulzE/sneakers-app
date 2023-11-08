import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {GrClose} from 'react-icons/gr'

const Cursor = () => {
  let cursorRef = useRef<HTMLDivElement>(null);
  
  
  useEffect(() => {      
    const cursor = {
      element: (cursorRef as any).current,
      states: {
        default: {
          backgroundColor : 'transparent',
          border: 'none',
          zIndex: 100
        },
        label: {
          backgroundColor : '#fff',
          border: '1px solid #000',
          height: 50,
          width: 110,
        }
      },
    };
  // Initial position, default state and events.
  function init() {
    gsap.set(cursor.element, {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2,
    });
    updateCursor('default');
    document.onmousemove = handleMouseMove;
  }
  
  // Set new position and apply props.
  function handleMouseMove(event: any) {
    gsap.to(cursor.element, { left: event.clientX, top: event.clientY, duration: 0.3});
    const state = event.target?.attributes['data-cursor']?.value || 'default';
    const label = event.target?.attributes['data-cursor-label']?.value || '';
    updateCursor(state, label);
  }
  
  // Apply props and update inner html.
  type State = keyof typeof cursor.states
  function updateCursor(state: State, label?:string) {
    gsap.to(cursor.element, cursor.states[state] || cursor.states['default']);
    if(cursor.element !== null ){
      cursor.element.className = `has-${state}-state`;
      cursor.element.innerHTML = label;
    }
  }
  
  init();
  
  }, [])
  return (
    <div id="adaptive-cursor" ref={cursorRef} className='hidden md:hidden lg:block xl:block'>
    </div>
  )
}

export default Cursor
