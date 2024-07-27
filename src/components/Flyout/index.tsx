import { FC, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { unselectAllItems } from "../../features/selectedItems/selectedItemsSlice";
import styles from "./Flyout.module.scss";
import { ThemeContext } from "../../contexts/ThemeContext";

const Flyout: FC = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState<string>("");
  const { ids, items } = useSelector((state: RootState) => state.selectedItems);
  const theme = useContext(ThemeContext);

  const generateCsvContent = () => {
    const csvHeader = [
      "Name",
      "Birth Year",
      "Eye Color",
      "Gender",
      "Hair Color",
      "Height",
      "Mass",
      "Skin Color",
      "URL",
    ];

    const csvRows = ids.map((id) => {
      const item = items[id];
      return [
        item.name,
        item.birth_year,
        item.eye_color,
        item.gender,
        item.hair_color,
        item.height,
        item.mass,
        item.skin_color,
        item.url,
      ];
    });

    const csvContent = [csvHeader, ...csvRows]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    setUrl(URL.createObjectURL(blob));
  };

  return (
    ids.length > 0 && (
      <div
        className={styles.flyout}
        style={{ backgroundColor: theme?.theme === "dark" ? "black" : "white" }}
      >
        <p
          className={styles.selectedCount}
        >{`${ids.length} item(s) are selected`}</p>
        <button
          className={styles.unselectButton}
          onClick={() => dispatch(unselectAllItems())}
        >
          Unselect all
        </button>
        <a
          href={url}
          onClick={generateCsvContent}
          download={`${ids.length}_persons.csv`}
          className={styles.downloadButton}
        >
          Download
        </a>
      </div>
    )
  );
};

export default Flyout;
