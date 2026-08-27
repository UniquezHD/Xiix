import { useCallback, useEffect, useRef } from "react";
import { useGamepad, type ControllerAction } from "./useGamepad";

type ControllerNavigationProps = {
  onOptions?: () => void;
  onCloseModal?: () => void;
  onCloseControllerDiagram?: () => void;
  modalOpen?: boolean;
  activeGroup?: string;
  controllerDiagram?: boolean;
};

export function useControllerNavigation({
  onOptions,
  onCloseModal,
  onCloseControllerDiagram,
  modalOpen = false,
  activeGroup,
  controllerDiagram,
}: ControllerNavigationProps = {}) {
  const elementsRef = useRef<HTMLElement[]>([]);
  const currentElementRef = useRef<HTMLElement | null>(null);
  const circleHoldTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const circleHeldRef = useRef(false);

  const UpdateElements = useCallback(() => {
    const AllElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-controller-focus]"),
    );

    if (activeGroup) {
      elementsRef.current = AllElements.filter(
        (element) => element.dataset.controllerGroup === activeGroup,
      );

      return;
    }

    elementsRef.current = AllElements.filter(
      (element) =>
        element.dataset.controllerGroup === "games" ||
        element.dataset.controllerGroup === "topbar",
    );
  }, [activeGroup]);

  const FocusElement = useCallback((element: HTMLElement) => {
    currentElementRef.current = element;
    element.focus();
  }, []);

  const FindElementInDirection = useCallback(
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
        FocusElement(bestElement);
      }
    },
    [FocusElement],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      UpdateElements();

      currentElementRef.current = null;

      const elements = elementsRef.current;

      if (elements.length === 0) return;

      if (activeGroup) {
        FocusElement(elements[0]);
        return;
      }

      const firstGame = elements.find(
        (element) => element.dataset.controllerGroup === "games",
      );

      if (firstGame) {
        FocusElement(firstGame);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeGroup, UpdateElements, FocusElement]);

  const handleAction = useCallback(
    (action: ControllerAction) => {
      UpdateElements();

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
        FocusElement(elements[0]);
        return;
      }

      switch (action) {
        case "left":
        case "right":
        case "up":
        case "down":
          FindElementInDirection(action);
          break;

        case "cross":
          if (!controllerDiagram) {
            currentElementRef.current.click();
          }
          break;

        case "circle":
          circleHeldRef.current = false;

          circleHoldTimerRef.current = setTimeout(() => {
            circleHeldRef.current = true;

            if(controllerDiagram){
              onCloseControllerDiagram?.();
            }

            console.log("Circle held");
          }, 1000);

          break;

        case "circle-release":
          if (circleHoldTimerRef.current) {
            clearTimeout(circleHoldTimerRef.current);
            circleHoldTimerRef.current = null;
          }

          if (!circleHeldRef.current) {
            if (activeGroup) {
              onCloseModal?.();
            } else {
              window.history.back();
            }
          }

          circleHeldRef.current = false;
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
      UpdateElements,
      FocusElement,
      FindElementInDirection,
    ],
  );

  useGamepad({
    onAction: handleAction,
  });
}
