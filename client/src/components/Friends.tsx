import { useState, useEffect } from "react";
import { useGamepad, type ControllerAction } from "../hooks/useGamepad";

import "../css/friends.css";

type FriendsProps = {
    onCancel?: () => void;
};

function Friends({ onCancel }: FriendsProps) {

    useGamepad({
    onAction: (action: ControllerAction) => {
      switch (action) {
        case "circle":
          onCancel?.();
          break;
      }
    },
  });

  return (
    <>
      <h1>friends</h1>
    </>
  );
}

export default Friends;
