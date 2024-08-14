import { createContext, useContext, useRef, useCallback, useEffect } from 'react';
import { useScroll } from 'ahooks';
import type { DependencyList } from 'react';

export interface Position {
  left: number,
  top: number,
}

interface MagicScrollContextType {
  containerRef: React.RefObject<HTMLDivElement>;
  scroll?: Position;
}

const MagicScrollContext = createContext<MagicScrollContextType>(null!);

export const MagicScrollProvider: React.FC = ({ children }) => {
  const containerRef = useRef(null);
  const scroll = useScroll(containerRef);

  const value = {
    containerRef,
    scroll,
  };

  return (
    <MagicScrollContext.Provider value={value}>{children}</MagicScrollContext.Provider>
  );
};

/**
 * MagicScroll的Provider组件 
 * 提供: 容器引用(containerRef) 和 scroll位置信息(scroll)
 */
export const withMagicScroll = <P extends Record<string, any>>(Component: React.ComponentType<P>) => {
  const MagicScroll = (props: P) => {
    return (
      <MagicScrollProvider>
        <Component {...props} />
      </MagicScrollProvider>
    );
  };
  return MagicScroll;
};

/**
 * 获取container的ref和scroll位置
 */
export function useMagicScrollConsumer() {
  return useContext(MagicScrollContext);
}

interface MagicScrollProps {
  className?: string;
  /**
  * targetRef按照offset出现后，移动的距离 px
  */
  duration?: number;
  /**
   * 开始duration的位置
   */
  offset?: number;
  /**
   * 在duration滚动过程中的回调函数
   */
  onProcess?: (process: number, targetDom: HTMLDivElement) => void;
}

/**
 * 为滚动目标配置滚动效果的包裹组件。
 * 也可以使用useMagicScroll配置
 */
export const MagicScroll: React.FC<MagicScrollProps> = (props) => {
  const { children, className, duration = 300, offset = 0, onProcess } = props;
  const { containerRef, scroll } = useMagicScrollConsumer();
  const ref = useRef<HTMLDivElement>(null);
  useScrollTargetEffect(containerRef, [{
    targetRef: ref,
    duration,
    offset,
    onProcess,
  }], [scroll?.top, scroll?.left]);
  return (
    <div ref={ref} className={className}>
      { children }
    </div>
  );
};

/**
 * 为滚动目标配置滚动效果的hook
 */
export function useMagicScroll(
  /**
   * 滚动目标配置
   */
  targetsOption: TargetOption[],
) {
  const { containerRef, scroll } = useMagicScrollConsumer();
  useScrollTargetEffect(containerRef, targetsOption, [scroll?.top, scroll?.left]);
}

export interface TargetOption {
  /**
   * 滚动目标
   */
  targetRef: React.RefObject<HTMLDivElement>;
  /**
    * targetRef按照offset出现后，移动的距离 px
    */
  duration: number;
  /**
    * 开始duration的位置
    */
  offset?: number;
  /**
   * 在duration滚动过程中的回调函数
   */
  onProcess?: (process: number, targetDom: HTMLDivElement) => void;
}

/**
 * 根据某些依赖(如scrollTop/scrollLeft)，使滚动目标配置生效
 */
export function useScrollTargetEffect(
  /**
   * scroll容器
   */
  containerRef: React.RefObject<HTMLDivElement>,
  /**
   * 滚动目标配置
   */
  targetsOption: TargetOption[],
  /**
   * 依赖更新项，同useEffect意思
   */
  deps?: DependencyList,
) {
  const onScroll = useCallback(() => {
    const containerRefHeight = containerRef.current?.getBoundingClientRect()?.height;

    targetsOption.forEach(targetOpt => {
      const { targetRef, duration = 200, offset = 0, onProcess } = targetOpt;
      const targetScrollTop = targetRef.current?.getBoundingClientRect()?.top;

      if (!containerRef.current || !targetRef.current || !containerRefHeight || !targetScrollTop) return;
      const slidedHeight = containerRefHeight - targetScrollTop - offset;
      // console.log('移动的距离: ', slidedHeight);
      if (slidedHeight > 0 && slidedHeight <= containerRefHeight) {
        // 移动百分比
        const process = (slidedHeight / duration) < 1 ? (slidedHeight / duration) : 1;
        // console.log('百分之: ', process);
        targetRef.current && onProcess?.(Number(process.toFixed(2)), targetRef.current);
      } else if (slidedHeight < 0) {
        targetRef.current && onProcess?.(0, targetRef.current);
      } else if (slidedHeight > containerRefHeight) {
        targetRef.current && onProcess?.(1, targetRef.current);
      }
    });
  }, [containerRef, targetsOption]);

  useEffect(() => {
    onScroll();
  }, [onScroll, deps]);
}
