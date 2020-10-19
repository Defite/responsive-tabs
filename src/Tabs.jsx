import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
  useRef
} from "react";

// Hook
function useOnClickOutside(triggerRef, tooltipRef, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (
          !triggerRef.current ||
          triggerRef.current.contains(event.target) ||
          !tooltipRef.current ||
          tooltipRef.current.contains(event.target)
        ) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [triggerRef, tooltipRef, handler]
  );
}

const Tabs = (props) => {
  const parentRef = useRef(null);
  const moreBtnRef = useRef(null);
  const tooltipRef = useRef(null);
  const childRefs = [];

  const tabsItemsLength = props.children.length;
  const [hiddenTabsIndex, setTabs] = useState(tabsItemsLength);
  const [popupVisible, setVisibility] = useState(false);

  /**
   * Список ссылок в тултипе "показать ещё"
   */
  const buildMoreList = () => {
    if (tabsItemsLength === hiddenTabsIndex) {
      return null;
    }

    return (
      <div className="more-list-popup" ref={tooltipRef}>
        {props.children.slice(hiddenTabsIndex).map((item, index) => {
          return (
            <li className="more-list-item" key={`more-item-${index}`}>
              {item}
            </li>
          );
        })}
      </div>
    );
  };

  const onClickShowMore = () => {
    setVisibility(!popupVisible);
  };

  /**
   * Кнопка "показать ещё"
   */
  const showMoreBtn = () => {
    if (hiddenTabsIndex === tabsItemsLength) {
      return null;
    }

    return (
      <li ref={moreBtnRef} className="more-button">
        <span onClick={onClickShowMore}>Ещё</span>
        <ul>{buildMoreList()}</ul>
      </li>
    );
  };

  const getOverflowedItems = useCallback(
    (elems) => {
      // Ширина кнопки "показать еще"
      let moreBtnWidth = moreBtnRef.current
        ? moreBtnRef.current.offsetWidth
        : 40;

      // Временная переменная для индекса скрытия
      let tmpIndex = null;

      // Размер родительского контейнера
      const containerWidth = parentRef.current.offsetWidth;

      // Собираем все элементы, которые находятся за пределами контейнера
      elems.forEach((elem, index) => {
        if (containerWidth >= moreBtnWidth + elem.offsetWidth + 10) {
          moreBtnWidth += elem.offsetWidth + 10;
        } else {
          if (!tmpIndex) {
            tmpIndex = index;
          }
        }
      });

      /**
       * Если tmpIndex не пустой, значит есть скрытые табы
       * Иначе считаем, что все поместилось и показываем все табы
       */
      setTabs(tmpIndex || tabsItemsLength);
    },
    [tabsItemsLength]
  );

  const tabsRef = useCallback(
    (node) => {
      if (node !== null) {
        childRefs.push({
          offsetWidth: node.offsetWidth
        });
      }
    },
    [childRefs]
  );

  // Effects section
  const makeBadThings = useCallback(() => {
    getOverflowedItems(childRefs);
  }, [getOverflowedItems]);

  useLayoutEffect(() => {
    makeBadThings();
  }, [makeBadThings]);

  // Клик "мимо" тултипа
  useOnClickOutside(moreBtnRef, tooltipRef, () => setVisibility(false));

  const handleWindowResize = useCallback(() => {
    getOverflowedItems(childRefs);
  }, [getOverflowedItems]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  const tabsListCN = popupVisible ? "tabs-list show" : "tabs-list";

  return (
    <nav className="tabs">
      <ul className={tabsListCN} ref={parentRef}>
        {React.Children.map(
          props.children.slice(0, hiddenTabsIndex),
          (child) => {
            return React.cloneElement(child, {
              forwardRef: tabsRef
            });
          }
        )}
        {showMoreBtn()}
      </ul>
    </nav>
  );
};

export default Tabs;
