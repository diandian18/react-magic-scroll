import { useMemo, useRef } from 'react';
import { easeCubicOut } from 'd3-ease';
import { scaleLinear } from 'd3-scale';
import { withMagicScroll, MagicScroll, useMagicScrollConsumer, useMagicScroll } from '@/index';
import type { TargetOption } from '@/index';
import './index.less';

const color2 = scaleLinear([0, 1], ['rgb(110, 222, 230)', 'rgb(174, 230, 110)']);
const color3 = scaleLinear([0, 1], ['rgb(230, 174, 110)', 'rgb(182, 110, 230)']);
const color4 = scaleLinear([0, 1], ['rgb(110, 222, 230)', 'rgb(230, 174, 110)']);

function App() {
  const { containerRef } = useMagicScrollConsumer();
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const targetOptions = useMemo<TargetOption[]>(() => {
    return [
      {
        targetRef: ref1,
        duration: 500,
        offset: 0,
        onProcess(process, ref) {
          const bezieredProcess = easeCubicOut(process);
          ref.style.transform = `matrix(1, 0, 0, 1, 0, ${150 * (1 - bezieredProcess)})`;
          ref.style.opacity = String(bezieredProcess);
        },
      },
      {
        targetRef: ref2,
        duration: 500,
        offset: -100,
        onProcess(process, ref) {
          const bezieredProcess = easeCubicOut(process);
          ref.style.transform = `matrix(1, 0, 0, 1, 0, ${150 * (1 - bezieredProcess)})`;
          ref.style.opacity = String(bezieredProcess);
          ref.style.backgroundColor = color2(process);
        },
      },
    ];
  }, []);

  useMagicScroll(targetOptions);

  return (
    <div className="container" ref={containerRef}>
      <div ref={ref1} className="box">
        <h1>Ref1 title</h1>
        <p>Some Words...</p>
      </div>
      
      <div ref={ref2} className="box">
        <h1>Ref2 title</h1>
        <p>Some Words...</p>
      </div>

      <MagicScroll className="box"
        duration={500}
        offset={50}
        onProcess={(process, ref) => {
          const bezieredProcess = easeCubicOut(process);
          ref.style.transform = `matrix(1, 0, 0, 1, 0, ${150 * (1 - bezieredProcess)})`;
          ref.style.opacity = String(bezieredProcess);
          ref.style.backgroundColor = color3(process);
        }}
      >
        <h1>Title</h1>
        <p>Some Words...</p>
      </MagicScroll>

      <MagicScroll className="box"
        duration={500}
        offset={50}
        onProcess={(process, ref) => {
          const bezieredProcess = easeCubicOut(process);
          ref.style.transform = `matrix(1, 0, 0, 1, 0, ${150 * (1 - bezieredProcess)})`;
          ref.style.opacity = String(bezieredProcess);
          ref.style.backgroundColor = color4(process);
        }}
      >
        <h1>Title</h1>
        <p>Some Words...</p>
      </MagicScroll>
    </div>
  );
}

export default withMagicScroll(App);
