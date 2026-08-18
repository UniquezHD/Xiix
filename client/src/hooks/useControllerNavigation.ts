import { useCallback, useEffect, useRef } from "react";
import { useGamepad, type ControllerAction } from "./useGamepad";

type ControllerNavigationProps = {
  onOptions?: () => void;
  onCloseModal?: () => void;
  modalOpen?: boolean;
  activeGroup?: string;
};

export function useControllerNavigation({
  onOptions,
  onCloseModal,
  modalOpen = false,
  activeGroup,
}: ControllerNavigationProps = {}) {
  const elementsRef = useRef<HTMLElement[]>([]);
  const currentElementRef = useRef<HTMLElement | null>(null);

  const updateElements = useCallback(() => {
    const allElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-controller-focus]"),
    );

    if (activeGroup) {
      elementsRef.current = allElements.filter(
        (element) => element.dataset.controllerGroup === activeGroup,
      );

      return;
    }

    elementsRef.current = allElements.filter(
      (element) =>
        element.dataset.controllerGroup === "games" ||
        element.dataset.controllerGroup === "topbar",
    );
  }, [activeGroup]);

  const focusElement = useCallback((element: HTMLElement) => {
    currentElementRef.current = element;
    element.focus();
  }, []);

  const findElementInDirection = useCallback(
    (direction: ControllerAction) => {
      const current = currentElementRef.current;

      if (!current) return;

      const currentGroup = current.dataset.controllerGroup;

      const currentRect = current.getBoundingClientRect();

      const currentCenterX = currentRect.left + currentRect.width / 2;

      const currentCenterY = currentRect.top + currentRect.height / 2;

      let candidates = elementsRef.current.filter(
        (element) => element !== current,
      );

      if (direction === "left" || direction === "right") {
        candidates = candidates.filter(
          (element) => element.dataset.controllerGroup === currentGroup,
        );
      }

      let bestElement: HTMLElement | null = null;
      let bestDistance = Infinity;

      for (const element of candidates) {
        const rect = element.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;

        const centerY = rect.top + rect.height / 2;

        const dx = centerX - currentCenterX;
        const dy = centerY - currentCenterY;

        let isInDirection = false;

        switch (direction) {
          case "left":
            isInDirection = dx < -10;
            break;

          case "right":
            isInDirection = dx > 10;
            break;

          case "up":
            isInDirection = dy < -10;
            break;

          case "down":
            isInDirection = dy > 10;
            break;
        }

        if (!isInDirection) continue;

        const horizontalDistance = Math.abs(dx);

        const verticalDistance = Math.abs(dy);

        const distance =
          direction === "up" || direction === "down"
            ? verticalDistance + horizontalDistance * 2
            : Math.sqrt(dx * dx + dy * dy);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestElement = element;
        }
      }

      if (bestElement) {
        focusElement(bestElement);
      }
    },
    [focusElement],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateElements();

      currentElementRef.current = null;

      const elements = elementsRef.current;

      if (elements.length === 0) return;

      if (activeGroup) {
        focusElement(elements[0]);
        return;
      }

      const firstGame = elements.find(
        (element) => element.dataset.controllerGroup === "games",
      );

      if (firstGame) {
        focusElement(firstGame);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeGroup, updateElements, focusElement]);

  const handleAction = useCallback(
    (action: ControllerAction) => {
      updateElements();

      const elements = elementsRef.current;

      if (elements.length === 0) {
        return;
      }

      if (
        currentElementRef.current &&
        !elements.includes(currentElementRef.current)
      ) {
        currentElementRef.current = null;
      }

      if (!currentElementRef.current) {
        focusElement(elements[0]);
        return;
      }

      switch (action) {
        case "left":
        case "right":
        case "up":
        case "down":
          findElementInDirection(action);
          break;

        case "select":
          currentElementRef.current.click();
          break;

        case "back":
          if (activeGroup) {
            onCloseModal?.();
          } else {
            window.history.back();
          }
          break;

        case "options":
          if (!modalOpen) {
            onOptions?.();
          }
          break;

        case "home":
          break;
      }
    },
    [
      activeGroup,
      modalOpen,
      onCloseModal,
      onOptions,
      updateElements,
      focusElement,
      findElementInDirection,
    ],
  );

  useGamepad({
    onAction: handleAction,
  });
}
