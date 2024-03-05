import styled from 'styled-components'
import ReactDom from 'react-dom'
import { useAppContext } from '../../context/AppContext';
const Wrapper = styled.section`
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
z-index: 666999999999;
background: ${props => props.bg};
&.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
`
const Model = ({children,bg,center}) => {
  const {toggleDrawer} = useAppContext();
  return ReactDom.createPortal(<Wrapper onClick={toggleDrawer}  bg={bg} className={center && 'center'} >{children} </Wrapper>,
                                document.getElementById('model')
                                );
}

export default Model
