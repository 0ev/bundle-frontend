export default function Filter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
                    1 0 0 0 0
                    0 1 0 0 0 
                    0 0 1 0 0  
                    0 0 0 35 -9"
            result="goo"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
                    1 0 0 0 0
                    0 1 0 0 0 
                    0 0 1 0 0  
                    0 0 0 20 -9"
            result="goo2"
          />
          <feComposite in="goo2" in2="goo" operator="xor" />
        </filter>
      </defs>
    </svg>
  );
}
