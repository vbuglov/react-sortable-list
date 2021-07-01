import "./styles.css";
import { range } from "ramda";
import { useEffect, useState } from "react";
import arrayMove from "array-move";

export default function App() {
  const [list, cList] = useState(range(1, 50).map((el) => ({ index: el })));
  const [dragIndex, cDragIndex] = useState(null);

  useEffect(() => {
    document.addEventListener("mouseup", () => cDragIndex(null));
    return () => {
      document.removeEventListener("mouseup", () => cDragIndex(null));
    };
  }, []);

  const handleMouseDown = (index) => {
    cDragIndex(index);
  };

  const handleMouseMove = (e) => {
    const curElIndex = e.target.getAttribute("sort-id");
    if (dragIndex && curElIndex !== dragIndex) {
      const firstElIndex = list.findIndex((el) => +el.index === +dragIndex);
      const nextElIndex = list.findIndex((el) => +el.index === +curElIndex);
      cList(arrayMove(list, firstElIndex, nextElIndex));
    }
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Edit to see some magic happen!</h2>
      <ul>
        {list.map((el, idx) => (
          <li
            key={Math.random()}
            sort-id={el.index}
            onMouseDown={() => handleMouseDown(el.index)}
            onMouseMove={dragIndex && handleMouseMove}
            className={`${el.index === dragIndex && "active"}`}
          >
            {el.index}
          </li>
        ))}
      </ul>
    </div>
  );
}
