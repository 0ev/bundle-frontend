export default function Filter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
                    1 0 0 0 0
                    0 1 0 0 0 
                    0 0 1 0 0  
                    0 0 0 9 -4"
            result="goo"
          />
          {/* <feColorMatrix
            in="blur"
            type="matrix"
            values="
                    1 0 0 0 0
                    0 1 0 0 0 
                    0 0 1 0 0  
                    0 0 0 4 -3"
            result="goo2"
          />
          <feComposite in="goo2" in2="goo" operator="xor" result="goo3" />
          <feColorMatrix
            in="goo3"
            type="matrix"
            values="
                    1 0 0 0 0
                    0 1 0 0 0 
                    0 0 1 0 0  
                    0 0 0 10 -9"
          /> */}
        </filter>
      </defs>
    </svg>
  );
}
