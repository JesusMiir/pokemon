import { Link } from "react-router-dom";
import { typeToColor } from "../utils/typeColors";
import styles from "./TypeBadge.module.css";

export default function TypeBadge({ type }: { type: string }) {
  const color = typeToColor(type);
  return (
    <Link
      to={`/types/${type}`}
      className={styles.badge + " type-badge"}
      style={{ backgroundColor: color }}
      aria-label={`Filter by ${type} type`}
    >
      {type}
    </Link>
  );
}
