import { useEffect, useState } from 'react';
import MyClock from 'react-clock';
import 'react-clock/dist/Clock.css';
import styled from 'styled-components';

const Container = styled.div`
  display: none;
  @media screen and (min-width:1024px) {
    display: block;
  }
`
const Clock = () => {
      const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Container>
      <MyClock renderNumbers  size={150} value={value} />
    </Container>
  )
}

export default Clock