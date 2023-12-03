import { useEffect } from 'react';

export default function CustomComp(props: any) {
  console.log('custom props', props);
  const { map } = props;

  useEffect(() => {
    if (map) {
      console.log('customComp jinlaile', map);
    }
  }, [map]);

  return null;
}
